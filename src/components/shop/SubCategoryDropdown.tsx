import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function SubCategoryDropdown({
  options,
  selectedOption,
  onChange,
  className,
  counts,
}: {
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
  className?: string;
  counts: Record<string, number>;
}) {
  return (
    <div className={className}>
      <Listbox value={selectedOption} onChange={onChange}>
        <ListboxButton className="rounded-full px-4 py-3 w-full bg-white cursor-pointer flex flex-row justify-between items-center border border-primary">
          <div className="flex gap-2">
            <span>{selectedOption}</span>
            <span>({counts[selectedOption] ?? 0})</span>
          </div>
          <ChevronDownIcon className="w-6 text-primary" />
        </ListboxButton>
        <ListboxOptions
          className="rounded-2xl border border-primary bg-white z-20 w-[var(--button-width)]"
          anchor={{ to: "bottom start", gap: "8px" }}
        >
          {options.map((option) => (
            <ListboxOption
              key={option}
              value={option}
              className="data-[focus]:bg-gray-200 data-[focus]:rounded-2xl p-5 cursor-pointer"
            >
              <span
                className={`inline-flex gap-2 ${
                  selectedOption === option
                    ? "text-primary font-bold border-b-2"
                    : ""
                }`}
              >
                <span>{option}</span>
                <span>({counts[option] ?? 0})</span>
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
