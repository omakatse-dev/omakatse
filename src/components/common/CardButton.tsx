import React from "react";

export default function CardButton({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      style={
        active
          ? {
              boxShadow:
                "5px 5px 0px rgba(255,196,0,1), 6.5px 6.5px 0px rgba(0,0,0,1)",
              border: "1px solid black",
            }
          : {}
      }
      className={`px-5 border bg-white rounded-2xl aspect-square`}
    >
      {children}
    </button>
  );
}
