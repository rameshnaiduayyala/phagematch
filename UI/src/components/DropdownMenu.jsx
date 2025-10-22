import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";

export default function DropdownMenu({ items = [] }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, openUpward: false });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update dropdown position
  useEffect(() => {
    if (!open || !buttonRef.current || !menuRef.current) return;

    function updatePosition() {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuHeight = menuRef.current.offsetHeight;
      const menuWidth = menuRef.current.offsetWidth;

      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      const openUpward = spaceBelow < menuHeight && spaceAbove > menuHeight;

      const top = openUpward ? buttonRect.top - menuHeight : buttonRect.bottom;
      const left = buttonRect.left + buttonRect.width - menuWidth;

      setPosition({ top, left, openUpward });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true); // capture scroll in parent containers

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  // Render dropdown in a portal
  const dropdown = open ? createPortal(
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: position.top + window.scrollY,
        left: position.left + window.scrollX,
        width: "10rem", // 40 * 0.25rem (Tailwind w-40)
        zIndex: 9999,
      }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
    >
      <ul className="py-1">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                item.danger
                  ? "text-red-600"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  ) : null;

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <MoreVertical size={18} />
      </button>
      {dropdown}
    </div>
  );
}
