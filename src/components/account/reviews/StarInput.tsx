'use client';
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { useState } from "react";

interface StarInputProps {
  value?: number;
  onChange?: (rating: number) => void;
}

export default function StarInput({ value = 5, onChange }: StarInputProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-yellow-400 w-8 h-8 cursor-pointer"
        >
          {star <= (hover || value) ? (
            <StarIcon className="w-full h-full" />
          ) : (
            <StarOutline className="w-full h-full" />
          )}
        </button>
      ))}
    </div>
  );
}
