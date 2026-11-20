import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { CartItem } from "../components/CartItem";
import { DeliveryAddressForm } from "../components/DeliveryAddressForm";
import { calcSubtotal, calcTotal, DELIVERY_FEE } from "../utils/money";
import type { CheckoutFormData } from "../schemas/checkoutSchema";
import type { Order, PaymentMethod } from "../types";

export function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const submitRef = useRef<(() => void) | null>(null);

  const subtotal = calcSubtotal(items);
  const total = calcTotal(subtotal);

  function handleValid(data: CheckoutFormData) {
    if (items.length === 0) return;
    setSubmitting(true);
    const order: Order = {
      id: crypto.randomUUID(),
      items: [...items],
      address: {
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
      paymentMethod: data.paymentMethod as PaymentMethod,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      createdAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem("coffee-delivery:lastOrder", JSON.stringify(order));
    } catch {
      /* ignore */
    }
    clearCart();
    navigate("/success");
  }

  return (
    <main className="mx-auto max-w-[1120px] px-4 py-8 md:px-8 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-[18px] font-bold text-[var(--color-text-title)]" style={{ fontFamily: "var(--font-display)" }}>
          Complete seu pedido
        </h1>
        <h2 className="font-display text-[18px] font-bold text-[var(--color-text-title)]" style={{ fontFamily: "var(--font-display)" }}>
          Cafés selecionados
        </h2>
      </div>

      {items.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">Seu carrinho está vazio.</p>
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 rounded-md bg-[var(--color-surface-2)] p-10">
            <DeliveryAddressForm
              onValid={handleValid}
              registerSubmit={(submit) => {
                submitRef.current = submit;
              }}
            />
          </div>

          <aside className="w-full lg:w-[448px]">
            <div className="rounded-bl-[44px] rounded-br-[6px] rounded-tl-[6px] rounded-tr-[44px] bg-[var(--color-surface-2)] p-10">
              {items.map((item, idx) => (
                <div key={item.coffee.id}>
                  <CartItem item={item} />
                  {idx < items.length - 1 && <div className="my-2 h-px bg-[var(--color-border)]" />}
                </div>
              ))}
              <div className="mt-4 space-y-2 text-right">
                <div className="flex justify-between text-[14px] text-[var(--color-text-muted)]">
                  <span>Total de itens</span>
                  <span>R$ {(subtotal / 100).toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-[14px] text-[var(--color-text-muted)]">
                  <span>Entrega</span>
                  <span>R$ {(DELIVERY_FEE / 100).toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-[20px] font-bold text-[var(--color-text-title)]">
                  <span>Total</span>
                  <span>R$ {(total / 100).toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
              <button
                type="button"
                disabled={submitting || items.length === 0}
                onClick={() => submitRef.current?.()}
                className="mt-6 w-full rounded-md bg-[var(--color-primary-light)] py-3 text-[14px] font-bold uppercase text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Confirmando..." : "Confirmar pedido"}
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}