"use client";

import Button from "@/components/common/Button";
import ProgressBar from "@/components/subscription/ProgressBar";
import SizeSelector from "@/components/subscription/SizeSelector";
import { subscriptionFormSchema } from "@/schemas/SubscriptionFormSchema";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const petDetailsSchema = subscriptionFormSchema.pick({
  catsDetails: true,
  dogsDetails: true,
});

export type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

export default function SubscriptionStepFourPage() {
  const router = useRouter();
  const catCount = useSubscriptionFormStore((state) => state.catCount) || 0;
  const dogCount = useSubscriptionFormStore((state) => state.dogCount) || 0;
  const cats = useSubscriptionFormStore((state) => state.catsDetails);
  const dogs = useSubscriptionFormStore((state) => state.dogsDetails);

  const {
    control,
    formState: { errors },
  } = useForm<PetDetailsSchema>({
    resolver: zodResolver(petDetailsSchema),
    defaultValues: useSubscriptionFormStore.getState(),
    values: {
      catsDetails: cats || [],
      dogsDetails: dogs || [],
    },
  });

  return (
    <div className="w-full pt-32 pb-20 bg-green-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={4} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center gap-2">
        <h3>What are your pets&apos; sizes?</h3>
        <div className="text-gray-800 bodyLG">
          We will curate apparel based on your pets&apos; sizes
        </div>
      </div>
      <form className="flex flex-col gap-8 items-center">
        {(errors.catsDetails || errors.dogsDetails) && (
          <div className="bodyMD text-red">
            {errors.dogsDetails?.message || errors.catsDetails?.message}
          </div>
        )}
        {Array.from({ length: catCount }).map((_, idx) => (
          <SizeSelector
            key={idx}
            control={control}
            name={cats?.[idx].name || ""}
            type="Cat"
            idx={idx}
          />
        ))}
        {Array.from({ length: dogCount }).map((_, idx) => (
          <SizeSelector
            key={idx}
            control={control}
            name={dogs?.[idx].name || ""}
            type="Dog"
            idx={idx}
          />
        ))}
        <div className="flex gap-5">
          <Button
            onClick={() => router.push("/subscribe/step-3")}
            variant="secondary"
          >
            Previous
          </Button>
          <Button onClick={() => router.push("/subscribe/step-5")}>Next</Button>
        </div>
      </form>
    </div>
  );
}
