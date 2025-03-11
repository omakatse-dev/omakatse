import { Checkbox } from "@headlessui/react";

export default function OMCheckbox({ checked, onChange, className }: { checked: boolean, onChange: () => void, className?: string }) {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      className={`group block size-4 rounded border bg-white data-[checked]:bg-black ${className}`}
    >
      {/* Checkmark icon */}
      <svg
        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Checkbox>
  );
}
