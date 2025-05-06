'use client';

import React from 'react';
import Link from 'next/link';

interface HoverOverCatProps {
  setIsCatHovering: (isHovering: boolean) => void;
}

const HoverOverCat = ({ setIsCatHovering }: HoverOverCatProps) => {
  const dropdownData = {
    Treats: [
      {
        name: 'Dry',
        url: '/shop/cat-products?sort=New+Arrivals&filter=Dry&tab=Treats'
      },
      {
        name: 'Crunchy',
        url: '/shop/cat-products?sort=New+Arrivals&filter=Crunchy&tab=Treats'
      },
      {
        name: 'Wet',
        url: '/shop/cat-products/?sort=New+Arrivals&filter=Wet&tab=Treats'
      },
      {
        name: 'Soft & Chewy',
        url: '/shop/cat-products/?sort=New+Arrivals&filter=Soft+%26+Chewy&tab=Treats'
      },
      {
        name: 'Freeze-dried',
        url: '/shop/cat-products/?sort=New+Arrivals&filter=Freeze-dried&tab=Treats'
      }
    ],
    'Care Products': [
      {
        name: 'Shampoo',
        url: '/shop/cat-products/?sort=New+Arrivals&filter=Shampoo&tab=Care+Products'
      },
      {
        name: 'Cat Nip',
        url: '/shop/cat-products/?sort=New+Arrivals&filter=Cat+Nip&tab=Care+Products'
      },
      {
        name: 'Cat Grass',
        url: '/shop/cat-products/?sort=New+Arrivals&filter=Cat+Grass&tab=Care+Products'
      }
    ],
    Accessories: [
      {
        name: 'Apparel',
        url: '/shop/cat-products/?sort=New+Arrivals&filter=Apparel&tab=Accessories'
      },
      {
        name: 'Collar',
        url: '/shop/cat-products/?sort=New+Arrivals&filter=Collar&tab=Accessories'
      },
      {
        name: 'Leads',
        url: '/shop/cat-products/?sort=New+Arrivals&filter=Leads&tab=Accessories'
      },
      {
        name: 'Tableware',
        url: '/shop/cat-products/?sort=New+Arrivals&filter=Tableware&tab=Accessories'
      }
    ]
  };

  return (
    <div className="px-6 lg:px-12">
      <div className="bg-yellow-light w-full rounded-[2rem] px-16 py-8 shadow-lg">
        <div className="mr-40 flex gap-20">
          {Object.entries(dropdownData).map(([header, links]) => (
            <div key={header}>
              <Link
                className="bodyLG font-bold text-gray-800"
                href={`/shop/cat-products?sort=New+Arrivals&filter=All&tab=${header}`}
                onClick={() => setIsCatHovering(false)}
              >
                {header}
              </Link>
              <ul className="mt-4 flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.url}
                      className="text-gray-800"
                      onClick={() => setIsCatHovering(false)}
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
    </div>
  );
};

export default HoverOverCat;
