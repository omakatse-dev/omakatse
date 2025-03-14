import React from "react";
import { OptionValue } from "@/types/Types";
export default function ColorTabs({
  tabs,
  selectedTab,
  onChange,
  className,
}: {
  tabs: OptionValue[];
  selectedTab: string;
  onChange: (tab: string) => void;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <b className="bodyMD font-normal">{selectedTab.split(":")[0]}</b>
      <div className={`${className} flex gap-4 bodyMD`}>
        {tabs.map((tab) => {
          const color = tab.name.split(":")[1];
          return (
            <div
              key={tab.name}
              className={`w-10 h-10 rounded-full cursor-pointer border p-0.5 mb-1 ${
                tab.name === selectedTab ? "border-black" : "border-primary"
              }`}
              onClick={() => onChange(tab.name)}
            >
              <div 
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: `${color}`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
