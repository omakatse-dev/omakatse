import React from "react";
import CardButton from "../common/CardButton";

export default function PetSelector() {
  return (
    <div className="flex flex-col sm:flex-row gap-10">
      <CardButton active>
        <div className="h-64 w-64 bg-black" />
        Cat
      </CardButton>
      <CardButton>
        <div className="h-64 w-64 bg-black" />
        Cat
      </CardButton>
      <CardButton>
        <div className="h-64 w-64 bg-black" />
        Cat
      </CardButton>
    </div>
  );
}
