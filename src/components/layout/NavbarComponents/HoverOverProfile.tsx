"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const HoverOverProfile = () => {
  const dropdownData = {
    "My Account": [
      { name: "Profile", url: "/account/profile" },
      {
        name: "My Subscription",
        url: "/account/subscriptions",
      },
      {
        name: "Past Boxes",
        url: "/account/past-boxes",
      },
      {
        name: "Payment History",
        url: "/account/history",
      },
      {
        name: "Reviews",
        url: "/account/reviews",
      },
      {
        name: "Pet Profile",
        url: "/account/pet-profiles",
      },
    ],
  };
  const { user } = useUser();

  return (
    <div className="pr-6 lg:pr-12">
      <div className="bg-yellow-light shadow-lg p-8 rounded-[2rem] w-fit">
        <div className="border-b-1 border-gray-400 pb-4">
          <div className="flex mr-30">
            {Object.entries(dropdownData).map(([header, links]) => (
              <div key={header}>
                <a className="bodyLG font-bold text-gray-800" href={`/account/profile`}>
                  {header}
                </a>
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
        <a
          href={
            user
              ? "/api/auth/logout"
              : "/api/auth/login?returnTo=/account/profile"
          }
          className="flex pt-4 text-gray-800"
        >
          {user ? "Logout" : "Login"}
        </a>
      </div>
    </div>
  );
};

export default HoverOverProfile;
