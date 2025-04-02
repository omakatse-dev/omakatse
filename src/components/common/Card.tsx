import React from "react";

export default function Card({
  children,
  className,
  variant = "yellow",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "yellow" | "blue" | "green" | "pink" | "grey";
}) {
  const dropShadowMapping = {
    yellow: "yellow-shadow",
    blue: "blue-shadow",
    green: "green-shadow",
    pink: "pink-shadow",
    grey: "grey-shadow",
  };

  return (
    <div
      className={`${dropShadowMapping[variant]} bg-gray-50 rounded-2xl p-8 ${className}`}
    >
      {children}
    </div>
  );
}
