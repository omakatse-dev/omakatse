import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function ProductDescription({
  description,
  className,
}: {
  description: string;
  className?: string;
}) {
  const descriptionObject = JSON.parse(description);
  return (
    <div className={`mx-auto w-full flex flex-col ${className}`}>
    {Object.keys(descriptionObject).map((key: string) => (
        <Disclosure
          as="div"
          key={key}
          className="border-t-1 border-t-gray-400"
          defaultOpen={false}
        >
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="bodyLG text-primary py-4">{key}</span>
            <ChevronDownIcon className="size-8 text-primary group-data-[open]:rotate-180 transition-all" />
          </DisclosureButton>
          <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-2"
            >
              <DisclosurePanel className="bodyMD text-gray-700 pb-4">
                {descriptionObject[key]}
              </DisclosurePanel>
          </Transition>
        </Disclosure>
      ))}
    </div>
  );
}
