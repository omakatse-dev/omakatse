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
          } ${disabled ? "border-red" : "border-black"}`}
        />
        <button
          onClick={onClick}
          type="button"
          disabled={disabled}
          className={`relative px-5 py-4 sm:py-8 rounded-2xl w-full h-full ${className}  ${
            active ? "border border-black bg-gray-50" : "border-primary"
          } ${disabled ? "cursor-not-allowed bg-gray-200" : "cursor-pointer bg-white"}`}
        >
          {children}
        </button>
      </div>
    </>
  );
}
