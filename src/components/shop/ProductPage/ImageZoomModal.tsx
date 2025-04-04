import React, { useState, useRef } from "react";
import Modal from "react-modal";
import Image from "next/image";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface ImageZoomModalProps {
  isOpen: boolean;
  closeModalHandler: () => void;
  imageUrl: string;
  images: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  closeModalHandler,
  imageUrl,
  images,
  selectedIndex,
  setSelectedIndex,
}) => {
  const [zoom, setZoom] = useState(1); // 1 = normal, 2 = zoomed
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const imageRef = useRef<HTMLDivElement | null>(null);

  const handleImageClick = (event: React.MouseEvent) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const clickX = event.clientX - left;
    const clickY = event.clientY - top;

    // Convert to percentage for `transform-origin`
    const percentX = (clickX / width) * 100;
    const percentY = (clickY / height) * 100;

    setTransformOrigin(`${percentX}% ${percentY}%`);
    setZoom((prevZoom) => (prevZoom === 1 ? 3 : 1));
  };

  const nextImage = () => {
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModalHandler}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 z-[10]"
      overlayClassName="fixed inset-0 z-[100]"
      ariaHideApp={false}
    >
      {/* Close Button */}
      <button
        onClick={closeModalHandler}
        className="z-200 absolute top-14 right-6 bg-white p-2 border-primary border-1 rounded-full cursor-pointer"
      >
        <XMarkIcon className="size-5" />
      </button>

      <div className="relative max-w-3xl w-full flex flex-col items-center z-[101]">
        <button
          onClick={prevImage}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary bg-white border-1 p-2 rounded-full z-10 cursor-pointer"
        >
          <ChevronLeftIcon className="size-6" />
        </button>

        {/* Fixed Container */}
        <div
          ref={imageRef}
          className="border-2 border-gray-200 rounded-lg w-[600px] h-[600px] overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={imageUrl}
            alt="full-size product"
            width={600}
            height={600}
            className="rounded-lg transition-transform duration-300 p-16 bg-white"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: transformOrigin,
              cursor: zoom === 1 ? "zoom-in" : "zoom-out",
            }}
          />
        </div>

        <button
          onClick={nextImage}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-primary bg-white border-1 p-2 rounded-full z-10 cursor-pointer"
        >
          <ChevronRightIcon className="size-6" />
        </button>
      </div>

      {/* Thumbnail Row */}
      <div className="flex gap-2 mt-5">
        {images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`border-2 p-1 rounded-md cursor-pointer ${
              selectedIndex === index ? "border-gray-300" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt="thumbnail"
              width={60}
              height={60}
              className="rounded-md"
            />
          </button>
        )) || <p className="text-white">No images available</p>}
      </div>
    </Modal>
  );
};

export default ImageZoomModal;
