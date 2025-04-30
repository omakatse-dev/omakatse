import React from "react";
import Button from "../common/Button";
import Image from "next/image";
import Link from "next/link";

export default function MainLandingPage() {
  return (
    <div className="max-w-screen-2xl justify-items-center mx-auto">
      <div className="w-full py-5 px-6 xl:px-18 flex flex-col-reverse text-center xl:flex-row xl:justify-between">
        <div className="xl:text-left xl:pt-20 xl:pl-20 xl:mb-20 mb-12 w-full xl:w-1/2">
          <div className="xl:hidden mb-3 xl:mb-5 text-[2.5rem] font-bold text-primary font-parkinsans leading-[1.1]">
            A one-stop subscription service
          </div>
          <h1 className="h1 hidden xl:block mb-3 xl:mb-5 text-primary">
            A one-stop subscription service
          </h1>
          <div className="mb-5 xl:mb-10 font-normal text-2xl xl:text-[2rem] text-gray-800 leading-[1.2]">
            tailored for your furry family members
          </div>
          <Link href="/subscribe/step-1">
            <Button variant="primary" className="w-full xl:w-fit">
              Build your box now
            </Button>
          </Link>
        </div>
        <Image
          src="assets/OmakatseLandingFirst.svg"
          alt="Omakatse's Landing Page"
          width={600}
          height={200}
          className="self-center xl:auto xl:h-auto"
        />
      </div>
      {/* <div
        className="flex flex-col relative bg-yellow rounded-4xl my-10 xl:mx-20 px-5 xl:px-40 py-20 xl:py-40 gap-4 xl:gap-10"
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
          className="absolute xl:w-58 h-auto -top-12 -left-6 xl:-left-16 xl:-top-8"
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
          className="absolute xl:w-58 h-auto -bottom-22 -right-8 xl:-bottom-24 xl:-right-26"
        />
      </div> */}
    </div>
  );
}
