'use client';

import PetDetailsCard from '@/components/subscription/PetDetailsCard';
import { petDetailsSchema } from '@/schemas/SubscriptionFormSchema';
import { z } from 'zod';
import AddPetCard from '@/components/account/pet-profiles/AddPetCard';
import { Suspense } from 'react';
import { ContractType } from '@/types/Types';
import Button from '@/components/common/Button';
import Link from 'next/link';
type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

export default function PetProfilePage({
  contracts
}: {
  contracts: ContractType[];
}) {
  // const pets: PetDetailsSchema[] = [
  //   {
  //     name: "Buddy",
  //     type: "Dog",
  //     breed: "Labrador Retriever",
  //     gender: "Girl",
  //     birthdayYear: 2020,
  //     birthdayMonth: 1,
  //     size: "just right",
  //     allergies: { true: false, allergies: [] },
  //     preferences: { true: false, preferences: [] },
  //     treatFrequency: { frequency: "often", preferences: [], comments: "" },
  //   },
  //   {
  //     name: "Test",
  //     type: "Cat",
  //     breed: "Asian",
  //     gender: "Girl",
  //     birthdayYear: 2020,
  //     birthdayMonth: 1,
  //     size: "just right",
  //     allergies: { true: false, allergies: [] },
  //     preferences: { true: false, preferences: [] },
  //     treatFrequency: { frequency: "a few", preferences: [], comments: "" },
  //   },
  // ];

  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="text-primary hidden lg:block">Pet Profiles</h2>
      {contracts.length > 0 ? (
        <div className="flex max-w-3xl flex-col gap-8">
          <div className="bodyMD text-center sm:-mt-8 sm:text-start">
            Here are your current pets that are subscribed to our box:
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            {contracts.map((contract: ContractType, idx: number) => {
              const pets = JSON.parse(contract.pets);
              return (
                <div key={contract.contractId} className="flex flex-col gap-4">
                  <h4>Subscription {idx + 1} </h4>
                  <div className="grid grid-cols-1 justify-center gap-8 sm:grid-cols-2">
                    {pets.map((pet: PetDetailsSchema, idx: number) => (
                      <PetDetailsCard
                        contractId={contract.contractId}
                        key={pet.name}
                        details={pet}
                        idx={idx}
                        editMode={'edit-only'}
                        petType={
                          pet.type === 'Cat' ? 'catsDetails' : 'dogsDetails'
                        }
                        catCount={
                          pets.filter((p: PetDetailsSchema) => p.type === 'Cat')
                            .length
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </Suspense>
          <AddPetCard />
        </div>
      ) : (
        <>
          <div className="bodyMD text-gray-800">
            No pet profiles yet. Start building your very first box to customize
            pet profiles for your furry family members!
          </div>
          <Link href="/subscribe/step-1">
            <Button className="w-full sm:w-fit">Build your box now</Button>
          </Link>
        </>
      )}
    </div>
  );
}
