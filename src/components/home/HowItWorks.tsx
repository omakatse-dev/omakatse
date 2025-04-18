import React from "react";
import Button from "../common/Button";
import Link from "next/link";
import HowItWorksCard from "./HowItWorksCard";

function HowItWorks() {
  return (
    <div className="bg-pink-pastel justify-items-center">
    <div className="flex flex-col px-6 lg:px-12 py-10 lg:py-20 max-w-screen-2xl">
      <h2 className="text-3xl flex place-content-center mb-5 text-primary">
        How it works
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 lg:mb-10">
        <HowItWorksCard
          step={1}
          imageSrc="/assets/kumo_details.svg"
          imageAlt="Kumo Details"
          title="Share your pet's name, age, and what makes them purr"
          description="Let us know your pet's quirks and preferences."
        />
        <HowItWorksCard
          step={2}
          imageSrc="/assets/kumo_customise.svg"
          imageAlt="Kumo Customisation"
          title="We handpick items based on your pet's needs"
          description="We curate the best goodies tailored just for your pets."
        />
        <HowItWorksCard
          step={3}
          imageSrc="/assets/kumo_delivery.svg"
          imageAlt="Kumo Delivery"
          title="Expect a box of joy at your door each month"
          description="We send it straight to you, no chasing required."
        />
      </div>

      <Button variant="primary" className="w-full lg:w-fit lg:self-center">
        <Link href="/subscribe/step-1" passHref>
          Build your box now
        </Link>
      </Button>
    </div>
    </div>
  );
}

export default HowItWorks;