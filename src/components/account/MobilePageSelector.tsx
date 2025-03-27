"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
export default function MobilePageSelector() {
  //get path
  const pathname = usePathname();
  const pages = [
    {
      label: "Profile",
      href: "profile",
    },
    {
      label: "Reviews",
      href: "reviews",
    },
    {
      label: "Payment History",
      href: "history",
    },
    {
      label: "My Subscriptions",
      href: "subscriptions",
    },
    {
      label: "Pet Profiles",
      href: "pet-profiles",
    },
  ];
  const [selectedPage, setSelectedPage] = useState(
    pages.find((page) => page.href === pathname.split("/")[2])
  );

  const router = useRouter();
  return (
    <div className="sm:hidden">
      <Listbox value={selectedPage} onChange={setSelectedPage}>
        <ListboxButton
          className={`rounded-full px-4 py-3 w-full bg-white cursor-pointer border flex flex-row justify-between items-center ${
            selectedPage ? "text-black" : "text-gray-500"
          }`}
        >
          {selectedPage?.label}
          <ChevronDownIcon className="w-6 text-black" />
        </ListboxButton>
        <ListboxOptions
          className="rounded-2xl border bg-white z-20 w-[var(--button-width)]"
          anchor={{ to: "bottom start", gap: "8px" }}
        >
          {pages.map((page) => (
            <ListboxOption
              onClick={() => router.push(`/account/${page.href}`)}
              key={page.label}
              value={page}
              className="data-[focus]:bg-gray-200 data-[focus]:rounded-2xl p-5 cursor-pointer"
            >
              {page.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
