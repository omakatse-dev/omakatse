import React from "react";

export default function Tag({ children }: { children: React.ReactNode }) {
  return <div className="bodySM rounded-2xl bg-gray-200 py-1 px-3 font-semibold">{children}</div>;
}
