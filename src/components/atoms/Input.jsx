import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 hover:border-gray-300 placeholder:text-gray-500";
  
  const errorStyles = error ? "border-error focus:border-error focus:ring-red-100" : "";

  return (
    <input
      type={type}
      className={cn(baseStyles, errorStyles, className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;