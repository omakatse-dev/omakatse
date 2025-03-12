import React from "react";
import CardButton from "../common/CardButton";
import Input from "../common/Input";
import Card from "../common/Card";
import PillButton from "../common/PillButton";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";

export default function FoodPreferenceSelector({ name, petType, petIndex }: { name: string, petType: 'catsDetails' | 'dogsDetails', petIndex: number }) {
  const OPTIONS = [
    {
      image: "/images/vegan.png",
      name: "Poultry",
    },
    {
      image: "/images/vegan.png",
      name: "Beef",
    },
    {
      image: "/images/vegan.png",
      name: "Seafood",
    },
    {
      image: "/images/vegan.png",
      name: "Deer",
    },
  ];

  const petDetails = useSubscriptionFormStore(state => state[petType]?.[Number(petIndex)]);
  const preferencesData = petDetails?.preferences || { true: false, preferences: [] };
  const setData = useSubscriptionFormStore(state => state.setData);

  const updateFoodPreferences = (newFoodPreferences: typeof preferencesData) => {
    const pets = useSubscriptionFormStore.getState()[petType] || [];
    const newPets = [...pets];
    newPets[Number(petIndex)] = {
      ...pets[Number(petIndex)],
      preferences: newFoodPreferences
    };
    setData({ [petType]: newPets });
  }

  return (


    <Card>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-amber-300 mb-2" />
        <h4>{name}</h4>
        <div className="bodyMD mt-8">Does {name} have any preferences?</div>
        <div className="flex gap-4 mt-2 mb-8">
          <PillButton active={preferencesData.true} onClick={() => updateFoodPreferences({ ...preferencesData, true: true })}>
            Yes
          </PillButton>
          <PillButton active={!preferencesData.true} onClick={() => updateFoodPreferences({ ...preferencesData, true: false, preferences: [] })}>No</PillButton>
        </div>
        {preferencesData.true && <div className="flex flex-col items-center">
          <div className="grid grid-cols-4 gap-6">
            {OPTIONS.map((option) => (
              <CardButton active={preferencesData.preferences.includes(option.name)} key={option.name} onClick={() => {
                const preferences = preferencesData.preferences.includes(option.name)
                  ? preferencesData.preferences.filter(a => a !== option.name)
                  : [...preferencesData.preferences, option.name];
                updateFoodPreferences({ ...preferencesData, preferences });
              }}>{option.name}</CardButton>
            ))}
          </div>
          <div className="w-80">
            <div className="mt-8 bodyMD text-gray-800">Other preferences (optional)</div>
            <Input 
              placeholder="Enter any other preferences" 
              className="mt-2 w-full" 
              value={preferencesData.preferences
                .filter(a => !OPTIONS.some(option => option.name === a))
                .join(", ")}
              onChange={(e) => {
                const otherPreferences = e.target.value
                  .split(",")
                  .map(a => a.trim())
                  .filter(Boolean);
                const standardPreferences = preferencesData.preferences
                  .filter(a => OPTIONS.some(option => option.name === a));
                updateFoodPreferences({
                  ...preferencesData,
                  preferences: [...standardPreferences, ...otherPreferences]
                });
              }} 
            />
          </div>
        </div>}
      </div>
    </Card>

  );
}
