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

  const nextImage = () => 
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.nodes.length);

  const prevImage = () => 
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.nodes.length - 1 : prevIndex - 1
    );

  return (
    <div className="flex flex-row gap-5 w-full">
      <div className="flex flex-col gap-5 w-1/8">
        {images.nodes.map((image, index) => (
          <button
            key={image.url}
            onClick={() => setSelectedIndex(index)}
            className={`border-2 p-1 rounded-xl ${
              selectedIndex === index ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              src={image.url}
              alt="product"
              width={80}
              height={80}
              className="rounded-xl border-primary"
            />
          </button>
        ))}
      </div>

      {/* Main Image - Clickable */}
      <button onClick={openModal} className="w-7/8">
        <Image
          src={images.nodes[selectedIndex].url}
          alt="product"
          className="bg-gray-500 rounded-xl w-7/8 aspect-square border-primary"
          width={516}
          height={516}
        />
      </button>

      {/* Fullscreen Modal */}
      <ImageZoomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={images.nodes[selectedIndex].url}
        onNext={nextImage}
        onPrev={prevImage}
        images={images.nodes.map((node) => node.url)}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
}