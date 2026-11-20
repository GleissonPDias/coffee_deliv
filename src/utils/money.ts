export const DELIVERY_FEE = 350; // centavos = R$ 3,50

export function formatCurrency(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function calcSubtotal(items: { coffee: { price: number }; quantity: number }[]): number {
  return items.reduce((acc, item) => acc + item.coffee.price * item.quantity, 0);
}

export function calcTotal(subtotal: number, deliveryFee: number = DELIVERY_FEE): number {
  return subtotal + deliveryFee;
}