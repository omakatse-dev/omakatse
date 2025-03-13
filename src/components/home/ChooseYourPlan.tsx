import React from 'react'
import Button from '@/components/common/Button'
import Tabs from '@/components/common/Tabs'

function ChooseYourPlan() {

    const [selectedTab, setSelectedTab] = React.useState("Small Box");

  return (
      <div className="bg-gray-200 flex flex-col px-6 lg:px-12 py-15 lg:py-20 gap-8 lg:gap-10 items-center">
        <h2 className="text-center">Choose your plan</h2>

        <div className="rounded-[2.5rem] p-3">
          <Tabs
            tabs={["Small Box", "Large Box"]}
            selectedTab={selectedTab}
            onChange={(tab) => setSelectedTab(tab)}
            className="bg-gray-50"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="flex bg-gray-50 rounded-[2.5rem] flex-col gap-5 text-center px-5 py-8 lg:w-1/4">
            <h4>Trial</h4>
            <div className="flex flex-col">
              <h1>40</h1>
              <h3 className="text-gray-500">AED/mo</h3>
            </div>
            <b className="bodyLG font-normal">to just try your first box</b>
          </div>
          <div className="flex bg-gray-50 rounded-[2.5rem] flex-col gap-5 text-center px-5 py-8 lg:w-1/4">
            <h4>3 Months</h4>
            <div className="flex flex-col">
              <h1>35</h1>
              <h3 className="text-gray-500">AED/mo</h3>
            </div>
            <b className="bodyLG font-normal">save AED 20</b>
          </div>
          <div className="flex bg-gray-50 rounded-[2.5rem] flex-col gap-5 text-center px-5 py-8 lg:w-1/4">
            <h4>6 months</h4>
            <div className="flex flex-col">
              <h1>30</h1>
              <h3 className="text-gray-500">AED/mo</h3>
            </div>
            <b className="bodyLG font-normal">Super savings, save AED 40</b>
          </div>
          <div className="flex bg-yellow-light rounded-[2.5rem] flex-col gap-5 text-center px-5 py-8 lg:w-1/4">
            <h4>12 Months</h4>
            <div className="flex flex-col">
              <h1>25</h1>
              <h3 className="text-gray-500">AED/mo</h3>
            </div>
            <b className="bodyLG font-normal">Super savings, save AED 80</b>
          </div>
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
