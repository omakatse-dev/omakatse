/* eslint-disable @next/next/no-html-link-for-pages */
export const runtime = 'nodejs';

import WriteReviewCard from '@/components/account/reviews/WriteReviewCard';
import { Review } from '@/types/Types';
import { getFulfilledOrdersByEmail, getReviewsByAuthor } from '@/utils/APIs';

import { Claims, getSession } from '@auth0/nextjs-auth0';
import Button from '@/components/common/Button';

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
    (item) => !item.name.includes('Subscription')
  );
  const writtenReviews = await getReviewsByAuthor(user.email);

  return (
    <div className="flex w-full flex-col gap-8">
      <h2 className="text-primary hidden lg:block">Reviews</h2>
      <div className="flex max-w-7xl flex-col divide-y divide-gray-200">
        {regularItems?.length > 0 ? (
          regularItems?.map((item) => (
            <WriteReviewCard
              key={item.id}
              details={item}
              review={writtenReviews.reviews.find(
                (review: Review) => review.id === item.id.split('/').pop()
              )}
            />
          ))
        ) : (
          <div className="flex flex-col gap-8">
            <div className="bodyMD text-gray-800">
              No reviews yet. Start purchasing your first product to leave a
              review!
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              <a href="/shop/cat-products">
                <Button className="w-full sm:w-fit">Shop Cat Products</Button>
              </a>
              <a href="/shop/dog-products">
                <Button className="w-full sm:w-fit">Shop Dog Products</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
