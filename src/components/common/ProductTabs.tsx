interface TabProps {
  name: string;
}

export default function ProductTabs({
  tabs,
  selectedTab,
  onChange,
  className,
}: {
  tabs: TabProps[];
  selectedTab: string;
  onChange: (tab: string) => void;
  className?: string;
}) {
  const activeStyles = "bg-yellow border border-black";
  return (
    <div className={`${className} flex gap-4 bodyMD`}>
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={`px-4 py-2 rounded-xl cursor-pointer border-1 ${
            tab.name === selectedTab && activeStyles
          }`}
          onClick={() => onChange(tab.name)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
}
