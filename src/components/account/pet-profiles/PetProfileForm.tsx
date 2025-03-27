import Input from "@/components/common/Input";
import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import PillButton from "@/components/common/PillButton";
import Selector from "@/components/common/Selector";
import catSpecies from "@/data/Cats.json";
import dogSpecies from "@/data/Dogs.json";
import dayjs from "dayjs";

type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

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
    </form>
  );
}
