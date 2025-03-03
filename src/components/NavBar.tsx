import Link from "next/link";
import React from "react";

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
    <div className="flex justify-between bg-yellow py-4 px-8 rounded-full fixed top-4 w-11/12 left-1/2 -translate-x-1/2">
      <div>Logo</div>
      <div className="flex items-center gap-x-8">
        {links.map((link) => (
          <Link href={link.url} key={link.name}>
            {link.name}
          </Link>
        ))}
        <button>Build your box now</button>
        <button>Search</button>
        <button>Profile</button>
        <button>Cart</button>
      </div>
    </div>
  );
}
