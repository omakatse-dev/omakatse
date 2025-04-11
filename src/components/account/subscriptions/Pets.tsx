import { PetType } from "./SubscriptionCard";
import Image from "next/image";

import cat1 from "../../../../public/assets/Cat1.svg";
import cat2 from "../../../../public/assets/Cat2.svg";
import cat3 from "../../../../public/assets/Cat3.svg";
import cat4 from "../../../../public/assets/Cat4.svg";
import dog1 from "../../../../public/assets/Dog1.svg";
import dog2 from "../../../../public/assets/Dog2.svg";
import dog3 from "../../../../public/assets/Dog3.svg";
import dog4 from "../../../../public/assets/Dog4.svg";

export default function Pets({
  cats,
  dogs,
}: {
  cats: PetType[];
  dogs: PetType[];
}) {
  const catImages = [cat1, cat2, cat3, cat4];
  const dogImages = [dog1, dog2, dog3, dog4];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {cats.map((cat, index) => (
        <div
          key={cat.name}
          className="gap-2 flex flex-row md:flex-col items-center w-fit"
        >
          <Image src={catImages[index]} alt={`Cat ${cat.name}`} className="w-15 md:w-25" />
          <h4>{cat.name}</h4>
        </div>
      ))}
      {dogs.map((dog, index) => (
        <div
          key={dog.name}
          className="gap-2 flex flex-row md:flex-col items-center w-fit"
        >
          <Image src={dogImages[index]} alt={`Dog ${dog.name}`} className="w-15 md:w-25" />
          <h4>{dog.name}</h4>
        </div>
      ))}
    </div>
  );
}
