import { describe, it, expect } from "vitest";
import { formatCurrency, calcSubtotal, calcTotal, DELIVERY_FEE } from "../utils/money";

describe("money utils", () => {
  it("formats cents to BRL with two decimals (RN-04)", () => {
    expect(formatCurrency(990)).toContain("9,90");
    expect(formatCurrency(0)).toContain("0,00");
  });

  it("calcSubtotal sums price*quantity (RN-03)", () => {
    const items = [
      { coffee: { price: 990 }, quantity: 2 },
      { coffee: { price: 1290 }, quantity: 1 },
    ];
    expect(calcSubtotal(items)).toBe(990 * 2 + 1290);
  });

  it("calcTotal adds delivery fee", () => {
    expect(calcTotal(990)).toBe(990 + DELIVERY_FEE);
  });

  it("DELIVERY_FEE is defined", () => {
    expect(DELIVERY_FEE).toBe(350);
  });
});
