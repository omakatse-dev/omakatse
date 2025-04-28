import Tag from "@/components/common/Tag";
import Pets from "../subscriptions/Pets";
import { PastBoxDetailsType } from "@/types/Types";
import { PetType } from "../subscriptions/SubscriptionCard";
import ProgressBar from "@/components/subscription/ProgressBar";
import BoxContent from "./BoxContent";
import dayjs from "dayjs";

export default function PastBoxCard({ box }: { box: PastBoxDetailsType }) {
  const pets = JSON.parse(box.pets);
  const dogs = pets.filter((pet: PetType) => pet.type === "Dog");
  const cats = pets.filter((pet: PetType) => pet.type === "Cat");
  return (
    <div className="border-primary rounded-2xl p-6 sm:p-8 max-w-4xl flex flex-col gap-8">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
        <Pets dogs={dogs} cats={cats} />
        <Tag className={`h-fit w-fit`}>SHIPPED</Tag>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bodyMD font-semibold text-gray-800">
          Box {box.number % box.planDuration} out of {box.planDuration}
        </div>
        <ProgressBar
          showSteps={false}
          currentStep={box.number % box.planDuration}
          totalSteps={box.planDuration}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:border-r border-gray-200">
          <label className="bodySM text-gray-500">Box size</label>
          <div className="bodyMD font-semibold mt-1">{box.size}</div>
        </div>
        <div className="md:border-r border-gray-200">
          <label className="bodySM text-gray-500">No. of Pets</label>
          <div className="bodyMD font-semibold mt-1">
            {dogs.length > 0 && `${dogs.length} dog(s)`}{" "}
            {cats.length > 0 && `${cats.length} cat(s)`}
          </div>
        </div>
        <div>
          <label className="bodySM text-gray-500">Next billing date</label>
          <div className="bodyMD font-semibold mt-1">{dayjs(box.nextBillingDate).format("DD MMM YYYY")}</div>
        </div>
        <div className="md:border-r border-gray-200">
          <label className="bodySM text-gray-500">Ship to</label>
          <div className="bodyMD font-semibold mt-1">{box.name}</div>
        </div>
        <div className="md:border-r border-gray-200">
          <label className="bodySM text-gray-500">Shipping address</label>
          <div className="bodyMD font-semibold mt-1">{box.address}</div>
        </div>
        <div>
          <label className="bodySM text-gray-500">Shipping method</label>
          <div className="bodyMD font-semibold mt-1">Standard shipping</div>
        </div>
        <div className="md:border-r border-gray-200">
          <label className="bodySM text-gray-500">Box plan</label>
          <div className="bodyMD font-semibold mt-1">
            {box.planDuration} months
          </div>
        </div>
        <div className="md:border-r border-gray-200">
          <label className="bodySM text-gray-500">Monthly payment</label>
          <div className="bodyMD font-semibold mt-1">AED 25</div>
        </div>
        <div>
          <label className="bodySM text-gray-500">Next Renewal Date</label>
          <div className="bodyMD font-semibold mt-1">{dayjs(box.nextRenewalDate).format("DD MMM YYYY")}</div>
        </div>
      </div>
      <hr className="border-gray-200" />
      <h4>What&apos;s in this box?</h4>
      <BoxContent contentsString={box.items} />
    </div>
  );
}
