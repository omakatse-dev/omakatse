import React from "react";

export default function PillButton({
  children,
  error = false,
  className,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  error?: boolean;
  className?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-10 py-3 rounded-full cursor-pointer ${
        error ? "border-red border" : "border-primary"
      } ${active ? "bg-blue-light" : "bg-white"} ${className}`}
    >
      {children}
    </button>
  );
}
