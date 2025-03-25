import React from "react";
import CardButton from "../common/CardButton";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { PetCountSchema } from "@/app/subscribe/step-2/page";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";

export default function PetCountSelector({
  petType,
  both,
  control,
}: {
  petType: "cat" | "dog";
  both: boolean;
  control: Control<PetCountSchema>;
}) {
  const catCount = useSubscriptionFormStore((state) => state.catCount) || 0;
  const dogCount = useSubscriptionFormStore((state) => state.dogCount) || 0;
  const setData = useSubscriptionFormStore((state) => state.setData);

  const setValueHandler = (
    field: ControllerRenderProps<PetCountSchema, `${"cat" | "dog"}Count`>,
    value: number
  ) => {
    field.onChange(value);
    const newData = {
      [field.name]: value,
    };
    setData(newData);
  };

  return (
    <Controller
      name={`${petType}Count`}
      control={control}
      render={({ field }) => (
        <>
          <h3 className="font-bold">How many {petType}s do you have?</h3>
          <div className="flex flex-row gap-8">
            <CardButton
              active={field.value === 1}
              onClick={() => setValueHandler(field, 1)}
            >
              <div className="w-48 h-48 bg-amber-300" />1 {petType}
            </CardButton>
            <CardButton
              active={field.value === 2}
              onClick={() => setValueHandler(field, 2)}
              disabled={
                (both && petType === "cat" && dogCount > 2) ||
                (both && petType === "dog" && catCount > 2)
              }
            >
              <div className="w-48 h-48 bg-amber-300" />2 {petType}
            </CardButton>
            <CardButton
              active={field.value === 3}
              onClick={() => setValueHandler(field, 3)}
              disabled={
                (both && petType === "cat" && dogCount > 1) ||
                (both && petType === "dog" && catCount > 1)
              }
            >
              <div className="w-48 h-48 bg-amber-300" />3 {petType}
            </CardButton>
            {!both && (
              <CardButton
                active={field.value === 4}
                onClick={() => setValueHandler(field, 4)}
              >
                <div className="w-48 h-48 bg-amber-300" />4 {petType}
              </CardButton>
            )}
          </div>
        </>
      )}
    />
  );
}
