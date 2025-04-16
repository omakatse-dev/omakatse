import React, { Dispatch, SetStateAction } from "react";
import Card from "../common/Card";
import Tag from "../common/Tag";
import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { z } from "zod";
import Button from "../common/Button";
import Image from "next/image";
import cat1 from "../../../public/assets/Cat1.svg";
import cat2 from "../../../public/assets/Cat2.svg";
import cat3 from "../../../public/assets/Cat3.svg";
import cat4 from "../../../public/assets/Cat4.svg";
import dog1 from "../../../public/assets/Dog1.svg";
import dog2 from "../../../public/assets/Dog2.svg";
import dog3 from "../../../public/assets/Dog3.svg";
import dog4 from "../../../public/assets/Dog4.svg";

type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

const variantMapping: Record<0 | 1 | 2 | 3, "yellow" | "blue" | "green" | "pink"> = {
  0: "yellow",
  1: "blue",
  2: "green",
  3: "pink",
};

const catMapping: Record<0 | 1 | 2 | 3, string> = {
  0: cat1,
  1: cat2,
  2: cat3,
  3: cat4,
};

const dogMapping: Record<0 | 1 | 2 | 3, string> = {
  0: dog1,
  1: dog2,
  2: dog3,
  3: dog4,
};

export default function PetDetailsCard({
  details,
  idx,
  editMode = false,
  setEditPetIndex = () => {},
  petType,
  catCount = 0,
}: {
  details: PetDetailsSchema;
  idx: number;
  editMode?: boolean;
  setEditPetIndex?: Dispatch<SetStateAction<number | undefined>>;
  petType: "catsDetails" | "dogsDetails";
  catCount?: number;
}) {
  const numberToMonth = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const sizeMapping = {
    skinny: "Skinny",
    "just right": "Just Right",
    chubby: "Chubby",
  };

  return (
    <Card
      variant={variantMapping[(idx + catCount) as keyof typeof variantMapping]}
      className="flex flex-col items-center w-full"
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex sm:flex-col items-center gap-4 sm:gap-0">
          <Image
            alt={`${details.name} ${idx + 1}`}
            src={petType === "catsDetails" 
              ? catMapping[idx as keyof typeof catMapping]
              : dogMapping[idx as keyof typeof dogMapping]
            }
            width={100}
            height={100}
            className="w-16 h-16 sm:w-24 sm:h-24"
          />
          <h4>{details.name}</h4>
        </div>
        <div className="mt-8 flex flex-col gap-4 w-full">
          <div className="bodyMD text-gray-800">
            <span>{details.gender === "Girl" ? "Her" : "His"} details:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              <Tag>{details.gender}</Tag>
              <Tag>{details.breed}</Tag>
              <Tag>
                {
                  numberToMonth[
                    details.birthdayMonth as keyof typeof numberToMonth
                  ]
                }{" "}
                {details.birthdayYear}
              </Tag>
              <Tag>{sizeMapping[details.size as keyof typeof sizeMapping]}</Tag>
            </div>
          </div>
          <div className="bodyMD text-gray-800">
            <span>
              {details.gender === "Girl" ? "She" : "He"} is allergic to:
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
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
            <span>{details.gender === "Girl" ? "She" : "He"} likes:</span>
            <div className="flex flex-wrap gap-2 mt-1">
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
            <div className="flex flex-wrap gap-2 mt-1">
              <Tag>{details.treatFrequency.frequency}</Tag>
            </div>
          </div>
          <div className="bodyMD text-gray-800">
            <span>Treat preferences:</span>
            <div className="flex flex-wrap gap-2 mt-1">
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
            <div className="flex flex-wrap gap-2 mt-1">
              {details.treatFrequency.comments ? (
                <Tag>{details.treatFrequency.comments}</Tag>
              ) : (
                <Tag>None</Tag>
              )}
            </div>
          </div>
        </div>
        {editMode && (
          <div className="flex flex-col sm:flex-row sm:justify-center mt-8 w-full gap-2">
          <Button
            onClick={() => setEditPetIndex(idx)}
            className=""
          >
            Edit Pet
          </Button>
          <Button
            onClick={() => setEditPetIndex(idx)}
            className="w-1/2"
          >
            Remove Pet
          </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
