import { Textarea } from "@headlessui/react";
import React, { forwardRef } from "react";

const Textfield = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: boolean;
  }
>(({ placeholder, className, error = false, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      className={`resize-none focus:outline-primary bg-white border-primary rounded-2xl mt-2 py-4 px-5 ${className} ${
        error ? "border-red" : ""
      }`}
      placeholder={placeholder}
      {...props}
    />
  );
});

Textfield.displayName = "Textfield";

export default Textfield;
