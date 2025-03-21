import { Review } from "@/types/Types";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function ReviewModal({
  review,
  handleClose,
}: {
  review: Review;
  handleClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-yellow-pastel px-16 py-8 gap-6 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <XMarkIcon
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer stroke-2"
          onClick={handleClose}
        />
        <div className="w-full flex justify-between mt-7">
          <div className="flex">
            {Array.from({ length: review.rating }).map((_, index) => (
              <StarIcon key={index} className="w-6 h-6 text-yellow" />
            ))}
          </div>
          <div className="bodySM">{review.date}</div>
        </div>
        <div className="bodyMD text-gray-800 font-semibold">
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
            className="rounded-2xl w-full"
          />
        )}
      </div>
    </div>
  );
}
