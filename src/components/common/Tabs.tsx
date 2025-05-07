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
  const activeStyles = "bg-yellow border border-1 mb-1";
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
    <div className={`${className} rounded-full z-1 px-8 py-3 flex gap-5 font-semibold`}>
      {tabs.map((tab) => (
        <div key={tab} className="relative group w-full sm:w-fit">
          {/* Bottom tab */}
          {selectedTab === tab && (
            <div
            className="absolute right-[-4px] bottom-[-4px] w-full h-full rounded-full bg-white border border-black"
            aria-hidden="true"
            />
          )}
          
          {/* Top tab */}
          <div
            className={`relative z-1 px-4 sm:px-10 py-4 rounded-full w-full h-full cursor-pointer text-xs lg:text-base
              ${selectedTab === tab ? activeStyles : ""}`}
            onClick={() => onChange(tab)}
          >
            <div className="flex items-center justify-center w-full">
              {renderTabIcon(tab)}
              <span className="whitespace-nowrap overflow-hidden">{tab}</span>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
}
