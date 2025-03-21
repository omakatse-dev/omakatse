import { SubscriptionFormType } from "@/schemas/SubscriptionFormSchema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SubscriptionFormState = Partial<SubscriptionFormType> & {
  setData: (data: Partial<SubscriptionFormType>) => void;
};

export const useSubscriptionFormStore = create<SubscriptionFormState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
    }),
    {
      name: "subscription-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);