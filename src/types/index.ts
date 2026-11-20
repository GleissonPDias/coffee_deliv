export interface Coffee {
  id: string;
  name: string;
  description: string;
  price: number; // centavos
  image: string;
  category: string;
}

export interface CartItem {
  coffee: Coffee;
  quantity: number;
}

export type PaymentMethod = "credit" | "debit" | "cash";

export interface DeliveryAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}