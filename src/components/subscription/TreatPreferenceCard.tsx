import React from "react";
import Card from "../common/Card";
// import Selector from "../common/Selector";
import Textfield from "../common/Textfield";
import TreatPreferenceSelector from "./TreatPreferenceSelector";

export default function TreatPreferenceCard() {
  // const options = [
  //   { id: 1, name: "None (No treats or snacks)" },
  //   { id: 2, name: "A few (less than daily)" },
  //   { id: 3, name: "Sometimes (1-3 daily)" },
  //   { id: 4, name: "Often (4+ daily)" },
  // ];

  return (
    <Card>
      <div className="flex flex-col">
        <div className="w-8 h-8 rounded-full bg-amber-300 mb-2 self-center" />
        <h4 className="self-center">Bella</h4>
        <div>
          <div className="bodyMD mt-8 text-gray-800">
            How often does Bella get treats?
          </div>
          {/* <Selector
            options={options}
            placeholder="Treats frequency"
            className="w-full mt-2"
          /> */}
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
