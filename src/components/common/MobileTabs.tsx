import React from "react";
import Image from "next/image";

export default function MobileTabs({
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
  const getIconSrcForTab = (tab: string) => {
    const lower = tab.toLowerCase();
    if (lower.includes("treat")) return "/assets/TreatsIcon.svg";
    if (lower.includes("care products")) return "/assets/CareProductsIcon.svg";
    if (lower.includes("accessories")) return "/assets/AccessoriesIcon.svg";
    return null;
  };
  return (
    <div className={`flex gap-6 bodyMD text-gray-800 mt-4 py-4 border-t border-gray-200 ${className}`}>
      {tabs.map((tab) => {
        const iconSrc = getIconSrcForTab(tab);
        const isSelected = tab === selectedTab;

        return (
          <div
            key={tab}
            className={`flex items-center gap-2 cursor-pointer ${
              isSelected ? "text-primary border-b" : ""
            }`}
            onClick={() => onChange(tab)}
          >
            {iconSrc && (
              <Image
                src={iconSrc}
                alt={`${tab} icon`}
                width={20}
                height={20}
                className ="mb-1"
              />
            )}
            <span>{tab}</span>
          </div>
        );
      })}
    </div>
  );
}
