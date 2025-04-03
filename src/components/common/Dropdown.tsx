import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { forwardRef } from "react";

interface DropdownProps {
  options: string[];
  placeholder: string;
  value?: string;
  onChange?: (event: { target: { value: string } }) => void;
  name?: string;
}

const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  ({ options, placeholder, value, onChange, name }, ref) => {
    return (
      <Listbox
        value={value}
        onChange={(val) => onChange?.({ target: { value: val } })}
        name={name}
      >
        <ListboxButton
          ref={ref}
          className={`rounded-full px-4 py-3 w-full bg-white cursor-pointer flex flex-row justify-between items-center border-primary ${
            value ? "text-primary" : "text-gray-500"
          }`}
        >
          {value ? value : placeholder}
          <ChevronDownIcon className="w-6 text-primary" />
        </ListboxButton>
        <ListboxOptions
          className="rounded-2xl border-primary bg-white z-20 w-[var(--button-width)]"
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
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
