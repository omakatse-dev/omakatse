"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function PageSelector() {
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

  const [selectedPage, setSelectedPage] = useState(pathname.split("/")[2]);
  return (
    <div className="hidden text-nowrap lg:flex flex-col gap-3 bodyMD sticky top-28 lg:top-36">
      {pages.map((page) => (
        <Link
          key={page.label}
          onClick={() => setSelectedPage(page.href)}
          href={`/account/${page.href}`}
          className={`${
            selectedPage === page.href
              ? "text-black font-bold underline underline-offset-4"
              : "text-gray-800"
          }`}
        >
          {page.label}
        </Link>
      ))}
    </div>
  );
}
