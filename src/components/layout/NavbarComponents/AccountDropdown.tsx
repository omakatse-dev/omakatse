/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Suspense } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { useSearchParams, usePathname } from "next/navigation";

interface AccountDropdownProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AccountDropdown({ setIsOpen }: AccountDropdownProps) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const pathName = usePathname();

  return (
    <div>
      <Suspense>
      <Disclosure as="div">
        {({ open }) => (
          <>
            <DisclosureButton className="flex gap-1 items-center focus:outline-none w-full">
              <span>Cat</span>
              <Image
                src="/assets/CatBlackIcon.svg"
                alt="CatIcon"
                width={36}
                height={36}
                className="ml-5"
              />
              <ChevronDownIcon
                className={`h-6 w-6 transition-transform duration-300 ml-auto ${
                  open ? "rotate-180" : ""
                }`}
              />
            </DisclosureButton>
            <Transition
              show={open}
              enter="transition duration-200 ease-out"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition duration-150 ease-out"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
            >
              <DisclosurePanel className="relative pl-5 mt-3">
                <ul className="flex flex-col gap-3">
                  <li>
                    <a
                      onClick={() => {
                        setIsOpen((prev) => !prev);
                      }}
                      href="/shop/cat-products?sort=New+Arrivals&filter=All&tab=Treats"
                      className={`bodyLG ${
                        tab === "Treats" &&
                        pathName.startsWith("/shop/cat-products")
                          ? "pb-1 border-b-2 border-black"
                          : "border-b-0"
                      }`}
                    >
                      Treats
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setIsOpen((prev) => !prev)}
                      href="/shop/cat-products/?sort=New+Arrivals&filter=All&tab=Care+Products"
                      className={`bodyLG ${tab === "Care Products" && pathName.startsWith("/shop/cat-products") ? "pb-1 border-b-2 border-black" : "border-b-0"}`}
                    >
                      Care Products
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setIsOpen((prev) => !prev)}
                      href="/shop/cat-products/?sort=New+Arrivals&filter=All&tab=Accessories"
                      className={`bodyLG ${tab === "Accessories" && pathName.startsWith("/shop/cat-products") ? "pb-1 border-b-2 border-black" : "border-b-0"}`}
                    >
                      Accessories
                    </a>
                  </li>
                </ul>
              </DisclosurePanel>
            </Transition>
          </>
        )}
      </Disclosure>
      </Suspense>
    </div>
  );
}

export default AccountDropdown;
