import React from 'react'
import Image from 'next/image'
import Button from '../common/Button'

function HowItWorks() {
  return (
      <div className="flex flex-col bg-pink-pastel px-6 lg:px-12 py-12 lg:py-20">
        <h2 className="text-3xl flex place-content-center mb-5">
          How it works
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 mb-8 lg:mb-10">
          <div className="relative mt-10">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center text-pink text-3xl border-1 border-gray-200 font-parkinsans absolute font-bold -top-10 left-1/2 -translate-x-1/2 z-1">
              1
            </div>
            <div className="bg-gray-50 rounded-[1.25rem] px-10 py-20 flex flex-col gap-5 text-center items-center drop-shadow-[8px_8px_0px_rgba(238,128,127,1)] lg:h-full">
              <Image
                src="/assets/kumo_details.svg"
                width={272}
                height={200}
                alt="Kumo Details"
              />
              <h3>Tell us your pet details</h3>
              <b className="bodyLG font-normal">
                A one-stop subscription service tailored for your furry family
                members
              </b>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center text-pink text-3xl border-1 border-gray-200 font-parkinsans absolute font-bold -top-10 left-1/2 -translate-x-1/2 z-1">
              2
            </div>
            <div className="bg-gray-50 rounded-[1.25rem] px-10 py-20 flex flex-col gap-5 text-center items-center drop-shadow-[8px_8px_0px_rgba(238,128,127,1)] lg:h-full">
              <Image
                src="/assets/kumo_customise.svg"
                width={272}
                height={200}
                alt="Kumo Details"
              />
              <h3>We will customise the box</h3>
              <b className="bodyLG font-normal">
                A one-stop subscription service tailored for your furry family
                members
              </b>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center text-pink text-3xl border-1 border-gray-200 font-parkinsans absolute font-bold -top-10 left-1/2 -translate-x-1/2 z-1">
              3
            </div>
            <div className="bg-gray-50 rounded-[1.25rem] px-10 py-20 flex flex-col gap-5 text-center items-center drop-shadow-[8px_8px_0px_rgba(238,128,127,1)] lg:h-full">
              <Image
                src="/assets/kumo_delivery.svg"
                width={272}
                height={200}
                alt="Kumo Details"
              />
              <h3>Delivered to your door monthly</h3>
              <b className="bodyLG font-normal">
                A one-stop subscription service tailored for your furry family
                members
              </b>
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          className="w-full sm:w-auto justify-self-center"
        >
          Build your box now
        </Button>
      </div>
  )
}

export default HowItWorks
