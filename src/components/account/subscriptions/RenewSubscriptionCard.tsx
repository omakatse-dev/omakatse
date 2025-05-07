'use client';

import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Pets from './Pets';
import { SubscriptionContract } from '@/types/Types';
import { petDetailsSchema } from '@/schemas/SubscriptionFormSchema';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { getSubscriptionPlan } from '@/utils/APIs';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { useState } from 'react';
import AddedModal from '@/components/subscription/AddedModal';

export type PetType = z.infer<typeof petDetailsSchema>;

export default function RenewSubscriptionCard({
  subscription
}: {
  subscription: SubscriptionContract;
}) {
  const pets = JSON.parse(subscription.pets);

  const dogs = pets.filter((pet: PetType) => pet.type === 'Dog');
  const cats = pets.filter((pet: PetType) => pet.type === 'Cat');
  const contractId = subscription.contractId;
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const { openCart } = useUIStore();
  const [showAddedModal, setShowAddedModal] = useState(false);

  const selectedPlanMapping: Record<string, number> = {
    '12': 3,
    '6': 2,
    '3': 1,
    '1': 0
  };

  const addToCartHandler = async () => {
    if (cartItems.some((item) => item.name.includes('Subscription Box'))) {
      setShowAddedModal(true);
      return;
    }
    const productId =
      subscription.size === 'SMALL'
        ? 'gid://shopify/Product/8944155918595'
        : 'gid://shopify/Product/8944976658691';
    const plans = await getSubscriptionPlan(productId);

    addItem({
      id:
        subscription.size !== 'SMALL'
          ? 'gid://shopify/ProductVariant/46680266211587'
          : 'gid://shopify/ProductVariant/46670734328067',
      name:
        subscription.size === 'SMALL'
          ? 'Small Subscription Box'
          : 'Large Subscription Box',
      price: '0', //TODO create box / plan to price mapping
      compareAtPrice: '',
      quantity: 1,
      sellingPlanId:
        plans[selectedPlanMapping[subscription.planDuration.toString()]],
      duration: subscription.planDuration + ' months',
      image:
        subscription.size === 'SMALL'
          ? 'https://images.omakatsepets.com/subscription-box-small.png'
          : 'https://images.omakatsepets.com/subscription-box-large.png',
      options: []
    });
    openCart();
  };

  const router = useRouter();
  return (
    <Card className="flex flex-col gap-6 bg-white md:gap-8">
      {showAddedModal && <AddedModal close={() => setShowAddedModal(false)} />}
      <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:justify-center">
        <Pets dogs={dogs} cats={cats} />
      </div>
      <div className="flex flex-col items-center gap-2"></div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="border-gray-200 md:border-r md:pr-6">
          <label className="bodySM text-gray-500">Box size</label>
          <div className="bodyMD mt-1 font-semibold">{subscription.size}</div>
        </div>
        <div className="border-gray-200 md:border-r md:pr-6">
          <label className="bodySM text-gray-500">No. of Pets</label>
          <div className="bodyMD mt-1 font-semibold">
            {dogs.length > 0 && `${dogs.length} dog(s)`}{' '}
            {cats.length > 0 && `${cats.length} cat(s)`}
          </div>
        </div>
        <div className="md:pr-6">
          <label className="bodySM text-gray-500">Ship to</label>
          <div className="bodyMD mt-1 font-semibold">{subscription.name}</div>
        </div>
        <div className="border-gray-200 md:border-r md:pr-6">
          <label className="bodySM text-gray-500">Shipping address</label>
          <div className="bodyMD mt-1 font-semibold">
            {subscription.address}
          </div>
        </div>
        <div className="border-gray-200 md:border-r md:pr-6">
          <label className="bodySM text-gray-500">Box plan</label>
          <div className="bodyMD mt-1 font-semibold">
            {subscription.planDuration} months
          </div>
        </div>
        <div className="md:pr-6">
          <label className="bodySM text-gray-500">Monthly payment</label>
          <div className="bodyMD mt-1 font-semibold">AED 25</div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row md:gap-6">
        <Button
          onClick={() =>
            router.push(
              `/renew-subscription/edit-subscription?contractId=${contractId}`
            )
          }
          className="w-full self-center md:w-full"
        >
          Edit subscription
        </Button>
        <Button
          onClick={addToCartHandler}
          className="w-full self-center md:w-full"
        >
          Add to cart
        </Button>
      </div>
    </Card>
  );
}
