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

type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

const ALLERGIES = ["Beef", "Dairy", "Wheat", "Poultry"] as const;
type StandardAllergy = (typeof ALLERGIES)[number];
export default function PetProfileForm({
  existingDetails,
}: {
  existingDetails: PetDetailsSchema;
}) {
  const { register, handleSubmit, control } = useForm<PetDetailsSchema>({
    defaultValues: existingDetails,
  });

  const onSubmit = (data: PetDetailsSchema) => {
    console.log(data);
  };

  const years = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    name: (i + 2000).toString(),
  }));
  const months = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: dayjs().month(i).format("MMM"),
  }));

  return (
    <form
      className="flex flex-col gap-8 w-full mt-8 bodyMD"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between w-full gap-6">
        <div className="w-1/2 flex flex-col gap-2">
          <div>Name</div>
          <Input className="w-full border-primary" {...register("name")} />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
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
      <div className="flex justify-between w-full gap-6">
        <div className="w-1/2 flex flex-col gap-2">
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
        <div className="w-1/2 flex flex-col gap-2">
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
              <div className="flex gap-8">
                <CardButton
                  active={field.value === "skinny"}
                  onClick={() => field.onChange("skinny")}
                >
                  <div className="w-32 h-16 bg-amber-300 mb-4" />
                  Skinny
                </CardButton>
                <CardButton
                  active={field.value === "just right"}
                  onClick={() => field.onChange("just right")}
                >
                  <div className="w-32 h-16 bg-amber-300 mb-4" />
                  Just Right
                </CardButton>
                <CardButton
                  active={field.value === "chubby"}
                  onClick={() => field.onChange("chubby")}
                >
                  <div className="w-32 h-16 bg-amber-300 mb-4" />
                  Chubby
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
                  onClick={() => field.onChange({ allergies: [], true: true })}
                >
                  Yes
                </PillButton>
                <PillButton
                  active={field.value.true === false}
                  onClick={() => field.onChange({ allergies: [], true: false })}
                >
                  No
                </PillButton>
              </div>

              {field.value.true && (
                <>
                  <div className="mt-6">
                    {existingDetails.name} is allergic to:
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-3">
                    {ALLERGIES.map((allergy) => (
                      <CardButton
                        key={allergy}
                        active={field.value.allergies.includes(allergy)}
                        onClick={() => {
                          const allergies = field.value.allergies.includes(
                            allergy
                          )
                            ? field.value.allergies.filter((a) => a !== allergy)
                            : [...field.value.allergies, allergy];
                          field.onChange({ ...field.value, allergies });
                        }}
                      >
                        {allergy}
                      </CardButton>
                    ))}
                  </div>
                  <div className="mt-3">
                    Other allergies (optional)
                  </div>
                  <Textfield
                    className="mt-2"
                    placeholder="Enter any other allergies"
                    value={field.value.allergies
                      .filter((a) => !ALLERGIES.includes(a as StandardAllergy))
                      .join(", ")}
                    onChange={(e) => {
                      const customAllergies = e.target.value
                        .split(",")
                        .map((a) => a.trim())
                        .filter(Boolean);
                      const standardAllergies = field.value.allergies.filter(
                        (a) => ALLERGIES.includes(a as StandardAllergy)
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
    </form>
  );
}
