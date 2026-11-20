import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Order } from "../types";


const PAYMENT_LABEL: Record<Order["paymentMethod"], string> = {
  credit: "Cartão de Crédito",
  debit: "Cartão de Débito",
  cash: "Dinheiro",
};

export function Success() {
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("coffee-delivery:lastOrder");
      if (raw) setOrder(JSON.parse(raw) as Order);
    } catch {
      /* ignore */
    }
  }, []);

  if (!order) {
    return (
      <main className="mx-auto max-w-[1120px] px-5 py-16 text-center">
        <h1 className="font-display text-[32px] font-extrabold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
          Nenhum pedido encontrado
        </h1>
        <p className="mt-2 text-[var(--color-text-muted)]">Finalize uma compra para ver a confirmação.</p>
        <Link to="/" className="mt-6 inline-block rounded-md bg-[var(--color-primary-light)] px-6 py-3 font-bold uppercase text-white">
          Voltar à Home
        </Link>
      </main>
    );
  }

  return (
    <main className="relative mx-auto max-w-[1120px] px-4 py-8 md:px-8 md:py-10">
      <h1 className="font-display text-[32px] font-extrabold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
        Uhu! Pedido confirmado
      </h1>
      <p className="mt-2 max-w-[552px] text-[20px] text-[var(--color-text-title)]">
        Agora é só aguardar que logo o café chegará até você
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="w-full rounded-bl-[36px] rounded-br-[6px] rounded-tl-[6px] rounded-tr-[36px] border border-[var(--color-primary-light)] p-6 md:p-10 lg:w-[526px]">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)] text-white">📍</span>
            <p className="text-[16px] text-[var(--color-text-muted)]">
              Entrega em{" "}
              <span className="font-bold text-[var(--color-text)]">
                {order.address.street}, {order.address.number}
              </span>
              <br />
              {order.address.neighborhood} - {order.address.city}, {order.address.state}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-white">⏱</span>
            <div>
              <p className="text-[16px] text-[var(--color-text-muted)]">Previsão de entrega</p>
              <p className="font-bold text-[var(--color-text)]">20 min - 30 min</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">💳</span>
            <div>
              <p className="text-[16px] text-[var(--color-text-muted)]">Pagamento na entrega</p>
              <p className="font-bold text-[var(--color-text)]">{PAYMENT_LABEL[order.paymentMethod]}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-[var(--color-border)] pt-4 text-sm">
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>Subtotal</span>
              <span>R$ {(order.subtotal / 100).toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>Entrega</span>
              <span>R$ {(order.deliveryFee / 100).toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between font-bold text-[var(--color-text)]">
              <span>Total</span>
              <span>R$ {(order.total / 100).toFixed(2).replace(".", ",")}</span>
            </div>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <img
            src="/illustration.svg"
            alt="Entrega"
            className="h-[293px] w-[492px] object-contain"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-md bg-[var(--color-primary-light)] px-6 py-3 font-bold uppercase text-white"
        >
          Voltar à Home
        </button>
      </div>
    </main>
  );
}