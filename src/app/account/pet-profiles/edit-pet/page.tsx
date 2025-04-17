"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import EditPetProfileCard from "@/components/account/pet-profiles/EditPetProfileCard";

import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { z } from "zod";
import { useEffect, useState } from "react";
import { getPetsByContractId } from "@/utils/SubscriptionAPIs";
type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

export default function EditPetPage() {
  const router = useRouter();
  //todo fetch pet details according to petIndex and contractId

  const searchParams = useSearchParams();
  const petIndex = searchParams.get("petIndex") || 0;
  const contractId = searchParams.get("contractId") || "";
  const [existingDetails, setExistingDetails] =
    useState<PetDetailsSchema | null>(null);
  useEffect(() => {
    const fetchPetDetails = async () => {
      const petDetails = await getPetsByContractId(contractId);
      console.log("here??");
      setExistingDetails(JSON.parse(petDetails[0].pets)[petIndex]);
    };
    fetchPetDetails();
  }, []);
  return (
    <div className="pb-10 sm:pb-20 max-w-6xl flex flex-col gap-8">
      <button onClick={() => router.back()} className="flex bodyButton gap-2">
        <ChevronLeftIcon className="w-6 stroke-2" />
        Go back
      </button>
      <h3 className="font-bold text-center sm:text-start">Edit pet</h3>
      {existingDetails && (
        <EditPetProfileCard existingDetails={existingDetails} />
      )}
    </div>
  );
}
