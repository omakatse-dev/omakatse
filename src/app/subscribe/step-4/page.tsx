'use client';

import Button from '@/components/common/Button';
import ProgressBar from '@/components/subscription/ProgressBar';
import SizeSelector from '@/components/subscription/SizeSelector';
import { subscriptionFormSchema } from '@/schemas/SubscriptionFormSchema';
import { useSubscriptionFormStore } from '@/stores/subscriptionFormStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const petDetailsSchema = subscriptionFormSchema.pick({
  catsDetails: true,
  dogsDetails: true
});

export type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

export default function SubscriptionStepFourPage() {
  const router = useRouter();
  const catCount = useSubscriptionFormStore((state) => state.catCount) || 0;
  const dogCount = useSubscriptionFormStore((state) => state.dogCount) || 0;
  const cats = useSubscriptionFormStore((state) => state.catsDetails);
  const dogs = useSubscriptionFormStore((state) => state.dogsDetails);
  const petType = useSubscriptionFormStore((state) => state.petType);
  const storedDogCount = useSubscriptionFormStore((state) => state.dogCount);
  const storedCatCount = useSubscriptionFormStore((state) => state.catCount);
  const hydrated = useSubscriptionFormStore((state) => state.hydrated);

  const [showError, setShowError] = useState(false);

  const { control } = useForm<PetDetailsSchema>({
    resolver: zodResolver(petDetailsSchema),
    defaultValues: useSubscriptionFormStore.getState()
  });

  const submitHandler = () => {
    const allPetsHaveSize =
      (petType === 'both' &&
        cats?.every((cat) => cat.size) &&
        dogs?.every((dog) => dog.size)) ||
      (petType === 'dog' && dogs?.every((dog) => dog.size)) ||
      (petType === 'cat' && cats?.every((cat) => cat.size));

    if (!allPetsHaveSize) {
      setShowError(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    router.push('/subscribe/step-5');
  };

  useEffect(() => {
    if (!hydrated) return;
    if (!petType) {
      router.push('/subscribe/step-1');
    }
    if (
      (!storedDogCount && petType === 'dog') ||
      (!storedCatCount && petType === 'cat') ||
      (!storedDogCount && !storedCatCount && petType === 'both')
    ) {
      router.push('/subscribe/step-2');
    }
  }, [router, storedDogCount, storedCatCount, petType, hydrated]);

  return (
    <div className="bg-green-pastel flex w-full flex-col items-center gap-8 px-8 pt-32 pb-20">
      <ProgressBar currentStep={4} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h3 className="font-bold">What are your pets&apos; sizes?</h3>
        <div className="bodyMD text-center text-gray-800">
          We&apos;ll pick the right-sized apparel so they look and feel great.
        </div>
      </div>
      <form className="flex w-full flex-col items-center gap-8">
        {Array.from({ length: catCount }).map((_, idx) => (
          <SizeSelector
            key={idx}
            control={control}
            name={cats?.[idx].name || ''}
            type="Cat"
            idx={idx}
          />
        ))}
        {Array.from({ length: dogCount }).map((_, idx) => (
          <SizeSelector
            catCount={catCount}
            key={idx}
            control={control}
            name={dogs?.[idx].name || ''}
            type="Dog"
            idx={idx}
          />
        ))}
        <div className="grid w-full grid-cols-1 gap-5 sm:w-fit sm:grid-cols-2">
          <Button
            type="button"
            onClick={() => router.push('/subscribe/step-3')}
            variant="secondary"
            bgColor="bg-green-pastel"
            className="row-start-2 w-full sm:row-auto"
          >
            Previous
          </Button>
          <Button onClick={submitHandler} className="w-full">
            Next
          </Button>
        </div>
        {showError && (
          <div className="bodyMD text-red">
            Please fill in all required fields for each pet before proceeding
          </div>
        )}
      </form>
    </div>
  );
}
