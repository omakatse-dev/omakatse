import { SubscriptionFormType } from "@/schemas/SubscriptionFormSchema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SubscriptionFormState = Partial<SubscriptionFormType> & {
  setData: (data: Partial<SubscriptionFormType>) => void;
  hydrated: boolean;
  setHydrated: () => void;
  clearData: () => void;
};

export const useSubscriptionFormStore = create<SubscriptionFormState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      clearData: () => {
        set({});
        localStorage.removeItem("subscription-storage");
      },
    }),
    {
      name: "subscription-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);
