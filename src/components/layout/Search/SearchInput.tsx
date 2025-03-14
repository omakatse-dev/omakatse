import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function SearchInput({
  value,
  onChange,
  handleClose,
}: {
  value: string;
  onChange: (newValue: string) => void;
  handleClose: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      window.location.href = `/shop?searchKey=${value}`;
    }
  };
  return (
    <div className="w-full flex justify-center">
      <MagnifyingGlassIcon className="w-6 -mr-6" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="What are you looking for?"
        className="w-full border-b border-gray-400 px-8 py-3 font-semibold placeholder:text-gray-500 focus:outline-none"
      />
      <XMarkIcon
        className="w-6 -ml-6 cursor-pointer"
        onClick={() => {
          onChange("");
          handleClose();
        }}
      />
    </div>
  );
}
