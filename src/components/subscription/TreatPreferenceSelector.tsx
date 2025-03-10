import React from "react";
import OMCheckbox from "../common/OMCheckbox";

export default function TreatPreferenceSelector() {
  const PREFERENCES = [
    "Dry treats",
    "Crunchy treats",
    "Wet treats",
    "Freeze-dried",
    "Soft chewy treats",
  ];
  return (
    <div>
      <div className="bodyMD mt-8 text-gray-800">
        Treat preferences (optional)
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {PREFERENCES.map((preference) => (
          <div key={preference} className="flex items-center gap-2">
            <OMCheckbox />
            {preference}
          </div>
        ))}
      </div>
    </div>
  );
}
