import React from "react";

export default function FilterTab({
  filters,
  selectedFilter,
  onChange,
  className,
}: {
  filters: string[];
  selectedFilter: string;
  onChange: (filter: string) => void;
  className?: string;
}) {
  return (
    <div
      className={`w-80 gap-3 flex flex-col py-5 text-gray-800 bodyMD ${className}`}
    >
      {filters.map((filter) => (
        <div
          key={filter}
          onClick={() => onChange(filter)}
          className={`cursor-pointer ${
            selectedFilter === filter
              ? "text-primary font-bold underline underline-offset-4"
              : ""
          }`}
        >
          {filter}
        </div>
      ))}
    </div>
  );
}
