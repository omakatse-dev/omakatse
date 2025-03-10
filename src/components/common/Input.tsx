import React from "react";

export default function Input({
  placeholder = "",
  className,
  error = false,
}: {
  placeholder?: string;
  className?: string;
  error?: boolean;
}) {
  return (
    <input
      className={`rounded-full py-4 px-5 focus:outline-black ${className} ${
        error ? "border border-red" : "border"
      }`}
      placeholder={placeholder}
    />
  );
}
