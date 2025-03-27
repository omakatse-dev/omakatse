import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const primaryStyles =
    "bg-white hover:bg-yellow-pastel hover:drop-shadow-[5px_5px_0px_rgba(255,196,0,1)] active:bg-yellow lg:active:drop-shadow-[5px_5px_0px_rgba(255,255,255,1)] disabled:text-gray-500 disabled:bg-gray-200 disabled:border-gray-400 disabled:hover:bg-gray-200 disabled:hover:drop-shadow-none disabled:cursor-not-allowed";

  const secondaryStyles =
    "hover:bg-gray-50 hover:drop-shadow-[5px_5px_0px_rgba(150,138,132,1)] active:bg-gray-500 lg:active:drop-shadow-[5px_5px_0px_rgba(255,255,255,1)] disabled:hover:bg-gray-200 disabled:hover:drop-shadow-none disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center align-middle py-2.5 sm:py-4 px-10 outline-1 bodyButton rounded-full text-primary border-black transition-all cursor-pointer
      ${variant === "primary" ? primaryStyles : secondaryStyles} ${className}`}
    >
      {children}
    </button>
  );
}
