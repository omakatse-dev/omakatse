"use client";

import Button from "../components/common/Button";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Tabs from "@/components/common/Tabs";
import { useState } from "react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("Small Box");

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

      <div className="flex flex-col bg-pink-pastel px-6 lg:px-12 py-12 lg:py-20">
        <h2 className="text-3xl flex place-content-center mb-5">
          How it works
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 mb-8 lg:mb-10">
          <div className="relative mt-10">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center text-pink text-3xl border-1 border-gray-200 font-parkinsans absolute font-bold -top-10 left-1/2 -translate-x-1/2 z-1">
              1
            </div>
            <div className="bg-gray-50 rounded-[1.25rem] px-10 py-20 flex flex-col gap-5 text-center items-center drop-shadow-[8px_8px_0px_rgba(238,128,127,1)] lg:h-full">
              <Image
                src="/assets/kumo_details.svg"
                width={272}
                height={200}
                alt="Kumo Details"
              />
              <h3>Tell us your pet details</h3>
              <b className="bodyLG font-normal">
                A one-stop subscription service tailored for your furry family
                members
              </b>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center text-pink text-3xl border-1 border-gray-200 font-parkinsans absolute font-bold -top-10 left-1/2 -translate-x-1/2 z-1">
              2
            </div>
            <div className="bg-gray-50 rounded-[1.25rem] px-10 py-20 flex flex-col gap-5 text-center items-center drop-shadow-[8px_8px_0px_rgba(238,128,127,1)] lg:h-full">
              <Image
                src="/assets/kumo_customise.svg"
                width={272}
                height={200}
                alt="Kumo Details"
              />
              <h3>We will customise the box</h3>
              <b className="bodyLG font-normal">
                A one-stop subscription service tailored for your furry family
                members
              </b>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center text-pink text-3xl border-1 border-gray-200 font-parkinsans absolute font-bold -top-10 left-1/2 -translate-x-1/2 z-1">
              3
            </div>
            <div className="bg-gray-50 rounded-[1.25rem] px-10 py-20 flex flex-col gap-5 text-center items-center drop-shadow-[8px_8px_0px_rgba(238,128,127,1)] lg:h-full">
              <Image
                src="/assets/kumo_delivery.svg"
                width={272}
                height={200}
                alt="Kumo Details"
              />
              <h3>Delivered to your door monthly</h3>
              <b className="bodyLG font-normal">
                A one-stop subscription service tailored for your furry family
                members
              </b>
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          className="w-full sm:w-auto justify-self-center"
        >
          Build your box now
        </Button>
      </div>

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

      <div className="bg-gray-50 px-6 lg:px-12 py-10 lg:py-20 flex flex-col gap-8 lg:gap-15">
        <h2 className="text-center">Omakatse's blog</h2>

        <div className="flex flex-col lg:flex-row  lg:justify-between gap-8">
          <div className="border-1 border-gray-500 rounded-xl p-8 lg:w-1/3">
            <div className="mb-4 flex gap-4">
              <div className="bg-gray-200 rounded-[1.25rem] px-3 py-1">
                Category
              </div>
              <div className="bodySM text-gray-500 items-center inline-flex">
                5 min read
              </div>
            </div>
            <h4 className="mb-2">Blog title heading</h4>
            <div className="bodyMD mb-8">Blog desription will go here</div>
            <button className="bodyButton w-full flex gap-2">
              View more blogs
              <ChevronDownIcon className="h-6 w-6 stroke-black stroke-[2]" />
            </button>
          </div>
          <div className="border-1 border-gray-500 rounded-xl p-8 lg:w-1/3">
            <div className="mb-4 flex gap-4">
              <div className="bg-gray-200 rounded-[1.25rem] px-3 py-1">
                Category
              </div>
              <div className="bodySM text-gray-500 items-center inline-flex">
                5 min read
              </div>
            </div>
            <h4 className="mb-2">Blog title heading</h4>
            <div className="bodyMD mb-8">Blog desription will go here</div>
            <button className="bodyButton w-full flex gap-2">
              View more blogs
              <ChevronDownIcon className="h-6 w-6 stroke-black stroke-[2]" />
            </button>
          </div>
          <div className="border-1 border-gray-500 rounded-xl p-8 lg:w-1/3">
            <div className="mb-4 flex gap-4">
              <div className="bg-gray-200 rounded-[1.25rem] px-3 py-1">
                Category
              </div>
              <div className="bodySM text-gray-500 items-center inline-flex">
                5 min read
              </div>
            </div>
            <h4 className="mb-2">Blog title heading</h4>
            <div className="bodyMD mb-8">Blog desription will go here</div>
            <button className="bodyButton w-full flex gap-2">
              View more blogs
              <ChevronDownIcon className="h-6 w-6 stroke-black stroke-[2]" />
            </button>
          </div>
        </div>
        <Button
          variant="primary"
          className="w-full lg:w-fit lg:justify-self-center"
        >
          View more blogs
        </Button>
      </div>

      <div className="bg-yellow flex flex-col py-15 px-8 gap-8">
        <h1 className="text-white text-center text-5xl">@Omakatse</h1>
        <div className="flex flex-row"></div>
      </div>
    </div>
  );
}
