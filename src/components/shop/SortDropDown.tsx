import React from "react";
import { ArrowsUpDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

export default function SortDropDown({
  className,
  options,
  selectedOption,
  onChange,
}: {
  className?: string;
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
}) {
  return (
    <div className={`w-full flex justify-end items-center gap-2 ${className}`}>
      <ArrowsUpDownIcon className="w-6 text-black" />
      Sort By:
      <Listbox value={selectedOption} onChange={onChange}>
        <ListboxButton className="rounded-full px-4 py-3 w-56 sm:w-64 bg-white cursor-pointer flex flex-row justify-between items-center border border-black">
          {selectedOption}
          <ChevronDownIcon className="w-6 text-black" />
        </ListboxButton>
        <ListboxOptions
          className="rounded-2xl border border-black bg-white z-20 w-[var(--button-width)]"
          anchor={{ to: "bottom start", gap: "8px" }}
        >
          {options.map((option) => (
            <ListboxOption
              key={option}
              value={option}
              className="data-[focus]:bg-gray-200 data-[focus]:rounded-2xl p-5 cursor-pointer"
            >
              {option}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
