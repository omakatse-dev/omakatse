import CardButton from "../common/CardButton";
import { Controller } from "react-hook-form";

import { Control } from "react-hook-form";
import { PetTypeSchema } from "@/app/subscribe/step-1/page";

export default function PetSelector({
  control,
}: {
  control: Control<PetTypeSchema>;
}) {
  return (
    <Controller
      name="petType"
      control={control}
      render={({ field }) => (
        <div className="flex flex-col sm:flex-row gap-10">
          <CardButton
            onClick={() => {field.onChange("cat")}}
            active={field.value === "cat"}
          >
            <div className="h-64 w-64 bg-black" />
            Cat
          </CardButton>
          <CardButton
            onClick={() => field.onChange("dog")}
            active={field.value === "dog"}
          >
            <div className="h-64 w-64 bg-black" />
            Dog
          </CardButton>
          <CardButton
            onClick={() => field.onChange("both")}
            active={field.value === "both"}
          >
            <div className="h-64 w-64 bg-black" />
            Cat & Dog
          </CardButton>
        </div>
      )}
    />
  );
}
