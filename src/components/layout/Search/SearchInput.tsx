import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react'; // Added imports

export default function SearchInput({
  value,
  onChange,
  handleClose,
  isOpen
}: {
  value: string;
  onChange: (newValue: string) => void;
  handleClose: () => void;
  isOpen: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim() === '') {
        return;
      }
      window.location.href = `/shop?searchKey=${value}`;
    }
  };
  return (
    <div className="flex w-full justify-between gap-4">
      <div className="flex w-full">
        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          type="text"
          placeholder="What are you looking for?"
          className="border-secondary w-full rounded-full bg-white p-3 placeholder:text-gray-500 focus:outline-none"
        />
        <MagnifyingGlassIcon className="-ml-10 w-6 stroke-2" />
      </div>
      <XMarkIcon
        className="w-6 cursor-pointer stroke-2"
        onClick={() => {
          onChange('');
          handleClose();
        }}
      />
    </div>
  );
}
