import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Suspense } from "react";
import PetListForContract from "@/components/account/subscriptions/PetListForContract";
import AddPetCard from "@/components/account/pet-profiles/AddPetCard";
import Button from "@/components/common/Button";

export default async function EditSubscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ contractId: string }>;
}) {
  const contractId = (await searchParams).contractId;
  return (
    <div className="mt-28 sm:mt-48 px-6 pb-10 sm:pb-20 w-screen max-w-6xl">
      <Link
        href={`/renew-subscription?contractId=${contractId}`}
        className="bodyButton flex items-center gap-2 cursor-pointer w-fit"
      >
        <ChevronLeftIcon className="w-6" />
        Go back
      </Link>
      <h3 className="font-bold mt-8 text-center">
        Update your subscription details
      </h3>
      <div className="bodyMD text-gray-800 mt-1 text-center">
        Let&apos;s double check on your pet details!{" "}
      </div>
      <div>
        <Suspense fallback={<div>Loading Subscription Details...</div>}>
          <PetListForContract />
        </Suspense>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        <AddPetCard />
        <Link
          href={`/renew-subscription/choose-plan?contractId=${contractId}`}
          className="self-center"
        >
          <Button>Choose plan</Button>
        </Link>
      </div>
    </div>
  );
}
