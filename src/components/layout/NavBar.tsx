'use client';

import Link from "next/link";
import React from "react";
import Image from "next/image";
import Button from "../common/Button";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import SearchDropdown from "./Search/SearchDropdown";

export default function NavBar() {
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

  const [isOpen, setIsOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  return (
    <>
      <div className="flex justify-between bg-yellow py-4 px-5 xl:py-4 xl:px-8 rounded-full fixed top-4 w-11/12 left-1/2 -translate-x-1/2 z-10">

        <div className="xl:hidden flex justify-center gap-3">
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <Bars3Icon className="h-6 w-6 stroke-black stroke-[2]" />
          </button>
          <button onClick={() => setShowSearchDropdown((prev) => !prev)}>
            <MagnifyingGlassIcon className="h-6 w-6 stroke-black stroke-[2]" />
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-x-8 font-open-sans font-semibold">
          <Link href="/shop/cat-products" className="flex gap-1">
            Cat
            <ChevronDownIcon className="h-6 w-6 stroke-black stroke-[2]" />
          </Link>
          <Link href="/shop/dog-products" className="flex gap-1">
            Dog
            <ChevronDownIcon className="h-6 w-6 stroke-black stroke-[2]" />
          </Link>
          {links.map((link) => (
            <Link href={link.url} key={link.name}>
              {link.name}
            </Link>
          ))}
        </div>

        <Link href="/">
          <Image
            src="/assets/omakatsehorizontalblack.svg"
            alt="Logo"
            width={192}
            height={52}
            className="h-11 xl:h-[52px] w-auto cursor-pointer"
          />
        </Link>

        <div className="hidden xl:flex gap-8">
          <Button variant="primary">Build your box now</Button>
          <div className="flex gap-5">
            <button className="cursor-pointer" onClick={() => (setShowSearchDropdown((prev) => !prev))}>
              <MagnifyingGlassIcon className="h-6 w-6 stroke-black stroke-[2]" />
            </button>
            <button>
              <UserIcon className="h-6 w-6 stroke-black stroke-[2]" />
            </button>
            <button>
              <ShoppingCartIcon className="h-6 w-6 stroke-black stroke-[2]" />
            </button>
          </div>
        </div>

        <div className="xl:hidden flex">
          <button>
            <ShoppingCartIcon className="h-6 w-6 stroke-black stroke-[2]" />
          </button>
        </div>

      </div>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <SearchDropdown isOpen={showSearchDropdown} handleClose={() => setShowSearchDropdown(false)} />

    </>

  );
}
