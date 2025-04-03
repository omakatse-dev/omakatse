import ContactForm from "@/components/contact/ContactForm";

export default function page() {
  return (
    <div className="w-full max-w-5xl flex flex-col sm:flex-row gap-6 sm:gap-30 mt-28 sm:mt-48 px-6 pb-10 sm:pb-20">
      <div className="text-center sm:text-left sm:w-1/2">
        <div className="bg-yellow aspect-square" />
        <h2>Contact Us</h2>
        <div className="bodyMD text-gray-800 mt-2 sm:mt-3">Say hello — we don’t bite, and we’ll be in touch shortly.</div>
      </div>
      <div className="sm:w-1/2">
        <ContactForm />
      </div>
    </div>
  );
}
