import { Review } from "@/types/Types";

import ReviewsSummary from "./ReviewsSummary";
import ReviewCard from "./ReviewCard";

export default function ReviewSection({ reviews }: { reviews: Review[] }) {
  const reviewSummary = {
    rating:
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length,
    totalReviews: reviews.length,
    fiveStarCount: reviews.filter((review: Review) => review.rating === 5)
      .length,
    fourStarCount: reviews.filter((review: Review) => review.rating === 4)
      .length,
    threeStarCount: reviews.filter((review: Review) => review.rating === 3)
      .length,
    twoStarCount: reviews.filter((review: Review) => review.rating === 2)
      .length,
    oneStarCount: reviews.filter((review: Review) => review.rating === 1)
      .length,
  };
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-10 border-secondary rounded-2xl p-6 sm:p-10 mx-6 sm:md-12 my-10 max-w-7xl">
      <h4>What they are saying</h4>
      <ReviewsSummary reviewSummary={reviewSummary} />
      <hr
        className={`w-full ${reviews.length > 0 ? "border-0.5" : "border-0"}`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
