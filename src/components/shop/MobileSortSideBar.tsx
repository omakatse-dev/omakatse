import { ArrowsUpDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function MobileSortSideBar({
  isOpen,
  handleClose,
  sortingOptions,
  selectedSortingOption,
  setSelectedSortingOption,
}: {
  isOpen: boolean;
  handleClose: () => void;
  sortingOptions: string[];
  selectedSortingOption: string;
  setSelectedSortingOption: (option: string) => void;
}) {
  return (
    <>
      <div
        className={`w-screen h-screen bg-primary/50 absolute z-20 ${
          !isOpen ? "hidden" : "block"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-screen bg-yellow-pastel z-30 flex flex-col items-center p-8 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-row justify-between w-full border-b border-gray-400 pb-4">
          <div className="flex flex-row items-center">
            <ArrowsUpDownIcon className="w-6 mr-1" />
            <div className="bodyLG font-semibold">Sort by</div>
          </div>
          <XMarkIcon
            className="w-6 cursor-pointer stroke-2"
            onClick={handleClose}
          />
        </div>
        <div className="flex flex-col gap-3 w-full my-5">
          {sortingOptions.map((option) => (
            <div
              key={option}
              className={`bodyMD ${
                option === selectedSortingOption &&
                "underline underline-offset-4 font-bold"
              }`}
              onClick={() => {
                handleClose();
                setSelectedSortingOption(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
