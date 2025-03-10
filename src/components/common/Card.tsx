import React from "react";

export default function Card({
  children,
  className,
  variant = "yellow",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "yellow" | "blue" | "green" | "pink";
}) {
  const dropShadowMapping = {
    yellow: "yellow-shadow",
    blue: "blue-shadow",
    green: "green-shadow",
    pink: "pink-shadow",
  };

  return (
    <div
      className={`${dropShadowMapping[variant]} bg-gray-50 rounded-2xl p-8 ${className}`}
    >
      {children}
    </div>
  );
}
