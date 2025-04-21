"use client";

import Link from "next/link";
import React, { Suspense } from "react";
import Image from "next/image";
import {
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import CatDropdown from "./CatDropdown";
import DogDropdown from "./DogDropdown";
import Button from "@/components/common/Button";
import { useUIStore } from "@/stores/uiStore";
import { useCartStore } from "@/stores/cartStore";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const pathname = usePathname();
  const { openCart } = useUIStore();
    const cartItems = useCartStore((state) => state.items);
  
  const links = [
    {
      name: "About Us",
      url: "/about",
    },
    {
      name: "Blog",
      url: "/blog",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ];

  return (
    <div
      className={`fixed xl:hidden w-screen h-screen flex flex-col bg-yellow inset-0 z-10 p-8 transition-all overflow-auto ${
        !isOpen ? "-translate-y-full" : "-translate-y-0"
      }`}
    >
      <div className="flex justify-between pb-8 border-b-1 border-white">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <XMarkIcon className="h-6 w-6 stroke-primary stroke-[2]" />
        </button>
        <Link
          onClick={() => setIsOpen((prev) => !prev)}
          href="/"
          className="flex gap-1 items-center"
        >
          <Image
            src="/assets/omakatsehorizontalblack.svg"
            alt="Logo"
            width={192}
            height={52}
            className="cursor-pointer"
          />
        </Link>
        <button onClick={openCart} className="cursor-pointer relative">
          <Image
            src="/assets/Cart.svg"
            alt="Cart Icon"
            width={26}
            height={26}
            className="cursor-pointer"
          />{" "}
          {cartItems.length > 0 && (
            <div className="absolute top-3 -right-0 bg-red-500 rounded-full w-2 h-2" />
          )}
        </button>
      </div>

      <div className="flex flex-col pt-8 gap-8 font-open-sans font-semibold pb-8 border-b-1 border-white text-2xl">
        <Suspense>
          <CatDropdown setIsOpen={setIsOpen} />
          <DogDropdown setIsOpen={setIsOpen} />
        </Suspense>

        {links.map((link) => (
          <Link
            onClick={() => setIsOpen((prev) => !prev)}
            href={link.url}
            key={link.name}
            className={`block pb-1 ${
              pathname === link.url
                ? "border-b-2 w-fit border-black"
                : "border-b-0"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-col pt-8 font-open-sans font-semibold text-2xl">
        <Link
          onClick={() => setIsOpen((prev) => !prev)}
          href="/account/profile"
          className="flex gap-3 items-center"
        >
          <UserIcon className="h-6 w-6 stroke-primary stroke-[2]" />
          <p>Account</p>
        </Link>
      </div>
      <div className="mt-auto pt-8">
        <Button variant="primary" className="w-full">
          <Link href="/subscribe/step-1" passHref>
            Build your box now
          </Link>
        </Button>
      </div>
    </div>
  );
}
