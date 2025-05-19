import React from "react";
import Card from "../common/Card";
import Selector from "../common/Selector";
import Textfield from "../common/Textfield";
import TreatPreferenceSelector from "./TreatPreferenceSelector";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import Image from "next/image";
import cat1 from "../../../public/assets/Cat1.svg";
import cat2 from "../../../public/assets/Cat2.svg";
import cat3 from "../../../public/assets/Cat3.svg";
import cat4 from "../../../public/assets/Cat4.svg";
import dog1 from "../../../public/assets/Dog1.svg";
import dog2 from "../../../public/assets/Dog2.svg";
import dog3 from "../../../public/assets/Dog3.svg";
import dog4 from "../../../public/assets/Dog4.svg";

interface Props {
  name: string;
  petType: "catsDetails" | "dogsDetails";
  petIndex: number;
  catCount?: number;
  showValidation?: boolean;
}

type TreatFrequencyData = {
  frequency: "none" | "a few" | "sometimes" | "often";
  preferences: string[];
  comments?: string;
};

const variantMapping: Record<0 | 1 | 2 | 3, "yellow" | "blue" | "green" | "pink"> = {
  0: "yellow",
  1: "blue",
  2: "green",
  3: "pink",
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

export default function TreatPreferenceCard({
  name,
  petType,
  petIndex,
  catCount = 0,
  showValidation = false,
}: Props) {
  const options = [
    { id: 0, name: "None (No treats or snacks)", frequency: "none" },
    { id: 1, name: "A few (less than daily)", frequency: "a few" },
    { id: 2, name: "Sometimes (1-3 daily)", frequency: "sometimes" },
    { id: 3, name: "Often (4+ daily)", frequency: "often" },
  ];

  const petDetails = useSubscriptionFormStore(
    (state) => state[petType]?.[Number(petIndex)]
  );
  const treatFrequency = petDetails?.treatFrequency;
  const setData = useSubscriptionFormStore((state) => state.setData);

  const updateTreatFrequency = (newData: Partial<TreatFrequencyData>) => {
    const pets = useSubscriptionFormStore.getState()[petType] || [];
    const newPets = [...pets];
    newPets[Number(petIndex)] = {
      ...pets[Number(petIndex)],
      treatFrequency: {
        ...petDetails?.treatFrequency,
        ...newData,
      } as TreatFrequencyData,
    };
    setData({ [petType]: newPets });
  };

  return (
    <Card
      className="flex flex-col items-center w-full sm:w-[45%]"
      variant={variantMapping[(petIndex + catCount) as keyof typeof variantMapping]}
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex sm:flex-col items-center gap-4 sm:gap-0">
          <Image
            alt={`${name} ${petIndex + 1}`}
            src={petType === "catsDetails" 
              ? catMapping[petIndex as keyof typeof catMapping]
              : dogMapping[petIndex as keyof typeof dogMapping]
            }
            width={100}
            height={100}
            className="w-16 h-16 sm:w-24 sm:h-24"
          />
          <h4>{name}</h4>
        </div>
        <div className="w-full">
          <div className="bodyMD mt-8 text-gray-800">
            How often does {name} get treats?
          </div>
          <Selector
            options={options}
            placeholder="Treats frequency"
            className="w-full mt-2"
            value={
              options.find(
                (opt) => opt.frequency === treatFrequency?.frequency
              ) || null
            }
            onChange={(option) =>
              updateTreatFrequency({
                preferences: [],
                frequency: option.frequency as
                  | "none"
                  | "a few"
                  | "sometimes"
                  | "often",
              })
            }
          />
          {showValidation && !treatFrequency?.frequency && (
            <div className="text-red text-sm mt-1">
              Please select an option
            </div>
          )}
        </div>
        <TreatPreferenceSelector
          preferences={treatFrequency?.preferences || []}
          onChange={(preferences) =>
            updateTreatFrequency({
              ...treatFrequency,
              preferences,
            })
          }
        />
        <div className="w-full">
          <div className="bodyMD mt-8 text-gray-800">
            Additional comments (optional)
          </div>
          <Textfield
            placeholder="Enter any additional comments"
            className="w-full"
            value={treatFrequency?.comments || ""}
            onChange={(e) =>
              updateTreatFrequency({
                ...treatFrequency,
                comments: e.target.value,
              })
            }
          />
        </div>
      </div>
    </Card>
  );
}
