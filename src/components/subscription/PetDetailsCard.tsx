import React, { Dispatch, SetStateAction } from "react";
import Card from "../common/Card";
import Tag from "../common/Tag";
import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { z } from "zod";
import Button from "../common/Button";
type PetDetailsSchema = z.infer<typeof petDetailsSchema>;

export default function PetDetailsCard({
  details,
  idx,
  editMode = false,
  setEditPetIndex = () => {},
}: {
  details: PetDetailsSchema;
  idx: number;
  editMode?: boolean;
  setEditPetIndex?: Dispatch<SetStateAction<number | undefined>>;
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

  const variantMapping = {
    0: "yellow",
    1: "blue",
    2: "green",
    3: "pink",
  } as const;

  return (
    <Card
      variant={variantMapping[idx as keyof typeof variantMapping]}
      className="bg-white"
    >
      <div className="flex flex-col">
        <div className="self-center flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-amber-300" />
          <h4>{details.name}</h4>
        </div>
        <div className="mt-8 flex flex-col gap-4">
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
          <div className="flex flex-col w-full">
          <Button
            onClick={() => setEditPetIndex(idx)}
            className="mt-8 w-full self-center"
          >
            Edit Pet
          </Button>
          <Button
            onClick={() => setEditPetIndex(idx)}
            className="mt-4 w-full self-center"
          >
            Remove Pet
          </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
