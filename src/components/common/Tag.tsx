import React from "react";

export default function Tag({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`bodySM rounded-2xl bg-gray-200 py-1 px-3 font-semibold ${className}`}>{children}</div>;
}
