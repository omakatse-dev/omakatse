import React from 'react';

interface PricingCardProps {
  title: string;
  price: number;
  durationText: string;
  savingsText: string;
  highlight?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  durationText,
  savingsText,
  highlight = false,
}) => {
  return (
    <div
      className={`flex flex-col gap-5 text-center px-5 py-8 md:rounded-[2rem] rounded-[1.25rem] lg:w-1/4 ${
        highlight ? 'bg-yellow-light' : 'bg-gray-50'
      }`}
    >
      <h4 className="text-primary">{title}</h4>
      <div className="flex flex-col">
        <h1>{price}</h1>
        <h3 className="text-gray-500">{durationText}</h3>
      </div>
      <b className="bodyLG font-normal text-gray-800">{savingsText}</b>
    </div>
  );
};

export default PricingCard;