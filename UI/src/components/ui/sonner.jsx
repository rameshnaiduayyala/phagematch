import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      position="top-right"
      closeButton={true}
      className="toaster group font-sans"
      toastOptions={{
        duration: 5000,
        dismissible: true,
        classNames: {
          toast:
            "group relative flex items-center p-4 border rounded-xl bg-white/95 text-gray-900 border-gray-200 shadow-md backdrop-blur-sm transition-all ease-in-out duration-150",
          description: "text-sm text-gray-600 mt-1",
          actionButton:
            "ml-auto px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors",
          cancelButton:
            "ml-2 px-3 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors",
        },
        ...props.toastOptions,
      }}
      icons={{
        success: <CircleCheckIcon className="w-4 h-4 text-green-500" />,
        info: <InfoIcon className="w-4 h-4 text-blue-500" />,
        warning: <TriangleAlertIcon className="w-4 h-4 text-yellow-400" />,
        error: <OctagonXIcon className="w-4 h-4 text-red-500" />,
        loading: <Loader2Icon className="w-4 h-4 animate-spin text-gray-400" />,
      }}
      style={{
        "--normal-bg": "rgba(255, 255, 255, 0.95)",
        "--normal-text": "#111827",
        "--normal-border": "#e5e7eb",
        "--border-radius": "0.75rem",
      }}
      {...props}
    />
  );
};

export { Toaster };
