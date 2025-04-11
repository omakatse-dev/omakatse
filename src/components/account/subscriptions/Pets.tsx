import { PetType } from "./SubscriptionCard";

export default function Pets({
  cats,
  dogs,
}: {
  cats: PetType[];
  dogs: PetType[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {cats.map((cat) => (
        <div key={cat.name}>
          <h4>{cat.name}</h4>
        </div>
      ))}
      {dogs.map((dog) => (
        <div key={dog.name}>{dog.name}</div>
      ))}
    </div>
  );
}
