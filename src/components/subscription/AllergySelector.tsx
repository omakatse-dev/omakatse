import CardButton from '../common/CardButton';
import PillButton from '../common/PillButton';
import Card from '../common/Card';
import Image from 'next/image';
import { useSubscriptionFormStore } from '@/stores/subscriptionFormStore';

import cat1 from '../../../public/assets/Cat1.svg';
import cat2 from '../../../public/assets/Cat2.svg';
import cat3 from '../../../public/assets/Cat3.svg';
import cat4 from '../../../public/assets/Cat4.svg';
import dog1 from '../../../public/assets/Dog1.svg';
import dog2 from '../../../public/assets/Dog2.svg';
import dog3 from '../../../public/assets/Dog3.svg';
import dog4 from '../../../public/assets/Dog4.svg';
import beef from '../../../public/assets/Beef.svg';
import dairy from '../../../public/assets/Dairy.svg';
import wheat from '../../../public/assets/Wheat.svg';
import poultry from '../../../public/assets/Poultry.svg';
import lamb from '../../../public/assets/Lamb.svg';
import seafood from '../../../public/assets/Seafood.svg';
import deer from '../../../public/assets/Deer.svg';
import Textfield from '../common/Textfield';

const CAT_ALLERGIES = ['Poultry', 'Beef', 'Seafood', 'Deer'] as const;

const DOG_ALLERGIES = [
  'Beef',
  'Dairy',
  'Wheat',
  'Poultry',
  'Lamb',
  'Seafood'
] as const;

type StandardAllergy =
  | (typeof CAT_ALLERGIES)[number]
  | (typeof DOG_ALLERGIES)[number];

type AllergyData = {
  true: boolean;
  allergies: (StandardAllergy | string)[];
};

interface Props {
  name: string;
  fieldName:
    | `catsDetails.${number}.allergies`
    | `dogsDetails.${number}.allergies`;
  idx: number;
  catCount?: number;
  attemptedNext: boolean;
}

const allergyImageMapping: Record<StandardAllergy, string> = {
  Beef: beef,
  Dairy: dairy,
  Wheat: wheat,
  Poultry: poultry,
  Lamb: lamb,
  Seafood: seafood,
  Deer: deer
};

export default function AllergySelector({
  name,
  fieldName,
  idx,
  catCount = 0,
  attemptedNext
}: Props) {
  // Get the pet's current allergies directly from Zustand
  const [petType, petIndex] = fieldName.split('.') as [
    'catsDetails' | 'dogsDetails',
    string
  ];
  const petDetails = useSubscriptionFormStore(
    (state) => state[petType]?.[Number(petIndex)]
  );
  const setData = useSubscriptionFormStore((state) => state.setData);

  // Use the actual data from the store, but don't provide defaults
  const allergiesData = petDetails?.allergies;

  const updateAllergies = (newAllergies: AllergyData) => {
    const pets = useSubscriptionFormStore.getState()[petType] || [];
    const newPets = [...pets];
    newPets[Number(petIndex)] = {
      ...pets[Number(petIndex)],
      allergies: newAllergies
    };
    setData({ [petType]: newPets });
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

  const allergies: StandardAllergy[] =
    petType === 'catsDetails' ? [...CAT_ALLERGIES] : [...DOG_ALLERGIES];

  // Validation logic
  const yesButNoAllergies =
    allergiesData?.true && allergiesData.allergies.length === 0;

  const showError = attemptedNext && yesButNoAllergies;

  return (
    <Card
      className="flex h-fit w-full flex-col items-center"
      variant={variantMapping[(idx + catCount) as keyof typeof variantMapping]}
    >
      <div className="flex items-center justify-center gap-2 sm:flex-col sm:gap-0">
        <Image
          alt={`${name} ${idx + 1}`}
          src={
            petType === 'catsDetails'
              ? catMapping[idx as keyof typeof catMapping]
              : dogMapping[idx as keyof typeof dogMapping]
          }
          width={100}
          height={100}
          className="h-16 w-16 sm:h-24 sm:w-24"
        />
        <h4>{name}</h4>
      </div>
      <div className="bodyMD mt-8">Does {name} have any allergies?</div>
      <div className="mt-2 flex w-full justify-center gap-4">
        <PillButton
          active={allergiesData?.true === true}
          className="w-1/2 sm:w-fit"
          onClick={() => {
            updateAllergies({ true: true, allergies: [] });
          }}
        >
          Yes
        </PillButton>
        <PillButton
          className="w-1/2 sm:w-fit"
          active={allergiesData?.true === false}
          onClick={() => {
            updateAllergies({ true: false, allergies: [] });
          }}
        >
          No
        </PillButton>
      </div>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out"
        style={{
          maxHeight: attemptedNext && showError ? '50px' : '0',
          opacity: attemptedNext && showError ? 1 : 0
        }}
      >
        <p className="text-red my-4">Please select or input any allergies</p>
      </div>
      {allergiesData?.true && (
        <>
          <div className="mt-4 grid w-full grid-cols-1 gap-6 sm:grid-cols-4">
            {allergies.map((allergy) => (
              <CardButton
                className="flex w-full items-center justify-center gap-3 sm:flex-col"
                key={allergy}
                active={allergiesData.allergies.includes(allergy)}
                onClick={() => {
                  const allergies = allergiesData.allergies.includes(allergy)
                    ? allergiesData.allergies.filter((a) => a !== allergy)
                    : [...allergiesData.allergies, allergy];
                  updateAllergies({ ...allergiesData, allergies });
                }}
              >
                <div className='w-1/2 flex justify-end'>
                  <Image
                    src={allergyImageMapping[allergy]}
                    alt={allergy}
                    width={24}
                    height={24}
                    className="h-12 w-12 sm:h-24 sm:w-24"
                  />
                </div>
                <div className='w-1/2 flex justify-start sm:justify-center'>{allergy}</div>
              </CardButton>
            ))}
          </div>
          <div className="bodyMD mt-8 self-start text-gray-800">
            Other allergies (optional)
          </div>
          <Textfield
            placeholder="Enter any other allergies"
            className="mt-2 w-full"
            value={allergiesData.allergies
              .filter(
                (allergy): allergy is string =>
                  !allergies.includes(allergy as StandardAllergy)
              )
              .join(', ')}
            onChange={(e) => {
              const otherAllergies = e.target.value
                .split(',')
                .map((a) => a.trim())
                .filter(Boolean);
              const standardAllergies = allergiesData.allergies.filter(
                (a): a is StandardAllergy =>
                  allergies.includes(a as StandardAllergy)
              );
              updateAllergies({
                ...allergiesData,
                allergies: [...standardAllergies, ...otherAllergies]
              });
            }}
          />
        </>
      )}
    </Card>
  );
}
