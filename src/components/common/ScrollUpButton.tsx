import React from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function ScrollUpButton({ className }: { className?: string }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <button
        onClick={scrollToTop}
        className={`${className} p-4 rounded-full bg-yellow shadow-xl`}
      >
        <ArrowUpIcon className="w-6" />
      </button>
    </div>
  );
}
