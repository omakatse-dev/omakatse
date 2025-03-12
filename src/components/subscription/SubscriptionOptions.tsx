import React from "react";
import CardButton from "../common/CardButton";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { TreatPreferenceSchema } from "@/app/subscribe/step-7/page";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";

const OPTIONS = [
  {
    title: "Trial",
    price: 40,
    description: "try your first box",
    value: "trial"
  },
  {
    title: "3 Months",
    price: 35,
    description: "save AED 20",
    value: "3"
  },
  {
    title: "6 Months",
    price: 30,
    description: "save AED 40",
    value: "6"
  },
  {
    title: "12 Months",
    price: 25,
    description: "save AED 60",
    value: "12"
  },
] as const;

interface Props {
  control: Control<any>;
  name: string;
}

export default function SubscriptionOptions({ control, name }: Props) {
  const setData = useSubscriptionFormStore((state) => state.setData);

  const handleSelectOption = (value: string, field: ControllerRenderProps<any, string>) => {
    field.onChange(value);
    const newData = {
      [field.name]: value,
    };
    setData(newData);
  }
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="grid grid-cols-4 gap-8">
          {OPTIONS.map((option) => (
            <CardButton
              key={option.title}
              active={field.value === option.value}
              onClick={() => handleSelectOption(option.value, field)}
            >
              <div>
                <h4>{option.title}</h4>
                <h1 className="mt-8">{option.price}</h1>
                <h3 className="text-gray-500">AED/mo</h3>
                <div className="mt-8 text-gray-800">{option.description}</div>
              </div>
            </CardButton>
          ))}
        </div>
      )}
    />
  );
}
