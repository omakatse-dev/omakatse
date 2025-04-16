"use client";

import { ProductImageNode } from "@/types/Types";
import Image from "next/image";
import React, { useState } from "react";
import ImageZoomModal from "./ImageZoomModal";

export default function ProductImages({
  images,
}: {
  images: ProductImageNode;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex md:flex-row flex-col-reverse w-full md:px-0">
      <div className="flex md:flex-col flex-row gap-5 md:w-1/8 md:justify-start justify-center mx-6 md:mx-0 border-b-1 md:border-b-0 pb-8 md:pb-0">
        {images.nodes.map((image, index) => (
          <button
            key={image.url}
            onClick={() => setSelectedIndex(index)}
            className={`rounded-lg md:rounded-xl bg-white`}
          >
            <Image
              src={image.url}
              alt="product"
              width={80}
              height={80}
              className={`rounded-lg md:rounded-xl ${
                selectedIndex === index
                  ? "border-black border-1"
                  : "border-primary"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Main Image - Clickable */}
      <div className="w-full pb-2 px-6">
        <button onClick={openModal} className="w-full relative cursor-pointer">
          <Image
            src={images.nodes[selectedIndex].url}
            alt="product"
            className="bg-white rounded-xl md:rounded-[1.25rem] md:w-full aspect-square border-primary justify-self-center"
            width={516}
            height={516}
          />
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center p-1">
            <Image
              src="/assets/zoom.svg"
              alt="Zoom Icon"
              width={64}
              height={64}
            />
          </div>
        </button>
      </div>

      {/* Fullscreen Modal */}
      <ImageZoomModal
        isOpen={isModalOpen}
        closeModalHandler={closeModal}
        imageUrl={images.nodes[selectedIndex].url}
        images={images.nodes.map((node) => node.url)}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
}
