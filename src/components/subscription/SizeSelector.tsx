import React from "react";
import Card from "../common/Card";
import CardButton from "../common/CardButton";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { PetDetailsSchema } from "@/app/subscribe/step-4/page";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";

export default function SizeSelector({
  control,
  name,
  type,
  idx,
}: {
  control: Control<PetDetailsSchema>;
  name: string;
  type: "Cat" | "Dog";
  idx: number;
}) {
  const setData = useSubscriptionFormStore((state) => state.setData);
  const catDetails = useSubscriptionFormStore((state) => state.catsDetails);
  const dogDetails = useSubscriptionFormStore((state) => state.dogsDetails);

  const selectSizeHandler = (
    field: ControllerRenderProps<PetDetailsSchema, `catsDetails.${number}.size`> | ControllerRenderProps<PetDetailsSchema, `dogsDetails.${number}.size`>,
    value: "skinny" | "just right" | "chubby"
  ) => {
    field.onChange(value);
    const details = type === "Cat" ? catDetails : dogDetails;
    if (!details?.[idx]) return;

    if (type === "Cat") {
      const newCatsDetails = [...(catDetails || [])];
      newCatsDetails[idx] = { ...catDetails![idx], size: value };
      setData({ catsDetails: newCatsDetails });
    } else {
      const newDogsDetails = [...(dogDetails || [])];
      newDogsDetails[idx] = { ...dogDetails![idx], size: value };
      setData({ dogsDetails: newDogsDetails });
    }
  };
  return (
    <Controller
      control={control}
      name={
        type === "Cat" ? `catsDetails.${idx}.size` : `dogsDetails.${idx}.size`
      }
      render={({ field }) => (
        <Card>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-amber-300 mb-2" />
            <h4>{name}</h4>
            <div className="mt-8 flex flex-row gap-8">
              <CardButton
                onClick={() => selectSizeHandler(field, "skinny")}
                active={field.value === "skinny"}
              >
                <div className="w-32 h-16 bg-amber-300 mb-4" />
                Skinny
              </CardButton>
              <CardButton
                onClick={() => selectSizeHandler(field, "just right")}
                active={field.value === "just right"}
              >
                <div className="w-32 h-16 bg-amber-300 mb-4" />
                Just Right
              </CardButton>
              <CardButton
                onClick={() => selectSizeHandler(field, "chubby")}
                active={field.value === "chubby"}
              >
                <div className="w-32 h-16 bg-amber-300 mb-4" />
                Chubby
              </CardButton>
            </div>
          </div>
        </Card>
      )}
    />
  );
}
