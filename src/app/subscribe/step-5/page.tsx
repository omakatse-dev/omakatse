'use client';

import Button from '@/components/common/Button';
import AllergenSelector from '@/components/subscription/AllergySelector';
import ProgressBar from '@/components/subscription/ProgressBar';
import { useSubscriptionFormStore } from '@/stores/subscriptionFormStore';
import { useRouter } from 'next/navigation';
import { subscriptionFormSchema } from '@/schemas/SubscriptionFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
const allergySchema = subscriptionFormSchema.pick({
  catsDetails: true,
  dogsDetails: true
});

export type AllergySchema = z.infer<typeof allergySchema>;

export default function SubscriptionStepFivePage() {
  const router = useRouter();
  const cats = useSubscriptionFormStore((state) => state.catsDetails) || [];
  const dogs = useSubscriptionFormStore((state) => state.dogsDetails) || [];
  const petType = useSubscriptionFormStore((state) => state.petType);
  const storedDogCount = useSubscriptionFormStore((state) => state.dogCount);
  const storedCatCount = useSubscriptionFormStore((state) => state.catCount);
  const hydrated = useSubscriptionFormStore((state) => state.hydrated);

  useForm<AllergySchema>({
    resolver: zodResolver(allergySchema)
  });

  const [showError, setShowError] = useState(false);

  const submitHandler = () => {
    // Check if all pets have valid allergy selections
    const hasValidAllergies = [...cats, ...dogs].every((pet) => {
      if (!pet.allergies) return false;
      if (pet.allergies.true === false) return true;
      return pet.allergies.true === true && pet.allergies.allergies.length > 0;
    });

    if (!hasValidAllergies) {
      setShowError(true);
      return;
    }

    setShowError(false);
    router.push('/subscribe/step-6');
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
    <div className="bg-pink-pastel flex w-full flex-col items-center gap-8 px-8 pt-32 pb-20">
      <ProgressBar currentStep={5} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-bold">What are your pets&apos; allergies?</h3>
        <div className="bodyMD text-gray-800">
          We&apos;ll leave out any products that don&apos;t sit well with your
          pet.
        </div>
      </div>
      <form className="flex w-full max-w-3xl flex-col items-center gap-8">
        {cats.map((cat, idx) => (
          <AllergenSelector
            key={idx}
            idx={idx}
            name={cat.name}
            fieldName={`catsDetails.${idx}.allergies`}
            attemptedNext={showError}
          />
        ))}
        {dogs.map((dog, idx) => (
          <AllergenSelector
            key={idx}
            idx={idx}
            name={dog.name}
            catCount={cats.length}
            fieldName={`dogsDetails.${idx}.allergies`}
            attemptedNext={showError}
          />
        ))}
        <div className='w-full flex justify-center'>
          <div className="grid w-full grid-cols-1 gap-5 sm:w-fit sm:grid-cols-2">
            <Button
              onClick={() => router.push('/subscribe/step-4')}
              variant="secondary"
              type="button"
              bgColor="bg-pink-pastel"
              className="row-start-2 w-full sm:row-auto"
            >
              Previous
            </Button>
            <Button className="w-full" onClick={submitHandler}>
              Next
            </Button>
          </div>
          {showError && (
            <p className="my-4 text-red text-center">
              Please complete all required fields
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
