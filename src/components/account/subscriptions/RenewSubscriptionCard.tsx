"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Pets from "./Pets";
import { SubscriptionContract } from "@/types/Types";
import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";

export type PetType = z.infer<typeof petDetailsSchema>;

export default function RenewSubscriptionCard({
  subscription,
}: {
  subscription: SubscriptionContract;
}) {
  const pets = JSON.parse(subscription.pets);

  const dogs = pets.filter((pet: PetType) => pet.type === "Dog");
  const cats = pets.filter((pet: PetType) => pet.type === "Cat");
  const contractId = subscription.contractId;

  const router = useRouter();
  return (
    <Card className="bg-white flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4 md:justify-center">
        <Pets dogs={dogs} cats={cats} />
      </div>
      <div className="flex flex-col items-center gap-2"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:border-r border-gray-200">
          <label className="bodySM text-gray-500">Box size</label>
          <div className="bodyMD font-semibold mt-1">{subscription.size}</div>
        </div>
        <div className="md:border-r border-gray-200">
          <label className="bodySM text-gray-500">No. of Pets</label>
          <div className="bodyMD font-semibold mt-1">
            {dogs.length > 0 && `${dogs.length} dog(s)`}{" "}
            {cats.length > 0 && `${cats.length} cat(s)`}
          </div>
        </div>
        <div className="">
          <label className="bodySM text-gray-500">Ship to</label>
          <div className="bodyMD font-semibold mt-1">{subscription.name}</div>
        </div>
        <div className="md:border-r border-gray-200">
          <label className="bodySM text-gray-500">Shipping address</label>
          <div className="bodyMD font-semibold mt-1">
            {subscription.address}
          </div>
        </div>
        <div className="md:border-r border-gray-200">
          <label className="bodySM text-gray-500">Box plan</label>
          <div className="bodyMD font-semibold mt-1">
            {subscription.planDuration} months
          </div>
        </div>
        <div className="">
          <label className="bodySM text-gray-500">Monthly payment</label>
          <div className="bodyMD font-semibold mt-1">AED 25</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row w-full md:gap-6">
        <Button
          onClick={() =>
            router.push(`/renew-subscription/edit-subscription?contractId=${contractId}`)
          }
          className="w-full md:w-full self-center"
        >
          Edit subscription
        </Button>
        <Button
          onClick={() => router.push(``)}
          className="w-full md:w-full self-center"
        >
          Add to cart
        </Button>
      </div>
    </Card>
  );
}
