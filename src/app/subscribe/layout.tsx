'use client';

import ContinueModal from '@/components/subscription/ContinueModal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// import ContinueModal from "@/components/subscription/ContinueModal";
// import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

export default function SubscribeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [showContinueModal, setShowContinueModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Get the previous path from sessionStorage when component mounts
    const prevPath = sessionStorage.getItem('previousPath');
    const subData = localStorage.getItem('subscription-storage');
    if ((!prevPath || !prevPath.includes('/subscribe')) && subData) {
      setShowContinueModal(true);
    }
    // if prevPath !include subscribe, fast forward to latest step
    if (!prevPath?.includes('/subscribe')) {
      const latestStep = localStorage.getItem('latestStep');
      if (latestStep) {
        router.push(`/subscribe/${latestStep}`);
      }
    }
  }, []);

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      {children}
      {showContinueModal && (
        <ContinueModal close={() => setShowContinueModal(false)} />
      )}
    </div>
  );
}
