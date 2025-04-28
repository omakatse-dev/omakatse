"use client";

// import ContinueModal from "@/components/subscription/ContinueModal";
// import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  // const formData = useSubscriptionFormStore((state) => state);
  // const hydrated = useSubscriptionFormStore((state) => state.hydrated);
  // const [showContinueModal, setShowContinueModal] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log("do", window.history.state.previousPathname)
  //   if (hydrated && !!formData.petType) {
  //     setShowContinueModal(true);
  //   }
  // }, [formData.petType, hydrated]);

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      {children}
      {/* {showContinueModal && (
        <ContinueModal close={() => setShowContinueModal(false)} />
      )} */}
    </div>
  );
}
