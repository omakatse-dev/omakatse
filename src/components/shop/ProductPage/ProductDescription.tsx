import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function ProductDescription({ productID }: {
    productID: String
  }) {
  return (
    <div className="mx-auto w-full flex flex-col gap-10">
        <Disclosure as="div" className="p- border-t-1 border-black" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="bodyLG font-semibold text-black py-4">
                Description
            </span>
            <ChevronDownIcon className="size-8 group-data-[open]:rotate-180" />

            </DisclosureButton>
            <DisclosurePanel className="bodyMD font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </DisclosurePanel>
        </Disclosure>

        <Disclosure as="div" className="p- border-t-1 border-black" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="bodyLG font-semibold text-black py-4">
                Ingredients
            </span>
            <ChevronDownIcon className="size-8 group-data-[open]:rotate-180" />

            </DisclosureButton>
            <DisclosurePanel className="bodyMD font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </DisclosurePanel>
        </Disclosure>

        <Disclosure as="div" className="p- border-t-1 border-black" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="bodyLG font-semibold text-black py-4">
                Benefits
            </span>
            <ChevronDownIcon className="size-8 group-data-[open]:rotate-180" />

            </DisclosureButton>
            <DisclosurePanel className="bodyMD font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </DisclosurePanel>
        </Disclosure>

        <Disclosure as="div" className="p- border-t-1 border-black" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="bodyLG font-semibold text-black py-4">
                Instructions
            </span>
            <ChevronDownIcon className="size-8 group-data-[open]:rotate-180" />

            </DisclosureButton>
            <DisclosurePanel className="bodyMD font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </DisclosurePanel>
        </Disclosure>

        <Disclosure as="div" className="p- border-t-1 border-black" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="bodyLG font-semibold text-black py-4">
                Dimension
            </span>
            <ChevronDownIcon className="size-8 group-data-[open]:rotate-180" />

            </DisclosureButton>
            <DisclosurePanel className="bodyMD font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </DisclosurePanel>
        </Disclosure>

        <Disclosure as="div" className="p- border-t-1 border-black" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="bodyLG font-semibold text-black py-4">
                Material
            </span>
            <ChevronDownIcon className="size-8 group-data-[open]:rotate-180" />

            </DisclosureButton>
            <DisclosurePanel className="bodyMD font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </DisclosurePanel>
        </Disclosure>
        

    </div>
  )
}