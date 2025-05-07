'use client';

import dayjs from 'dayjs';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import ProgressBar from '@/components/subscription/ProgressBar';
import Pets from './Pets';

import { SubscriptionContract } from '@/types/Types';
import { petDetailsSchema } from '@/schemas/SubscriptionFormSchema';
import { z } from 'zod';
import Tag from '@/components/common/Tag';
import { useRouter } from 'next/navigation';

export type PetType = z.infer<typeof petDetailsSchema>;

export default function SubscriptionCard({
  subscription
}: {
  subscription: SubscriptionContract;
}) {
  const pets = JSON.parse(subscription.pets);
  const dogs = pets.filter((pet: PetType) => pet.type === 'Dog');
  const cats = pets.filter((pet: PetType) => pet.type === 'Cat');
  console.log(cats);
  const contractId = subscription.contractId;

  const router = useRouter();

  return (
    <Card className="flex flex-col gap-6 bg-white md:gap-8">
      <div className="flex flex-col-reverse justify-between gap-4 md:flex-row">
        <Pets dogs={dogs} cats={cats} />
        <Tag
          className={`h-fit w-fit ${
            subscription.status === 'ACTIVE' ? 'bg-yellow' : 'bg-gray-200'
          }`}
        >
          {subscription.status}
        </Tag>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bodyMD font-semibold text-gray-800">
          Box{' '}
          {subscription.boxIds?.split(',').length % subscription.planDuration}{' '}
          out of {subscription.planDuration}
        </div>
        <ProgressBar
          showSteps={false}
          currentStep={
            subscription.boxIds?.split(',').length % subscription.planDuration
          }
          totalSteps={subscription.planDuration}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="border-gray-200 md:border-r pr-8">
          <label className="bodySM text-gray-500">Box size</label>
          <div className="bodyMD mt-1 font-semibold">{subscription.size}</div>
        </div>
        <div className="border-gray-200 md:border-r pr-8">
          <label className="bodySM text-gray-500">No. of Pets</label>
          <div className="bodyMD mt-1 font-semibold">
            {dogs.length > 0 && `${dogs.length} dog(s)`}{' '}
            {cats.length > 0 && `${cats.length} cat(s)`}
          </div>
        </div>
        <div className="pr-8">
          <label className="bodySM text-gray-500">Next billing date</label>
          <div className="bodyMD mt-1 font-semibold">
            {dayjs(subscription.nextBillingDate).format('MMMM DD, YYYY')}
          </div>
        </div>
        <div className="border-gray-200 md:border-r pr-8">
          <label className="bodySM text-gray-500">Ship to</label>
          <div className="bodyMD mt-1 font-semibold">{subscription.name}</div>
        </div>
        <div className="border-gray-200 md:border-r pr-8">
          <label className="bodySM text-gray-500">Shipping address</label>
          <div className="bodyMD mt-1 font-semibold">
            {subscription.address}
          </div>
        </div>
        <div className="pr-8">
          <label className="bodySM text-gray-500">Shipping method</label>
          <div className="bodyMD mt-1 font-semibold">Standard shipping</div>
        </div>
        <div className="border-gray-200 md:border-r pr-8">
          <label className="bodySM text-gray-500">Box plan</label>
          <div className="bodyMD mt-1 font-semibold">
            {subscription.planDuration} months
          </div>
        </div>
        <div className="border-gray-200 md:border-r pr-8">
          <label className="bodySM text-gray-500">Monthly payment</label>
          <div className="bodyMD mt-1 font-semibold">AED 25</div>
        </div>
        <div className="pr-8">
          <label className="bodySM text-gray-500">Next Renewal Date</label>
          <div className="bodyMD mt-1 font-semibold">
            {dayjs(subscription.nextRenewalDate).format('MMMM DD, YYYY')}
          </div>
        </div>
      </div>
      {subscription.status === 'ACTIVE' ? (
        <Button
          onClick={() =>
            router.push(
              `/exit-survey?contractId=${contractId}&email=${subscription.email}`
            )
          }
          className="w-full self-center md:w-fit"
          disabled={
            subscription.boxIds?.split(',').length !== subscription.planDuration
          }
        >
          Cancel auto-renew
        </Button>
      ) : (
        <Button
          onClick={() =>
            router.push(`/renew-subscription?contractId=${contractId}`)
          }
          className="w-full self-center md:w-fit"
        >
          Renew subscription
        </Button>
      )}

      <ul className="bodySM list-inside list-disc text-gray-500">
        <li>
          Your subscription will automatically renew after your current billing
          cycle ends.
        </li>
        <li>
          You can cancel auto-renewal only after the last billing date in your
          current cycle.
        </li>
        <li>
          Your subscription changes will be applied when your renewal happens
        </li>
      </ul>
    </Card>
  );
}
