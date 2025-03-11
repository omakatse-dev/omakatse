import React from "react";
import Card from "../common/Card";
import CardButton from "../common/CardButton";

export default function SizeSelector() {
  return (
    <Card>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-amber-300 mb-2" />
        <h4>Bella</h4>
        <div className="mt-8 flex flex-row gap-8">
          <CardButton>
            <div className="w-32 h-16 bg-amber-300 mb-4" />
            Skinny
          </CardButton>
          <CardButton>
            <div className="w-32 h-16 bg-amber-300 mb-4" />
            Just Right
          </CardButton>
          <CardButton>
            <div className="w-32 h-16 bg-amber-300 mb-4" />
            Chubby
          </CardButton>
        </div>
      </div>
    </Card>
  );
}
