"use client";

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
    "bg-white active:bg-yellow hover:bg-yellow-pastel disabled:text-gray-500 disabled:bg-gray-200 disabled:border-gray-400 disabled:cursor-not-allowed";

  const secondaryStyles =
    "bg-white active:bg-gray-500 lg:active:text-white disabled:hover:bg-gray-200 disabled:hover:drop-shadow-none disabled:cursor-not-allowed";

    return (
      <div className="relative group inline-block w-full sm:w-fit sm:self-center">
        {/* Bottom button */}
        <button
          type={type}
          disabled={disabled}
          className={`absolute top-0 left-0 w-full h-full rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-active:translate-x-1 group-active:translate-y-1 group-active:bg-white border-1 ${variant === "primary" ? "bg-yellow" : "bg-gray-500"}`}
          aria-hidden="true"
        > </button>
  
        {/* Top button */}
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`relative z-10 flex justify-center py-2.5 sm:py-4 px-10 bodyButton rounded-full text-primary border-black border transition-all cursor-pointer h-11 md:h-13 items-center
          ${variant === "primary" ? primaryStyles : secondaryStyles} ${className}`}
        >
          {children}
        </button>
      </div>
    );
  }
