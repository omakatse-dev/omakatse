import Link from "next/link";
import React from "react";
import Image from "next/image";
import FacebookIcon from "../../icons/Facebook.svg"
import InstagramIcon from "../../icons/Instagram.svg"
import XIcon from "../../icons/X.svg"
import Button from "../common/Button"
import {

} from "@heroicons/react/24/outline";

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

    const shoplinks = [
        {
            name: "Build your box now",
            url: "/subscribe",
        },
        {
            name: "All Products",
            url: "/shop",
        },
        {
            name: "New Arrivals",
            url: "/shop",
        },
        {
            name: "Sale",
            url: "/shop",
        },
        ];

    const supportlinks = [
        {
            name: "About Us",
            url: "/about",
        },
        {
            name: "Blog",
            url: "/blog",
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
    
    <div className="bg-black w-screen px-12 py-20 flex flex-col gap-12">   

        <div className="flex justify-between align-middle">
            <Link href="/">
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


        <div className="flex flex-row">
            <div className="w-1/3">
                <p className="bodyLG text-gray-500 mb-4"> Shop </p>
                <div className="bodySM text-white flex flex-col text-left">
                {shoplinks.map((link) => (
                    <Link href={link.url} key={link.name} className="py-2">
                        {link.name}
                    </Link>
                ))}
                </div>
            </div>
            <div className="w-1/3">
                <p className="bodyLG text-gray-500 mb-4"> Support </p>
                <div className="bodySM text-white flex flex-col text-left">
                {supportlinks.map((link) => (
                    <Link href={link.url} key={link.name} className="py-2">
                        {link.name}
                    </Link>
                ))}
                </div>
            </div>
            <div className="text-white w-1/3">
                <p className="bodyMD mb-4 font-semibold"> Subscribe </p>
                <p className="bodyMD mb-6"> Join our newsletter to stay up to date on features and releases.</p>
                <div className="flex flex-row mb-4">
                    <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="border-b mr-4 focus:outline-none w-full"
                    />
                    <Button variant="primary" buttonContent="Subscribe"></Button>
                </div>
                <p className="bodyXS"> By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.</p>
            </div>
        </div>

        <div className="border-t border-white flex flex-row justify-center bodySM text-white gap-6 pt-8">
            <p>© 2025 Omaktse. All rights reserved.</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Cookies Settings</p>
        </div>
    </div>
  );
}


