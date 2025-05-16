import React from 'react';
import Card from '../common/Card';
import CardButton from '../common/CardButton';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { PetDetailsSchema } from '@/app/subscribe/step-4/page';
import { useSubscriptionFormStore } from '@/stores/subscriptionFormStore';

import cat1 from '../../../public/assets/Cat1.svg';
import cat2 from '../../../public/assets/Cat2.svg';
import cat3 from '../../../public/assets/Cat3.svg';
import cat4 from '../../../public/assets/Cat4.svg';
import dog1 from '../../../public/assets/Dog1.svg';
import dog2 from '../../../public/assets/Dog2.svg';
import dog3 from '../../../public/assets/Dog3.svg';
import dog4 from '../../../public/assets/Dog4.svg';
import cat from '../../../public/assets/Cat.svg';
import dog from '../../../public/assets/Dog.svg';
import Image from 'next/image';

export default function SizeSelector({
  control,
  name,
  type,
  idx,
  catCount = 0
}: {
  control: Control<PetDetailsSchema>;
  name: string;
  type: 'Cat' | 'Dog';
  idx: number;
  catCount?: number;
}) {
  const setData = useSubscriptionFormStore((state) => state.setData);
  const catDetails = useSubscriptionFormStore((state) => state.catsDetails);
  const dogDetails = useSubscriptionFormStore((state) => state.dogsDetails);

  const selectSizeHandler = (
    field:
      | ControllerRenderProps<PetDetailsSchema, `catsDetails.${number}.size`>
      | ControllerRenderProps<PetDetailsSchema, `dogsDetails.${number}.size`>,
    value: 'skinny' | 'just right' | 'chubby'
  ) => {
    field.onChange(value);
    const details = type === 'Cat' ? catDetails : dogDetails;
    if (!details?.[idx]) return;

    if (type === 'Cat') {
      const newCatsDetails = [...(catDetails || [])];
      newCatsDetails[idx] = { ...catDetails![idx], size: value };
      setData({ catsDetails: newCatsDetails });
    } else {
      const newDogsDetails = [...(dogDetails || [])];
      newDogsDetails[idx] = { ...dogDetails![idx], size: value };
      setData({ dogsDetails: newDogsDetails });
    }
  };

  const variantMapping: Record<
    0 | 1 | 2 | 3,
    'yellow' | 'blue' | 'green' | 'pink'
  > = {
    0: 'yellow',
    1: 'blue',
    2: 'green',
    3: 'pink'
  };

  const catMapping: Record<0 | 1 | 2 | 3, string> = {
    0: cat1,
    1: cat2,
    2: cat3,
    3: cat4
  };

  const dogMapping: Record<0 | 1 | 2 | 3, string> = {
    0: dog1,
    1: dog2,
    2: dog3,
    3: dog4
  };

  return (
    <Controller
      control={control}
      name={
        type === 'Cat' ? `catsDetails.${idx}.size` : `dogsDetails.${idx}.size`
      }
      render={({ field }) => (
        <Card
          variant={
            variantMapping[(idx + catCount) as keyof typeof variantMapping]
          }
          className="w-full max-w-2xl"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 sm:flex-col sm:gap-0">
              <Image
                src={
                  type === 'Cat'
                    ? catMapping[idx as keyof typeof catMapping]
                    : dogMapping[(idx + catCount) as keyof typeof dogMapping]
                }
                alt={`${type} ${idx + 1}`}
                width={100}
                height={100}
                className="h-16 w-16 sm:h-24 sm:w-24"
              />
              <h4>{name}</h4>
            </div>
            <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-between sm:gap-8">
              <CardButton
                onClick={() => selectSizeHandler(field, 'skinny')}
                active={field.value === 'skinny'}
                className="flex w-full items-center justify-center sm:flex-col gap-x-6"
              >
                <Image
                  src={type === 'Cat' ? cat : dog}
                  alt="Skinny"
                  width={100}
                  height={100}
                  className="scale-60"
                />
                <div className="w-fit sm:w-full">Small</div>
              </CardButton>
              <CardButton
                onClick={() => selectSizeHandler(field, 'just right')}
                active={field.value === 'just right'}
                className="flex w-full items-center justify-center sm:flex-col gap-x-4"
              >
                <Image
                  src={type === 'Cat' ? cat : dog}
                  alt="Just Right"
                  width={100}
                  height={100}
                  className="scale-90"
                />
                <div className="w-fit sm:w-full">Medium</div>
              </CardButton>
              <CardButton
                onClick={() => selectSizeHandler(field, 'chubby')}
                active={field.value === 'chubby'}
                className="flex w-full items-center justify-center sm:flex-col gap-x-6"
              >
                <Image
                  src={type === 'Cat' ? cat : dog}
                  alt="Chubby"
                  width={100}
                  height={100}
                  className="scale-120"
                />

                <div className="w-fit sm:w-full">Large</div>
              </CardButton>
            </div>
          </div>
        </Card>
      )}
    />
  );
}
