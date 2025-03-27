"use client";

import PetDetailsCard from "@/components/subscription/PetDetailsCard";
import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { z } from "zod";
import AddPetCard from "@/components/account/pet-profiles/AddPetCard";
import { useState } from "react";
import EditPetProfileCard from "./EditPetProfileCard";
type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

export default function PetProfilePage() {
  const pets: PetDetailsSchema[] = [
    {
      name: "Buddy",
      type: "Dog",
      breed: "Labrador Retriever",
      gender: "Girl",
      birthdayYear: 2020,
      birthdayMonth: 1,
      size: "just right",
      allergies: { true: false, allergies: [] },
      preferences: { true: false, preferences: [] },
      treatFrequency: { frequency: "a few", preferences: [], comments: "" },
    },
    {
      name: "Test",
      type: "Cat",
      breed: "Asian",
      gender: "Girl",
      birthdayYear: 2020,
      birthdayMonth: 1,
      size: "just right",
      allergies: { true: false, allergies: [] },
      preferences: { true: false, preferences: [] },
      treatFrequency: { frequency: "a few", preferences: [], comments: "" },
    },
  ];

  const [editPetIndex, setEditPetIndex] = useState<number | undefined>();

  return (
    <>
      {editPetIndex === undefined ? (
        <div className="max-w-3xl flex flex-col gap-8">
          <h2 className="hidden sm:block">Pet Profiles</h2>
          <div className="bodyMD text-center sm:text-start sm:-mt-8">
            Here are your current pets that are subscribed to our box:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pets.map((pet, idx) => (
              <PetDetailsCard
                key={pet.name}
                details={pet}
                idx={idx}
                editMode={true}
                setEditPetIndex={setEditPetIndex}
              />
            ))}
          </div>
          <AddPetCard />
        </div>
      ) : (
        <EditPetProfileCard existingDetails={pets[editPetIndex]} />
      )}
    </>
  );
}
