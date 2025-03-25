"use client";

import Button from "@/components/common/Button";
import AllergenSelector from "@/components/subscription/AllergySelector";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { useRouter } from "next/navigation";
import { subscriptionFormSchema } from "@/schemas/SubscriptionFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const allergySchema = subscriptionFormSchema.pick({
  catsDetails: true,
  dogsDetails: true,
});

export type AllergySchema = z.infer<typeof allergySchema>;

export default function SubscriptionStepFivePage() {
  const router = useRouter();
  const cats = useSubscriptionFormStore((state) => state.catsDetails) || [];
  const dogs = useSubscriptionFormStore((state) => state.dogsDetails) || [];

  useForm<AllergySchema>({
    resolver: zodResolver(allergySchema),
  });

  return (
    <div className="w-full pt-32 pb-20 bg-pink-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={5} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center gap-2">
        <h3>What are your pets&apos; allergies?</h3>
        <div className="text-gray-800 bodyLG">
          Products containing these allergens will be removed from the box
        </div>
      </div>
      <form className="flex flex-col gap-8 w-full max-w-3xl items-center">
        {cats.map((cat, idx) => (
          <AllergenSelector
            key={idx}
            name={cat.name}
            fieldName={`catsDetails.${idx}.allergies`}
          />
        ))}
        {dogs.map((dog, idx) => (
          <AllergenSelector
            key={idx}
            name={dog.name}
            fieldName={`dogsDetails.${idx}.allergies`}
          />
        ))}
        <div className="flex gap-5">
          <Button
            onClick={() => router.push("/subscribe/step-4")}
            variant="secondary"
            type="button"
          >
            Previous
          </Button>
          <Button onClick={() => router.push("/subscribe/step-6")}>Next</Button>
        </div>
      </form>
    </div>
  );
}
