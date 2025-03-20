import WriteReviewCard from "@/components/account/reviews/WriteReviewCard";
import { getFulfilledOrdersByEmail } from "@/utils/APIs";

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
  const items = await getFulfilledOrdersByEmail(user.email);
  // TODO fetch all written reviews from judge.me, and find a way to filter out items for which reviews have already been written

  // TODO render all the written reviews
  return (
    <div>
      <h2 className="hidden sm:block">Reviews</h2>
      <div className="flex flex-col gap-16 divide-y divide-gray-200 max-w-7xl sm:mt-10">
        {items?.map((item) => (
          <WriteReviewCard key={item.id} details={item} />
        ))}
      </div>
    </div>
  );
}
