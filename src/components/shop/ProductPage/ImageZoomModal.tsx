import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef
} from 'react-zoom-pan-pinch';

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
  setSelectedIndex
}) => {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const nextImage = () => {
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex(
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    );
  };

  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [mouseMoved, setMouseMoved] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
    setMouseMoved(false);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - dragStart.current.x);
    const dy = Math.abs(e.clientY - dragStart.current.y);
    if (dx > 5 || dy > 5) {
      setMouseMoved(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModalHandler}
      className="fixed inset-0 z-[10] max-h-[100vh] flex-col items-center justify-center bg-gray-50 p-8 pt-32 sm:flex sm:pt-6"
      overlayClassName="fixed inset-0 z-[100]"
      ariaHideApp={false}
    >
      {/* Close Button */}
      <button
        onClick={closeModalHandler}
        className="border-primary absolute top-12 right-12 z-200 cursor-pointer rounded-full border-1 bg-white p-2"
      >
        <XMarkIcon className="size-6 sm:size-10" />
      </button>

      <div className="relative z-[101] flex w-full max-w-6xl flex-col items-center overflow-hidden">
        <button
          onClick={prevImage}
          className="text-primary border-primary absolute top-1/2 left-5 z-10 -translate-y-1/2 transform cursor-pointer rounded-full border-1 bg-white p-2"
        >
          <ChevronLeftIcon className="size-6 sm:size-10" />
        </button>

        <div
          ref={imageRef}
          className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border-2 border-gray-200"
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <TransformWrapper
              initialScale={1}
              initialPositionX={200}
              initialPositionY={100}
              ref={transformComponentRef}
              panning={{ disabled: !isZoomed }}
              doubleClick={{ disabled: true }}
              zoomAnimation ={{ disabled: true }}
              wheel={{ disabled: true }}
            >
              {({ zoomIn, zoomOut }) => (
                <TransformComponent>
                  <div
                    className={
                      !isZoomed
                        ? 'cursor-zoom-in'
                        : isDragging
                          ? 'cursor-grabbing'
                          : 'cursor-grab'
                    }
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={() => {
                      setIsDragging(false);
                    }}
                    onClickCapture={() => {
                      if (mouseMoved) return;

                      if (isZoomed) {
                        zoomOut();
                        setIsZoomed(false);
                      } else {
                        zoomIn();
                        setIsZoomed(true);
                      }
                    }}
                  >
                    <Image
                      src={imageUrl}
                      alt="test"
                      id="imgExample"
                      draggable={false}
                      width={900}
                      height={900}
                    />
                  </div>
                </TransformComponent>
              )}
            </TransformWrapper>
          </div>
        </div>

        <button
          onClick={nextImage}
          className="text-primary border-primary absolute top-1/2 right-5 z-10 -translate-y-1/2 transform cursor-pointer rounded-full border-1 bg-white p-2"
        >
          <ChevronRightIcon className="size-6 sm:size-10" />
        </button>
      </div>

      {/* Thumbnail Row */}
      <div className="mt-5 flex gap-2">
        {images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`cursor-pointer rounded-md border-2 p-1 ${
              selectedIndex === index ? 'border-gray-300' : 'border-transparent'
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
