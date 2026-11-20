import { describe, it, expect } from "vitest";
import { cartReducer, initialCartState, totalItems } from "../reducers/cartReducer";
import type { Coffee } from "../types";

const coffee: Coffee = {
  id: "c1",
  name: "Expresso",
  description: "desc",
  price: 990,
  image: "img.png",
  category: "Tradicional",
};

describe("cartReducer", () => {
  it("adds a new item", () => {
    const state = cartReducer(initialCartState, { type: "ADD_ITEM", coffee, quantity: 2 });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("accumulates quantity for repeated product (RN-02)", () => {
    const s1 = cartReducer(initialCartState, { type: "ADD_ITEM", coffee, quantity: 1 });
    const s2 = cartReducer(s1, { type: "ADD_ITEM", coffee, quantity: 2 });
    expect(s2.items).toHaveLength(1);
    expect(s2.items[0].quantity).toBe(3);
  });

  it("increments", () => {
    const s1 = cartReducer(initialCartState, { type: "ADD_ITEM", coffee, quantity: 1 });
    const s2 = cartReducer(s1, { type: "INCREMENT", coffeeId: coffee.id });
    expect(s2.items[0].quantity).toBe(2);
  });

  it("decrements to 0 removes item (RN-01)", () => {
    const s1 = cartReducer(initialCartState, { type: "ADD_ITEM", coffee, quantity: 1 });
    const s2 = cartReducer(s1, { type: "DECREMENT", coffeeId: coffee.id });
    expect(s2.items).toHaveLength(0);
  });

  it("removes item individually", () => {
    const s1 = cartReducer(initialCartState, { type: "ADD_ITEM", coffee, quantity: 3 });
    const s2 = cartReducer(s1, { type: "REMOVE_ITEM", coffeeId: coffee.id });
    expect(s2.items).toHaveLength(0);
  });

  it("clears cart", () => {
    const s1 = cartReducer(initialCartState, { type: "ADD_ITEM", coffee, quantity: 3 });
    const s2 = cartReducer(s1, { type: "CLEAR_CART" });
    expect(s2.items).toHaveLength(0);
  });

  it("totalItems sums quantities (RF-04)", () => {
    const s1 = cartReducer(initialCartState, { type: "ADD_ITEM", coffee, quantity: 3 });
    expect(totalItems(s1.items)).toBe(3);
  });
});
