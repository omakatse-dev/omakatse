import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`flex justify-center align-middle py-2.5 sm:py-4 px-10 outline-1 bodyButton rounded-full text-black outline-black transition-all cursor-pointer
                ${
                  variant === "primary"
                    ? "bg-white hover:bg-yellow-pastel hover:drop-shadow-[5px_5px_0px_rgba(255,196,0,1)] active:bg-yellow active:drop-shadow-[5px_5px_0px_rgba(255,255,255,1)]"
                    : "hover:bg-gray-50 hover:drop-shadow-[5px_5px_0px_rgba(150,138,132,1)] active:bg-gray-500 active:drop-shadow-[5px_5px_0px_rgba(255,255,255,1)]"
                } ${className}`}
      >
        {children}
      </button>
    </div>
  );
}
