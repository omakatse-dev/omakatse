"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
// import { getAccessToken } from "@auth0/nextjs-auth0";
import ShippingAddress from "@/components/account/profile/ShippingAddress";
import { getCustomerShippingDetails } from "@/utils/APIs";
import { useState, useEffect } from "react";

export default function AccountProfilePage() {
  const { user, isLoading } = useUser();
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchDetails = async () => {
      const res = await getCustomerShippingDetails(user.email as string);
      setCustomerDetails(res);
    };

    fetchDetails();
  }, [user?.email]);
  console.log(customerDetails);

  // const getToken = async () => {
  //   const token = await getAccessToken();
  //   console.log("token", token);
  // };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col">
      <h2 className="hidden sm:flex">Profile</h2>
      <h3 className="font-bold sm:mt-10">Account Details</h3>
      {/* <a href="/api/auth/logout">Logout</a> */}
      <div className="bodyMD text-gray-500 mt-6">Email</div>
      <div className="bodyMD">{user?.email}</div>
      <hr className="border border-gray-200 my-8" />
      <ShippingAddress />
    </div>
  );
}
