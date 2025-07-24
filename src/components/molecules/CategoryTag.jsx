import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CategoryTag = ({ category, onRemove, className, ...props }) => {
  if (!category) return null;

  return (
    <span
      className={cn("category-tag inline-flex items-center gap-1.5", className)}
      {...props}
    >
      <ApperIcon name="Tag" className="w-3 h-3" />
      {category}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-secondary-300 rounded-full p-0.5 transition-colors duration-150"
        >
          <ApperIcon name="X" className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default CategoryTag;