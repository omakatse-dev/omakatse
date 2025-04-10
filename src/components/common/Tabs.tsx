import React from "react";
import Image from "next/image";

export default function Tabs({
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
  const activeStyles = "bg-yellow border border-primary mb-1";
  const renderTabIcon = (tab: string) => {
    if (tab === "Treats") {
      return (
        <Image
          src="/assets/TreatsIcon.svg"
          alt="Treats Icon"
          width={20}
          height={20}
          className="inline-block mr-2 h-5 w-5"
        />
      );
    } else if (tab === "Care Products") {
      return (
        <Image
          src="/assets/CareProductsIcon.svg"
          alt="Care Products Icon"
          width={20}
          height={20}
          className="inline-block mr-2 h-5 w-5"
        />
      );
    } else if (tab === "Accessories") {
      return (
        <Image
          src="/assets/AccessoriesIcon.svg"
          alt="Accessories Icon"
          width={20}
          height={20}
          className="inline-block mr-2 h-5 w-5"
        />
      );
    }
    return null;
  };
  return (
    <div
      className={`${className} rounded-full px-8 py-3 flex gap-5 font-semibold`}
    >
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`px-6 sm:px-10 py-4 rounded-full cursor-pointer text-xs lg:text-base ${
            tab === selectedTab && activeStyles
          }`}
          onClick={() => onChange(tab)}
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
          <div className="flex items-center">
            {renderTabIcon(tab)}
            <span>{tab}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
