import Button from "@/components/common/Button";
import React from "react";

export default function ShippingAddress() {
  return (
    <div className="flex flex-col gap-6 bodyMD max-w-2xl">
      <button>Test</button>
      <h3 className="font-bold">Shipping address</h3>
      <div className="flex flex-col gap-2">
        <div className="text-gray-500">Country / Region</div>
        <div>United Arab Emirates</div>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-gray-500">First name</div>
          <div>Nana</div>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-gray-500">Last name</div>
          <div>tan</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-gray-500">Address</div>
        <div>277 South Bridge Road</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-gray-500">Apartment, suite, etc. (optional)</div>
        <div>-</div>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-gray-500">City</div>
          <div>Dubai</div>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <div className="text-gray-500">Emirate</div>
          <div>Dubai</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-gray-500">Phone</div>
        <div>1234567890</div>
      </div>
      <Button className="sm:w-fit">Edit shipping address</Button>
    </div>
  );
}
