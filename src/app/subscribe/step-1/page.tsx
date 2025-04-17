"use client";

import Button from "@/components/common/Button";
import PetSelector from "@/components/subscription/PetSelector";
import ProgressBar from "@/components/subscription/ProgressBar";
import { subscriptionFormSchema } from "@/schemas/SubscriptionFormSchema";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const petTypeSchema = subscriptionFormSchema
  .pick({
    petType: true,
  })
  .extend({
    petType: z.enum(["dog", "cat", "both"]),
  });

export type PetTypeSchema = z.infer<typeof petTypeSchema>;

export default function SubscriptionStepOnePage() {
  const router = useRouter();
  const existingData = useSubscriptionFormStore((state) => state.petType);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PetTypeSchema>({
    resolver: zodResolver(petTypeSchema),
    defaultValues: {
      petType: existingData,
    },
  });

  const setData = useSubscriptionFormStore((state) => state.setData);

  const onSubmit = (data: PetTypeSchema) => {
    console.log("step 1 data", data);
    if (data.petType === "dog") {
      setData({ catCount: 0 });
    }
    if (data.petType === "cat") {
      setData({ dogCount: 0 });
    }
    setData(data);
    router.push("/subscribe/step-2");
  };

  return (
    <div className="w-full px-8 pt-32 pb-20 bg-yellow-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={1} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-center">
          What kind of pets do you have?
        </h3>
        <div className="bodyMD text-center text-gray-800">
          Let&apos;s get to know your family.
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-8"
      >
        <PetSelector control={control} />
        <Button type="submit">
          Next
        </Button>
      </form>
      {errors.petType && (
        <div className="bodyMD text-red">Please select pet type.</div>
      )}
    </div>
  );
}
