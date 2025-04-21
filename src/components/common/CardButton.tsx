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
    <>
      <div className={`relative ${className}`}>
        <div
          className={`bg-yellow w-full h-full absolute rounded-2xl border border-black transition-all ${
            active && "translate-x-2 translate-y-2"
          }`}
        />
        <button
          onClick={onClick}
          type="button"
          disabled={disabled}
          className={`relative px-5 py-4 sm:py-8 rounded-2xl w-full h-full ${
            active ? "border border-black bg-gray-50" : "border-primary bg-white"
          } ${disabled ? "bg-gray-200" : "cursor-pointer"}`}
        >
          {children}
        </button>
      </div>
    </>
  );
}
