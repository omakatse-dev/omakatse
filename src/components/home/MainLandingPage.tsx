import React from "react";
import Button from "../common/Button";
import Image from "next/image";

export default function MainLandingPage() {
  return (
    <div className="flex">
      <div className="w-full py-5 px-6 lg:px-18 flex flex-col-reverse text-center lg:flex-row lg:justify-between">
        <div className="lg:text-left lg:pt-20 lg:pl-20 lg:mb-20 mb-12 w-full">
          <h2 className="h2 lg:hidden mb-3 lg:mb-5 text-primary">
            A one-stop subscription service
          </h2>
          <h1 className="h1 hidden lg:block mb-3 lg:mb-5 text-primary">
            A one-stop subscription service
          </h1>
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
      {/* <div
        className="flex flex-col relative bg-yellow rounded-4xl my-10 lg:mx-20 px-5 lg:px-40 py-20 lg:py-40 gap-4 lg:gap-10"
        style={{
          backgroundImage: "url('/assets/pattern.svg')",
          backgroundSize: "auto",
        }}
      >
        <Image
          src="/assets/kumo_white.svg"
          alt="Kumo White"
          width={136.5}
          height={121}
          className="absolute lg:w-58 h-auto -top-12 -left-6 lg:-left-16 lg:-top-8"
        />
        <h3 className="text-primary text-center font-bold">
          {" "}
          A fun and unique way to experience Japan!
        </h3>
        <Image
          src="/assets/kumo_black.svg"
          alt="Kumo White"
          width={136.5}
          height={121}
          className="absolute lg:w-58 h-auto -bottom-22 -right-8 lg:-bottom-24 lg:-right-26"
        />
      </div> */}
    </div>
  );
}
