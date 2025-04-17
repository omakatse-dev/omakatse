import Paw from "../../../public/assets/Paw.svg";
import Image from "next/image";

export default function TipCard({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center bg-gray-50 p-4 sm:p-6 rounded-2xl ${className}`}
    >
      <Image src={Paw} alt="Paw" className="w-10 h-10 sm:w-12 sm:h-12" />
      <div className="bodyMD font-bold">Tip</div>
      <div className="bodyXS text-gray-800 ml-4">
        For more than 2 pets, we recommend getting a large box to cater to all
        your fur babies.
      </div>
    </div>
  );
}
