import type { CartItem as CartItemType } from "../types";
import { useCart } from "../contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { increment, decrement, removeItem } = useCart();

  return (
    <div className="flex items-center justify-between gap-5 py-2">
      <div className="flex items-center gap-5">
        <img
          src={item.coffee.image}
          alt={item.coffee.name}
          className="h-16 w-16 rounded object-cover"
        />
        <div className="flex flex-col gap-2">
          <p className="text-[16px] text-[var(--color-text-title)]">{item.coffee.name}</p>
          <div className="flex items-center gap-2">
            <div className="flex h-[32px] items-center justify-center gap-2 rounded-md bg-[var(--color-border)] px-2">
              <button
                type="button"
                aria-label="Diminuir"
                onClick={() => decrement(item.coffee.id)}
                className="flex h-4 w-4 items-center justify-center text-[var(--color-text-muted)]"
              >
                −
              </button>
              <span className="min-w-[20px] text-center text-[16px] text-[var(--color-text)]">{item.quantity}</span>
              <button
                type="button"
                aria-label="Aumentar"
                onClick={() => increment(item.coffee.id)}
                className="flex h-4 w-4 items-center justify-center text-[var(--color-text-muted)]"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.coffee.id)}
              aria-label={`Remover ${item.coffee.name}`}
              className="flex items-center gap-1 rounded-md bg-[var(--color-border)] px-2 py-2 text-[12px] uppercase text-[var(--color-text-muted)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
              </svg>
              Remover
            </button>
          </div>
        </div>
      </div>
      <span className="text-[16px] font-bold text-[var(--color-text)]">
        R$ {(item.coffee.price * item.quantity / 100).toFixed(2).replace(".", ",")}
      </span>
    </div>
  );
}