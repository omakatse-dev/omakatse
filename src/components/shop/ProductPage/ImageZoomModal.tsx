import React, { useState, useRef, useEffect } from "react";
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
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [mouseMoved, setMouseMoved] = useState(false);
  const DRAG_THRESHOLD = 5;
  const limit = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(value, max));
  };
  
  useEffect(() => {
    setOffset({ x: 0, y: 0 });
    setTransformOrigin("center center");
    setZoom(1);
  }, [selectedIndex]);

  const handleImageClick = (event: React.MouseEvent) => {
    if (!imageRef.current || mouseMoved) {
      return; 
    }
  
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const clickX = event.clientX - left;
    const clickY = event.clientY - top;
  
    const percentX = (clickX / width) * 100;
    const percentY = (clickY / height) * 100;
  
    if (zoom === 1) {
      setTransformOrigin(`${percentX}% ${percentY}%`);
      setZoom(2);
    } else {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    }
  };

  const nextImage = () => {
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex(
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    
    e.stopPropagation();
    
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
  
    const deltaX = (e.clientX - dragStart.x) / zoom;
    const deltaY = (e.clientY - dragStart.y) / zoom;
  
    if (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD) {
      setMouseMoved(true); 
    }
  
    const newX = offset.x + deltaX;
    const newY = offset.y + deltaY;
  
    // Calculate image size after zoom
    const containerSize = 600; 
    const imageSize = containerSize * zoom;
    const maxOffset = (imageSize - containerSize) / 2;
  
    // limit offset so image stays within the container
    const limitedX = limit(newX, -maxOffset, maxOffset);
    const limitedY = limit(newY, -maxOffset, maxOffset);
  
    setOffset({ x: limitedX, y: limitedY });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  
    setTimeout(() => {
      setMouseMoved(false);
    }, 0);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModalHandler}
      className="fixed inset-0 sm:flex flex-col items-center justify-center max-h-[100vh] bg-gray-50 z-[10] pt-32 sm:pt-0 p-8"
      overlayClassName="fixed inset-0 z-[100]"
      ariaHideApp={false}
    >
      {/* Close Button */}
      <button
        onClick={closeModalHandler}
        className="z-200 absolute top-12 right-12 bg-white p-2 border-primary border-1 rounded-full cursor-pointer"
      >
        <XMarkIcon className="size-6 sm:size-10" />
      </button>

      <div className="relative max-w-6xl w-full flex flex-col items-center z-[101] overflow-hidden">
        <button
          onClick={prevImage}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary border-primary  bg-white border-1 p-2 rounded-full z-10 cursor-pointer"
        >
          <ChevronLeftIcon className="size-6 sm:size-10" />
        </button>

        <div
          ref={imageRef}
          className="border-2 border-gray-200 rounded-lg aspect-square overflow-hidden flex items-center justify-center"
          style={{ cursor: zoom === 1 ? "zoom-in" : dragging ? "grabbing" : "grab" }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={handleImageClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image
              src={imageUrl}
              alt="full-size product"
              width={900}
              height={900}
              draggable={false}
              className="rounded-lg object-contain"
              style={{
                transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
                transformOrigin: transformOrigin,
                transition: dragging ? 'none' : 'transform 0.3s ease'
              }}
            />
          </div>
        </div>

        <button
          onClick={nextImage}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-primary bg-white border-1 border-primary p-2 rounded-full z-10 cursor-pointer"
        >
          <ChevronRightIcon className="size-6 sm:size-10" />
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
              width={80}
              height={80}
              className="rounded-md"
            />
          </button>
        )) || <p className="text-white">No images available</p>}
      </div>
    </Modal>
  );
};

export default ImageZoomModal;