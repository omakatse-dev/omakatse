import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import FacebookIcon from '../../icons/Facebook.svg';
import InstagramIcon from '../../icons/Instagram.svg';
import EmailSubscriptionForm from '../common/EmailSubscriptionForm';
import tiktok_icon from '../../icons/tiktok_icon.svg';

export default function Footer() {
  const icons = [
    {
      image: FacebookIcon,
      url: 'https://facebook.com'
    },
    {
      image: InstagramIcon,
      url: 'https://instagram.com'
    },
    {
      image: tiktok_icon,
      url: 'https://tiktok.com'
    }
  ];

  const catLinks = [
    {
      name: 'Treats',
      url: '/shop/cat-products?sort=New+Arrivals&filter=All&tab=Treats'
    },
    {
      name: 'Care Products',
      url: '/shop/cat-products?sort=New+Arrivals&filter=All&tab=Care+Products'
    },
    {
      name: 'Accessories',
      url: '/shop/cat-products?sort=New+Arrivals&filter=All&tab=Accessories'
    }
  ];

  const dogLinks = [
    {
      name: 'Treats',
      url: '/shop/dog-products?sort=New+Arrivals&tab=Treats'
    },
    {
      name: 'Care Products',
      url: '/shop/dog-products?sort=New+Arrivals&tab=Care+Products'
    },
    {
      name: 'Accessories',
      url: '/shop/dog-products?sort=New+Arrivals&tab=Accessories'
    }
  ];

  const omakatseLinks = [
    {
      name: 'Build Your Box Now',
      url: '/subscribe/step-1'
    },
    {
      name: 'About Us',
      url: '/about'
    },
    {
      name: 'Blog',
      url: '/blog'
    }
  ];

  const supportlinks = [
    {
      name: 'Privacy Policy',
      url: '/privacy-policy'
    },
    {
      name: 'Terms and Conditions',
      url: '/terms-and-conditions'
    },
    {
      name: 'FAQs',
      url: '/faqs'
    },
    {
      name: 'Contact Us',
      url: '/contact'
    }
  ];

  return (
    <div className="bg-primary flex w-screen flex-col gap-15 px-6 py-10 lg:px-12 lg:py-16">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
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

      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          <div className="">
            <p className="bodyLG mb-4 text-gray-500"> Cat </p>
            <div className="bodySM flex flex-col text-left text-white">
              {catLinks.map((link) => (
                <Link
                  href={link.url}
                  key={link.name}
                  className="py-2 text-sm lg:text-base"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <p className="bodyLG mb-4 text-gray-500"> Dog </p>
            <div className="bodySM flex flex-col text-left text-white">
              {dogLinks.map((link) => (
                <Link
                  href={link.url}
                  key={link.name}
                  className="py-2 text-sm lg:text-base"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <p className="bodyLG mb-4 text-gray-500"> Omakatse </p>
            <div className="bodySM flex flex-col text-left text-white">
              {omakatseLinks.map((link) => (
                <Link
                  href={link.url}
                  key={link.name}
                  className="py-2 text-sm lg:text-base"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <p className="bodyLG mb-4 text-gray-500"> Support </p>
            <div className="bodySM flex flex-col text-left text-white">
              {supportlinks.map((link) => (
                <Link
                  href={link.url}
                  key={link.name}
                  className="py-2 text-sm lg:text-base"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-white lg:pl-32">
          <p className="bodyMD mb-4 font-semibold"> Subscribe </p>
          <p className="bodyMD mb-6 text-sm lg:text-base">
            {' '}
            Stay in the loop with our newsletter and pet-approved goodies.
          </p>

          <EmailSubscriptionForm />
        </div>
      </div>
      <div className="bodySM flex flex-row gap-6 border-t border-gray-400 pt-8 text-white lg:justify-center">
        <p>© 2025 Omakatse. All rights reserved.</p>
      </div>
    </div>
  );
}
