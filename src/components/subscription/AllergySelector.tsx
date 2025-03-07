import React from "react";
import CardButton from "../common/CardButton";
import Input from "../common/Input";

export default function AllergySelector() {
  const ALLERGIES = [
    {
      name: "Beef",
      image: "/images/beef.png",
    },
    {
      name: "Dairy",
      image: "/images/beef.png",
    },
    {
      name: "Wheat",
      image: "/images/beef.png",
    },
    {
      name: "Poultry",
      image: "/images/beef.png",
    },
    {
      name: "Lamb",
      image: "/images/beef.png",
    },
    {
      name: "Seafood",
      image: "/images/beef.png",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {ALLERGIES.map((allergy) => (
          <CardButton key={allergy.name}>{allergy.name}</CardButton>
        ))}
      </div>
      <div className="bodyMD text-gray-800 mt-8">
        Other allergies (optional)
      </div>
      <Input placeholder="Enter any other allergies" className="w-full mt-2" />
    </div>
  );
}
