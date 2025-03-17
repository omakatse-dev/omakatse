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
    <div className="flex md:flex-row flex-col-reverse gap-5 w-full md:px-0">
      <div className="flex md:flex-col flex-row gap-5 md:w-1/8 md:justify-start justify-center mx-8 md:mx-0 border-b-1 md:border-b-0 pb-8 md:pb-0">
        {images.nodes.map((image, index) => (
          <button
            key={image.url}
            onClick={() => setSelectedIndex(index)}
            className={`border-2 rounded-xl bg-white ${
              selectedIndex === index ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              src={image.url}
              alt="product"
              width={80}
              height={80}
              className="rounded-xl border-primary p-1"
            />
          </button>
        ))}
      </div>

      {/* Main Image - Clickable */}
      <button onClick={openModal} className="md:w-7/8 mx-6 md:mx-0">
        <Image
          src={images.nodes[selectedIndex].url}
          alt="product"
          className="bg-white rounded-xl md:w-full aspect-square border-primary justify-self-center p-12"
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