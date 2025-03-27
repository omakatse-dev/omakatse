"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function PageSelector() {
  const pathname = usePathname();
  const pages = ["profile", "reviews", "history"];
  const [selectedPage, setSelectedPage] = useState(pathname.split("/")[2]);
  return (
    <div className="hidden sm:flex flex-col gap-3 bodyMD sticky top-28 sm:top-36">
      {pages.map((page) => (
        <Link
          key={page}
          onClick={() => setSelectedPage(page)}
          href={`/account/${page}`}
          className={`${
            selectedPage === page
              ? "text-primary font-bold underline underline-offset-4"
              : "text-gray-800"
          }`}
        >
          {page.charAt(0).toUpperCase() + page.slice(1)}
        </Link>
      ))}
    </div>
  );
}
