"use client";

import Button from "@/components/common/Button";
import ProgressBar from "@/components/subscription/ProgressBar";
import SizeSelector from "@/components/subscription/SizeSelector";
import { subscriptionFormSchema } from "@/schemas/SubscriptionFormSchema";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const petType = useSubscriptionFormStore((state) => state.petType);
  const storedDogCount = useSubscriptionFormStore((state) => state.dogCount);
  const storedCatCount = useSubscriptionFormStore((state) => state.catCount);
  const hydrated = useSubscriptionFormStore((state) => state.hydrated);

  const [showError, setShowError] = useState(false);

  const { control } = useForm<PetDetailsSchema>({
    resolver: zodResolver(petDetailsSchema),
    defaultValues: useSubscriptionFormStore.getState(),
  });

  const submitHandler = () => {
    const allPetsHaveSize =
      (petType === "both" &&
        cats?.every((cat) => cat.size) &&
        dogs?.every((dog) => dog.size)) ||
      (petType === "dog" && dogs?.every((dog) => dog.size)) ||
      (petType === "cat" && cats?.every((cat) => cat.size));

    if (!allPetsHaveSize) {
      setShowError(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/subscribe/step-5");
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
    <div className="w-full px-8 pt-32 pb-20 bg-green-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={4} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center justify-center text-center gap-2">
        <h3 className="font-bold">What are your pets&apos; sizes?</h3>
        <div className="text-gray-800 bodyMD text-center">
          We&apos;ll pick the right-sized apparel so they look and feel great.
        </div>
      </div>
      <form className="flex flex-col gap-8 items-center w-full">
        {showError && (
          <div className="bodyMD text-red">
            Please fill in all required fields for each pet before proceeding
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
            catCount={catCount}
            key={idx}
            control={control}
            name={dogs?.[idx].name || ""}
            type="Dog"
            idx={idx}
          />
        ))}
        <div className="flex gap-5">
          <Button
            type="button"
            onClick={() => router.push("/subscribe/step-3")}
            variant="secondary"
            bgColor="bg-green-pastel"
          >
            Previous
          </Button>
          <Button onClick={submitHandler}>Next</Button>
        </div>
      </form>
    </div>
  );
}
