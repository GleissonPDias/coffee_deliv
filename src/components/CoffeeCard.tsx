import { useState } from "react";
import type { Coffee } from "../types";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { QuantityInput } from "./QuantityInput";


interface CoffeeCardProps {
  coffee: Coffee;
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    addItem(coffee, quantity);
    showToast(`${quantity} ${quantity === 1 ? "café adicionado" : "cafés adicionados"} ao carrinho`);
    setQuantity(1);
  }

  return (
    <article className="relative flex h-[310px] w-full max-w-[256px] flex-col items-center rounded-bl-[36px] rounded-br-[6px] rounded-tl-[6px] rounded-tr-[36px] bg-[var(--color-surface-2)]">
      <img
        src={coffee.image}
        alt={coffee.name}
        className="absolute left-1/2 top-[-20px] h-[120px] w-[120px] -translate-x-1/2 rounded-full object-cover"
        loading="lazy"
      />
      <div className="mt-[112px] flex items-center justify-center gap-1">
        {coffee.category.split(",").map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[var(--color-primary-lighter)] px-2 py-1 text-[10px] font-bold uppercase text-[var(--color-primary)]"
          >
            {tag.trim()}
          </span>
        ))}
      </div>
      <h3 className="mt-4 px-5 text-center font-display text-[20px] font-bold text-[var(--color-text-title)]" style={{ fontFamily: "var(--font-display)" }}>
        {coffee.name}
      </h3>
      <p className="mt-1 px-5 text-center text-[14px] text-[var(--color-text-label)]">
        {coffee.description}
      </p>
      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
        <p className="text-right text-[var(--color-text-muted)]">
          <span className="text-[14px] font-normal">R$ </span>
          <span className="font-display text-[24px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
            {(coffee.price / 100).toFixed(2).replace(".", ",")}
          </span>
        </p>
        <div className="flex items-center gap-2">
          <QuantityInput value={quantity} onChange={setQuantity} />
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Adicionar ${coffee.name} ao carrinho`}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-md bg-[var(--color-accent-dark)] text-white transition hover:opacity-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="17" cy="20" r="1.5" />
              <path d="M3 4h2l2.5 11h10l2-7H7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}