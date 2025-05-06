'use client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

interface HoverOverProfileProps {
  setIsProfileHovering: (isHovering: boolean) => void;
}

const HoverOverProfile = ({ setIsProfileHovering }: HoverOverProfileProps) => {
  const dropdownData = {
    'My Account': [
      { name: 'Profile', url: '/account/profile' },
      {
        name: 'Reviews',
        url: '/account/reviews'
      },
      {
        name: 'Past Boxes',
        url: '/account/past-boxes'
      },
      {
        name: 'Payment History',
        url: '/account/history'
      },
      {
        name: 'My Subscriptions',
        url: '/account/subscriptions'
      },
      {
        name: 'Pet Profile',
        url: '/account/pet-profiles'
      }
    ]
  };
  const { user } = useUser();

  return (
    <div className="pr-6 lg:pr-12">
      <div className="bg-yellow-light w-fit rounded-[2rem] p-8 shadow-lg">
        <div className="border-b-1 border-gray-400 pb-4">
          <div className="mr-30 flex">
            {Object.entries(dropdownData).map(([header, links]) => (
              <div key={header}>
                <Link
                  className="bodyLG font-bold text-gray-800"
                  href={`/account/profile`}
                  onClick={() => setIsProfileHovering(false)}
                >
                  {header}
                </Link>
                <ul className="mt-4 flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.url}
                        className="text-gray-800"
                        onClick={() => setIsProfileHovering(false)}
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
        <Link
          href={
            user
              ? '/api/auth/logout'
              : '/api/auth/login?returnTo=/account/profile'
          }
          className="flex pt-4 text-gray-800"
        >
          {user ? 'Logout' : 'Login'}
        </Link>
      </div>
    </div>
  );
};

export default HoverOverProfile;
