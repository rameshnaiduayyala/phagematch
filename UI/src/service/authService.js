import { formatApiError } from "../utils/formatError";
import api from "../api/axios";

const Login = async (email, password) => {
  try {
    const response = await api.post("/login/", { email, password });
    return response.data;
  } catch (error) {
    return { error: formatApiError(error.response?.data || error.message) };
  }
};

const RegisterNewUser = async (
  name,
  email,
  phone_number,
  password,
  confirm_password,
  role,
  affiliated_org
) => {
  try {
    const response = await api.post("/register/", {
      name,
      email,
      phone_number,
      password,
      confirm_password,
      role,
      affiliated_org,
    });
    return response.data;
  } catch (error) {
     return { error: formatApiError(error.response?.data || error.message) };
  }
};

const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

const GetUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const authService = {
  Login,
  RegisterNewUser,
  Logout,
  GetUser,
};

export default authService;
