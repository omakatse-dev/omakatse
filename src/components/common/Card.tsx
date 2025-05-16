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
  const shadowColorMapping = {
    yellow: "rgb(255, 196, 0)",    // #FFC400
    blue: "rgb(64, 174, 215)",     // #40AED7
    green: "rgb(97, 201, 168)",    // #61C9A8
    pink: "rgb(238, 128, 127)",    // #EE807F
    grey: "rgb(228, 223, 209)",    // #E4DFD1
  };

  return (
    <div
      className={`relative bg-gray-50 rounded-2xl px-4 py-6 sm:p-8 ${className}`}
      style={{
        boxShadow: `5px 5px 0 ${shadowColorMapping[variant]}`,
        transform: 'translate3d(0, 0, 0)' // Forces GPU acceleration
      }}
    >
      {children}
    </div>
  );
}
