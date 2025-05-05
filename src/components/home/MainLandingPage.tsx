import React from 'react';
import Button from '../common/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function MainLandingPage() {
  return (
    <div className="mx-auto max-w-screen-2xl justify-items-center">
      <div className="flex w-full flex-col-reverse px-6 py-5 text-center xl:flex-row xl:justify-between xl:px-18">
        <div className="mb-12 w-full xl:mb-20 xl:w-1/2 xl:pt-20 xl:pl-20 xl:text-left">
          <div className="text-primary font-parkinsans mb-3 text-[2.5rem] leading-[1.1] font-bold xl:mb-5 xl:hidden">
            A one-stop subscription service
          </div>
          <h1 className="h1 text-primary mb-3 hidden xl:mb-5 xl:block">
            A one-stop subscription service
          </h1>
          <div className="mb-5 text-2xl leading-[1.2] font-normal text-gray-800 xl:mb-10 xl:text-[2rem]">
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
          className="xl:auto self-center xl:h-auto"
        />
      </div>

      <div className="w-full px-8 pb-10 xl:pb-0">
      <div
        className="flex flex-col relative bg-yellow rounded-4xl my-10 px-5 xl:px-40 py-20 w-full "
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
        <div className="text-gray-800 text-center font-parkinsans text-[2rem] md:text-6xl font-bold leading-[1.2]">
          {" "}
          A fun and unique way to experience Japan!
        </div>
        <Image
          src="/assets/kumo_black.svg"
          alt="Kumo White"
          width={136.5}
          height={121}
          className="absolute xl:w-58 h-auto -bottom-22 -right-8 xl:-bottom-24 xl:-right-26"
        />
      </div>
      </div>

      <div className="flex w-full flex-col px-6 pb-10 text-center xl:flex-row xl:px-18 xl:pb-20">
        <Image
          src="assets/whoweare_petsphoto.svg"
          alt="Pets Photo"
          width={600}
          height={200}
          className="xl:auto self-center xl:h-auto"
        />
        <div className="w-full text-left xl:mb-20 xl:w-1/2 xl:pt-20 xl:pl-20">
          <h3 className="h1 mb-3 pt-10 text-gray-500 xl:mb-8 xl:block xl:pt-0">
            Who we are
          </h3>
          <h2 className="text-primary mb-8">
            We sniff out the good stuff so you don&apos;t have to.
          </h2>
          <Link href="/about">
            <Button variant="primary" className="w-full xl:w-fit">
              Our story
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
