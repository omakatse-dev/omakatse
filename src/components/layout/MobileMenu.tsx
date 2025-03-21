"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  ShoppingCartIcon,
  UserIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
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
      className={`fixed xl:hidden w-screen h-screen bg-yellow inset-0 z-10 p-8 transition-all overflow-auto ${
        !isOpen ? "-translate-y-full" : "-translate-y-0"
      }`}
    >
      <div className="flex justify-between pb-8 border-b-1 border-white">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <XMarkIcon className="h-6 w-6 stroke-black stroke-[2]" />
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
        <button className="pr-2">
          <ShoppingCartIcon className="h-6 w-6 stroke-black stroke-[2]" />
        </button>
      </div>

      <div className="flex flex-col pt-8 gap-8 font-open-sans font-semibold pb-8 border-b-1 border-white text-2xl">
        <Link
          onClick={() => setIsOpen((prev) => !prev)}
          href="/shop"
          className="flex gap-1 items-center"
        >
          Shop
          <ChevronDownIcon className="h-6 w-6 stroke-black stroke-[2]" />
        </Link>
        {links.map((link) => (
          <Link
            onClick={() => setIsOpen((prev) => !prev)}
            href={link.url}
            key={link.name}
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
          <UserIcon className="h-6 w-6 stroke-black stroke-[2]" />
          <p>Account</p>
        </Link>
      </div>
    </div>
  );
}
