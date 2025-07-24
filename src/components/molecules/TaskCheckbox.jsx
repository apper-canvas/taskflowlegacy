import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const TaskCheckbox = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  className,
  ...props 
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <motion.div
      className={cn("task-checkbox", checked && "completed", disabled && "opacity-50 cursor-not-allowed", className)}
      onClick={handleClick}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={false}
      animate={checked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    />
  );
};

export default TaskCheckbox;