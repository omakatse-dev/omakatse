import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
import SubscriptionList from '@/components/account/subscriptions/SubscriptionList'

export default function page() {

  return (
    <div className="mt-28 sm:mt-48 px-6 pb-10 sm:pb-20 w-screen max-w-6xl">
      <Link
        href="/account/subscriptions"
        className="bodyButton flex items-center gap-2 cursor-pointer w-fit"
      >
        <ChevronLeftIcon className="w-6" />
        Go back
      </Link>
      <h3 className="font-bold mt-8 text-center">Look who&apos;s back - we missed you!</h3>
      <div className="bodyMD text-gray-800 mt-1 text-center">
        Give everything a quick check before renewing! Want to change the box size, plan, or pet? Just hit <span className="font-bold">Edit Subscription</span> to make updates.
      </div>
      <SubscriptionList/>
    </div>
  )
}
