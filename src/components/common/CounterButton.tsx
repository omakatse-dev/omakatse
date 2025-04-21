import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function CounterButton({
  min,
  max,
  count,
  setCount,
  className,
}: {
  min?: number;
  max?: number;
  className?: string;
  count: number;
  setCount: (count: number) => void;
}) {
  return (
    <div
      className={`flex flex-row border-1 rounded-[2rem] w-44 sm:w-48 h-11 md:h-13 justify-between items-center px-5 ${className}`}
    >
      <button
        onClick={() => setCount(count === min ? count : count - 1)}
        className="text-primary text-5xl font-light cursor-pointer"
      >
        <MinusIcon className="h-6 stroke-primary stroke-2" />
      </button>
      <div className="bodyMD font-bold align-middle">{count}</div>
      <button
        onClick={() => setCount(count === max ? count : count + 1)}
        className="text-primary text-5xl font-light cursor-pointer"
      >
        <PlusIcon className="h-6 stroke-primary stroke-2" />
      </button>
    </div>
  );
}
