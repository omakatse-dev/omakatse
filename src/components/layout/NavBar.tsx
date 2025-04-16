"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import Button from "../common/Button";
import MobileMenu from "./NavbarComponents/MobileMenu";
import { useState } from "react";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import SearchDropdown from "./Search/SearchDropdown";
import Cart from "./Cart/Cart";
import { useUIStore } from "@/stores/uiStore";
import { useCartStore } from "@/stores/cartStore";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getCartById } from "@/utils/APIs";
import HoverOverCat from "./NavbarComponents/HoverOverCat";
import HoverOverDog from "./NavbarComponents/HoverOverDog";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const links = [
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

  const [isOpen, setIsOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { isCartOpen, openCart, closeCart } = useUIStore();
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isCatHovering, setIsCatHovering] = useState(false);
  const [isDogHovering, setIsDogHovering] = useState(false);

  const handleMouseOverCat = () => {
    if (isDogHovering) {
      setIsDogHovering(false);
    }
    setIsCatHovering(true);
  };

  const handleMouseOverDog = () => {
    if (isCatHovering) {
      setIsCatHovering(false);
    }
    setIsDogHovering(true);
  };

  const handleMouseLeave = () => {
    setIsCatHovering(false);
    setIsDogHovering(false);
  };

  useEffect(() => {
    const checkCartStatus = async () => {
      const cartId = localStorage.getItem("cartId");
      if (cartId) {
        const res = await getCartById(cartId);
        if (!res.cart) {
          //successful checkout
          localStorage.removeItem("cartId");
          clearCart();
        }
      }
    };
    checkCartStatus();
  }, []);

  return (
    <>
      <div className="flex fixed justify-between bg-yellow py-4 px-5 xl:py-4 xl:px-8 rounded-full top-4 w-11/12 left-1/2 -translate-x-1/2 z-10">
        <div className="xl:hidden flex justify-center gap-3">
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <Bars3Icon className="h-6 w-6 stroke-primary stroke-[2]" />
          </button>
          <button onClick={() => setShowSearchDropdown((prev) => !prev)}>
            <MagnifyingGlassIcon className="h-6 w-6 stroke-primary stroke-[2]" />
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-x-8">
          <div className="relative group">
            <Link
              href="/shop/cat-products"
              onMouseEnter={handleMouseOverCat}
              className={`flex gap-1 b-2 border-b-0 font-semibold ${
                pathname.startsWith("/shop/cat-products")
                  ? "border-b-2 border-black"
                  : "border-b-0"
              }`}
            >
              Cat
              <ChevronDownIcon className="h-6 w-6 stroke-primary stroke-[2]" />
            </Link>
            {/* Dropdown for Cat */}
            {isCatHovering && (
              <div
                className="fixed mt-14 left-2 w-full opacity-100 transition-opacity duration-200 z-20"
                onMouseLeave={handleMouseLeave}
              >
                <HoverOverCat />
              </div>
            )}
          </div>
          <div className="relative group">
            <Link
              href="/shop/dog-products"
              onMouseEnter={handleMouseOverDog}
              className={`flex gap-1 b-2 border-b-0 font-semibold ${
                pathname.startsWith("/shop/dog-products")
                  ? "border-b-2 border-black"
                  : "border-b-0"
              }`}
            >
              Dog
              <ChevronDownIcon className="h-6 w-6 stroke-primary stroke-[2]" />
            </Link>
            {/* Dropdown for Dog */}
            {isDogHovering && (
              <div
                className="fixed mt-14 left-2 w-full opacity-100 transition-opacity duration-200 z-20"
                onMouseLeave={handleMouseLeave}
              >
                <HoverOverDog />
              </div>
            )}
          </div>
          {links.map((link) => (
            <Link
              href={link.url}
              key={link.name}
              onMouseEnter={handleMouseLeave}
              className={`block pb-1 font-semibold ${
                pathname === link.url ? "border-b-2 border-black" : "border-b-0"
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
            className="h-11 xl:h-[52px] w-auto cursor-pointer"
          />
        </Link>

        <div className="hidden xl:flex gap-8">
          <Button onClick={() => router.push("/subscribe/step-1")}>
            Build your box now
          </Button>
          <div className="flex gap-5">
            <button
              className="cursor-pointer"
              onClick={() => setShowSearchDropdown((prev) => !prev)}
            >
              <MagnifyingGlassIcon className="h-6 w-6 stroke-primary stroke-[2]" />
            </button>
            <a
              href={
                user
                  ? "/account/profile"
                  : "/api/auth/login?returnTo=/account/profile"
              }
              className="flex items-center"
            >
              <UserIcon className="h-6 w-6 stroke-primary stroke-[2]" />
            </a>
            <button onClick={openCart} className="cursor-pointer relative">
              <ShoppingCartIcon className="h-6 w-6 stroke-primary stroke-[2]" />
              {cartItems.length > 0 && (
                <div className="absolute top-4 right-0 bg-red-500 rounded-full w-3 h-3" />
              )}
            </button>
          </div>
        </div>

        <div className="xl:hidden flex">
          <button onClick={openCart} className="cursor-pointer relative">
            <ShoppingCartIcon className="h-6 w-6 stroke-primary stroke-[2]" />
            {cartItems.length > 0 && (
              <div className="absolute top-2 -right-1 bg-red-500 rounded-full w-3 h-3" />
            )}
          </button>
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
