import React from "react";

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
  return (
    <div className={`flex gap-6 bodyMD text-gray-800 mt-4 py-4 border-t border-gray-200 ${className}`}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`${
            tab === selectedTab && "text-primary underline underline-offset-4"
          }`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
