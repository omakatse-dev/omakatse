import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const people = [
  { id: 1, name: "None (No treats or snacks)" },
  { id: 2, name: "A few (less than daily)" },
  { id: 3, name: "Sometimes (1-3 daily)" },
  { id: 4, name: "Often (4+ daily)" },
];

function Selector({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) {
  const [selectedPerson, setSelectedPerson] = useState<{
    id: number;
    name: string;
  } | null>(null);

  return (
    <div className={className}>
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <ListboxButton className="border-primary rounded-full px-4 py-3 w-full bg-white cursor-pointer flex flex-row justify-between items-center">
          {selectedPerson ? selectedPerson.name : placeholder}
          <ChevronDownIcon className="w-6" />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className="rounded-2xl border-primary bg-white mt-2 w-[var(--button-width)]"
        >
          {people.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="data-[focus]:bg-gray-200 p-5 cursor-pointer"
            >
              {person.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}

export default Selector;
