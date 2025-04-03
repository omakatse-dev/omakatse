"use client";

import Link from "next/link";
import React from "react";

const HoverOverCat = () => {
  const dropdownData = {
    Treats: [
      { name: "Dry", url: "/shop/cat-products/" },
      { name: "Crunchy", url: "/shop/cat-products/" },
      { name: "Wet", url: "/shop/cat-products/" },
      { name: "Soft & Chewy", url: "/shop/cat-products/" },
      { name: "Freeze-dried", url: "/shop/cat-products/" },
    ],
    "Care Products": [
      { name: "Shampoo", url: "/shop/cat-products/" },
      { name: "Cat Nip", url: "/shop/cat-products/" },
      { name: "Cat Grass", url: "/shop/cat-products/" },
      { name: "Scratchboard", url: "/shop/cat-products/" },
    ],
    Accessories: [
      { name: "Apparel", url: "/shop/cat-products/" },
      { name: "Collar", url: "/shop/cat-products/" },
      { name: "Leads", url: "/shop/cat-products/" },
      { name: "Tableware", url: "/shop/cat-products/" },
    ]
  };

  return (
    <div className="bg-yellow-light shadow-lg px-16 py-8 rounded-[2rem] w-full">
      <div className="flex justify-between mr-40">
        {Object.entries(dropdownData).map(([header, links]) => (
          <div key={header}>
            <div className="bodyLG font-bold text-gray-800 mb-4">{header}</div>
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-gray-800"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoverOverCat;