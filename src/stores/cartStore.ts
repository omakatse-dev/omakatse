import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItemType = {
  id: string;
  name: string;
  price: string;
  compareAtPrice: string;
  quantity: number;
  image: string;
  sellingPlanId?: string;
  duration?: string;
  options: {
    name: string;
    value: string;
  }[];
};

type CartState = {
  items: CartItemType[];
  totalPrice: number;
  totalCompareAtPrice: number;
  addItem: (item: CartItemType) => void;
  removeItem: (item: CartItemType) => void;
  clearCart: () => void;
  changeQuantity: (item: CartItemType, newQuantity: number) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalPrice: 0,
      totalCompareAtPrice: 0,

      addItem: (item: CartItemType) =>
        set((state) => ({
          items: [...state.items, item],
          totalPrice: state.totalPrice + Number(item.price) * item.quantity,
          totalCompareAtPrice:
            state.totalCompareAtPrice +
            Number(item.compareAtPrice) * item.quantity,
        })),
      removeItem: (item: CartItemType) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== item.id),
          totalPrice: state.totalPrice - Number(item.price) * item.quantity,
          totalCompareAtPrice:
            state.totalCompareAtPrice -
            Number(item.compareAtPrice) * item.quantity,
        })),
      changeQuantity: (item: CartItemType, newQuantity: number) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: newQuantity } : i
          ),
          totalPrice:
            state.totalPrice -
            Number(item.price) * item.quantity +
            Number(item.price) * newQuantity,
          totalCompareAtPrice:
            state.totalCompareAtPrice -
            Number(item.compareAtPrice) * item.quantity +
            Number(item.compareAtPrice) * newQuantity,
        }));
      },
      clearCart: () =>
        set({
          items: [],
          totalPrice: 0,
          totalCompareAtPrice: 0,
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
