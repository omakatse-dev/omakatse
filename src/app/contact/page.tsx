import ContactForm from '@/components/contact/ContactForm';
import Image from 'next/image';

export default function page() {
  return (
    <div className="mt-28 flex w-full max-w-5xl flex-col gap-6 px-6 pb-10 sm:mt-48 sm:flex-row sm:gap-30 sm:pb-20">
      <div className="flex flex-col items-center pt-4 text-center sm:w-1/2 sm:items-start sm:text-start">
        <Image
          src="assets/ContactUsKumo.svg"
          alt="Contact Us Kumo"
          width="408"
          height="254"
          className="sm:mb-8"
        />
        <h2 className="text-primary">Contact Us</h2>
        <div className="bodyMD mt-2 text-gray-800 sm:mt-3">
          Say hello — we don’t bite, and we’ll be in touch shortly.
        </div>
      </div>
      <div className="sm:w-1/2">
        <ContactForm />
      </div>
    </div>
  );
}
