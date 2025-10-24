import axios from "axios";
import { toast } from "sonner";
import { showConfirm } from "../components/Confirm";
import useGlobalStore from "../stores/loaderStore";

let onTokenExpired = null;
export const setOnTokenExpired = (callback) => {
  onTokenExpired = callback;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟢 REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const { startLoading } = useGlobalStore.getState();
    startLoading();

    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    const { stopLoading } = useGlobalStore.getState();
    stopLoading();
    return Promise.reject(error);
  }
);

// 🟠 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    const { stopLoading } = useGlobalStore.getState();
    stopLoading();
    return response;
  },
  async (error) => {
    const { stopLoading } = useGlobalStore.getState();
    stopLoading();

    const { response } = error;

    // 🟥 Network Error (no response from server)
    if (!response) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }

    // 🟡 HTTP Error Handling
    const status = response.status;
    const message = response.data?.message;

    switch (status) {
      case 400:
        toast.warning(message || "Bad request.");
        break;

      case 401: {
        // Prevent multiple modals
        if (!window.__confirmShown) {
          window.__confirmShown = true;

          try {
            const confirmed = await showConfirm({
              title: "Session Expired",
              message: "Your session has expired. Please log in again.",
              variant: "delete",
            });

            if (confirmed) {
              localStorage.removeItem("token");
              toast.info("Redirecting to login...");
              setTimeout(() => {
                window.location.href = "/login";
              }, 800);
            } else {
              toast.info("You stayed on this page. Some actions may fail.");
            }
          } finally {
            window.__confirmShown = false;
          }
        }

        if (onTokenExpired) onTokenExpired();
        break;
      }

      case 403:
        toast.error("Access denied.");
        break;

      case 404:
        toast.error("Requested resource not found.");
        break;

      case 500:
        toast.error("Server error. Please try again later.");
        break;

      default:
        toast.error(message || "An unexpected error occurred.");
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
