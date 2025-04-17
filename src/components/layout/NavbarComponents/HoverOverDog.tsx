"use client";

import React from "react";

const HoverOverDog = () => {
  const dropdownData = {
    Treats: [
      { name: "Dry", url: "/shop/dog-products/?sort=New+Arrivals&filter=Dry&tab=Treats" },
      { name: "Crunchy", url: "/shop/dog-products/?sort=New+Arrivals&filter=Bone&tab=Treats" },
      { name: "Wet", url: "/shop/dog-products/?sort=New+Arrivals&filter=Wet&tab=Treats" },
      { name: "Soft & Chewy", url: "/shop/dog-products/?sort=New+Arrivals&filter=Soft+%26+Chewy&tab=Treats" },
      { name: "Freeze-dried", url: "/shop/dog-products/?sort=New+Arrivals&filter=Freeze+Dried&tab=Treats" },
    ],
    "Care Products": [
      { name: "Shampoo", url: "/shop/dog-products/?tab=Care+Products&sort=New+Arrivals&filter=Shampoo" },
      { name: "Flea Care", url: "/shop/dog-products/?tab=Care+Products&sort=New+Arrivals&filter=Flea+Care" },
    ],
    Accessories: [
      { name: "Apparel", url: "/shop/dog-products/?tab=Accessories&sort=New+Arrivals&filter=Apparel" },
      { name: "Collar", url: "/shop/dog-products/?tab=Accessories&sort=New+Arrivals&filter=Collars" },
      { name: "Leads", url: "/shop/dog-products/?tab=Accessories&sort=New+Arrivals&filter=Leads" },
      { name: "Tableware", url: "/shop/dog-products/?tab=Accessories&sort=New+Arrivals&filter=Tableware" },
    ],
  };

  return (
    <div className="bg-yellow-light shadow-lg px-16 py-8 rounded-[2rem] w-full">
      <div className="flex justify-between mr-40">
        {" "}
        {Object.entries(dropdownData).map(([header, links]) => (
          <div key={header}>
            <a className="bodyLG font-bold text-gray-800" href={`/shop/dog-products?sort=New+Arrivals&filter=All&tab=${header}`}>{header}</a>
            <ul className="flex flex-col gap-4 mt-4">
              {links.map((link) => (
                <li key={link.name}>
                  <a href={link.url} className="text-gray-800">
                    {link.name}
                  </a>
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
