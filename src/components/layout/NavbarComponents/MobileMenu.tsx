'use client';

import Link from 'next/link';
import React, { Suspense } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import CatDropdown from './CatDropdown';
import DogDropdown from './DogDropdown';
import Button from '@/components/common/Button';
import { useUIStore } from '@/stores/uiStore';
import { useCartStore } from '@/stores/cartStore';
import AccountDropdown from './AccountDropdown';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const pathname = usePathname();
  const { openCart } = useUIStore();
  const cartItems = useCartStore((state) => state.items);

  const links = [
    {
      name: 'About Us',
      url: '/about'
    },
    {
      name: 'Blog',
      url: '/blog'
    },
    {
      name: 'Contact',
      url: '/contact'
    }
  ];

  return (
    <div
      className={`bg-yellow fixed inset-0 z-10 flex h-screen w-screen flex-col overflow-auto p-8 transition-all xl:hidden ${
        !isOpen ? '-translate-y-full' : '-translate-y-0'
      }`}
    >
      <div className="flex justify-between border-b-1 border-white pb-8">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <XMarkIcon className="stroke-primary h-6 w-6 stroke-[2]" />
        </button>
        <Link
          onClick={() => setIsOpen((prev) => !prev)}
          href="/"
          className="flex items-center gap-1"
        >
          <Image
            src="/assets/omakatsehorizontalblack.svg"
            alt="Logo"
            width={192}
            height={52}
            className="cursor-pointer"
          />
        </Link>
        <button onClick={openCart} className="relative cursor-pointer">
          <Image
            src="/assets/Cart.svg"
            alt="Cart Icon"
            width={26}
            height={26}
            className="cursor-pointer"
          />{' '}
          {cartItems.length > 0 && (
            <div className="absolute top-3 -right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      </div>

      <div className="font-open-sans flex flex-col gap-8 border-b-1 border-white pt-8 pb-8 text-2xl font-semibold">
        <Suspense>
          <CatDropdown setIsOpen={setIsOpen} />
          <DogDropdown setIsOpen={setIsOpen} />
        </Suspense>

        {links.map((link) => (
          <Link
            onClick={() => setIsOpen((prev) => !prev)}
            href={link.url}
            key={link.name}
            className={`block pb-1 ${
              pathname === link.url
                ? 'w-fit border-b-2 border-black'
                : 'border-b-0'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="font-open-sans flex flex-col pt-8 text-2xl font-semibold">
        <AccountDropdown setIsOpen={setIsOpen} />
      </div>
      <div className="mt-auto pt-8">
        <Button variant="primary" className="w-full">
          <Link
            href="/subscribe/step-1"
            passHref
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Build your box now
          </Link>
        </Button>
      </div>
    </div>
  );
}
