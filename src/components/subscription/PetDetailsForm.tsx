import React from "react";
import Card from "../common/Card";
import Input from "../common/Input";
import Selector from "../common/Selector";
import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import PillButton from "../common/PillButton";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import catSpecies from "../../data/Cats.json";
import dogSpecies from "../../data/Dogs.json";

export const initialPetDetailsSchema = petDetailsSchema.pick({
  name: true,
  breed: true,
  gender: true,
  birthdayMonth: true,
  birthdayYear: true,
});

export type InitialPetDetailsSchema = z.infer<typeof initialPetDetailsSchema>;

type PetDetails = z.infer<typeof petDetailsSchema>;

export default function PetDetailsForm({
  petType,
  idx,
}: {
  petType: "Dog" | "Cat";
  idx: number;
}) {
  const years = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    name: (i + 2000).toString(),
  }));
  const months = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: (i + 1).toString(),
  }));

  // Get stored data for this specific pet
  const storedData = useSubscriptionFormStore((state) =>
    petType === "Cat" ? state.catsDetails?.[idx] : state.dogsDetails?.[idx]
  );

  const {
    control,
    formState: { errors },
  } = useForm<InitialPetDetailsSchema>({
    resolver: zodResolver(initialPetDetailsSchema),
    defaultValues: {
      name: storedData?.name || "",
      breed: storedData?.breed || "",
      gender: storedData?.gender,
      birthdayYear: storedData?.birthdayYear,
      birthdayMonth: storedData?.birthdayMonth,
    },
  });

  const setData = useSubscriptionFormStore((state) => state.setData);

  const saveFieldToStore = (
    fieldName: keyof InitialPetDetailsSchema,
    value: string | number
  ) => {
    const prevPets =
      petType === "Cat"
        ? useSubscriptionFormStore.getState().catsDetails
        : useSubscriptionFormStore.getState().dogsDetails;

    const newPets = [...(prevPets || [])] as Partial<PetDetails>[];
    if (!newPets[idx]) {
      newPets[idx] = {} as Partial<PetDetails>;
    }
    newPets[idx] = { ...newPets[idx], [fieldName]: value };

    if (petType === "Cat") {
      setData({ catsDetails: newPets as PetDetails[] });
    } else {
      setData({ dogsDetails: newPets as PetDetails[] });
    }
  };

  return (
    <Card>
      <form className="flex flex-col items-center">
        <div className="w-12 h-12 bg-amber-300 rounded-full" />
        <h4 className="mt-2">
          {petType} {idx + 1}
        </h4>
        <div className="grid grid-cols-2 gap-6 mt-8 bodyMD min-w-2xl">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            Name
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    saveFieldToStore("name", e.target.value);
                  }}
                  placeholder="What is your pet's name?"
                />
              )}
            />
            {errors.name && <p className="text-red-500">Required</p>}
          </div>

          {/* Gender Field */}
          <div className="flex flex-col gap-2">
            Gender
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div className="flex gap-3">
                  <PillButton
                    onClick={() => {
                      field.onChange("Boy");
                      saveFieldToStore("gender", "Boy");
                    }}
                    active={field.value === "Boy"}
                    className="w-1/2 "
                  >
                    Boy
                  </PillButton>
                  <PillButton
                    onClick={() => {
                      field.onChange("Girl");
                      saveFieldToStore("gender", "Girl");
                    }}
                    active={field.value === "Girl"}
                    className="w-1/2 "
                  >
                    Girl
                  </PillButton>
                </div>
              )}
            />
            {errors.gender && (
              <p className="text-red-500">Please select an option</p>
            )}
          </div>

          {/* Breed Field */}
          <div className="flex flex-col gap-2">
            Breed
            <Controller
              name="breed"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  options={petType === "Cat" ? catSpecies : dogSpecies}
                  placeholder={`What is your ${petType.toLowerCase()}'s breed?`}
                  value={
                    (petType === "Cat" ? catSpecies : dogSpecies).find(
                      (species) => species.name === field.value
                    ) || null
                  }
                  onChange={(option) => {
                    field.onChange(option.name);
                    saveFieldToStore("breed", option.name);
                  }}
                />
              )}
            />
            {errors.breed && <p className="text-red-500">Required</p>}
          </div>

          {/* Birthday Field */}
          <div className="flex flex-col gap-2">
            Birthday
            <div className="flex gap-3">
              {/* Year Selector */}
              <Controller
                name="birthdayYear"
                control={control}
                render={({ field }) => (
                  <Selector
                    {...field}
                    options={years}
                    placeholder="Year"
                    className="w-1/2"
                    value={
                      years.find(
                        (year) => year.name === field.value?.toString()
                      ) || null
                    }
                    onChange={(option) => {
                      field.onChange(Number(option.name));
                      saveFieldToStore("birthdayYear", Number(option.name));
                    }}
                  />
                )}
              />
              {/* Month Selector */}
              <Controller
                name="birthdayMonth"
                control={control}
                render={({ field }) => (
                  <Selector
                    {...field}
                    options={months}
                    placeholder="Month"
                    className="w-1/2"
                    value={
                      months.find((month) => month.id === field.value) || null
                    }
                    onChange={(option) => {
                      field.onChange(Number(option.name));
                      saveFieldToStore("birthdayMonth", Number(option.name));
                    }}
                  />
                )}
              />
            </div>
            {(errors.birthdayYear || errors.birthdayMonth) && (
              <p className="text-red-500">
                {(errors.birthdayYear?.message ||
                  errors.birthdayMonth?.message) ??
                  "Invalid birthday"}
              </p>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
}
