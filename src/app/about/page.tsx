import React from 'react';
import Button from '../../components/common/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function page() {
  return (
    <div className="bg-[url('/assets/pattern.svg')] bg-auto lg:bg-[length:50%_auto]">
      <div className="mt-32 w-screen max-w-[120rem] px-4 lg:px-24">
        <div className="bg-yellow-light flex w-full flex-col rounded-3xl px-8 py-16 lg:flex-row-reverse lg:px-20 lg:pt-20">
          <div className="flex justify-center lg:w-1/2">
            <Image
              src="/assets/kittenandbox.svg"
              alt="Kitten and Box"
              width="684"
              height="415"
              className="w-full"
            />
          </div>
          <div className="lg:w-1/2">
            <h3 className="mb-5 text-gray-500">Japan, In a box</h3>
            <div className="text-primary font-parkinsans mb-10 text-4xl leading-[1.1] font-bold md:text-7xl">
              UAE&apos;s first curated pet experience
            </div>
            <Button>Build your box now</Button>
          </div>
        </div>
        <div className="w-full px-2">
          <div className="bg-white-100 flex flex-col gap-8 py-10 lg:flex-row lg:justify-center lg:gap-20 lg:py-20">
            <div className="flex flex-col gap-5 lg:max-w-2xl">
              <h4 className="text-yellow"> Our Name </h4>
              <h3 className="text-primary">
                {' '}
                A surprise selection of seasonal pet goodies, curated just for
                your fur kids.
              </h3>
              <p className="bodyMD text-gray-800">
                OmaKatse originates from “Omakase” but with a ‘K’ for ‘kats and
                kanines’. The name stands for “I leave it up to you” — a dining
                style in Japan where meals are based on the chef’s seasonal
                recommendation. With OmaKatse’s subscription box, you leave it
                up to our team to curate the best of Japanese pet goods each
                season for you and your fur-children to discover and enjoy.
              </p>
            </div>
            <Image
              src="/assets/AboutTee.svg"
              alt="About Tee"
              width="518"
              height="1"
              className="self-center rounded-3xl lg:w-700 lg:max-w-xl"
            />
          </div>
          <div className="bg-yellow relative my-10 flex flex-col gap-4 rounded-4xl px-6 py-20 lg:mx-20 lg:gap-10 lg:px-40 lg:py-40">
            <Image
              src="/assets/kumo_white.svg"
              alt="Kumo White"
              width={136.5}
              height={121}
              className="absolute -top-12 -left-6 h-auto lg:-top-8 lg:-left-16 lg:w-58"
            />
            <h4 className="text-center text-white"> Our Philosophy </h4>
            <h3 className="text-primary text-center font-bold">
              Natural, intentional, and thoughtfully made–just how we like it.
            </h3>
            <p className="bodyMD text-center text-gray-800">
              We specialize in providing a wide selection of high-quality
              Japanese pet products, supplies, snacks, and treats that are not
              commonly found in the UAE. To meet the high standards of Japanese
              paw-rents, every product we carry features high quality ingredient
              lists, with a focus on natural and minimal additives.
            </p>
            <Image
              src="/assets/kumo_black.svg"
              alt="Kumo White"
              width={136.5}
              height={121}
              className="absolute -right-6 -bottom-22 h-auto lg:-right-26 lg:-bottom-24 lg:w-58"
            />
          </div>
          <div className="bg-white-100 flex flex-col gap-10 py-5 lg:flex-row-reverse lg:justify-center lg:gap-20 lg:py-20">
            <div className="flex flex-col gap-5 lg:max-w-2xl">
              <h4 className="text-yellow"> Our Box </h4>
              <h3 className="text-primary">
                {' '}
                From play to snack time, it's everything your pet needs (and
                secretly wants){' '}
              </h3>
              <p className="bodyMD text-gray-800">
                For your high standards of quality petcare, our customers will
                find everything they need — including natural, additive-free
                snacks and treats, human-grade ingredients, specialty care
                products, and unique toys. Our marketplace also makes it easy to
                reorder products your fur-children loved from the subscription
                box.
              </p>
            </div>
            <Image
              src="/assets/our_box.svg"
              alt="Our Box Image"
              width="518"
              height="1"
              className="self-center rounded-3xl lg:w-500 lg:max-w-xl"
            />
          </div>

          <div className="mb-15 flex w-full flex-col justify-center gap-6 rounded-4xl bg-gray-200 px-8 py-10 lg:mb-20 lg:px-16 lg:py-20">
            <h3 className="text-center text-gray-800"> Join our team </h3>
            <p className="text-primary bodyLG mb-4 text-center">
              {' '}
              We do the best for cats, cat parents and our planet. No egos. No
              shortcuts. No compromises.{' '}
            </p>
            <div className="flex w-full justify-center">
              <Button className="w-full lg:w-fit" variant="primary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
