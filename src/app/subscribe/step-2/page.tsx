'use client';

import Button from '@/components/common/Button';
import PetCountSelector from '@/components/subscription/PetCountSelector';
import ProgressBar from '@/components/subscription/ProgressBar';
import TipCard from '@/components/subscription/TipCard';

import { useRouter } from 'next/navigation';
import { useSubscriptionFormStore } from '@/stores/subscriptionFormStore';
import { subscriptionFormSchema } from '@/schemas/SubscriptionFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';

const petCountSchema = subscriptionFormSchema.pick({
  dogCount: true,
  catCount: true
});

export type PetCountSchema = z.infer<typeof petCountSchema>;

export default function SubscriptionStepTwoPage() {
  const router = useRouter();
  const petType = useSubscriptionFormStore((state) => state.petType);
  const hydrated = useSubscriptionFormStore((state) => state.hydrated);

  useEffect(() => {
    if (!hydrated) return;
    if (!petType) {
      router.push('/subscribe/step-1');
    }
  }, [petType, router, hydrated]);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<PetCountSchema>({
    resolver: zodResolver(petCountSchema),
    defaultValues: {
      catCount: useSubscriptionFormStore.getState().catCount,
      dogCount: useSubscriptionFormStore.getState().dogCount
    }
  });

  const setData = useSubscriptionFormStore((state) => state.setData);

  const onSubmit = (data: PetCountSchema) => {
    // reduce cat details array if cat count is longer than array
    const catCount = useSubscriptionFormStore.getState().catCount;
    const catDetails = useSubscriptionFormStore.getState().catsDetails;
    if (catCount && catDetails) {
      setData({ dogsDetails: [] });
      if (catCount < catDetails.length) {
        setData({
          catsDetails: catDetails.slice(0, catCount)
        });
      }
    }

    const dogCount = useSubscriptionFormStore.getState().dogCount;
    const dogDetails = useSubscriptionFormStore.getState().dogsDetails;
    if (dogCount && dogDetails) {
      setData({ catsDetails: [] });
      if (dogCount < dogDetails.length) {
        setData({
          dogsDetails: dogDetails.slice(0, dogCount)
        });
      }
    }

    setData(data);
    router.push('/subscribe/step-3');
  };

  return (
    <div className="bg-blue-pastel flex w-full flex-col items-center gap-8 px-8 pt-32 pb-20">
      <ProgressBar currentStep={2} totalSteps={9} className="max-w-sm" />
      <form
        className="flex flex-col items-center gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(petType === 'cat' || petType === 'both') && (
          <PetCountSelector
            control={control}
            petType="Cat"
            both={petType === 'both'}
          />
        )}

        {petType === 'both' && (
          <hr className="border-secondary w-full max-w-5xl" />
        )}

        {(petType === 'dog' || petType === 'both') && (
          <PetCountSelector
            control={control}
            petType="Dog"
            both={petType === 'both'}
          />
        )}

        <TipCard />
        <div className="grid w-full grid-cols-1 gap-5 sm:w-fit sm:grid-cols-2">
          <Button
            onClick={() => router.push('/subscribe/step-1')}
            variant="secondary"
            bgColor="bg-blue-pastel"
            className="row-start-2 w-full sm:row-auto"
          >
            Previous
          </Button>
          <Button type="submit" className="w-full">
            Next
          </Button>
        </div>
      </form>
      {(errors.catCount || errors.dogCount) && (
        <div className="text-red">Please select number of pets</div>
      )}
    </div>
  );
}
