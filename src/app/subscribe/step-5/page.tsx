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
import { useEffect } from "react";
const allergySchema = subscriptionFormSchema.pick({
  catsDetails: true,
  dogsDetails: true,
});

export type AllergySchema = z.infer<typeof allergySchema>;

export default function SubscriptionStepFivePage() {
  const router = useRouter();
  const cats = useSubscriptionFormStore((state) => state.catsDetails) || [];
  const dogs = useSubscriptionFormStore((state) => state.dogsDetails) || [];
  const petType = useSubscriptionFormStore((state) => state.petType);
  const storedDogCount = useSubscriptionFormStore((state) => state.dogCount);
  const storedCatCount = useSubscriptionFormStore((state) => state.catCount);
  const hydrated = useSubscriptionFormStore((state) => state.hydrated);

  useForm<AllergySchema>({
    resolver: zodResolver(allergySchema),
  });

  const submitHandler = () => {
    // Check if all pets have valid allergy selections
    const hasValidAllergies = [...cats, ...dogs].every((pet) => {
      // If allergies are not set at all, invalid
      if (!pet.allergies) return false;
      
      // If they said no to allergies, that's valid
      if (pet.allergies.true === false) return true;
      
      // If they said yes, must have at least one allergy selected
      return pet.allergies.true === true && pet.allergies.allergies.length > 0;
    });

    if (!hasValidAllergies) {
      return;
    }

    router.push("/subscribe/step-6");
  };

  useEffect(() => {
    if (!hydrated) return;
    if (!petType) {
      router.push("/subscribe/step-1");
    }
    if (
      (!storedDogCount && petType === "dog") ||
      (!storedCatCount && petType === "cat") ||
      (!storedDogCount && !storedCatCount && petType === "both")
    ) {
      router.push("/subscribe/step-2");
    }
  }, [router, storedDogCount, storedCatCount, petType, hydrated]);

  return (
    <div className="w-full px-8 pt-32 pb-20 bg-pink-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={5} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-bold">What are your pets&apos; allergies?</h3>
        <div className="text-gray-800 bodyMD">
          We&apos;ll leave out any products that don&apos;t sit well with your
          pet.
        </div>
      </div>
      <form className="flex flex-col gap-8 w-full max-w-3xl items-center">
        {cats.map((cat, idx) => (
          <AllergenSelector
            key={idx}
            idx={idx}
            name={cat.name}
            fieldName={`catsDetails.${idx}.allergies`}
          />
        ))}
        {dogs.map((dog, idx) => (
          <AllergenSelector
            key={idx}
            idx={idx}
            name={dog.name}
            catCount={cats.length}
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
          <Button onClick={submitHandler}>Next</Button>
        </div>
      </form>
    </div>
  );
}
