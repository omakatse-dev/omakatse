"use client";

import Spinner from "../../../public/assets/Paw.svg";
import Image from "next/image";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  bgColor?: string;
  loading?: boolean;
}

export default function Button({
  children,
  loading = false,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
  bgColor = "",
}: ButtonProps) {
  const primaryStyles =
    "bg-white active:bg-yellow hover:bg-yellow-pastel disabled:text-gray-500 disabled:bg-gray-200 disabled:border-gray-400 disabled:cursor-not-allowed";

  const secondaryStyles =
    "hover:bg-white active:bg-gray-500 lg:active:text-white disabled:hover:bg-gray-200 disabled:hover:drop-shadow-none disabled:cursor-not-allowed " +
    bgColor;

  return (
    <div
      className={`relative group inline-block z-1 h-11 md:h-13 ${className}`}
    >
      {/* Bottom button */}
      <button
        type={type}
        disabled={disabled || loading}
        className={`absolute inset-0 rounded-full transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-1 group-active:translate-y-1 group-active:bg-white border-1 ${
          variant === "primary" ? "bg-yellow" : "group-hover:bg-gray-500"
        }`}
        aria-hidden="true"
      >
        {" "}
      </button>

      {/* Top button */}
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`relative z-10 flex justify-center px-10 bodyButton rounded-full text-primary border-black border transition-all cursor-pointer h-full items-center w-full flex-shrink-0
          ${variant === "primary" ? primaryStyles : secondaryStyles}`}
      >
        {loading ? (
          <Image src={Spinner} alt="loading" className="w-8 animate-spin" />
        ) : (
          children
        )}
      </button>
    </div>
  );
}
