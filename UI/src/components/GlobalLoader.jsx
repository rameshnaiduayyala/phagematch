// src/components/GlobalLoader.jsx
import { Loader2 } from "lucide-react";
import useGlobalStore from "../stores/loaderStore";

export default function GlobalLoader() {
  const { isLoading } = useGlobalStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center text-white">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
}
