import { create } from "zustand";

export interface CartItem {
  productId: string;
  vendorId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (i) => i.productId === item.productId && i.variant === item.variant
      );
      if (existingItemIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += item.quantity;
        return { items: newItems };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (productId, variant) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.productId === productId && i.variant === variant)
      ),
    })),
  updateQuantity: (productId, quantity, variant) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId && i.variant === variant
          ? { ...i, quantity }
          : i
      ),
    })),
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  totalPrice: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}));
