"use client";

import Button from "@/components/common/Button";
import FoodPreferenceSelector from "@/components/subscription/FoodPreferenceSelector";
import ProgressBar from "@/components/subscription/ProgressBar";
import { subscriptionFormSchema } from "@/schemas/SubscriptionFormSchema";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const preferenceSchema = subscriptionFormSchema.pick({
  catsDetails: true,
  dogsDetails: true,
});

export type PreferenceSchema = z.infer<typeof preferenceSchema>;

export default function SubscriptionStepSixPage() {
  const dogs = useSubscriptionFormStore((state) => state.dogsDetails) || [];
  const cats = useSubscriptionFormStore((state) => state.catsDetails) || [];
  const router = useRouter();

  useForm<PreferenceSchema>({
    resolver: zodResolver(preferenceSchema),
  });

  // const onSubmit = () => {
  //   router.push("/subscribe/step-7");
  // };

  return (
    <div className="w-full pt-32 pb-20 bg-yellow-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={6} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center gap-2">
        <h3>What do your pets like to eat?</h3>
        <div className="text-gray-800 bodyLG">
          We will curate the selection based on what your cats like
        </div>
      </div>
      <form className="flex flex-col items-center gap-8 w-full max-w-3xl">
        <div className="flex flex-col gap-8 w-full max-w-3xl">
          {cats.map((cat, idx) => (
            <FoodPreferenceSelector
              key={cat.name}
              name={cat.name}
              petType="catsDetails"
              petIndex={idx}
            />
          ))}
          {dogs.map((dog, idx) => (
            <FoodPreferenceSelector
              key={dog.name}
              name={dog.name}
              petType="dogsDetails"
              petIndex={idx}
            />
          ))}
        </div>

        <div className="flex gap-5">
          <Button
            onClick={() => router.push("/subscribe/step-5")}
            variant="secondary"
          >
            Previous
          </Button>
          <Button onClick={() => router.push("/subscribe/step-7")}>Next</Button>
        </div>
      </form>
    </div>
  );
}
