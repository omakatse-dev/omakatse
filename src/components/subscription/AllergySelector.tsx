import React from "react";
import CardButton from "../common/CardButton";
import Input from "../common/Input";
import PillButton from "../common/PillButton";
import Card from "../common/Card";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";

const ALLERGIES = [
  "Beef",
  "Dairy",
  "Wheat",
  "Poultry",
  "Lamb",
  "Seafood",
] as const;

type StandardAllergy = (typeof ALLERGIES)[number];
type AllergyData = {
  true: boolean;
  allergies: (StandardAllergy | string)[];
};

interface Props {
  name: string;
  fieldName:
    | `catsDetails.${number}.allergies`
    | `dogsDetails.${number}.allergies`;
}

export default function AllergySelector({ name, fieldName }: Props) {
  // Get the pet's current allergies directly from Zustand
  const [petType, petIndex] = fieldName.split(".") as [
    "catsDetails" | "dogsDetails",
    string
  ];
  const petDetails = useSubscriptionFormStore(
    (state) => state[petType]?.[Number(petIndex)]
  );
  const setData = useSubscriptionFormStore((state) => state.setData);

  // Use the actual data from the store, but don't provide defaults
  const allergiesData = petDetails?.allergies;

  const updateAllergies = (newAllergies: AllergyData) => {
    const pets = useSubscriptionFormStore.getState()[petType] || [];
    const newPets = [...pets];
    newPets[Number(petIndex)] = {
      ...pets[Number(petIndex)],
      allergies: newAllergies,
    };
    setData({ [petType]: newPets });
  };

  return (
    <Card className="flex flex-col items-center w-full">
      <div className="w-8 h-8 rounded-full bg-amber-300 mb-2" />
      <h4>{name}</h4>
      <div className="bodyMD mt-8">Does {name} have any allergies?</div>
      <div className="flex gap-4 mt-2 mb-8">
        <PillButton
          active={allergiesData?.true === true}
          onClick={() => updateAllergies({ true: true, allergies: [] })}
        >
          Yes
        </PillButton>
        <PillButton
          active={allergiesData?.true === false}
          onClick={() => updateAllergies({ true: false, allergies: [] })}
        >
          No
        </PillButton>
      </div>
      {allergiesData?.true && (
        <div>
          <div className="grid grid-cols-3 gap-6">
            {ALLERGIES.map((allergy) => (
              <CardButton
                key={allergy}
                active={allergiesData.allergies.includes(allergy)}
                onClick={() => {
                  const allergies = allergiesData.allergies.includes(allergy)
                    ? allergiesData.allergies.filter((a) => a !== allergy)
                    : [...allergiesData.allergies, allergy];
                  updateAllergies({ ...allergiesData, allergies });
                }}
              >
                {allergy}
              </CardButton>
            ))}
          </div>
          <div className="bodyMD text-gray-800 mt-8">
            Other allergies (optional)
          </div>
          <Input
            placeholder="Enter any other allergies"
            className="w-full mt-2"
            value={allergiesData.allergies
              .filter(
                (allergy): allergy is string =>
                  !ALLERGIES.includes(allergy as StandardAllergy)
              )
              .join(", ")}
            onChange={(e) => {
              const otherAllergies = e.target.value
                .split(",")
                .map((a) => a.trim())
                .filter(Boolean);
              const standardAllergies = allergiesData.allergies.filter(
                (a): a is StandardAllergy =>
                  ALLERGIES.includes(a as StandardAllergy)
              );
              updateAllergies({
                ...allergiesData,
                allergies: [...standardAllergies, ...otherAllergies],
              });
            }}
          />
        </div>
      )}
    </Card>
  );
}
