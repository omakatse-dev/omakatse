import ProgressBar from "@/components/subscription/ProgressBar";
import { ReviewSummary } from "@/types/Types";
import { StarIcon } from "@heroicons/react/20/solid";

export default function ReviewsSummary({
  reviewSummary,
}: {
  reviewSummary: ReviewSummary;
}) {
  const rating = reviewSummary.rating;
  const fullStars = Math.floor(rating);
  const partialFill = rating % 1;

  return (
    <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-center items-center sm:divide-x divide-gray-400 w-full">
      {reviewSummary.totalReviews > 0 ? (
        <div className="sm:px-10 h-full gap-3 flex flex-col justify-center items-center">
          <div className="text-5xl font-bold">{rating.toFixed(1)}</div>
          <div className="flex gap-1">
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
          <div>
            {reviewSummary.totalReviews}
            {reviewSummary.totalReviews === 1 ? " review" : " reviews"}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-3 text-center sm:px-10 h-full bodyLG">
          No reviews yet!
        </div>
      )}

      <div className="sm:px-10 w-full sm:w-1/3 flex flex-col gap-2">
        <div className="flex items-center gap-2 w-full">
          <div className="flex w-36">
            <StarIcon className="w-4 h-4 text-yellow" />
            <StarIcon className="w-4 h-4 text-yellow" />
            <StarIcon className="w-4 h-4 text-yellow" />
            <StarIcon className="w-4 h-4 text-yellow" />
            <StarIcon className="w-4 h-4 text-yellow" />
          </div>
          <ProgressBar
            currentStep={reviewSummary.fiveStarCount}
            totalSteps={reviewSummary.totalReviews}
            showSteps={false}
          />
          <div className="min-w-8">{reviewSummary.fiveStarCount}</div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <div className="flex w-36">
            <StarIcon className="w-4 h-4 text-yellow" />
            <StarIcon className="w-4 h-4 text-yellow" />
            <StarIcon className="w-4 h-4 text-yellow" />
            <StarIcon className="w-4 h-4 text-yellow" />
          </div>
          <ProgressBar
            currentStep={reviewSummary.fourStarCount}
            totalSteps={reviewSummary.totalReviews}
            showSteps={false}
          />
          <div className="min-w-8">{reviewSummary.fourStarCount}</div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <div className="flex w-36">
            <StarIcon className="w-4 h-4 text-yellow" />
            <StarIcon className="w-4 h-4 text-yellow" />
            <StarIcon className="w-4 h-4 text-yellow" />
          </div>
          <ProgressBar
            currentStep={reviewSummary.threeStarCount}
            totalSteps={reviewSummary.totalReviews}
            showSteps={false}
          />
          <div className="min-w-8">{reviewSummary.threeStarCount}</div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <div className="flex w-36">
            <StarIcon className="w-4 h-4 text-yellow" />
            <StarIcon className="w-4 h-4 text-yellow" />
          </div>
          <ProgressBar
            currentStep={reviewSummary.twoStarCount}
            totalSteps={reviewSummary.totalReviews}
            showSteps={false}
          />
          <div className="min-w-8">{reviewSummary.twoStarCount}</div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <div className="flex w-36">
            <StarIcon className="w-4 h-4 text-yellow" />
          </div>
          <ProgressBar
            currentStep={reviewSummary.oneStarCount}
            totalSteps={reviewSummary.totalReviews}
            showSteps={false}
          />
          <div className="min-w-8">{reviewSummary.oneStarCount}</div>
        </div>
      </div>
    </div>
  );
}
