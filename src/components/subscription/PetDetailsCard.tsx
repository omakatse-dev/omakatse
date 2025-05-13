import Card from '../common/Card';
import Tag from '../common/Tag';
import { petDetailsSchema } from '@/schemas/SubscriptionFormSchema';
import { z } from 'zod';
import Button from '../common/Button';
import Image from 'next/image';
import cat1 from '../../../public/assets/Cat1.svg';
import cat2 from '../../../public/assets/Cat2.svg';
import cat3 from '../../../public/assets/Cat3.svg';
import cat4 from '../../../public/assets/Cat4.svg';
import dog1 from '../../../public/assets/Dog1.svg';
import dog2 from '../../../public/assets/Dog2.svg';
import dog3 from '../../../public/assets/Dog3.svg';
import dog4 from '../../../public/assets/Dog4.svg';
import Link from 'next/link';
import { useState } from 'react';
import ConfirmRemovePetModal from './ConfirmRemovePetModal';

type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

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

export default function PetDetailsCard({
  details,
  idx,
  editMode = 'none',
  petType,
  catCount = 0,
  petCount = 1,
  contractId = ''
}: {
  details: PetDetailsSchema;
  idx: number;
  editMode?: string;
  petType: 'catsDetails' | 'dogsDetails';
  catCount?: number;
  petCount?: number;
  contractId?: string;
}) {
  const numberToMonth = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  };

  const sizeMapping = {
    skinny: 'Skinny',
    'just right': 'Just Right',
    chubby: 'Chubby'
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <>
      <Card
        variant={
          variantMapping[
            (idx +
              (details.type === 'Dog'
                ? catCount
                : 0)) as keyof typeof variantMapping
          ]
        }
        className="flex w-full flex-col items-center bg-white md:h-full"
      >
        <div className="flex w-full flex-col justify-between md:h-full">
          <div>
            <div className="flex items-center gap-4 sm:flex-col sm:gap-0">
              <Image
                alt={`${details.name} ${idx + 1}`}
                src={
                  petType === 'catsDetails'
                    ? catMapping[idx as keyof typeof catMapping]
                    : dogMapping[idx as keyof typeof dogMapping]
                }
                width={100}
                height={100}
                className="h-16 w-16 sm:h-24 sm:w-24"
              />
              <h4>{details.name}</h4>
            </div>
            <div className="mt-8 flex w-full flex-col gap-4">
              <div className="bodyMD text-gray-800">
                <span>
                  {details.gender === 'Girl' ? 'Her' : 'His'} details:
                </span>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Tag>{details.gender}</Tag>
                  <Tag>{details.breed}</Tag>
                  <Tag>
                    {
                      numberToMonth[
                        details.birthdayMonth as keyof typeof numberToMonth
                      ]
                    }{' '}
                    {details.birthdayYear}
                  </Tag>
                  <Tag>
                    {sizeMapping[details.size as keyof typeof sizeMapping]}
                  </Tag>
                </div>
              </div>
              <div className="bodyMD text-gray-800">
                <span>
                  Allergies:
                </span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {details.allergies.true ? (
                    details.allergies.allergies.map((allergy) => (
                      <Tag key={allergy}>{allergy}</Tag>
                    ))
                  ) : (
                    <Tag>NA</Tag>
                  )}
                </div>
              </div>
              <div className="bodyMD text-gray-800">
                <span>Preferences:</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {details.preferences.true ? (
                    details.preferences.preferences.map((pref) => (
                      <Tag key={pref}>{pref}</Tag>
                    ))
                  ) : (
                    <Tag>NA</Tag>
                  )}
                </div>
              </div>
              <div className="bodyMD text-gray-800">
                <span>Treat frequency:</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Tag>{details.treatFrequency.frequency}</Tag>
                </div>
              </div>
              <div className="bodyMD text-gray-800">
                <span>Treat preferences:</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {details.treatFrequency.preferences.length > 0 ? (
                    details.treatFrequency.preferences.map((pref) => (
                      <Tag key={pref}>{pref}</Tag>
                    ))
                  ) : (
                    <Tag>NA</Tag>
                  )}
                </div>
              </div>
              <div className="bodyMD text-gray-800">
                <span>Additional comments:</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {details.treatFrequency.comments ? (
                    <Tag className="line-clamp-3">
                      {details.treatFrequency.comments}
                    </Tag>
                  ) : (
                    <Tag>None</Tag>
                  )}
                </div>
              </div>
            </div>
          </div>
          {editMode !== 'none' && (
            <div className="mt-8 grid w-full grid-cols-1 items-center gap-2 sm:grid-cols-2 sm:justify-center">
              {editMode === 'all' && (
                <Button
                  onClick={() => setShowConfirmationModal(true)}
                  className="w-full"
                  disabled={petCount === 1}
                >
                  Remove Pet
                </Button>
              )}
              <Link
                href={`/account/pet-profiles/edit-pet?contractId=${contractId}&petIndex=${idx}`}
              >
                <Button className="w-full">Edit Pet</Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
      {showConfirmationModal && (
        <ConfirmRemovePetModal
          close={() => setShowConfirmationModal(false)}
          name={details.name}
          contractId={contractId}
          petIndex={idx}
        />
      )}
    </>
  );
}
