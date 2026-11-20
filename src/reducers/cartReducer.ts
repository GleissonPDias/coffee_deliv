import type { CartItem, Coffee } from "../types";

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD_ITEM"; coffee: Coffee; quantity: number }
  | { type: "INCREMENT"; coffeeId: string }
  | { type: "DECREMENT"; coffeeId: string }
  | { type: "REMOVE_ITEM"; coffeeId: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_ITEMS"; items: CartItem[] };

export const initialCartState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.coffee.id === action.coffee.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.coffee.id === action.coffee.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { coffee: action.coffee, quantity: action.quantity }],
      };
    }
    case "INCREMENT": {
      return {
        ...state,
        items: state.items.map((i) =>
          i.coffee.id === action.coffeeId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    case "DECREMENT": {
      const item = state.items.find((i) => i.coffee.id === action.coffeeId);
      if (!item) return state;
      if (item.quantity <= 1) {
        // remove on 0
        return {
          ...state,
          items: state.items.filter((i) => i.coffee.id !== action.coffeeId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.coffee.id === action.coffeeId ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((i) => i.coffee.id !== action.coffeeId),
      };
    }
    case "CLEAR_CART": {
      return { ...state, items: [] };
    }
    case "SET_ITEMS": {
      return { ...state, items: action.items };
    }
    default:
      return state;
  }
}

export function totalItems(items: CartItem[]): number {
  return items.reduce((acc, i) => acc + i.quantity, 0);
}