import React from "react";
import Card from "../common/Card";
import Input from "../common/Input";
import Selector from "../common/Selector";
import { petDetailsSchema } from "@/schemas/SubscriptionFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import PillButton from "../common/PillButton";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";

const initialPetDetailsSchema = petDetailsSchema.pick({
  name: true,
  breed: true,
  gender: true,
  birthdayMonth: true,
  birthdayYear: true,
});

export type InitialPetDetailsSchema = z.infer<typeof initialPetDetailsSchema>;

export default function PetDetailsForm({
  petType,
  idx,
}: {
  petType: "Dog" | "Cat";
  idx: number;
}) {
  const catSpecies = [
    { id: 0, name: "Abyssinian" },
    { id: 1, name: "Aegean" },
    { id: 2, name: "American Bobtail" },
    { id: 3, name: "American Curl" },
    { id: 4, name: "American Shorthair" },
    { id: 5, name: "American Wirehair" },
    { id: 6, name: "Arabian Mau" },
    { id: 7, name: "Asian" },
    { id: 8, name: "Australian Mist" },
    { id: 9, name: "Balinese" },
    { id: 10, name: "Bengal" },
    { id: 11, name: "Birman" },
    { id: 12, name: "Bombay" },
    { id: 13, name: "Brazilian Shorthair" },
    { id: 14, name: "British Shorthair" },
    { id: 15, name: "Burmese" },
    { id: 16, name: "Burmilla" },
    { id: 17, name: "California Spangled" },
    { id: 18, name: "Cashmere" },
    { id: 19, name: "Chantilly-Tiffany" },
    { id: 20, name: "Chartreux" },
    { id: 21, name: "Chausie" },
    { id: 22, name: "Colorpoint Shorthair" },
    { id: 23, name: "Cornish Rex" },
    { id: 24, name: "Cymric" },
    { id: 25, name: "Cyprus" },
    { id: 26, name: "Devon Rex" },
    { id: 27, name: "Donskoy" },
    { id: 28, name: "Dragon Li" },
    { id: 29, name: "Egyptian Mau" },
    { id: 30, name: "European Shorthair" },
    { id: 31, name: "Exotic Longhair" },
    { id: 32, name: "Exotic Shorthair" },
    { id: 33, name: "Foldex" },
    { id: 34, name: "Foreign White" },
    { id: 35, name: "German Rex" },
    { id: 36, name: "Havana Brown" },
    { id: 37, name: "Highlander" },
    { id: 38, name: "Himalayan" },
    { id: 39, name: "Isle of Man Longhair" },
    { id: 40, name: "Isle of Man Shorthair" },
    { id: 41, name: "Japanese Bobtail" },
    { id: 42, name: "Javanese" },
    { id: 43, name: "Jianzhou" },
    { id: 44, name: "Kanaani" },
    { id: 45, name: "Khao Manee" },
    { id: 46, name: "Korat" },
    { id: 47, name: "Korn Ja" },
    { id: 48, name: "Kurilian Bobtail" },
    { id: 49, name: "LaPerm" },
    { id: 50, name: "Lykoi" },
    { id: 51, name: "Maine Coon" },
    { id: 52, name: "Manx" },
    { id: 53, name: "Mekong Bobtail" },
    { id: 54, name: "Mexican Hairless" },
    { id: 55, name: "Minskin" },
    { id: 56, name: "Minuet" },
    { id: 57, name: "Munchkin" },
    { id: 58, name: "Nebelung" },
    { id: 59, name: "Ocicat" },
    { id: 60, name: "Ojos Azules" },
    { id: 61, name: "Oriental Bicolour" },
    { id: 62, name: "Oriental Longhair" },
    { id: 63, name: "Oriental Shorthair" },
    { id: 64, name: "Persian" },
    { id: 65, name: "Peterbald" },
    { id: 66, name: "Pixie-bob" },
    { id: 67, name: "Ragamuffin" },
    { id: 68, name: "Ragdoll" },
    { id: 69, name: "Russian Blue" },
    { id: 70, name: "Russian White, Black, and Tabby" },
    { id: 71, name: "Savannah" },
    { id: 72, name: "Scottish Fold" },
    { id: 73, name: "Selkirk Rex" },
    { id: 74, name: "Serengeti" },
    { id: 75, name: "Siamese" },
    { id: 76, name: "Siberian" },
    { id: 77, name: "Singapura" },
    { id: 78, name: "Snowshoe" },
    { id: 79, name: "Sokoke" },
    { id: 80, name: "Somali" },
    { id: 81, name: "Sphynx" },
    { id: 82, name: "Suphalak" },
    { id: 83, name: "Thai" },
    { id: 84, name: "Tonkinese" },
    { id: 85, name: "Toybob" },
    { id: 86, name: "Toyger" },
    { id: 87, name: "Turkish Angora" },
    { id: 88, name: "Turkish Van" },
    { id: 89, name: "Turkish Vankedisi" },
    { id: 90, name: "Ukrainian Levkoy" },
    { id: 91, name: "York Chocolate" },
    { id: 92, name: "Other" },
  ];

  const dogSpecies = [
    { id: 0, name: "Affenpinscher" },
    { id: 1, name: "Afghan Hound" },
    { id: 2, name: "Africanis" },
    { id: 3, name: "Aidi" },
    { id: 4, name: "Airedale Terrier" },
    { id: 5, name: "Akbash Dog" },
    { id: 6, name: "Akita" },
    { id: 7, name: "Alano Español" },
    { id: 8, name: "Alaskan Klee Kai" },
    { id: 9, name: "Alaskan Malamute" },
    { id: 10, name: "American Black & Tan Coonhound" },
    { id: 11, name: "American Bulldog" },
    { id: 12, name: "American Cocker Spaniel" },
    { id: 13, name: "American Eskimo Dog" },
    { id: 14, name: "American Foxhound" },
    { id: 15, name: "American Staffordshire Terrier" },
    { id: 16, name: "Australian Cattle Dog" },
    { id: 17, name: "Australian Kelpie" },
    { id: 18, name: "Australian Shepherd" },
    { id: 19, name: "Australian Silky Terrier" },
    { id: 20, name: "Australian Stumpy Tail Cattle Dog" },
    { id: 21, name: "Australian Terrier" },
    { id: 22, name: "Basset Fauve De Bretagne" },
    { id: 23, name: "Basset Hound" },
    { id: 24, name: "Beagle" },
    { id: 25, name: "Bearded Collie" },
    { id: 26, name: "Bedlington Terrier" },
    { id: 27, name: "Belgian Malinois" },
    { id: 28, name: "Belgian Shepherd" },
    { id: 29, name: "Bernese Mountain Dog" },
    { id: 30, name: "Bichon Frise" },
    { id: 31, name: "Bloodhound" },
    { id: 32, name: "Border Collie" },
    { id: 33, name: "Border Terrier" },
    { id: 34, name: "Borzoi" },
    { id: 35, name: "Boston Terrier" },
    { id: 36, name: "Bouvier Des Flandres" },
    { id: 37, name: "Boxer" },
    { id: 38, name: "Briard" },
    { id: 39, name: "British Bulldog" },
    { id: 40, name: "Brittany" },
    { id: 41, name: "Cane Corso" },
    { id: 42, name: "Chinook" },
    { id: 43, name: "Chow Chow" },
    { id: 44, name: "Corgi" },
    { id: 45, name: "Dachshund" },
    { id: 46, name: "Dalmatian" },
    { id: 47, name: "Doberman Pinscher" },
    { id: 48, name: "Dogue De Bordeaux" },
    { id: 49, name: "English Springer Spaniel" },
    { id: 50, name: "English Toy Spaniel" },
    { id: 51, name: "Finnish Lapphund" },
    { id: 52, name: "Finnish Spitz" },
    { id: 53, name: "French Bulldog" },
    { id: 54, name: "German Pinscher" },
    { id: 55, name: "German Shepherd" },
    { id: 56, name: "German Shorthaired Pointer" },
    { id: 57, name: "Golden Retriever" },
    { id: 58, name: "Great Dane" },
    { id: 59, name: "Greyhound" },
    { id: 60, name: "Griffon Bruxellois" },
    { id: 61, name: "Havanese" },
    { id: 62, name: "Hokkaido" },
    { id: 63, name: "Hungarian Vizsla" },
    { id: 64, name: "Icelandic Sheepdog" },
    { id: 65, name: "Irish Setter" },
    { id: 66, name: "Irish Terrier" },
    { id: 67, name: "Irish Water Spaniel" },
    { id: 68, name: "Irish Wolfhound" },
    { id: 69, name: "Italian Greyhound" },
    { id: 70, name: "Jack Russell Terrier" },
    { id: 71, name: "Japanese Akita" },
    { id: 72, name: "Japanese Chin" },
    { id: 73, name: "Japanese Spitz" },
    { id: 74, name: "Keeshond" },
    { id: 75, name: "Kishu" },
    { id: 76, name: "Kuvasz" },
    { id: 77, name: "Labrador Retriever" },
    { id: 78, name: "Lakeland Terrier" },
    { id: 79, name: "Lhasa Apso" },
    { id: 80, name: "Lowchen" },
    { id: 81, name: "Maltese" },
    { id: 82, name: "Maremma Sheepdog" },
    { id: 83, name: "Mastiff" },
    { id: 84, name: "Miniature Pinscher" },
    { id: 85, name: "Munsterlander" },
    { id: 86, name: "Newfoundland" },
    { id: 87, name: "Norfolk Terrier" },
    { id: 88, name: "Norwegian Buhund" },
    { id: 89, name: "Norwich Terrier" },
    { id: 90, name: "Nova Scotia Duck Tolling Retriever" },
    { id: 91, name: "Old English Sheepdog" },
    { id: 92, name: "Papillon" },
    { id: 93, name: "Pekingese" },
    { id: 94, name: "Petit Basset Griffon Vendéen" },
    { id: 95, name: "Pharaoh Hound" },
    { id: 96, name: "Pointer" },
    { id: 97, name: "Pomeranian" },
    { id: 98, name: "Poodle" },
    { id: 99, name: "Portuguese Water Dog" },
    { id: 100, name: "Pug" },
    { id: 101, name: "Rottweiler" },
    { id: 102, name: "Russian Terrier" },
    { id: 103, name: "Samoyed" },
    { id: 104, name: "Shetland Sheepdog" },
    { id: 105, name: "Shiba Inu" },
    { id: 106, name: "Shih Tzu" },
    { id: 107, name: "Siberian Husky" },
    { id: 108, name: "Silky Terrier" },
    { id: 109, name: "Skye Terrier" },
    { id: 110, name: "Sloughi" },
    { id: 111, name: "Soft Coated Wheaten Terrier" },
    { id: 112, name: "Spanish Mastiff" },
    { id: 113, name: "Spinone Italiano" },
    { id: 114, name: "Staffordshire Bull Terrier" },
    { id: 115, name: "Swedish Vallhund" },
    { id: 116, name: "Tibetan Mastiff" },
    { id: 117, name: "Tibetan Spaniel" },
    { id: 118, name: "Tibetan Terrier" },
    { id: 119, name: "Toy Fox Terrier" },
    { id: 120, name: "Treeing Walker Coonhound" },
    { id: 121, name: "Vizsla" },
    { id: 122, name: "Weimaraner" },
    { id: 123, name: "Welsh Corgi" },
    { id: 124, name: "West Highland White Terrier" },
    { id: 125, name: "Whippet" },
    { id: 126, name: "Wire Fox Terrier" },
    { id: 127, name: "Xoloitzcuintli" },
    { id: 128, name: "Yorkshire Terrier" },
    { id: 129, name: "Other" },
  ];

  const years = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    name: (i + 2000).toString(),
  }));
  const months = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: (i + 1).toString(),
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialPetDetailsSchema>({
    resolver: zodResolver(initialPetDetailsSchema),
    defaultValues: {
      name: "",
    },
  });

  const setData = useSubscriptionFormStore((state) => state.setData);

  const submitHandler = (data: InitialPetDetailsSchema) => {
    // console.log("here", data);
    const formattedData = {
      ...data,
      size: "just right" as "just right" | "skinny" | "chubby",
      allergies: { true: false, allergies: [] },
      preferences: { true: false, preferences: [] },
      treatFrequency: {
        frequency: "none" as "none" | "a few" | "sometimes" | "often",
        preferences: [],
      },
    };
    console.log("formatted", formattedData);
    const prevData = useSubscriptionFormStore.getState().petDetails;
    const newData = [...(prevData || []), formattedData];
    setData({ petDetails: newData });
  };

  return (
    <Card>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="w-12 h-12 bg-amber-300 rounded-full" />
        <h4 className="mt-2">
          {petType} {idx + 1}
        </h4>
        <div className="grid grid-cols-2 gap-6 mt-8 bodyMD min-w-2xl">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            Name
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="What is your pet's name?" />
              )}
            />
            {errors.name && <p className="text-red-500">Required</p>}
          </div>

          {/* Gender Field */}
          <div className="flex flex-col gap-2">
            Gender
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div className="flex gap-3">
                  <PillButton
                    onClick={() => field.onChange("Boy")}
                    active={field.value === "Boy"}
                    className="w-1/2 "
                  >
                    Boy
                  </PillButton>
                  <PillButton
                    onClick={() => field.onChange("Girl")}
                    active={field.value === "Girl"}
                    className="w-1/2 "
                  >
                    Girl
                  </PillButton>
                </div>
              )}
            />
            {errors.gender && (
              <p className="text-red-500">Please select an option</p>
            )}
          </div>

          {/* Breed Field */}
          <div className="flex flex-col gap-2">
            Breed
            <Controller
              name="breed"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  options={petType === "Cat" ? catSpecies : dogSpecies}
                  placeholder={`What is your ${petType.toLowerCase()}'s breed?`}
                  value={
                    (petType === "Cat" ? catSpecies : dogSpecies).find(
                      (species) => species.name === field.value
                    ) || null
                  }
                  onChange={(option) => field.onChange(option.name)}
                />
              )}
            />
            {errors.breed && <p className="text-red-500">Required</p>}
          </div>

          {/* Birthday Field */}
          <div className="flex flex-col gap-2">
            Birthday
            <div className="flex gap-3">
              {/* Year Selector */}
              <Controller
                name="birthdayYear"
                control={control}
                render={({ field }) => (
                  <Selector
                    {...field}
                    options={years}
                    placeholder="Year"
                    className="w-1/2"
                    value={
                      years.find(
                        (year) => year.name === field.value?.toString()
                      ) || null
                    }
                    onChange={(option) => field.onChange(Number(option.name))}
                  />
                )}
              />
              {/* Month Selector */}
              <Controller
                name="birthdayMonth"
                control={control}
                render={({ field }) => (
                  <Selector
                    {...field}
                    options={months}
                    placeholder="Month"
                    className="w-1/2"
                    value={
                      months.find((month) => month.id === field.value) || null
                    }
                    onChange={(option) => field.onChange(Number(option.name))}
                  />
                )}
              />
            </div>
            {(errors.birthdayYear || errors.birthdayMonth) && (
              <p className="text-red-500">
                {(errors.birthdayYear?.message ||
                  errors.birthdayMonth?.message) ??
                  "Invalid birthday"}
              </p>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
}
