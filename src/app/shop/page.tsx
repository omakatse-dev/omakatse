import { getStoreFront } from "../utils/APIs";

import React from "react";
import { ProductInterface } from "../utils/Interfaces";

export default async function Page() {
  const items = await getStoreFront();
  console.log(items);
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {items.map((item: ProductInterface) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
