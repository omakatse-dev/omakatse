import React from 'react';
import Button from '../../components/common/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function page() {
  return (
    <div className="bg-[url('/assets/pattern.svg')] bg-auto lg:bg-[length:50%_auto]">
      <div className="mt-32 w-screen max-w-[120rem] px-8 lg:px-24">
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
        <div className="w-full">
          <div className="bg-white-100 flex flex-col gap-8 py-10 lg:flex-row lg:justify-center lg:gap-20 lg:py-20">
            <div className="flex flex-col gap-5 lg:max-w-2xl">
              <h4 className="text-yellow"> Our Founder </h4>
              <h3 className="text-primary">
                {' '}
                Omakatse&apos;s founder, Tee, is a second generation immigrant
                that grew up in Canada.
              </h3>
              <p className="bodyMD text-gray-800">
                While growing up with her family&apos;s restaurant, an abandoned
                primary cat started visiting them daily. As the family was
                leaving on the last day of the restaurant, the same primary cat
                chased them down the street. Seeing this, the family took her
                in, joining the family dog, Casper, and that began a journey
                into cat rescuing for Tee that is still going on 20 years later
                today. The primary cat had four children, two of which are still
                alive and well back in Canada at the ripe age of 20. They were
                later joined by the family&apos;s second dog, Oscar.
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

          <div className="bg-white-100 flex flex-col gap-10 py-5 lg:flex-row-reverse lg:justify-center lg:gap-20 lg:py-20">
            <div className="flex flex-col gap-5 lg:max-w-2xl">
              <h4 className="text-yellow"> History </h4>
              <h3 className="text-primary"> How It Started </h3>
              <p className="bodyMD text-gray-800">
                Throughout her student and adult life, Tee would volunteer at
                local animal shelters in Canada. She is also an avid equestrian,
                while being a big supporter of equine and farm animal welfare in
                North America.
                <br />
                <br />
                She relocated to Dubai with her Canadian tuxedo cat, Toby. On a
                chance encounter in Dubai, she rescued her now Arabian Mau
                family member, Olly, nursing him back to health. Since then, she
                has been an active community member supporting cat welfare and
                rescues, while also personally helping out around her local
                community with feeding, trap & release, fostering and rescue
                work.
              </p>
            </div>
            <Image
              src="/assets/AboutCat.svg"
              alt="About"
              width="518"
              height="1"
              className="self-center rounded-3xl lg:w-500 lg:max-w-xl"
            />
          </div>

          <div className="bg-white-100 flex flex-col gap-10 py-5 lg:flex-row lg:justify-center lg:gap-20 lg:py-20">
            <div className="flex flex-col gap-5 lg:max-w-2xl">
              <h4 className="text-yellow"> Our Inspiration </h4>
              <h3 className="text-primary">
                {' '}
                With Omakatse, Tee endeavours to introduce holistic pet products
                from Japan that she has been using all these years as a
                paw-rent.
              </h3>
              <p className="bodyMD text-gray-800">
                During extensive stays in Japan due to work, she would always
                appreciate the large varieties of Japanese pet products and
                accessories. With numerous local brands developing ranges of
                products with a story and motivation, it demonstrates the
                Japanese culture of taking pet ownership seriously. To satisfy
                the demands of pet owners in Japan, high quality ingredient
                lists are provided, with a focus on natural and minimal
                additives. By curating products directly from Japan, Tee hopes
                to spread this philosophy in the UAE.
              </p>
            </div>
            <Image
              src="/assets/AboutCat.svg"
              alt="About"
              width="518"
              height="1"
              className="self-center rounded-3xl lg:w-500 lg:max-w-xl"
            />{' '}
          </div>

          <div className="bg-yellow relative my-10 flex flex-col gap-4 rounded-4xl px-5 py-20 lg:mx-20 lg:gap-10 lg:px-40 lg:py-40">
            <Image
              src="/assets/kumo_white.svg"
              alt="Kumo White"
              width={136.5}
              height={121}
              className="absolute -top-12 -left-6 h-auto lg:-top-8 lg:-left-16 lg:w-58"
            />
            <h4 className="text-center text-white"> Our Mission </h4>
            <h3 className="text-primary text-center font-bold">
              {' '}
              At Omakatse Pets, we believe that every cat and dog deserves a
              forever home, and our purpose is to help these beautiful animals
              in every way possible.{' '}
            </h3>
            <p className="bodyMD text-center text-gray-800">
              We are committed to giving back to the felines and canines
              community and work with our shelter partners to donate vital
              supplies and engaging toys, feeders to donate pet food to strays,
              as well as fund local pet adoption events, all to help those who
              need it the most! Thank you for your support, and happy shopping!
            </p>
            <Image
              src="/assets/kumo_black.svg"
              alt="Kumo White"
              width={136.5}
              height={121}
              className="absolute -right-8 -bottom-22 h-auto lg:-right-26 lg:-bottom-24 lg:w-58"
            />
          </div>

          <div className="bg-white-100 flex flex-col gap-10 py-5 lg:flex-row lg:justify-center lg:gap-20 lg:py-20">
            <div className="flex flex-col gap-5 lg:max-w-2xl">
              <h4 className="text-yellow"> Our CEOs </h4>
              <h3 className="text-primary"> Meet Toby & Olly</h3>
              <p className="bodyMD text-gray-800">
                At OmaKatse Pets, we speak meow and ruff. Every product on our
                website has been tested and approved by Toby, Olly, or their
                furry pals to ensure that we only sell high-quality product.
                Toby and Olly, the website’s in-house Quality Check Meownager,
                take their job very seriously. They even evaluate the product on
                our social platforms, allowing you to learn what they think of
                our offerings directly.
              </p>
              <Button
                variant="primary"
                className="w-full lg:w-fit lg:self-start"
              >
                Build your box now
              </Button>
            </div>
            <Image
              src="/assets/TobyDolly.svg"
              alt="Tobby and Dolly"
              width="518"
              height="1"
              className="self-center rounded-3xl lg:w-400 lg:max-w-xl"
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
              <Button className="w-full" variant="primary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
