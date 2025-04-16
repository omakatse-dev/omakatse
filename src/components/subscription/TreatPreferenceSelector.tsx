import React from "react";
import OMCheckbox from "../common/OMCheckbox";

export default function TreatPreferenceSelector({
  preferences,
  onChange,
}: {
  preferences: string[];
  onChange: (preferences: string[]) => void;
}) {
  const PREFERENCES = [
    "Dry treats",
    "Crunchy treats",
    "Wet treats",
    "Freeze-dried",
    "Soft chewy treats",
  ];
  return (
    <div className="w-full">
      <div className="bodyMD mt-8 text-gray-800">
        Treat preferences (optional)
      </div>
      <div className="flex flex-col gap-2 mt-2 cursor-pointer">
        {PREFERENCES.map((preference) => (
          <div
            key={preference}
            className="flex items-center gap-2"
            onClick={() =>
              onChange(
                preferences.includes(preference)
                  ? preferences.filter((p) => p !== preference)
                  : [...preferences, preference]
              )
            }
          >
            <OMCheckbox
              checked={preferences.includes(preference)}
              onChange={() => {}}
            />
            {preference}
          </div>
        ))}
      </div>
    </div>
  );
}
