import React from "react";
import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority, showIcon = true, className, ...props }) => {
  const priorityConfig = {
    high: {
      label: "High",
      variant: "error",
      icon: "AlertCircle",
      className: "priority-high animate-pulse-gentle"
    },
    medium: {
      label: "Medium",
      variant: "warning", 
      icon: "Circle",
      className: "priority-medium"
    },
    low: {
      label: "Low",
      variant: "success",
      icon: "Minus",
      className: "priority-low"
    }
  };

  const config = priorityConfig[priority] || priorityConfig.low;

  return (
    <Badge
      variant={config.variant}
      className={cn("priority-badge", config.className, className)}
      {...props}
    >
      {showIcon && (
        <ApperIcon 
          name={config.icon} 
          className="w-3 h-3 mr-1.5" 
        />
      )}
      {config.label}
    </Badge>
  );
};

export default PriorityBadge;