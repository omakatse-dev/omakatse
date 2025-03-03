import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function NavBar() {
  const links = [
    {
      name: "Subscription",
      url: "/subscribe",
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
    <div className="flex justify-between bg-yellow py-3 px-6 rounded-full fixed top-4 w-11/12 left-1/2 -translate-x-1/2">

      <Image src="/assets/omakatsehorizontalblack.svg" alt="Logo" width={120} height={120} />

      <div className="flex items-center gap-x-8 text-xs font-open-sans font-semibold">
        {links.map((link) => (
          <Link href={link.url} key={link.name}>
            {link.name}
          </Link>
        ))}

        <button className="bg-white rounded-full h-8 font-open-sans font-semibold text-[10px] flex items-center justify-center px-8 outline-1 outline-black">
          Build your box now
        </button>

        <div className="flex gap-4">
          <button>
            <MagnifyingGlassIcon className="h-4 w-4 stroke-black stroke-[2]" />
          </button>
          <button>
            <UserIcon className="h-4 w-4 stroke-black stroke-[2]" />
          </button>
          <button>
            <ShoppingCartIcon className="h-4 w-4 stroke-black stroke-[2]" />
          </button>
        </div>

      </div>
    </div>
  );
}
