'use client';

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '../common/Button';
import MobileMenu from './NavbarComponents/MobileMenu';
import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  UserIcon,
  Bars3Icon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import SearchDropdown from './Search/SearchDropdown';
import Cart from './Cart/Cart';
import { useUIStore } from '@/stores/uiStore';
import { useCartStore } from '@/stores/cartStore';
import { getCartById } from '@/utils/APIs';
import HoverOverCat from './NavbarComponents/HoverOverCat';
import HoverOverDog from './NavbarComponents/HoverOverDog';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import HoverOverProfile from './NavbarComponents/HoverOverProfile';
import { useSubscriptionFormStore } from '@/stores/subscriptionFormStore';

export default function NavBar() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
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

  const [isOpen, setIsOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { isCartOpen, openCart, closeCart } = useUIStore();
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isCatHovering, setIsCatHovering] = useState(false);
  const [isDogHovering, setIsDogHovering] = useState(false);
  const [isProfileHovering, setIsProfileHovering] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const clearData = useSubscriptionFormStore((state) => state.clearData);

  const handleMouseOverCat = () => {
    if (isDogHovering) {
      setIsDogHovering(false);
      setIsProfileHovering(false);
    }
    setIsCatHovering(true);
  };

  const handleMouseOverDog = () => {
    if (isCatHovering) {
      setIsCatHovering(false);
      setIsProfileHovering(false);
    }
    setIsDogHovering(true);
  };

  useEffect(() => {
    const checkCartStatus = async () => {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        const res = await getCartById(cartId);
        if (!res.cart) {
          //successful checkout
          localStorage.removeItem('cartId');
          clearCart();
          clearData();
        }
      }
    };
    checkCartStatus();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCatHovering(false);
        setIsDogHovering(false);
        setIsProfileHovering(false);
      }
    }

    if (isCatHovering || isDogHovering || isProfileHovering) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCatHovering || isDogHovering || isProfileHovering]);

  return (
    <>
      <div className="fixed top-4 left-1/2 z-10 w-full -translate-x-1/2 px-2 xl:px-12">
        <div className="bg-yellow flex w-full justify-between rounded-full px-5 py-4 xl:px-8 xl:py-4">
          <div className="flex justify-center gap-3 xl:hidden">
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <Bars3Icon className="stroke-primary h-6 w-6 stroke-[2]" />
            </button>
            <button onClick={() => setShowSearchDropdown((prev) => !prev)}>
              <MagnifyingGlassIcon className="stroke-primary h-6 w-6 stroke-[2]" />
            </button>
          </div>

          <div className="hidden items-center gap-x-8 xl:flex">
            <div className="group relative">
              <button
                onClick={handleMouseOverCat}
                className={`b-2 flex cursor-pointer gap-1 border-b-0 pb-1 font-medium ${
                  pathname.startsWith('/shop/cat-products')
                    ? 'border-b-2 border-black'
                    : 'border-b-0'
                } ${isCatHovering ? 'border-b-2 border-black' : ''}`}
              >
                Cat
                <ChevronDownIcon className="stroke-primary h-6 w-6 stroke-[2]" />
              </button>
              {/* Dropdown for Cat */}
              {isCatHovering && (
                <div
                  className="fixed left-0 z-20 mt-14 w-full opacity-100 transition-opacity duration-200"
                  ref={dropdownRef}
                >
                  <HoverOverCat setIsCatHovering={setIsCatHovering} />
                </div>
              )}
            </div>
            <div className="group relative">
              <button
                onClick={handleMouseOverDog}
                className={`b-2 flex cursor-pointer gap-1 border-b-0 pb-1 font-medium ${
                  pathname.startsWith('/shop/dog-products')
                    ? 'border-b-2 border-black'
                    : 'border-b-0'
                } ${isDogHovering ? 'border-b-2 border-black' : ''}`}
              >
                Dog
                <ChevronDownIcon className="stroke-primary h-6 w-6 stroke-[2]" />
              </button>
              {/* Dropdown for Dog */}
              {isDogHovering && (
                <div
                  className="fixed left-2 z-20 mt-14 w-full opacity-100 transition-opacity duration-200"
                  ref={dropdownRef}
                >
                  <HoverOverDog setIsDogHovering={setIsDogHovering} />
                </div>
              )}
            </div>
            {links.map((link) => (
              <Link
                href={link.url}
                key={link.name}
                onMouseEnter={() => {
                  setIsHovering(link.name);
                }}
                onMouseLeave={() => setIsHovering(null)}
                className={`block pb-1 font-medium ${
                  pathname.startsWith(link.url) || isHovering === link.name
                    ? 'border-b-2 border-black'
                    : 'border-b-0'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link href="/">
            <Image
              src="/assets/omakatsehorizontalblack.svg"
              alt="Logo"
              width={192}
              height={52}
              className="h-11 w-auto cursor-pointer xl:h-[52px]"
            />
          </Link>

          <div className="hidden gap-8 xl:flex">
            <Button onClick={() => router.push('/subscribe/step-1')}>
              Build Your Box Now
            </Button>
            <div className="flex gap-5">
              <button
                className="cursor-pointer"
                onClick={() => setShowSearchDropdown((prev) => !prev)}
              >
                <MagnifyingGlassIcon className="stroke-primary h-6 w-6 stroke-[2]" />
              </button>
              <button
                onClick={() => setIsProfileHovering((prev) => !prev)}
                className="flex cursor-pointer items-center"
              >
                <UserIcon className="stroke-primary h-6 w-6 stroke-[2]" />
              </button>
              {/* Dropdown for Profile */}
              {isProfileHovering && (
                <div
                  className="fixed right-0 z-20 mt-24 w-fit opacity-100 transition-opacity duration-200"
                  ref={dropdownRef}
                >
                  <HoverOverProfile
                    setIsProfileHovering={setIsProfileHovering}
                  />
                </div>
              )}
              <button onClick={openCart} className="relative cursor-pointer">
                <Image
                  src="/assets/Cart.svg"
                  alt="Cart Icon"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
                {cartItems.length > 0 && (
                  <div className="absolute top-3 right-0 h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex xl:hidden">
            <button onClick={openCart} className="relative cursor-pointer">
              <Image
                src="/assets/Cart.svg"
                alt="Cart Icon"
                width={26}
                height={26}
                className="cursor-pointer"
              />{' '}
              {cartItems.length > 0 && (
                <div className="absolute top-2 -right-0 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <Cart isOpen={isCartOpen} handleClose={closeCart} />
      <SearchDropdown
        isOpen={showSearchDropdown}
        handleClose={() => setShowSearchDropdown(false)}
      />
    </>
  );
}
