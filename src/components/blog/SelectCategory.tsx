import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SelectCategoryProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  categories,
  onCategorySelect,
  selectedCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setIsRotated(!isRotated);
  };

  return (
    <div className="justify-center mb-8 w-full md:w-fit">
      {/* For small screens, show dropdown */}
      <div className="md:hidden sticky top-20">
        <div className="relative w-full">
          <button
            onClick={handleButtonClick}
            className="w-full text-left py-3 px-5 rounded-full border-1 bg-white bodyMD flex justify-between"
          >
            {selectedCategory || "Select Category"}
            <ChevronDownIcon
              className={`h-5 transition-transform duration-300 ${
                isRotated ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`flex flex-col gap-5 absolute w-full mt-2 bg-white border rounded-[2rem] p-5 transition-all duration-300 ease-in-out transform ${
              isOpen
                ? "max-h-auto opacity-100 translate-y-0"
                : "max-h-auto opacity-0 translate-y-[-20px] overflow-hidden"
            }`}
          >
            {categories.map((category) => (
              <div
                key={category}
                className={`cursor-pointer bodyMD ${
                  selectedCategory === category ? "font-bold" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* For md and above screens, show clickable categories */}
      <div className="hidden md:flex flex-col space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`${
              selectedCategory === category
                ? "border-b-1 bodyMD font-bold"
                : "text-gray-700"
            } text-left p-1 w-fit`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
