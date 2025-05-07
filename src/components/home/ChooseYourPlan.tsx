import React from 'react';
import Button from '@/components/common/Button';
import Tabs from '@/components/common/Tabs';
import PricingCard from './PricingCard';
import Link from 'next/link';
import prices from '@/data/BoxPrice.json';

function ChooseYourPlan() {
  const [selectedTab, setSelectedTab] = React.useState('Small Box');

  return (
    <div className="justify-items-center bg-gray-200">
      <div className="flex w-full max-w-screen-2xl flex-col items-center gap-8 px-6 py-15 lg:gap-10 lg:px-12 lg:py-20">
        <h2 className="text-primary text-center">Choose your plan</h2>

        <div className="w-full rounded-[2.5rem] sm:w-fit">
          <Tabs
            tabs={['Small Box', 'Large Box']}
            selectedTab={selectedTab}
            onChange={(tab) => setSelectedTab(tab)}
            className="bg-gray-50"
          />
        </div>

        <div className="flex w-full flex-col gap-8 lg:flex-row">
          <PricingCard
            title="1 Month"
            price={prices[selectedTab as 'Small Box' | 'Large Box'][0]}
            durationText="AED/mo"
            savingsText="Try us, no commitment"
          />
          <PricingCard
            title="3 Months"
            price={prices[selectedTab as 'Small Box' | 'Large Box'][1]}
            durationText="AED/mo"
            savingsText="save AED 20"
          />
          <PricingCard
            title="6 Months"
            price={prices[selectedTab as 'Small Box' | 'Large Box'][2]}
            durationText="AED/mo"
            savingsText="save AED 40"
          />
          <PricingCard
            title="12 Months"
            price={prices[selectedTab as 'Small Box' | 'Large Box'][3]}
            durationText="AED/mo"
            savingsText="Super savings, save AED 80"
            highlight
          />
        </div>

        <Button variant="primary" className="w-full lg:w-fit lg:self-center">
          <Link href="/subscribe/step-1" passHref>
            Build Your Box Now
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ChooseYourPlan;
