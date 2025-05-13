import Tag from '@/components/common/Tag';
import Pets from '../subscriptions/Pets';
import { PastBoxDetailsType } from '@/types/Types';
import { PetType } from '../subscriptions/SubscriptionCard';
import ProgressBar from '@/components/subscription/ProgressBar';
import BoxContent from './BoxContent';
import dayjs from 'dayjs';

export default function PastBoxCard({ box }: { box: PastBoxDetailsType }) {
  const pets = JSON.parse(box.pets);
  const dogs = pets.filter((pet: PetType) => pet.type === 'Dog');
  const cats = pets.filter((pet: PetType) => pet.type === 'Cat');
  // console.log(box.items);
  return (
    <div className="border-primary flex max-w-4xl flex-col gap-8 rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col-reverse justify-between gap-4 md:flex-row">
        <Pets dogs={dogs} cats={cats} />
        <Tag className={`h-fit w-fit`}>SHIPPED</Tag>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bodyMD font-semibold text-gray-800">
          Box {((box.number - 1) % box.planDuration) + 1} out of{' '}
          {box.planDuration}
        </div>
        <ProgressBar
          showSteps={false}
          currentStep={((box.number - 1) % box.planDuration) + 1}
          totalSteps={box.planDuration}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="border-gray-200 md:border-r md:pr-8">
          <label className="bodySM text-gray-500">Box size</label>
          <div className="bodyMD mt-1 font-semibold">{box.size}</div>
        </div>
        <div className="border-gray-200 md:border-r md:pr-8">
          <label className="bodySM text-gray-500">No. of Pets</label>
          <div className="bodyMD mt-1 font-semibold">
            {dogs.length > 0 && `${dogs.length} dog(s)`}{' '}
            {cats.length > 0 && `${cats.length} cat(s)`}
          </div>
        </div>
        <div className="md:pr-8">
          <label className="bodySM text-gray-500">Next billing date</label>
          <div className="bodyMD mt-1 font-semibold">
            {box.status === 'active'
              ? dayjs(box.nextBillingDate).format('MMMM DD, YYYY')
              : '-'}
          </div>
        </div>
        <div className="border-gray-200 md:border-r md:pr-8">
          <label className="bodySM text-gray-500">Ship to</label>
          <div className="bodyMD mt-1 font-semibold">{box.name}</div>
        </div>
        <div className="border-gray-200 md:border-r md:pr-8">
          <label className="bodySM text-gray-500">Shipping address</label>
          <div className="bodyMD mt-1 font-semibold">{box.address}</div>
        </div>
        <div className="md:pr-8">
          <label className="bodySM text-gray-500">Shipping method</label>
          <div className="bodyMD mt-1 font-semibold">Standard shipping</div>
        </div>
        <div className="border-gray-200 md:border-r md:pr-8">
          <label className="bodySM text-gray-500">Box plan</label>
          <div className="bodyMD mt-1 font-semibold">
            {box.planDuration} months
          </div>
        </div>
        <div className="border-gray-200 md:border-r md:pr-8">
          <label className="bodySM text-gray-500">Monthly payment</label>
          <div className="bodyMD mt-1 font-semibold">AED 25</div>
        </div>
        <div className="md:pr-8">
          <label className="bodySM text-gray-500">Next Renewal Date</label>
          <div className="bodyMD mt-1 font-semibold">
            {dayjs(box.nextRenewalDate).format('MMMM DD, YYYY')}
          </div>
        </div>
      </div>
      <hr className="border-gray-200" />
      <h4>What&apos;s in this box?</h4>
      <BoxContent contentsString={box.items} />
    </div>
  );
}
