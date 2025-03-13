import { useState } from "react";
import {
    MinusIcon,
    PlusIcon,
  } from "@heroicons/react/24/outline";

export default function CounterButton({
    min,
    max,
    className,
  }: {
    min?: number;
    max?: number;
    className?: string;
  }) {

  const [count, setCount] = useState(1);
  min = 0;

  return (
    <div className="flex flex-row border-1 rounded-[2rem] w-44 justify-between items-center px-5">

        <button onClick={() => setCount(count == min ? count : count - 1)} className="text-black text-5xl font-light">
          <MinusIcon className="h-6 stroke-black stroke-[2]" />
        </button>
        <div className="bodyMD font-bold align-middle">
            {count}
        </div>
        <button onClick={() => setCount(count == max? count : count + 1)} className="text-black text-5xl font-light">
          <PlusIcon className="h-6 stroke-black stroke-[2]" />
        </button>

    </div>
  );
};
