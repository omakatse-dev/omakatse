"use client";

import Link from "next/link";
import React from "react";

const HoverOverDog = () => {
  const dropdownData = {
    Treats: [
      { name: "Dry", url: "/shop/dog-products/" },
      { name: "Crunchy", url: "/shop/dog-products/" },
      { name: "Wet", url: "/shop/dog-products/" },
      { name: "Soft & Chewy", url: "/shop/dog-products/" },
      { name: "Freeze-dried", url: "/shop/dog-products/" },
    ],
    "Care Products": [
      { name: "Shampoo", url: "/shop/dog-products/" },
      { name: "Scratchboard", url: "/shop/dog-products/" },
    ],
    Accessories: [
      { name: "Apparel", url: "/shop/dog-products/" },
      { name: "Collar", url: "/shop/dog-products/" },
      { name: "Leads", url: "/shop/dog-products/" },
      { name: "Tableware", url: "/shop/dog-products/" },
    ],
  };

  return (
    <div className="bg-yellow-light shadow-lg px-16 py-8 rounded-[2rem] w-full">
      <div className="flex justify-between mr-40">
        {" "}
        {Object.entries(dropdownData).map(([header, links]) => (
          <div key={header}>
            <div className="bodyLG font-bold text-gray-800 mb-4">{header}</div>
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.url} className="text-gray-800">
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

export default HoverOverDog;
