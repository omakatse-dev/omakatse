import React, { forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
  }
>(({ placeholder = "", className, error = false, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`rounded-full py-3 px-5 focus:outline-primary bg-white ${className} ${
        error ? "border border-red" : "border"
      }`}
      placeholder={placeholder}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
