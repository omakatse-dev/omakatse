'use client';

import ContinueModal from '@/components/subscription/ContinueModal';
import { usePathname } from 'next/navigation';
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
  const currentPath = usePathname();
  useEffect(() => {
    // Get the previous path from sessionStorage when component mounts
    const prevPath = sessionStorage.getItem('previousPath');
    console.log('prevpath', prevPath);
    if ((!prevPath || !prevPath.includes('/subscribe')) && currentPath !== '/subscribe/step-1') {
      setShowContinueModal(true);
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
