import React from "react";
import Card from "../common/Card";
import Selector from "../common/Selector";
import Textfield from "../common/Textfield";
import TreatPreferenceSelector from "./TreatPreferenceSelector";

export default function TreatPreferenceCard() {
  return (
    <Card>
      <div className="flex flex-col">
        <div className="w-8 h-8 rounded-full bg-amber-300 mb-2 self-center" />
        <h4 className="self-center">Bella</h4>
        <div>
          <div className="bodyMD mt-8 text-gray-800">
            How often does Bella get treats?
          </div>
          <Selector placeholder="Treats frequency" className="w-full mt-2" />
        </div>
        <TreatPreferenceSelector />
        <div className="bodyMD mt-8 text-gray-800">
          Additional comments (optional)
        </div>
        <Textfield placeholder="Enter any additional comments" />
      </div>
    </Card>
  );
}
