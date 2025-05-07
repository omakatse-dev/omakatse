import { Review } from '@/types/Types';
import { StarIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function ReviewModal({
  review,
  handleClose
}: {
  review: Review;
  handleClose: () => void;
}) {
  return (
    <div
      className="bg-primary/50 fixed inset-0 z-50 flex items-center justify-center px-8"
      onClick={handleClose}
    >
      <div
        className="bg-yellow-pastel relative flex w-full max-w-xl flex-col gap-6 rounded-2xl px-4 py-8 md:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <XMarkIcon
          className="absolute top-4 right-4 h-6 w-6 cursor-pointer stroke-2"
          onClick={handleClose}
        />
        <div className="mt-7 flex w-full justify-between">
          <div className="flex">
            {Array.from({ length: review.rating }).map((_, index) => (
              <StarIcon key={index} className="text-yellow h-6 w-6" />
            ))}
          </div>
          <div className="bodySM">{review.date}</div>
        </div>
        <div className="bodyMD font-semibold text-gray-800">
          {review.author}
        </div>
        <h4 className="font-bold">{review.title}</h4>
        <p className="bodyMD text-gray-800">{review.body}</p>
        {review.image && (
          <Image
            src={review.image}
            alt="Review Image"
            width={400}
            height={400}
            className="w-full rounded-2xl"
          />
        )}
      </div>
    </div>
  );
}
