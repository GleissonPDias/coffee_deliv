import { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { cartReducer, initialCartState, totalItems } from "../reducers/cartReducer";
import type { CartItem, Coffee } from "../types";

interface CartContextValue {
  items: CartItem[];
  addItem: (coffee: Coffee, quantity: number) => void;
  increment: (coffeeId: string) => void;
  decrement: (coffeeId: string) => void;
  removeItem: (coffeeId: string) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "coffee-delivery:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [hydrated, setHydrated] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        dispatch({ type: "SET_ITEMS", items: parsed });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }, [state.items, hydrated]);

  const value: CartContextValue = {
    items: state.items,
    addItem: (coffee, quantity) =>
      dispatch({ type: "ADD_ITEM", coffee, quantity: Math.max(1, quantity) }),
    increment: (coffeeId) => dispatch({ type: "INCREMENT", coffeeId }),
    decrement: (coffeeId) => dispatch({ type: "DECREMENT", coffeeId }),
    removeItem: (coffeeId) => dispatch({ type: "REMOVE_ITEM", coffeeId }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    totalItems: totalItems(state.items),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}