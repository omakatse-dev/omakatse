'use client';

import Card from '@/components/common/Card';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
// import { getAccessToken } from "@auth0/nextjs-auth0";

export default function AccountProfilePage() {
  const { user, isLoading } = useUser();

  // const getToken = async () => {
  //   const token = await getAccessToken();
  //   console.log("token", token);
  // };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col">
      <h2 className="text-primary hidden lg:flex">Profile</h2>
      <h3 className="font-bold sm:mt-10">Account Details</h3>
      {/* <a href="/api/auth/logout">Logout</a> */}
      <div className="bodyMD mt-6 text-gray-500">Email</div>
      <div className="bodyMD">{user?.email}</div>
      <Card
        variant="grey"
        className="mt-10 flex flex-col justify-between bg-white md:flex-row md:items-center"
      >
        <div className="flex flex-col">
          <h4>Need assistance for your account?</h4>
          <div className="bodyMD font-semibold">
            You can reach us to update your address or subscription matters
          </div>
        </div>
        <Link
          href="/contact"
          className="bodyButton mt-4 underline underline-offset-8 md:mt-0"
        >
          Contact Us
        </Link>
      </Card>
    </div>
  );
}
