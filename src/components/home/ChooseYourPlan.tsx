import React from "react";
import Button from "@/components/common/Button";
import Tabs from "@/components/common/Tabs";
import PricingCard from "./PricingCard";
import Link from "next/link";

function ChooseYourPlan() {
  const [selectedTab, setSelectedTab] = React.useState("Small Box");

  return (
    <div className="bg-gray-200 justify-items-center">
    <div className="max-w-screen-2xl w-full flex flex-col px-6 lg:px-12 py-15 lg:py-20 gap-8 lg:gap-10 items-center">
      <h2 className="text-center text-primary">Choose your plan</h2>

      <div className="rounded-[2.5rem] w-full sm:w-fit">
        <Tabs
          tabs={["Small Box", "Large Box"]}
          selectedTab={selectedTab}
          onChange={(tab) => setSelectedTab(tab)}
          className="bg-gray-50"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <PricingCard
          title="1 Month"
          price={40}
          durationText="AED/mo"
          savingsText="Try us, no commitment"
        />
        <PricingCard
          title="3 Months"
          price={35}
          durationText="AED/mo"
          savingsText="save AED 20"
        />
        <PricingCard
          title="6 Months"
          price={30}
          durationText="AED/mo"
          savingsText="save AED 40"
        />
        <PricingCard
          title="12 Months"
          price={25}
          durationText="AED/mo"
          savingsText="Super savings, save AED 80"
          highlight
        />
      </div>

      <Button variant="primary" className="w-full lg:w-fit lg:self-center">
        <Link href="/subscribe/step-1" passHref>
          Build your box now
        </Link>
      </Button>
    </div>
    </div>
  );
}

export default ChooseYourPlan;
