"use client";
import { Review } from "@/types/Types";
import { StarIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
export default function ReviewCard({ review }: { review: Review }) {
  const rating = review.rating;
  const fullStars = Math.floor(rating);
  const partialFill = rating % 1;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(review.pictures);

  return (
    <div className="bg-white rounded-xl md:rounded-[1.25rem] p-6 w-full">
      <div className="flex items-center justify-between">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="relative">
              <StarIcon
                className={`w-5 h-5 ${
                  index < fullStars ? "text-yellow" : "text-gray-200"
                }`}
              />
              {index === fullStars && partialFill > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${partialFill * 100}%` }}
                >
                  <StarIcon className="w-5 h-5 text-yellow" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bodySM">{review.date}</div>
      </div>
      <div className="mt-2 bodyXL">{review.author}</div>
      <h4 className="mt-6">{review.title}</h4>
      <div className="bodyMD mt-3">{review.body}</div>
      {review.image && (
        <button onClick={() => setIsModalOpen(true)}>
          <Image
            src={review.image}
            alt={review.title}
            width={100}
            height={100}
            className="w-20 h-20 rounded-xl mt-6 border-1 border-gray-200"
          />
        </button>
      )}

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            {review.image && (
              <Image
                src={review.image}
                alt={review.title}
                width={600}
                height={600}
                className="rounded-xl max-w-[90vw] max-h-[90vh] object-contain"
              />
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-4 -right-4 text-primary bg-white p-2 rounded-full border-primary"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
