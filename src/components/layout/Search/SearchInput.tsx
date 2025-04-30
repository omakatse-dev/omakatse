import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
      if (value.trim() === "") {
        return;
      }
      window.location.href = `/shop?searchKey=${value}`;
    }
  };
  return (
    <div className="w-full flex justify-between gap-4">
      <div className="flex w-full">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="What are you looking for?"
          className="w-full border-secondary rounded-full p-3 placeholder:text-gray-500 focus:outline-none bg-white"
        />
        <MagnifyingGlassIcon className="w-6 -ml-10 stroke-2" />
      </div>
      <XMarkIcon
        className="w-6 cursor-pointer stroke-2"
        onClick={() => {
          onChange("");
          handleClose();
        }}
      />
    </div>
  );
}
