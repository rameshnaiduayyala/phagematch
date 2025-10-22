import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function ModalComp({
  open,
  onClose,
  children,
  size = "md", // sm | md | lg | full
  className = "",
  header = null,
  footer = null,
  closeOnOverlayClick = true,
  animation = true,
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  // Map size to Tailwind classes
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    full: "w-full h-full m-0",
  };

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => closeOnOverlayClick && onClose?.()}
      />

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-auto
          ${sizeClasses[size]} w-full mx-auto
          ${animation ? "transform transition-all duration-300 scale-100 opacity-100" : ""}
          ${className}`}
        style={{
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Header */}
        {header && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            {header}
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-4">{children}</div>

        {/* Footer */}
        {footer && <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">{footer}</div>}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
