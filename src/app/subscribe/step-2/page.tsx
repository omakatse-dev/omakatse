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

const petCountSchema = subscriptionFormSchema.pick({
  dogCount: true,
  catCount: true,
});

export type PetCountSchema = z.infer<typeof petCountSchema>;

export default function SubscriptionStepTwoPage() {
  const router = useRouter();
  const petType = useSubscriptionFormStore((state) => state.petType);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PetCountSchema>({
    resolver: zodResolver(petCountSchema),
  });

  const onSubmit = () => {
    router.push("/subscribe/step-3");
  };

  return (
    <div className="w-full pt-32 pb-20 bg-blue-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={2} totalSteps={9} />
      <form
        className="flex flex-col items-center gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(petType === "cat" || petType === "both") && (
          <PetCountSelector
            control={control}
            petType="cat"
            both={petType === "both"}
          />
        )}

        {petType === "both" && (
          <hr className="w-full max-w-5xl border-secondary" />
        )}

        {(petType === "dog" || petType === "both") && (
          <PetCountSelector
            control={control}
            petType="dog"
            both={petType === "both"}
          />
        )}

        <TipCard />
        <div className="flex gap-5">
          <Button
            onClick={() => router.push("/subscribe/step-1")}
            variant="secondary"
          >
            Previous
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
      {(errors.catCount || errors.dogCount) && (
        <div className="text-red">Please select number of pets</div>
      )}
    </div>
  );
}
