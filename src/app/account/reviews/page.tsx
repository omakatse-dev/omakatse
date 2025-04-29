export const runtime = "nodejs";

import WriteReviewCard from "@/components/account/reviews/WriteReviewCard";
import { Review } from "@/types/Types";
import { getFulfilledOrdersByEmail, getReviewsByAuthor } from "@/utils/APIs";

import { Claims, getSession } from "@auth0/nextjs-auth0";

const getUserProfileData = async (): Promise<Claims> => {
  const session = await getSession();

  if (!session) {
    throw new Error(`Requires authentication`);
  }

  const { user } = session;

  return user;
};

export default async function AccountReviewsPage() {
  const user = await getUserProfileData();
  const items = (await getFulfilledOrdersByEmail(user.email)) || [];
  const regularItems = items.filter(
    (item) => !item.name.includes("Subscription")
  );
  const writtenReviews = await getReviewsByAuthor(user.email);

  return (
    <div>
      <h2 className="hidden lg:block">Reviews</h2>
      <div className="flex flex-col divide-y divide-gray-200 max-w-7xl sm:mt-10">
        {regularItems?.length > 0 ? (
          regularItems?.map((item) => (
            <WriteReviewCard
              key={item.id}
              details={item}
              review={writtenReviews.reviews.find(
                (review: Review) => review.id === item.id.split("/").pop()
              )}
            />
          ))
        ) : (
          <div>You can only review items you have purchased!</div>
        )}
      </div>
    </div>
  );
}
