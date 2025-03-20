import { Review } from "@/types/Types";
import { StarIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";

export default function ReviewCard({ review }: { review: Review }) {
  const rating = review.rating;
  const fullStars = Math.floor(rating);
  const partialFill = rating % 1;

  console.log(review.pictures);

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
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
        <div className="bodySM">
          {dayjs(review.created_at).format("DD/MM/YYYY")}
        </div>
      </div>
      <div className="mt-2 bodyXL">{review.reviewer.name}</div>
      <h4 className="mt-6">{review.title}</h4>
      <div className="bodyMD mt-3">{review.body}</div>
    </div>
  );
}
