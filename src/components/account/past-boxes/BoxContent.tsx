import { Suspense } from "react";
import BoxItem from "./BoxItem";

export default function BoxContent({
  contentsString,
}: {
  contentsString: string;
}) {
  const contents = JSON.parse(contentsString);
  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<div>Loading...</div>}>
        {contents.map((item: { variantId: string; quantity: number }) => (
          <BoxItem key={item.variantId} item={item} />
        ))}
      </Suspense>
    </div>
  );
}
