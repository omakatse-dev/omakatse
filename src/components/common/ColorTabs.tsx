import React from "react";

export default function ColorTabs({
  tabs,
  selectedTab,
  onChange,
  className,
}: {
  tabs: string[];
  selectedTab: string;
  onChange: (tab: string) => void;
  className?: string;
}) {
  return (
    <div className={`${className} flex gap-4 bodyMD`}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`w-10 h-10 rounded-full cursor-pointer border mb-1 ${
            tab === selectedTab ? "border-black" : "border-transparent"
          }`}
          onClick={() => onChange(tab)}
          style={{
            backgroundColor: `${tab}`,
          }}
        ></div>
      ))}
    </div>
  );
}