'use client';

import React from 'react';
import Link from 'next/link';

interface HoverOverDogProps {
  setIsDogHovering: (isHovering: boolean) => void;
}

const HoverOverDog = ({ setIsDogHovering }: HoverOverDogProps) => {
  const dropdownData = {
    Treats: [
      {
        name: 'Dry',
        url: '/shop/dog-products/?sort=New+Arrivals&filter=Dry&tab=Treats'
      },
      {
        name: 'Crunchy',
        url: '/shop/dog-products/?sort=New+Arrivals&filter=Bone&tab=Treats'
      },
      {
        name: 'Wet',
        url: '/shop/dog-products/?sort=New+Arrivals&filter=Wet&tab=Treats'
      },
      {
        name: 'Soft & Chewy',
        url: '/shop/dog-products/?sort=New+Arrivals&filter=Soft+%26+Chewy&tab=Treats'
      },
      {
        name: 'Freeze-dried',
        url: '/shop/dog-products/?sort=New+Arrivals&filter=Freeze+Dried&tab=Treats'
      }
    ],
    'Care Products': [
      {
        name: 'Shampoo',
        url: '/shop/dog-products/?tab=Care+Products&sort=New+Arrivals&filter=Shampoo'
      },
      {
        name: 'Flea Care',
        url: '/shop/dog-products/?tab=Care+Products&sort=New+Arrivals&filter=Flea+Care'
      }
    ],
    Accessories: [
      {
        name: 'Apparel',
        url: '/shop/dog-products/?tab=Accessories&sort=New+Arrivals&filter=Apparel'
      },
      {
        name: 'Collar',
        url: '/shop/dog-products/?tab=Accessories&sort=New+Arrivals&filter=Collars'
      },
      {
        name: 'Leads',
        url: '/shop/dog-products/?tab=Accessories&sort=New+Arrivals&filter=Leads'
      },
      {
        name: 'Tableware',
        url: '/shop/dog-products/?tab=Accessories&sort=New+Arrivals&filter=Tableware'
      }
    ]
  };

  return (
    <div className="px-6 lg:px-12">
      <div className="bg-yellow-light w-full rounded-[2rem] px-16 py-8 shadow-lg">
        <div className="mr-40 flex gap-20">
          {' '}
          {Object.entries(dropdownData).map(([header, links]) => (
            <div key={header}>
              <Link
                className="bodyLG font-bold text-gray-800"
                href={`/shop/dog-products?sort=New+Arrivals&filter=All&tab=${header}`}
                onClick={() => setIsDogHovering(false)}
              >
                {header}
              </Link>
              <ul className="mt-4 flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.url}
                      className="text-gray-800"
                      onClick={() => setIsDogHovering(false)}
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

export default HoverOverDog;
