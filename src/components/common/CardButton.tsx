import React from "react";

export default function CardButton({
  children,
  className,
  active,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      style={
        active
          ? {
              boxShadow:
                "5px 5px 0px rgba(255,196,0,1), 6.5px 6.5px 0px rgba(0,0,0,1)",
              border: "1px solid black",
            }
          : {}
      }
      className={`px-5 py-8 border-primary rounded-2xl aspect-square ${className} ${
        disabled ? "bg-gray-200" : "bg-white cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}
