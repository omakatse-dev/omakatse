"use client";

import Button from "@/components/common/Button";
import PetCountSelector from "@/components/subscription/PetCountSelector";
import ProgressBar from "@/components/subscription/ProgressBar";
import TipCard from "@/components/subscription/TipCard";

import { useRouter } from "next/navigation";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { subscriptionFormSchema } from "@/schemas/SubscriptionFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

const petCountSchema = subscriptionFormSchema.pick({
  dogCount: true,
  catCount: true,
});

export type PetCountSchema = z.infer<typeof petCountSchema>;

export default function SubscriptionStepTwoPage() {
  const router = useRouter();
  const petType = useSubscriptionFormStore((state) => state.petType);
  const hydrated = useSubscriptionFormStore((state) => state.hydrated);

  useEffect(() => {
    if (!hydrated) return;
    if (!petType) {
      router.push("/subscribe/step-1");
    }
  }, [petType, router, hydrated]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PetCountSchema>({
    resolver: zodResolver(petCountSchema),
    defaultValues: {
      catCount: useSubscriptionFormStore.getState().catCount,
      dogCount: useSubscriptionFormStore.getState().dogCount,
    },
  });

  const setData = useSubscriptionFormStore((state) => state.setData);

  const onSubmit = (data: PetCountSchema) => {
    // reduce cat details array if cat count is longer than array
    const catCount = useSubscriptionFormStore.getState().catCount;
    const catDetails = useSubscriptionFormStore.getState().catsDetails;
    if (catCount && catDetails) {
      if (catCount < catDetails.length) {
        setData({
          catsDetails: catDetails.slice(0, catCount),
        });
      }
    }

    const dogCount = useSubscriptionFormStore.getState().dogCount;
    const dogDetails = useSubscriptionFormStore.getState().dogsDetails;
    if (dogCount && dogDetails) {
      if (dogCount < dogDetails.length) {
        setData({
          dogsDetails: dogDetails.slice(0, dogCount),
        });
      }
    }

    setData(data);
    router.push("/subscribe/step-3");
  };

  return (
    <div className="w-full pt-32 px-8 pb-20 bg-blue-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={2} totalSteps={9} className="max-w-sm" />
      <form
        className="flex flex-col items-center gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(petType === "cat" || petType === "both") && (
          <PetCountSelector
            control={control}
            petType="Cat"
            both={petType === "both"}
          />
        )}

        {petType === "both" && (
          <hr className="w-full max-w-5xl border-secondary" />
        )}

        {(petType === "dog" || petType === "both") && (
          <PetCountSelector
            control={control}
            petType="Dog"
            both={petType === "both"}
          />
        )}

        <TipCard />
        <div className="flex flex-col sm:flex-row-reverse justify-center gap-2 sm:gap-5 w-full">
          <Button type="submit">Next</Button>
          <Button
            onClick={() => router.push("/subscribe/step-1")}
            variant="secondary"
            bgColor="bg-blue-pastel"
          >
            Previous
          </Button>
        </div>
      </form>
      {(errors.catCount || errors.dogCount) && (
        <div className="text-red">Please select number of pets</div>
      )}
    </div>
  );
}
