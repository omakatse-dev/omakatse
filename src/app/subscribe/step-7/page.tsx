'use client';

import Button from '@/components/common/Button';
import ProgressBar from '@/components/subscription/ProgressBar';
import TreatPreferenceCard from '@/components/subscription/TreatPreferenceCard';
import { useSubscriptionFormStore } from '@/stores/subscriptionFormStore';
import { useRouter } from 'next/navigation';
import { subscriptionFormSchema } from '@/schemas/SubscriptionFormSchema';
import { z } from 'zod';
import { useEffect, useState } from 'react';
const _treatPreferenceSchema = subscriptionFormSchema.pick({
  catsDetails: true,
  dogsDetails: true
});

export type TreatPreferenceSchema = z.infer<typeof _treatPreferenceSchema>;

export default function SubscriptionStepSevenPage() {
  const router = useRouter();
  const cats = useSubscriptionFormStore((state) => state.catsDetails) || [];
  const dogs = useSubscriptionFormStore((state) => state.dogsDetails) || [];
  const [showError, setShowError] = useState(false);
  const petType = useSubscriptionFormStore((state) => state.petType);
  const storedDogCount = useSubscriptionFormStore((state) => state.dogCount);
  const storedCatCount = useSubscriptionFormStore((state) => state.catCount);
  const hydrated = useSubscriptionFormStore((state) => state.hydrated);

  const submitHandler = () => {
    const catTreats = cats.every((cat) => cat.treatFrequency);
    const dogTreats = dogs.every((dog) => dog.treatFrequency);
    if (!catTreats || !dogTreats) {
      setShowError(true);
      return;
    }
    localStorage.setItem('latestStep', 'step-8');
    router.push('/subscribe/step-8');
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
    <div className="bg-blue-pastel flex w-full flex-col items-center gap-8 px-8 pt-32 pb-20">
      <ProgressBar currentStep={7} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-bold">
          Fill in any treats and additional information
        </h3>
        <div className="bodyMD text-gray-800">
          Add any must-knows or special notes for your pets.
        </div>
      </div>
      <div className="mx-auto w-full max-w-3xl flex flex-wrap justify-center gap-8">
        {cats.map((cat, idx) => (
          <TreatPreferenceCard
            key={cat.name}
            petType="catsDetails"
            petIndex={idx}
            name={cat.name}
          />
        ))}
        {/* {cats.map((cat, idx) => (
          <TreatPreferenceCard
            key={cat.name}
            petType="catsDetails"
            petIndex={idx}
            name={cat.name}
          />
        ))}
        {cats.map((cat, idx) => (
          <TreatPreferenceCard
            key={cat.name}
            petType="catsDetails"
            petIndex={idx}
            name={cat.name}
          />
        ))} */}
        {dogs.map((dog, idx) => (
          <TreatPreferenceCard
            key={dog.name}
            petType="dogsDetails"
            petIndex={idx}
            name={dog.name}
            catCount={cats.length}
          />
        ))}
      </div>
      <div className="grid w-full grid-cols-1 gap-5 sm:w-fit sm:grid-cols-2">
        <Button
          onClick={() => router.push('/subscribe/step-6')}
          variant="secondary"
          bgColor="bg-blue-pastel"
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
    </div>
  );
}
