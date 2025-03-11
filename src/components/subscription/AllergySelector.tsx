import React from "react";
import CardButton from "../common/CardButton";
import Input from "../common/Input";
import PillButton from "../common/PillButton";
import Card from "../common/Card";
import { Control, Controller } from "react-hook-form";
import { AllergySchema } from "@/app/subscribe/step-5/page";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";

const ALLERGIES = [
  "Beef",
  "Dairy",
  "Wheat",
  "Poultry",
  "Lamb",
  "Seafood",
] as const;

interface Props {
  name: string;
  control: Control<AllergySchema>;
  fieldName: `catsDetails.${number}.allergies` | `dogsDetails.${number}.allergies`;
}

export default function AllergySelector({ name, control, fieldName }: Props) {
  // Get the pet's current allergies directly from Zustand
  const [petType, petIndex] = fieldName.split('.') as ['catsDetails' | 'dogsDetails', string];
  const petDetails = useSubscriptionFormStore(state => state[petType]?.[Number(petIndex)]);
  const setData = useSubscriptionFormStore(state => state.setData);

  // Use the actual data from the store
  const allergiesData = petDetails?.allergies || { true: false, allergies: [] };

  const updateAllergies = (newAllergies: typeof allergiesData) => {
    const pets = useSubscriptionFormStore.getState()[petType] || [];
    const newPets = [...pets];
    newPets[Number(petIndex)] = {
      ...pets[Number(petIndex)],
      allergies: newAllergies
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
          active={allergiesData.true}
          onClick={() => updateAllergies({ ...allergiesData, true: true })}
        >
          Yes
        </PillButton>
        <PillButton
          active={!allergiesData.true}
          onClick={() => updateAllergies({ ...allergiesData, true: false, allergies: [] })}
        >
          No
        </PillButton>
      </div>
      {allergiesData.true && (
        <div>
          <div className="grid grid-cols-3 gap-6">
            {ALLERGIES.map((allergy) => (
              <CardButton
                key={allergy}
                active={allergiesData.allergies.includes(allergy)}
                onClick={() => {
                  const allergies = allergiesData.allergies.includes(allergy)
                    ? allergiesData.allergies.filter(a => a !== allergy)
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
            value={allergiesData.allergies.filter(a => !ALLERGIES.includes(a as any)).join(", ")}
            onChange={(e) => {
              const otherAllergies = e.target.value
                .split(",")
                .map(a => a.trim())
                .filter(Boolean);
              const standardAllergies = allergiesData.allergies
                .filter(a => ALLERGIES.includes(a as any));
              updateAllergies({
                ...allergiesData,
                allergies: [...standardAllergies, ...otherAllergies]
              });
            }}
          />
        </div>
      )}
    </Card>
  );
}
