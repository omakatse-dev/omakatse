import { Textarea } from "@headlessui/react";
import React from "react";

export default function Textfield({ placeholder }: { placeholder?: string }) {
  return (
    <Textarea
      className="resize-none bg-white border-primary rounded-2xl mt-2 py-4 px-5"
      placeholder={placeholder}
    />
  );
}
