import React, { Suspense } from "react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";


interface AccountDropdownProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AccountDropdown({ setIsOpen }: AccountDropdownProps) {
  const pathName = usePathname();
  const { user } = useUser();

  return (
    <div>
      <Suspense>
        <Disclosure as="div">
          {({ open }) => (
            <>
              <DisclosureButton className="flex gap-3 items-center focus:outline-none w-full">
                <UserIcon className="h-6 w-6 stroke-primary stroke-[2]" />
                <span>My Account</span>
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
                  <ul className="flex flex-col gap-3 pb-3 border-b-1 border-white">
                    <li>
                      <Link
                        onClick={() => {
                          setIsOpen((prev) => !prev);
                        }}
                        href="/account/profile"
                        className={`bodyLG ${
                          pathName.startsWith("/account/profile")
                            ? "pb-1 border-b-2 border-black"
                            : "border-b-0"
                        }`}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={() => setIsOpen((prev) => !prev)}
                        href="/account/subscriptions"
                        className={`bodyLG ${pathName.startsWith("/account/subscriptions") ? "pb-1 border-b-2 border-black" : "border-b-0"}`}
                      >
                        My Subscription
                      </a>
                    </li>
                    <li>
                      <Link
                        onClick={() => setIsOpen((prev) => !prev)}
                        href="/account/past-boxes"
                        className={`bodyLG ${pathName.startsWith("/account/past-boxes") ? "pb-1 border-b-2 border-black" : "border-b-0"}`}
                      >
                        Past Boxes
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setIsOpen((prev) => !prev)}
                        href="/account/history"
                        className={`bodyLG ${pathName.startsWith("/account/history") ? "pb-1 border-b-2 border-black" : "border-b-0"}`}
                      >
                        Payment History
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setIsOpen((prev) => !prev)}
                        href="/account/reviews"
                        className={`bodyLG ${pathName.startsWith("/account/reviews") ? "pb-1 border-b-2 border-black" : "border-b-0"}`}
                      >
                        Reviews
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setIsOpen((prev) => !prev)}
                        href="/account/pet-profiles"
                        className={`bodyLG ${pathName.startsWith("/account/pet-profiles") ? "pb-1 border-b-2 border-black" : "border-b-0"}`}
                      >
                        Pet Profile
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href={
                      user
                        ? "/api/auth/logout"
                        : "/api/auth/login?returnTo=/account/profile"
                    }
                    className="flex pt-3 bodyLG"
                  >
                    {user ? "Logout" : "Login"}
                  </Link>
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
