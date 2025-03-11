import Link from "next/link";
import React from "react";
import Image from "next/image";
import Button from "../common/Button";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function NavBar() {
  const links = [
    {
      name: "Subscription",
      url: "/subscribe/step-1",
    },
    {
      name: "Shop",
      url: "/shop",
    },
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
    <div className="flex justify-between bg-yellow py-4 px-6 rounded-full fixed top-4 w-11/12 left-1/2 -translate-x-1/2 z-10">
      <Link href="/">
        <Image
          src="/assets/omakatsehorizontalblack.svg"
          alt="Logo"
          width={192}
          height={52}
          className="cursor-pointer"
        />
      </Link>

      <div className="flex items-center gap-x-10 font-open-sans font-semibold">
        {links.map((link) => (
          <Link href={link.url} key={link.name}>
            {link.name}
          </Link>
        ))}

        <Button variant="primary">Build your box now</Button>

        <div className="flex gap-5">
          <button>
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
    </div>
  );
}
