import React from "react";

export default function TipCard() {
  return (
    <div className="flex items-center gap-3 bg-gray-50 p-6 rounded-2xl">
      <div className="w-8 h-8 bg-amber-200" />
      <div className="bodyMD font-bold">Tip</div>
      <div className="bodyXS text-gray-800">
        For more than 2 pets, we recommend getting a large box to cater to all
        your fur babies.
      </div>
    </div>
  );
}
