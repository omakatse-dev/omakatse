import React from "react";
import Image from "next/image";

interface HowItWorksCardProps {
  step: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  step,
  imageSrc,
  imageAlt,
  title,
  description,
}) => {
  return (
    <div className="relative mt-10">
      <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center text-pink text-3xl border-1 border-gray-200 font-parkinsans absolute font-bold -top-10 left-1/2 -translate-x-1/2 z-1">
        {step}
      </div>
      <div className="bg-gray-50 md:rounded-[2rem] rounded-[1.25rem] px-6 lg:px-10 pt-10 lg:pt-20 pb-6 lg:pb-10 flex flex-col gap-5 text-center items-center drop-shadow-[8px_8px_0px_rgba(238,128,127,1)] lg:h-full">
        <Image src={imageSrc} width={272} height={200} alt={imageAlt} />
        <h3 className="text-primary font-bold">{title}</h3>
        <b className="bodyLG font-normal text-primary">{description}</b>
      </div>
    </div>
  );
};

export default HowItWorksCard;