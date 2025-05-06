'use client';
import { Review } from '@/types/Types';
import { StarIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
export default function ReviewCard({ review }: { review: Review }) {
  const rating = review.rating;
  const fullStars = Math.floor(rating);
  const partialFill = rating % 1;
  const [isModalOpen, setIsModalOpen] = useState(false);

  //console.log(review.pictures);

  return (
    <div className="w-full rounded-xl bg-white p-6 md:rounded-[1.25rem]">
      <div className="flex items-center justify-between">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="relative">
              <StarIcon
                className={`h-5 w-5 ${
                  index < fullStars ? 'text-yellow' : 'text-gray-200'
                }`}
              />
              {index === fullStars && partialFill > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${partialFill * 100}%` }}
                >
                  <StarIcon className="text-yellow h-5 w-5" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bodySM">{review.date}</div>
      </div>
      <div className="bodyXL mt-2">{review.author}</div>
      <h4 className="mt-6 mb-3">{review.title}</h4>
      <div className="bodySM flex flex-col text-gray-800">
        {review.product
          .split('-')[1]
          ?.split('/')
          .map((option, index) => (
            <span key={index} className="text-sm">
              {option.trim().split(':')[0].trim()}
            </span>
          ))}
      </div>
      <div className="bodyMD mt-3">{review.body}</div>
      {review.image && (
        <button onClick={() => setIsModalOpen(true)}>
          <Image
            src={review.image}
            alt={review.title}
            width={100}
            height={100}
            className="mt-6 h-20 w-20 rounded-xl border-1 border-gray-200"
          />
        </button>
      )}

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            {review.image && (
              <Image
                src={review.image}
                alt={review.title}
                width={600}
                height={600}
                className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
              />
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-primary border-primary absolute -top-4 -right-4 rounded-full bg-white p-2"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
