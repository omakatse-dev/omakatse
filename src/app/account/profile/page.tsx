"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
// import { getAccessToken } from "@auth0/nextjs-auth0";

export default function AccountProfilePage() {
  const { user, isLoading } = useUser();

  // const getToken = async () => {
  //   const token = await getAccessToken();
  //   console.log("token", token);
  // };

  return (
    <div className="w-full flex flex-col">
      <h3 className="font-bold">Account Details</h3>
      {/* <a href="/api/auth/logout">Logout</a> */}
      <div className="bodyMD text-gray-500 mt-6">Email</div>
      {isLoading && <div>Loading...</div>}
      <div className="bodyMD">{user?.email}</div>
      <hr className="border border-gray-200 my-8" />
    </div>
  );
}
