import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FilterChip = ({ 
  label, 
  active = false, 
  onClick, 
  icon,
  count,
  className,
  ...props 
}) => {
  return (
    <motion.button
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95",
        active 
          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg" 
          : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200",
        className
      )}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {icon && (
        <ApperIcon 
          name={icon} 
          className={cn("w-4 h-4", active ? "text-white" : "text-gray-500")} 
        />
      )}
      {label}
      {count !== undefined && (
        <span className={cn(
          "px-2 py-0.5 rounded-full text-xs font-semibold",
          active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
        )}>
          {count}
        </span>
      )}
    </motion.button>
  );
};

export default FilterChip;