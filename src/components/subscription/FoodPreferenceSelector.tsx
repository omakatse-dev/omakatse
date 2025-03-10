import React from "react";
import CardButton from "../common/CardButton";
import Input from "../common/Input";

export default function FoodPreferenceSelector() {
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
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-6">
        {OPTIONS.map((option) => (
          <CardButton key={option.name}>{option.name}</CardButton>
        ))}
      </div>
      <div className="w-80">
        <div className="mt-8 bodyMD text-gray-800">Other preferences (optional)</div>
        <Input placeholder="Enter any other preferences" className="mt-2 w-full" />
      </div>
    </div>
  );
}
