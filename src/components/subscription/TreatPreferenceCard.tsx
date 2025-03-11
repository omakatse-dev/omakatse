import React from "react";
import Card from "../common/Card";
import Selector from "../common/Selector";
import Textfield from "../common/Textfield";
import TreatPreferenceSelector from "./TreatPreferenceSelector";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";

interface Props {
  name: string;
  petType: 'catsDetails' | 'dogsDetails';
  petIndex: number;
}

export default function TreatPreferenceCard({ name, petType, petIndex }: Props) {
  const options = [
    { id: 0, name: "None (No treats or snacks)", frequency: "none" },
    { id: 1, name: "A few (less than daily)", frequency: "a few" },
    { id: 2, name: "Sometimes (1-3 daily)", frequency: "sometimes" },
    { id: 3, name: "Often (4+ daily)", frequency: "often" },
  ];

  const petDetails = useSubscriptionFormStore(state => state[petType]?.[Number(petIndex)]);
  const treatFrequency = petDetails?.treatFrequency || { frequency: "none", preferences: [] };
  const setData = useSubscriptionFormStore(state => state.setData);

  const updateTreatFrequency = (newTreatFrequency: typeof treatFrequency) => {
    const pets = useSubscriptionFormStore.getState()[petType] || [];
    const newPets = [...pets];
    newPets[Number(petIndex)] = {
      ...pets[Number(petIndex)],
      treatFrequency: newTreatFrequency
    };
    setData({ [petType]: newPets });
  };

  return (
    <Card>
      <div className="flex flex-col">
        <div className="w-8 h-8 rounded-full bg-amber-300 mb-2 self-center" />
        <h4 className="self-center">{name}</h4>
        <div>
          <div className="bodyMD mt-8 text-gray-800">
            How often does {name} get treats?
          </div>
          <Selector
            options={options}
            placeholder="Treats frequency"
            className="w-full mt-2"
            value={options.find(opt => opt.frequency === treatFrequency.frequency) || null}
            onChange={(option) => updateTreatFrequency({
              ...treatFrequency,
              frequency: option.frequency as "none" | "a few" | "sometimes" | "often"
            })}
          />
        </div>
        <TreatPreferenceSelector
          preferences={treatFrequency.preferences}
          onChange={(preferences) => updateTreatFrequency({
            ...treatFrequency,
            preferences
          })}
        />
        <div className="bodyMD mt-8 text-gray-800">
          Additional comments (optional)
        </div>
        <Textfield
          placeholder="Enter any additional comments"
          value={treatFrequency.comments || ""}
          onChange={(e) => updateTreatFrequency({
            ...treatFrequency,
            comments: e
          })}
        />
      </div>
    </Card>
  );
}
