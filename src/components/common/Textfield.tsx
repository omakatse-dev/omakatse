import { Textarea } from "@headlessui/react";
import React from "react";

export default function Textfield({ placeholder, value, onChange }: { placeholder?: string, value?: string, onChange?: (value: string) => void }) {
  return (
    <Textarea
      className="resize-none bg-white border-primary rounded-2xl mt-2 py-4 px-5"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
