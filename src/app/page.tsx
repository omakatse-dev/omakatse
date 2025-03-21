"use client";

import Button from "../components/common/Button";
import HowItWorks from "@/components/home/HowItWorks";
import ChooseYourPlan from "@/components/home/ChooseYourPlan";
import Blog from "@/components/home/Blog";

export default function Home() {

  return (
    <div className="pt-32">
      <div className="px-6 py-5 lg:px-18 flex flex-col-reverse text-center lg:flex-row lg:justify-between">
        <div className="lg:text-left">
          <h1 className="mb-3 lg:mb-5">A one-stop subscription service</h1>
          <h3 className="mb-5 lg:mb-10 font-normal">
            tailored for your furry family members
          </h3>
          <Button variant="primary" className="w-full lg:w-fit">
            Build your box now
          </Button>
        </div>
        <div className="bg-gray-500 h-80 w-auto lg:w-2/3 lg:h-auto" />
      </div>

      <HowItWorks />

      <ChooseYourPlan />

      <Blog />

      <div className="bg-yellow flex flex-col py-15 px-8 gap-8">
        <h1 className="text-white text-center text-5xl">@Omakatse</h1>
        <div className="flex flex-row"></div>
      </div>
    </div>
  );
}
