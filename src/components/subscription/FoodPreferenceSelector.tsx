import React, { useState, useEffect } from "react";
import CardButton from "../common/CardButton";
import Input from "../common/Input";
import Card from "../common/Card";
import PillButton from "../common/PillButton";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import Image from "next/image";

import beef from "../../../public/assets/Beef.svg";
import poultry from "../../../public/assets/Poultry.svg";
import seafood from "../../../public/assets/Seafood.svg";
import deer from "../../../public/assets/Deer.svg";
import lamb from "../../../public/assets/Lamb.svg";
import dairy from "../../../public/assets/Dairy.svg";
import wheat from "../../../public/assets/Wheat.svg";
import cat1 from "../../../public/assets/Cat1.svg";
import cat2 from "../../../public/assets/Cat2.svg";
import cat3 from "../../../public/assets/Cat3.svg";
import cat4 from "../../../public/assets/Cat4.svg";
import dog1 from "../../../public/assets/Dog1.svg";
import dog2 from "../../../public/assets/Dog2.svg";
import dog3 from "../../../public/assets/Dog3.svg";
import dog4 from "../../../public/assets/Dog4.svg";

type FoodPreferenceData = {
  true: boolean;
  preferences: string[];
};

const variantMapping: Record<
  0 | 1 | 2 | 3,
  "yellow" | "blue" | "green" | "pink"
> = {
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

const CAT_OPTIONS = [
  {
    image: poultry,
    name: "Poultry",
  },
  {
    image: beef,
    name: "Beef",
  },
  {
    image: seafood,
    name: "Seafood",
  },
  {
    image: deer,
    name: "Deer",
  },
];

const DOG_OPTIONS = [
  {
    image: beef,
    name: "Beef",
  },
  {
    image: dairy,
    name: "Dairy",
  },
  {
    image: wheat,
    name: "Wheat",
  },
  {
    image: poultry,
    name: "Poultry",
  },
  {
    image: lamb,
    name: "Lamb",
  },
  {
    image: seafood,
    name: "Seafood",
  },
];

export default function FoodPreferenceSelector({
  name,
  petType,
  petIndex,
  catCount = 0,
}: {
  name: string;
  petType: "catsDetails" | "dogsDetails";
  petIndex: number;
  catCount?: number;
}) {
  const [showError, setShowError] = useState(false);
  const petDetails = useSubscriptionFormStore(
    (state) => state[petType]?.[Number(petIndex)]
  );
  const preferencesData = petDetails?.preferences;
  const setData = useSubscriptionFormStore((state) => state.setData);

  // Check if preferences are selected when Yes is chosen
  const hasValidPreferences =
    !preferencesData?.true ||
    (preferencesData.true && preferencesData.preferences.length > 0);

  const updateFoodPreferences = (newFoodPreferences: FoodPreferenceData) => {
    setShowError(false); // Reset error when making changes
    const pets = useSubscriptionFormStore.getState()[petType] || [];
    const newPets = [...pets];
    newPets[Number(petIndex)] = {
      ...pets[Number(petIndex)],
      preferences: newFoodPreferences,
    };
    setData({ [petType]: newPets });
  };

  // Show error if Yes is selected but no preferences are chosen
  useEffect(() => {
    if (preferencesData?.true && preferencesData.preferences.length === 0) {
      setShowError(true);
    }
  }, [preferencesData]);

  const options = petType === "catsDetails" ? CAT_OPTIONS : DOG_OPTIONS;

  return (
    <Card
      className="flex flex-col items-center w-full"
      variant={
        variantMapping[(petIndex + catCount) as keyof typeof variantMapping]
      }
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex sm:flex-col items-center gap-4 sm:gap-0">
          <Image
            alt={`${name} ${petIndex + 1}`}
            src={
              petType === "catsDetails"
                ? catMapping[petIndex as keyof typeof catMapping]
                : dogMapping[petIndex as keyof typeof dogMapping]
            }
            width={100}
            height={100}
            className="w-16 h-16 sm:w-24 sm:h-24"
          />
          <h4>{name}</h4>
        </div>
        <div className="bodyMD mt-8">Does {name} have any preferences?</div>
        <div className="flex gap-4 mt-2 mb-8 w-full justify-center">
          <PillButton
            active={preferencesData?.true === true}
            onClick={() => {
              updateFoodPreferences({ preferences: [], true: true });
              setShowError(true); // Show error when Yes is selected
            }}
            className="w-1/2 sm:w-fit"
          >
            Yes
          </PillButton>
          <PillButton
            active={preferencesData?.true === false}
            onClick={() =>
              updateFoodPreferences({
                ...preferencesData,
                true: false,
                preferences: [],
              })
            }
            className="w-1/2 sm:w-fit"
          >
            No
          </PillButton>
        </div>
        {preferencesData?.true && (
          <>
            {showError && !hasValidPreferences && (
              <p className="text-red-500 my-4">
                Please select at least one preference
              </p>
            )}
            <div className="flex flex-col items-center w-full">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 w-full">
                {options.map((option) => (
                  <CardButton
                    active={preferencesData.preferences.includes(option.name)}
                    key={option.name}
                    onClick={() => {
                      const preferences = preferencesData.preferences.includes(
                        option.name
                      )
                        ? preferencesData.preferences.filter(
                            (a) => a !== option.name
                          )
                        : [...preferencesData.preferences, option.name];
                      updateFoodPreferences({
                        ...preferencesData,
                        preferences,
                      });
                    }}
                    className="w-full flex sm:flex-col justify-center items-center gap-2"
                  >
                    <Image
                      src={option.image}
                      alt={option.name}
                      width={24}
                      height={24}
                      className="w-12 h-12 sm:w-24 sm:h-24"
                    />
                    <div>{option.name}</div>
                  </CardButton>
                ))}
              </div>
              <div className="w-full sm:w-80">
                <div className="mt-8 bodyMD text-gray-800">
                  Other preferences (optional)
                </div>
                <Input
                  placeholder="Enter any other preferences"
                  className="mt-2 w-full"
                  value={preferencesData.preferences
                    .filter((a) => !options.some((option) => option.name === a))
                    .join(", ")}
                  onChange={(e) => {
                    const otherPreferences = e.target.value
                      .split(",")
                      .map((a) => a.trim())
                      .filter(Boolean);
                    const standardPreferences =
                      preferencesData.preferences.filter((a) =>
                        options.some((option) => option.name === a)
                      );
                    updateFoodPreferences({
                      ...preferencesData,
                      preferences: [
                        ...standardPreferences,
                        ...otherPreferences,
                      ],
                    });
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
