import React from "react";

export default function FilterTab({
  filters,
  selectedFilter,
  onChange,
  className,
  counts,
}: {
  filters: string[];
  selectedFilter: string;
  onChange: (filter: string) => void;
  className?: string;
  counts: Record<string, number>;
}) {
  return (
    <div
      className={`w-80 gap-3 flex flex-col py-5 text-gray-800 bodyMD ${className}`}
    >
      {filters.map((filter) => (
        <div
          key={filter}
          onClick={() => onChange(filter)}
          className="cursor-pointer"
        >
          <span
            className={`inline-flex gap-2 ${
              selectedFilter === filter
                ? "text-primary font-bold border-b-2"
                : ""
            }`}
          >
            <span>{filter}</span>
            <span>({counts[filter] ?? 0})</span>
          </span>
        </div>
      ))}
    </div>
  );
}
