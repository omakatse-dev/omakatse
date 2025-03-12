import React from "react";

export default function Input({
  placeholder = "",
  className,
  error = false,
  value,
  onBlur,
  onChange,
}: {
  placeholder?: string;
  className?: string;
  error?: boolean;
  value?: string;
  onBlur?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      className={`rounded-full py-3 px-5 focus:outline-black ${className} ${
        error ? "border border-red" : "border"
      }`}
      placeholder={placeholder}
    />
  );
}
