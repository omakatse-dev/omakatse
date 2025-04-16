import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Suspense } from "react";
import PetListForContract from "@/components/account/subscriptions/PetListForContract";

export default function page() {

  return (
    <div className="mt-28 sm:mt-48 px-6 pb-10 sm:pb-20 w-screen max-w-6xl">
      <Link
        href="/renew-subscription"
        className="bodyButton flex items-center gap-2 cursor-pointer w-fit"
      >
        <ChevronLeftIcon className="w-6" />
        Go back
      </Link>
      <h3 className="font-bold mt-8 text-center">
        Update your subscription details
      </h3>
      <div className="bodyMD text-gray-800 mt-1 text-center">
        Let&apos;s double check on your pet details{" "}
      </div>
      <Suspense fallback={<div>Loading Subscription Details...</div>}>
      <PetListForContract />
      </Suspense>
    </div>
  );
}
