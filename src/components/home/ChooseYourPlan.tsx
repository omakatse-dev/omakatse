import React from 'react'
import Button from '@/components/common/Button'
import Tabs from '@/components/common/Tabs'
import PricingCard from './PricingCard';

function ChooseYourPlan() {

    const [selectedTab, setSelectedTab] = React.useState("Small Box");

  return (
      <div className="bg-gray-200 flex flex-col px-6 lg:px-12 py-15 lg:py-20 gap-8 lg:gap-10 items-center">
        <h2 className="text-center text-primary">Choose your plan</h2>

        <div className="rounded-[2.5rem] p-3">
          <Tabs
            tabs={["Small Box", "Large Box"]}
            selectedTab={selectedTab}
            onChange={(tab) => setSelectedTab(tab)}
            className="bg-gray-50"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <PricingCard
            title="Trial"
            price={40}
            durationText="AED/mo"
            savingsText="to just try your first box"
          />
          <PricingCard
            title="3 Months"
            price={35}
            durationText="AED/mo"
            savingsText="save compared to trial"
          />
          <PricingCard
            title="6 Months"
            price={30}
            durationText="AED/mo"
            savingsText="save even more!"
          />
          <PricingCard
            title="12 Months"
            price={25}
            durationText="AED/mo"
            savingsText="best value, highest savings"
            highlight
          />
        </div>

        <div className="w-full">
          <Button
            variant="primary"
            className="w-full sm:w-auto flex justify-self-center"
          >
            Build your box now
          </Button>
        </div>
      </div>
  )
}

export default ChooseYourPlan
