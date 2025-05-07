import React from 'react';
import Image from 'next/image';

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
  description
}) => {
  return (
    <div className="relative mt-10">
      <div className="text-pink font-parkinsans absolute -top-10 left-1/2 z-1 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-1 border-gray-200 bg-white text-3xl font-bold">
        {step}
      </div>
      <div className="flex flex-col items-center gap-5 rounded-[1.25rem] bg-gray-50 px-6 pt-10 pb-6 text-center drop-shadow-[8px_8px_0px_rgba(238,128,127,1)] md:rounded-[2rem] lg:h-full lg:px-10 lg:pt-20 lg:pb-10">
        <Image src={imageSrc} width={272} height={200} alt={imageAlt} />
        <div className="flex h-full flex-col justify-center">
          <h3 className="text-primary font-bold">{title}</h3>
          <b className="bodyLG text-primary font-normal">{description}</b>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksCard;
