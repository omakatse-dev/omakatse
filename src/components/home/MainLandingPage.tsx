import React from 'react';
import Button from '../common/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function MainLandingPage() {
  return (
    <div className="mx-auto max-w-screen-2xl justify-items-center">
      <div className="flex w-full flex-col-reverse px-6 py-5 text-center xl:flex-row  xl:px-18">
        <div className="w-full xl:pb-12 xl:w-1/2 xl:pt-12 xl:pl-12 xl:text-left">
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
            <Button variant="primary" className="w-full md:w-fit">
              Build your box now
            </Button>
          </Link>
        </div>
        <div className="xl:w-1/2 flex">
        <Image
          src="assets/OmakatseLandingFirst.svg"
          alt="Omakatse's Landing Page"
          width={600}
          height={200}
          className="self-center w-full"
        />
        </div>
      </div>

      <div className="w-full px-8 pb-10 xl:px-12 xl:pb-0">
        <div
          className="bg-yellow relative my-10 flex w-full flex-col rounded-4xl px-5 py-20 xl:px-40"
          style={{
            backgroundImage: "url('/assets/pattern.svg')",
            backgroundSize: '65%',
            backgroundBlendMode: 'soft-light',
          }}
        >
          <Image
            src="/assets/kumo_white.svg"
            alt="Kumo White"
            width={136.5}
            height={121}
            className="absolute -top-12 -left-6 h-auto xl:-top-28 xl:-left-10 xl:w-58"
          />
          <div className="font-parkinsans text-center text-[2rem] leading-[1.2] font-bold text-gray-800 md:text-6xl">
            {' '}
            A fun and unique way to experience Japan!
          </div>
          <Image
            src="/assets/kumo_black.svg"
            alt="Kumo White"
            width={136.5}
            height={121}
            className="absolute -right-4 -bottom-12 h-auto xl:right-8 xl:-bottom-26 xl:w-58"
          />
        </div>
      </div>

      <div className="flex w-full flex-col px-6 pb-10 text-center xl:flex-row md:px-12 xl:px-18 xl:pb-20">
        <div className="w-full xl:w-1/2 flex justify-center">
        <Image
          src="assets/whoweare_petsphoto.svg"
          alt="Pets Photo"
          width={600}
          height={200}
          className="xl:auto xl:h-auto w-full"
        />
        </div>
        <div className="w-full text-left xl:mb-20 xl:w-1/2 xl:pt-20 xl:pl-20">
          <h3 className="h1 mb-3 pt-10 text-gray-500 xl:mb-8 xl:block xl:pt-0">
            Who we are
          </h3>
          <h2 className="text-primary mb-8">
            We sniff out the good stuff so you don&apos;t have to.
          </h2>
          <Link href="/about">
            <Button variant="primary" className="w-full md:w-fit">
              Our story
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
