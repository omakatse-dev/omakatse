import React from "react";

export default function Tabs({
  tabs,
  selectedTab,
  setSelectedTab,
}: {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const activeStyles = "bg-yellow border border-black mb-1";
  return (
    <div className={`bg-gray-200 rounded-full px-8 py-3 flex gap-5 font-semibold`}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`px-10 py-4 rounded-full cursor-pointer ${
            tab === selectedTab && activeStyles
          }`}
          onClick={() => setSelectedTab(tab)}
          style={
            selectedTab === tab
              ? {
                  boxShadow:
                    "5px 5px 0px rgba(253,250,244,1), 6.5px 6.5px 0px rgba(0,0,0,1)",
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
