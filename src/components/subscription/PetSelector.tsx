import CardButton from "../common/CardButton";
import { Controller } from "react-hook-form";
import { Control } from "react-hook-form";
import { PetTypeSchema } from "@/app/subscribe/step-1/page";
import Dog from "../../../public/assets/Dog.svg";
import Cat from "../../../public/assets/Cat.svg";
import Both from "../../../public/assets/two_kumos.svg";

import Image from "next/image";

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
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 w-full">
          <CardButton
            onClick={() => {
              field.onChange("cat");
            }}
            className="w-full flex sm:flex-col justify-center items-center gap-5 sm:gap-2"
            active={field.value === "cat"}
          >
            <Image src={Cat} alt="Cat" className="w-16 sm:w-36" />
            Cat
          </CardButton>
          <CardButton
            className="w-full flex sm:flex-col justify-center items-center gap-5 sm:gap-2"
            onClick={() => field.onChange("dog")}
            active={field.value === "dog"}
          >
            <Image src={Dog} alt="Dog" className="w-16 sm:w-36" />
            Dog
          </CardButton>
          <CardButton
            className="w-full flex sm:flex-col justify-center items-center gap-5 sm:gap-2"
            onClick={() => field.onChange("both")}
            active={field.value === "both"}
          >
            <Image src={Both} alt="Cat & Dog" className="sm:h-36 sm:w-48" />
            Cat & Dog
          </CardButton>
        </div>
      )}
    />
  );
}
