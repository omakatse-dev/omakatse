import React from "react";
import CardButton from "../common/CardButton";

export default function SubscriptionOptions() {
  const OPTIONS = [
    {
      title: "Trial",
      price: 40,
      description: "try your first box",
    },
    {
      title: "3 Months",
      price: 35,
      description: "save AED 20",
    },
    {
      title: "6 Months",
      price: 30,
      description: "save AED 40",
    },
    {
      title: "12 Months",
      price: 25,
      description: "save AED 60",
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-8">
      {OPTIONS.map((option) => (
        <CardButton key={option.title}>
          <div>
            <h4>{option.title}</h4>
            <h1 className="mt-8">{option.price}</h1>
            <h3 className="text-gray-500">AED/mo</h3>
            <div className="mt-8 text-gray-800">{option.description}</div>
          </div>
        </CardButton>
      ))}
    </div>
  );
}
