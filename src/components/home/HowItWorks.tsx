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
          title="Start with the basics"
          description="Tell us their name, age and what makes them purr or wag."
        />
        <HowItWorksCard
          step={2}
          imageSrc="/assets/kumo_customise.svg"
          imageAlt="Kumo Customisation"
          title="Curated with care"
          description="We handpick the best goodies, just for your pet."
        />
        <HowItWorksCard
          step={3}
          imageSrc="/assets/kumo_delivery.svg"
          imageAlt="Kumo Delivery"
          title="Treat day, every month"
          description="A fresh box at your door, no chasing required."
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