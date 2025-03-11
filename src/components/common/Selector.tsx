import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function Selector({
  value,
  onChange,
  placeholder,
  className,
  options,
  buttonStyles,
}: {
  value: { id: number; name: string; frequency?: string } | null;
  onChange: (option: { id: number; name: string; frequency?: string }) => void;
  placeholder?: string;
  className?: string;
  options: { id: number; name: string; frequency?: string }[];
  buttonStyles?: string;
}) {
  return (
    <div className={className}>
      <Listbox value={value} onChange={onChange}>
        <ListboxButton
          className={`rounded-full px-4 py-3 w-full bg-white cursor-pointer flex flex-row justify-between items-center ${value ? "text-black" : "text-gray-500"
            } ${buttonStyles}`}
        >
          {value ? value.name : placeholder}
          <ChevronDownIcon className="w-6 text-black" />
        </ListboxButton>
        <ListboxOptions
          className="rounded-2xl border-primary bg-white z-20 w-[var(--button-width)]"
          anchor={{ to: "bottom start", gap: "8px" }}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="data-[focus]:bg-gray-200 data-[focus]:rounded-2xl p-5 cursor-pointer"
            >
              {option.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}

export default Selector;
