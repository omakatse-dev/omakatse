import Link from "next/link";
import React from "react";
import Image from "next/image";
import FacebookIcon from "../../icons/Facebook.svg";
import InstagramIcon from "../../icons/Instagram.svg";
import XIcon from "../../icons/X.svg";
import Button from "../common/Button";
import {} from "@heroicons/react/24/outline";

export default function Footer() {
  const icons = [
    {
      image: FacebookIcon,
      url: "https://facebook.com",
    },
    {
      image: InstagramIcon,
      url: "https://instagram.com",
    },
    {
      image: XIcon,
      url: "https://x.com",
    },
  ];

  const catLinks = [
    {
      name: "Treats",
      url: "/shop",
    },
    {
      name: "Care Products",
      url: "/shop",
    },
    {
      name: "Accessories",
      url: "/shop",
    },
  ];

  const dogLinks = [
    {
      name: "Treats",
      url: "/shop",
    },
    {
      name: "Care Products",
      url: "/shop",
    },
    {
      name: "Accessories",
      url: "/shop",
    },
  ];

  const omakatseLinks = [
    {
      name: "Build your box now",
      url: "/subscribe",
    },
    {
      name: "About Us",
      url: "/about",
    },
    {
      name: "Blog",
      url: "/blog",
    },
  ];

  const supportlinks = [
    {
      name: "Privacy Policy",
      url: "/about",
    },
    {
      name: "Terms of Service",
      url: "/termsandconditions",
    },
    {
      name: "FAQs",
      url: "/faqs",
    },
    {
      name: "Contact Us",
      url: "/contact",
    },
  ];

  return (
    <div className="bg-black w-screen px-8 py-10 lg:px-12 lg:py-20 flex flex-col gap-15">

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between items-center">
        <Link href="/" className="flex">
          <Image
            src="/assets/omakatsehorizontalwhitetm.svg"
            alt="Logo"
            width={329.31}
            height={100}
            className="cursor-pointer"
          />
        </Link>
        <div className="flex gap-6">
          {icons.map((icon) => (
            <Link href={icon.url} key={icon.url}>
              <Image
                src={icon.image}
                alt="Icon"
                width={48}
                height={48}
                className="cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="">
          <p className="bodyLG text-gray-500 mb-4"> Cat </p>
          <div className="bodySM text-white flex flex-col text-left">
            {catLinks.map((link) => (
              <Link href={link.url} key={link.name} className="py-2">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="">
          <p className="bodyLG text-gray-500 mb-4"> Dog </p>
          <div className="bodySM text-white flex flex-col text-left">
            {dogLinks.map((link) => (
              <Link href={link.url} key={link.name} className="py-2">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="">
          <p className="bodyLG text-gray-500 mb-4"> Omakatse </p>
          <div className="bodySM text-white flex flex-col text-left">
            {omakatseLinks.map((link) => (
              <Link href={link.url} key={link.name} className="py-2">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="">
          <p className="bodyLG text-gray-500 mb-4"> Support </p>
          <div className="bodySM text-white flex flex-col text-left">
            {supportlinks.map((link) => (
              <Link href={link.url} key={link.name} className="py-2">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-white lg:pl-32">
          <p className="bodyMD mb-4 font-semibold"> Subscribe </p>
          <p className="bodyMD mb-6">
            {" "}
            Join our newsletter to stay up to date on features and releases.
          </p>
          <div className="flex lg:flex-row flex-col gap-4 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border-b mr-4 py-4 focus:outline-none w-full"
            />
            <Button className="w-full" variant="primary">Subscribe</Button>
          </div>
          <p className="bodyXS">
            {" "}
            By subscribing you agree to with our Privacy Policy and provide
            consent to receive updates from our company.
          </p>
        </div>

      </div>

      <div className="border-t border-white flex flex-row lg:justify-center bodySM text-white gap-6 pt-8">
        <p>© 2025 Omaktse. All rights reserved.</p>
      </div>
    </div>
  );
}
