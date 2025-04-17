"use client";

import Tabs from "@/components/common/Tabs";
import PlanSelector from "@/components/subscription/PlanSelector";
import TipCard from "@/components/subscription/TipCard";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/common/Button";
export default function ChoosePlanPage() {
  const [boxSize, setBoxSize] = useState<string>("Small Box");
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  return (
    <div className="mt-28 sm:mt-48 px-6 pb-10 sm:pb-20 w-screen max-w-6xl flex flex-col gap-8">
      <Link
        href="/renew-subscription"
        className="bodyButton flex items-center gap-2 cursor-pointer w-fit"
      >
        <ChevronLeftIcon className="w-6" />
        Go back
      </Link>
      <div className="flex flex-col text-center self-center gap-2">
        <h3 className="font-bold">Choose your plan</h3>
        <div className="bodyMD text-gray-800">
          We&apos;ll send your box out monthly, no need to lift a paw.
        </div>
      </div>
      <Tabs
        tabs={["Small Box", "Large Box"]}
        selectedTab={boxSize}
        onChange={(tab) => setBoxSize(tab)}
        className="bg-gray-200 w-fit self-center"
      />
      <TipCard className="bg-white w-fit self-center" />
      <PlanSelector
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />
      <div className="bodyMD text-gray-800 text-center">
        Your subscription will automatically renew at the end of the billing
        cycle.
      </div>
      <Button>Add to cart</Button>
    </div>
  );
}
