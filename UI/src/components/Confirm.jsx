import React, { useState, useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

let globalShowConfirm;

export function ConfirmRoot() {
  const [opts, setOpts] = useState(null);
  const dialogRef = useRef();

  useEffect(() => {
    globalShowConfirm = (options) =>
      new Promise((resolve) => {
        setOpts({ ...options, resolve });
      });
  }, []);

  if (!opts) return null;

  const { title, message, variant = "default", resolve } = opts;

  const handleClose = (result) => {
    resolve(result);
    setOpts(null);
  };

  const iconColor =
    variant === "delete"
      ? "text-red-600"
      : "text-sky-600";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => handleClose(false)}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all"
        style={{ animation: "confirm-in 180ms cubic-bezier(.2,.9,.2,1)" }}
      >
        <div className="p-6 flex items-start gap-4">
          <AlertTriangle className={`w-6 h-6 ${iconColor}`} />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {message}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 bg-slate-50 dark:bg-slate-800 flex justify-end gap-3">
          <button
            onClick={() => handleClose(false)}
            className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-slate-200 hover:bg-slate-100"
          >
            No
          </button>
          <button
            onClick={() => handleClose(true)}
            className={`px-4 py-2 rounded-md text-sm font-semibold text-white transition-colors ${
              variant === "delete"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            Yes
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confirm-in {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export function showConfirm(options) {
  if (!globalShowConfirm) {
    console.error("ConfirmRoot not mounted!");
    return Promise.resolve(false);
  }
  return globalShowConfirm(options);
}
