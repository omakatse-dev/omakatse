import Input from "@/components/common/Input";
import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import PillButton from "@/components/common/PillButton";
import Selector from "@/components/common/Selector";
import catSpecies from "@/data/Cats.json";
import dogSpecies from "@/data/Dogs.json";
import dayjs from "dayjs";
import CardButton from "@/components/common/CardButton";
import Textfield from "@/components/common/Textfield";
import TreatPreferenceSelector from "@/components/subscription/TreatPreferenceSelector";
import Button from "@/components/common/Button";
import { updatePets } from "@/utils/SubscriptionAPIs";
import { useState } from "react";
import EditPetSuccessModal from "./EditPetSuccessModal";
import Image from "next/image";
import beef from "../../../../public/assets/Beef.svg";
import dairy from "../../../../public/assets/Dairy.svg";
import wheat from "../../../../public/assets/Wheat.svg";
import poultry from "../../../../public/assets/Poultry.svg";
import lamb from "../../../../public/assets/Lamb.svg";
import seafood from "../../../../public/assets/Seafood.svg";
import deer from "../../../../public/assets/Deer.svg";
import cat from "../../../../public/assets/Cat.svg";
import dog from "../../../../public/assets/Dog.svg";
import cat1 from "../../../../public/assets/Cat1.svg";
import cat2 from "../../../../public/assets/Cat2.svg";
import cat3 from "../../../../public/assets/Cat3.svg";
import cat4 from "../../../../public/assets/Cat4.svg";
import dog1 from "../../../../public/assets/Dog1.svg";
import dog2 from "../../../../public/assets/Dog2.svg";
import dog3 from "../../../../public/assets/Dog3.svg";
import dog4 from "../../../../public/assets/Dog4.svg";
import { useRouter } from "next/navigation";

export type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

const CAT_ALLERGIES = ["Poultry", "Beef", "Seafood", "Deer"] as const;
const DOG_ALLERGIES = ["Beef", "Dairy", "Wheat", "Poultry", "Lamb", "Seafood"] as const;
type CatAllergy = (typeof CAT_ALLERGIES)[number];
type DogAllergy = (typeof DOG_ALLERGIES)[number];

const isCatAllergy = (allergy: string): allergy is CatAllergy => {
  return CAT_ALLERGIES.includes(allergy as CatAllergy);
};

const isDogAllergy = (allergy: string): allergy is DogAllergy => {
  return DOG_ALLERGIES.includes(allergy as DogAllergy);
};

const allergyImageMapping: Record<CatAllergy | DogAllergy, string> = {
  Beef: beef,
  Dairy: dairy,
  Wheat: wheat,
  Poultry: poultry,
  Lamb: lamb,
  Seafood: seafood,
  Deer: deer,
};

const catMapping: Record<0 | 1 | 2 | 3, string> = {
  0: cat1,
  1: cat2,
  2: cat3,
  3: cat4,
};

const dogMapping: Record<0 | 1 | 2 | 3, string> = {
  0: dog1,
  1: dog2,
  2: dog3,
  3: dog4,
};

export default function PetProfileForm({
  existingDetails,
  contractId,
  petIndex,
}: {
  existingDetails: PetDetailsSchema;
  contractId: string;
  petIndex: number;
}) {
  const { register, handleSubmit, control } = useForm<PetDetailsSchema>({
    defaultValues: existingDetails,
  });
  const router = useRouter();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onSubmit = async (data: PetDetailsSchema) => {
    setStatus("loading");
    await updatePets(contractId, data, petIndex);
    setStatus("success");
  };

  const years = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    name: (i + 2000).toString(),
  }));
  const months = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: dayjs().month(i).format("MMM"),
  }));

  const treatFrequencies = [
    { id: 0, name: "None (No treats or snacks)", frequency: "none" },
    { id: 1, name: "A few (less than daily)", frequency: "a few" },
    { id: 2, name: "Sometimes (1-3 daily)", frequency: "sometimes" },
    { id: 3, name: "Often (4+ daily)", frequency: "often" },
  ];

  return (
    <>
      <form
        className="flex flex-col gap-8 w-full mt-8 bodyMD"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src={
              existingDetails.type === "Cat"
                ? catMapping[petIndex as keyof typeof catMapping]
                : dogMapping[petIndex as keyof typeof dogMapping]
            }
            alt={`${existingDetails.type} ${petIndex + 1}`}
            width={100}
            height={100}
            className="w-16 h-16 sm:w-24 sm:h-24"
          />
          <h4>{existingDetails.name}</h4>
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-full gap-6">
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <div>Name</div>
            <Input className="w-full border-primary" {...register("name")} />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <div>Gender</div>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div className="flex gap-3">
                  <PillButton
                    onClick={() => {
                      field.onChange("Boy");
                    }}
                    active={field.value === "Boy"}
                    className="w-1/2 "
                  >
                    Boy
                  </PillButton>
                  <PillButton
                    onClick={() => {
                      field.onChange("Girl");
                    }}
                    active={field.value === "Girl"}
                    className="w-1/2 "
                  >
                    Girl
                  </PillButton>
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-full gap-6">
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <div>Breed</div>
            <Controller
              name="breed"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  className="border-primary rounded-full"
                  options={
                    existingDetails.type === "Cat" ? catSpecies : dogSpecies
                  }
                  value={
                    (existingDetails.type === "Cat"
                      ? catSpecies
                      : dogSpecies
                    ).find((species) => species.name === field.value) || null
                  }
                  onChange={(option) => {
                    field.onChange(option.name);
                  }}
                />
              )}
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <div>Birthday</div>
            <div className="flex gap-3">
              {/* Year Selector */}
              <Controller
                name="birthdayYear"
                control={control}
                render={({ field }) => (
                  <Selector
                    {...field}
                    options={years}
                    className="w-1/2 border-primary rounded-full"
                    value={
                      years.find(
                        (year) => year.name === field.value?.toString()
                      ) || null
                    }
                    onChange={(option) => {
                      field.onChange(Number(option.name));
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
                    className="w-1/2 border-primary rounded-full"
                    value={
                      months.find((month) => month.id === field.value) || null
                    }
                    onChange={(option) => {
                      field.onChange(Number(option.id));
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>What is your pet&apos;s size?</div>
          <div>
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:justify-between">
                  <CardButton
                    active={field.value === "skinny"}
                    onClick={() => field.onChange("skinny")}
                    className="flex items-center justify-center sm:flex-col w-full"
                  >
                    <Image
                      src={existingDetails.type === "Cat" ? cat : dog}
                      alt="Skinny"
                      width={100}
                      height={100}
                      className="scale-60"
                    />
                    <div className="w-1/2 sm:w-full">Small</div>
                  </CardButton>
                  <CardButton
                    active={field.value === "just right"}
                    onClick={() => field.onChange("just right")}
                    className="flex items-center justify-center sm:flex-col w-full"
                  >
                    <Image
                      src={existingDetails.type === "Cat" ? cat : dog}
                      alt="Just Right"
                      width={100}
                      height={100}
                      className="scale-90"
                    />
                    <div className="w-1/2 sm:w-full">Medium</div>
                  </CardButton>
                  <CardButton
                    active={field.value === "chubby"}
                    onClick={() => field.onChange("chubby")}
                    className="flex items-center justify-center sm:flex-col w-full"
                  >
                    <Image
                      src={existingDetails.type === "Cat" ? cat : dog}
                      alt="Chubby"
                      width={100}
                      height={100}
                      className="scale-120"
                    />
                    <div className="w-1/2 sm:w-full">Large</div>
                  </CardButton>
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>Does {existingDetails.name} have any allergies?</div>
          <Controller
            name="allergies"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex gap-3">
                  <PillButton
                    active={field.value.true}
                    onClick={() =>
                      field.onChange({ allergies: [], true: true })
                    }
                    className="w-full lg:w-auto"
                  >
                    Yes
                  </PillButton>
                  <PillButton
                    active={field.value.true === false}
                    onClick={() =>
                      field.onChange({ allergies: [], true: false })
                    }
                    className="w-full lg:w-auto"
                  >
                    No
                  </PillButton>
                </div>

                {field.value.true && (
                  <>
                    <div className="mt-6">
                      {existingDetails.name} is allergic to:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-3">
                      {(existingDetails.type === "Dog" ? DOG_ALLERGIES : CAT_ALLERGIES).map((allergy) => (
                        <CardButton
                          key={allergy}
                          active={field.value.allergies.includes(allergy)}
                          onClick={() => {
                            const allergies = field.value.allergies.includes(allergy)
                              ? field.value.allergies.filter(
                                  (a) => a !== allergy
                                )
                              : [...field.value.allergies, allergy];
                            field.onChange({ ...field.value, allergies });
                          }}
                          className="flex flex-col items-center gap-2"
                        >
                          <Image
                            src={allergyImageMapping[allergy]}
                            alt={allergy}
                            width={24}
                            height={24}
                            className="w-12 h-12 sm:w-24 sm:h-24"
                          />
                          {allergy}
                        </CardButton>
                      ))}
                    </div>
                    <div className="mt-3">Other allergies (optional)</div>
                    <Textfield
                      className="mt-2"
                      placeholder="Enter any other allergies"
                      value={field.value.allergies
                        .filter(
                          (a) => !(existingDetails.type === "Dog" ? isDogAllergy(a) : isCatAllergy(a))
                        )
                        .join(", ")}
                      onChange={(e) => {
                        const customAllergies = e.target.value
                          .split(",")
                          .map((a) => a.trim())
                          .filter(Boolean);
                        const standardAllergies = field.value.allergies.filter(
                          (a) => existingDetails.type === "Dog" ? isDogAllergy(a) : isCatAllergy(a)
                        );
                        field.onChange({
                          ...field.value,
                          allergies: [...standardAllergies, ...customAllergies],
                        });
                      }}
                    />
                  </>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>Does {existingDetails.name} have any preferences?</div>
          <Controller
            name="preferences"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex gap-3">
                  <PillButton
                    active={field.value.true}
                    onClick={() =>
                      field.onChange({ preferences: [], true: true })
                    }
                    className="w-full lg:w-auto"
                  >
                    Yes
                  </PillButton>
                  <PillButton
                    active={field.value.true === false}
                    onClick={() =>
                      field.onChange({ preferences: [], true: false })
                    }
                    className="w-full lg:w-auto"
                  >
                    No
                  </PillButton>
                </div>

                {field.value.true && (
                  <>
                    <div className="mt-6">{existingDetails.name} prefers:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-3">
                      {(existingDetails.type === "Dog" ? DOG_ALLERGIES : CAT_ALLERGIES).map((preference) => (
                        <CardButton
                          key={preference}
                          active={field.value.preferences.includes(preference)}
                          onClick={() => {
                            const preferences =
                              field.value.preferences.includes(preference)
                                ? field.value.preferences.filter(
                                    (a) => a !== preference
                                  )
                                : [...field.value.preferences, preference];
                            field.onChange({ ...field.value, preferences });
                          }}
                          className="flex flex-col items-center gap-2"
                        >
                          <Image
                            src={allergyImageMapping[preference]}
                            alt={preference}
                            width={24}
                            height={24}
                            className="w-12 h-12 sm:w-24 sm:h-24"
                          />
                          {preference}
                        </CardButton>
                      ))}
                    </div>
                    <div className="mt-3">Other preferences (optional)</div>
                    <Textfield
                      className="mt-2"
                      placeholder="Enter any other preferences"
                      value={field.value.preferences
                        .filter(
                          (a) => !(existingDetails.type === "Dog" ? isDogAllergy(a) : isCatAllergy(a))
                        )
                        .join(", ")}
                      onChange={(e) => {
                        const customPreferences = e.target.value
                          .split(",")
                          .map((a) => a.trim())
                          .filter(Boolean);
                        const standardPreferences =
                          field.value.preferences.filter((a) =>
                            existingDetails.type === "Dog" ? isDogAllergy(a) : isCatAllergy(a)
                          );
                        field.onChange({
                          ...field.value,
                          preferences: [
                            ...standardPreferences,
                            ...customPreferences,
                          ],
                        });
                      }}
                    />
                  </>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            How often does {existingDetails.name} get treats?
            <Controller
              name="treatFrequency"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-6">
                  <Selector
                    {...field}
                    className="border-primary rounded-full w-full sm:w-1/2 mt-2"
                    options={treatFrequencies}
                    value={
                      treatFrequencies.find(
                        (frequency) =>
                          frequency.frequency === field.value.frequency
                      ) || null
                    }
                    onChange={(option) => {
                      field.onChange(option);
                    }}
                  />
                  <div>
                    <div>Types of treats {existingDetails.name} likes:</div>
                    <TreatPreferenceSelector
                      preferences={field.value.preferences}
                      onChange={(preferences) => {
                        field.onChange({ ...field.value, preferences });
                      }}
                    />
                  </div>
                  <div>
                    <div>Additional comments (optional)</div>
                    <Textfield
                      className="mt-2 w-full"
                      placeholder="Enter any additional comments"
                      value={field.value.comments}
                      onChange={(e) => {
                        field.onChange({
                          ...field.value,
                          comments: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex w-full gap-5 justify-center">
          <Button variant="secondary" className="w-1/2" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-1/2"
            loading={status === "loading"}
          >
            Save
          </Button>
        </div>
      </form>
      {status === "success" && <EditPetSuccessModal />}
    </>
  );
}
