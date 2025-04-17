import React from "react";
import Button from "../common/Button";
import Image from "next/image";

export default function MainLandingPage() {
  return (
    <div className="flex">
      <div className="w-full py-5 px-6 lg:px-18 flex flex-col-reverse text-center lg:flex-row lg:justify-between">
        <div className="lg:text-left lg:pt-20 lg:pl-20 lg:mb-20 mb-12 w-full">
          <h2 className="mb-3 lg:mb-5 text-primary">
            A one-stop subscription service
          </h2>
          <h3 className="mb-5 lg:mb-10 font-normal text-primary">
            tailored for your furry family members
          </h3>
          <Button variant="primary" className="w-full lg:w-fit">
            Build your box now
          </Button>
        </div>
        <Image
          src="assets/OmakatseLandingFirst.svg"
          alt="Omakatse's Landing Page"
          width={600}
          height={200}
          className="self-center lg:w-[806px] lg:h-[518px]"
        />
      </div>
    </div>
  );
}
