import React from "react";
import CardButton from "../common/CardButton";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { PetCountSchema } from "@/app/subscribe/step-2/page";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import Image from "next/image";

import OneDog from "../../../public/assets/Dog.svg";
import TwoDogs from "../../../public/assets/TwoDogs.svg";
import ThreeDogs from "../../../public/assets/ThreeDogs.svg";
import FourDogs from "../../../public/assets/FourDogs.svg";

import OneCat from "../../../public/assets/Cat.svg";
import TwoCats from "../../../public/assets/TwoCats.svg";
import ThreeCats from "../../../public/assets/ThreeCats.svg";
import FourCats from "../../../public/assets/FourCats.svg";

export default function PetCountSelector({
  petType,
  both,
  control,
}: {
  petType: "Cat" | "Dog";
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
      name={`${petType.toLowerCase()}Count` as "catCount" | "dogCount"}
      control={control}
      render={({ field }) => (
        <>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-center">
              How many {petType.toLowerCase()}s do you have?
            </h3>
            <div className="bodyMD text-center text-gray-800">
              We need a headcount for the{" "}
              {petType === "Cat" ? "meows" : "whoofs"}.
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full">
            <CardButton
              active={field.value === 1}
              onClick={() => setValueHandler(field, 1)}
              className="sm:w-auto flex sm:flex-col items-center justify-center gap-2"
            >
              <Image
                src={petType === "Dog" ? OneDog : OneCat}
                alt="1 {petType}"
                className="w-16 sm:w-36"
              />
              <div className="bodyMD">1 {petType}</div>
            </CardButton>
            <CardButton
              active={field.value === 2}
              onClick={() => setValueHandler(field, 2)}
              className="sm:w-auto flex sm:flex-col items-center justify-center gap-2"
              disabled={
                (both && petType === "Cat" && dogCount > 2) ||
                (both && petType === "Dog" && catCount > 2)
              }
            >
              <Image
                src={petType === "Dog" ? TwoDogs : TwoCats}
                alt="2 {petType}"
                className="w-16 sm:w-36"
              />
              <div className="bodyMD">2 {petType}s</div>
            </CardButton>
            <CardButton
              active={field.value === 3}
              onClick={() => setValueHandler(field, 3)}
              className="sm:w-auto flex sm:flex-col items-center justify-center gap-2"
              disabled={
                (both && petType === "Cat" && dogCount > 1) ||
                (both && petType === "Dog" && catCount > 1)
              }
            >
              <Image
                src={petType === "Dog" ? ThreeDogs : ThreeCats}
                alt="3 {petType}"
                className="w-16 sm:w-36"
              />
              <div className="bodyMD">3 {petType}s</div>
            </CardButton>
            {!both && (
              <CardButton
                active={field.value === 4}
                onClick={() => setValueHandler(field, 4)}
                className="sm:w-auto flex sm:flex-col items-center justify-center gap-2"
              >
                <Image
                  src={petType === "Dog" ? FourDogs : FourCats}
                  alt="4 {petType}"
                  className="w-16 sm:w-36"
                />
                <div className="bodyMD">4 {petType}s</div>
              </CardButton>
            )}
          </div>
        </>
      )}
    />
  );
}
