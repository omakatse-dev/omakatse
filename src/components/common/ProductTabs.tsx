import React from "react";

export default function ProductTabs({
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
  const activeStyles = "bg-yellow border border-black mb-1";
  return (
    <div className={`${className} flex gap-4 bodyMD`}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`px-4 py-2 rounded-xl cursor-pointer ${
            tab === selectedTab && activeStyles
          }`}
          onClick={() => onChange(tab)}
          style={
            selectedTab === tab
              ? {
                  border: "1px solid black",
                }
              : {}
          }
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
