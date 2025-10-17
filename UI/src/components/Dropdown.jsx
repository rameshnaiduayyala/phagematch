import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  options = [],
  placeholder = "Select an option",
  onChange,
  wrapperClass = "",
  buttonClass = "",
  menuClass = "",
  itemClass = "",
  groupClass = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${wrapperClass}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-between items-center w-full ${buttonClass}`}
      >
        {selected ? selected.label : placeholder}
        <svg
          className={`w-5 h-5 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className={`absolute z-20 mt-1 w-full ${menuClass}`}>
          {options.map((opt, idx) =>
            opt.type === "group" ? (
              <li key={idx} className={`${groupClass} px-4 py-2`}>
                <div className="text-gray-500 font-semibold mb-1">{opt.name}</div>
                {opt.items.map((item) => (
                  <div
                    key={item.value}
                    onClick={() => handleSelect(item)}
                    className={`cursor-pointer hover:bg-green-100 rounded ${itemClass} px-2 py-1`}
                  >
                    {item.label}
                  </div>
                ))}
              </li>
            ) : (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className={`cursor-pointer hover:bg-green-100 rounded ${itemClass} px-4 py-2`}
              >
                {opt.label}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
