// components/RowActionsInRow.js
import { useState, useRef, useEffect } from "react";
import { Ellipsis } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RowActionsInRow = ({ row, actions, maxHeight = 140, bgClass = "bg-gray-900/5" }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Filter actions based on row condition
  const availableActions = actions.filter((action) =>
    action.show ? action.show(row.original) : true
  );

  // Calculate dynamic height
  const [height, setHeight] = useState("2.5rem");
  useEffect(() => {
    if (containerRef.current) {
      const content = containerRef.current.querySelector(".actions-content");
      if (content && open) {
        const newHeight = Math.min(content.scrollHeight, maxHeight);
        setHeight(`${newHeight}px`);
      } else {
        setHeight("2.5rem");
      }
    }
  }, [open, actions, row, maxHeight]);

  // Framer Motion variants for staggered buttons
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={containerRef}
      className="transition-all duration-300 overflow-hidden"
      style={{ height }}
    >
      {!open ? (
        <Ellipsis
          className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setOpen(true)}
        />
      ) : (
        <AnimatePresence>
          {open && (
            <motion.div
              className={`actions-content flex flex-wrap gap-2 p-2 rounded-xl shadow-sm ${bgClass}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {availableActions.map((action, idx) => (
                <motion.button
                  key={idx}
                  className={`px-3 py-1 text-sm font-medium rounded-lg shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                    action.className || "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                  variants={buttonVariants}
                  onClick={() => {
                    action.onClick(row.original);
                    setOpen(false);
                  }}
                >
                  {action.label}
                </motion.button>
              ))}

              <motion.button
                className="px-3 py-1 text-sm font-medium rounded-lg bg-gray-600 text-white shadow-sm hover:shadow-md transition-all"
                variants={buttonVariants}
                onClick={() => setOpen(false)}
              >
                Cancel
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default RowActionsInRow;
