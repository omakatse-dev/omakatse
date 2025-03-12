import React from "react";
import Button from "../../components/common/Button";
import Link from "next/link";
import Image from "next/image";

export default function page() {
  return (
    <div className="w-screen mt-32 px-8 lg:px-24">

      <div className="bg-yellow-pastel rounded-3xl px-8 py-16 lg:px-16 lg:py-32">
        <div className="lg:pr-108">
          <h3 className="mb-5 text-gray-500">Who we are</h3>
          <h1 className="mb-10">
            Let&apos;s explore the real flavors of Japan together.
          </h1>
          <Button>Build your box now</Button>
        </div>
      </div>

      <div className="bg-white-100 py-10 lg:py-20 flex flex-col lg:flex-row gap-8 lg:gap-20">
        <div className="flex flex-col gap-5">
          <h4 className="text-yellow"> Our Founder </h4>
          <h3 className="text-black">
            {" "}
            Omakatse&apos;s founder, Tee, is a second generation immigrant that
            grew up in Canada.
          </h3>
          <p className="bodyMD">
            While growing up with her family&apos;s restaurant, an abandoned
            black cat started visiting them daily. As the family was leaving on
            the last day of the restaurant, the same black cat chased them down
            the street. Seeing this, the family took her in, joining the family
            dog, Casper, and that began a journey into cat rescuing for Tee that
            is still going on 20 years later today. The black cat had four
            children, two of which are still alive and well back in Canada at
            the ripe age of 20. They were later joined by the family&apos;s
            second dog, Oscar.
          </p>
        </div>
        <div className="bg-gray-700 rounded-4xl h-80 lg:w-600"></div>
      </div>

      <div className="bg-white-100 py-5 lg:py-20 flex flex-col lg:flex-row-reverse gap-10 lg:gap-20">
        <div className="flex flex-col gap-5">
          <h4 className="text-yellow"> XXXX </h4>
          <h3 className="text-black"> XXXX </h3>
          <p className="bodyMD">
            Throughout her student and adult life, Tee would volunteer at local
            animal shelters in Canada. She is also an avid equestrian, while
            being a big supporter of equine and farm animal welfare in North
            America.
            <br />
            <br />
            She relocated to Dubai with her Canadian tuxedo cat, Toby. On a
            chance encounter in Dubai, she rescued her now Arabian Mau family
            member, Olly, nursing him back to health. Since then, she has been
            an active community member supporting cat welfare and rescues, while
            also personally helping out around her local community with feeding,
            trap & release, fostering and rescue work.
          </p>
        </div>
        <div className="bg-gray-700 rounded-4xl h-80 lg:w-600"></div>
      </div>

      <div className="bg-white-100 py-5 lg:py-20 flex flex-col lg:flex-row gap-10 lg:gap-20">
        <div className="flex flex-col gap-5">
          <h4 className="text-yellow"> XXXX </h4>
          <h3 className="text-black">
            {" "}
            With Omakatse, Tee endeavours to introduce holistic pet products
            from Japan that she has been using all these years as a paw-rent.
          </h3>
          <p className="bodyMD">
            During extensive stays in Japan due to work, she would always
            appreciate the large varieties of Japanese pet products and
            accessories. With numerous local brands developing ranges of
            products with a story and motivation, it demonstrates the Japanese
            culture of taking pet ownership seriously. To satisfy the demands of
            pet owners in Japan, high quality ingredient lists are provided,
            with a focus on natural and minimal additives. By curating products
            directly from Japan, Tee hopes to spread this philosophy in the UAE.
          </p>
        </div>
        <div className="bg-gray-700 rounded-4xl h-80 lg:w-600"></div>
      </div>


        <div className="flex flex-col relative bg-yellow rounded-4xl my-10 lg:mx-20 px-5 lg:px-40 py-20 lg:py-40 gap-4 lg:gap-10">
          <Image
            src="/assets/kumo_white.svg"
            alt="Kumo White"
            width={136.5} 
            height={121} 
            className="absolute lg:w-58 h-auto -top-7 -left-3.5 lg:-left-16 lg:-top-8"
          />
          <h4 className="text-white text-center"> Our Mission </h4>
          <h3 className="text-black text-center">
            {" "}
            At Omakatse Pets, we believe that every cat and dog deserves a
            forever home, and our purpose is to help these beautiful animals in
            every way possible.{" "}
          </h3>
          <p className="bodyMD text-center px-10">
            We are committed to giving back to the felines and canines community
            and work with our shelter partners to donate vital supplies and
            engaging toys, feeders to donate pet food to strays, as well as fund
            local pet adoption events, all to help those who need it the most!
            Thank you for your support, and happy shopping!
          </p>
          <Image
            src="/assets/kumo_black.svg"
            alt="Kumo White"
            width={136.5}
            height={121} 
            className="absolute lg:w-58 h-auto -bottom-24 -right-10 lg:-bottom-24 lg:-right-26"
          />
        </div>


      <div className="bg-white-100 py-5 lg:py-20 flex flex-col lg:flex-row gap-10 lg:gap-20">
        <div className="flex flex-col gap-5">
          <h4 className="text-yellow"> Our CEOs </h4>
          <h3 className="text-black"> Meet Toby & Olly</h3>
          <p className="bodyMD">
            At OmaKatse Pets, we speak meow and ruff. Every product on our
            website has been tested and approved by Toby, Olly, or their furry
            pals to ensure that we only sell high-quality product. Toby and
            Olly, the website’s in-house Quality Check Meownager, take their job
            very seriously. They even evaluate the product on our social
            platforms, allowing you to learn what they think of our offerings
            directly.
          </p>
          <Button variant="primary">Build your box now</Button>
        </div>
        <div className="bg-gray-700 rounded-4xl h-80 lg:w-600"></div>
      </div>

      <div className="bg-gray-300 rounded-4xl my-15 lg:my-20 px-8 py-16 lg:px-16 lg:py-32 flex flex-col justify-center gap-6">
          <h3 className="text-gray-800 text-center"> Join our team </h3>
          <p className="text-black text-center bodyLG mb-4">
            {" "}
            We do the best for cats, cat parents and our planet. No egos. No
            shortcuts. No compromises.{" "}
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button className="w-full" variant="primary">Contact Us</Button>
            </Link>
          </div>
        </div>
    </div>
  );
}
