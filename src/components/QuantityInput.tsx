interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function QuantityInput({ value, onChange, min = 1 }: QuantityInputProps) {
  function set(next: number) {
    onChange(Math.max(min, next));
  }

  return (
    <div className="flex h-[38px] items-center justify-center gap-1 rounded-md bg-[var(--color-border)] px-2">
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => set(value - 1)}
        className="flex h-[14px] w-[14px] items-center justify-center text-[var(--color-text-muted)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 7h10" />
        </svg>
      </button>
      <span className="min-w-[20px] text-center text-[16px] text-[var(--color-text)]">{value}</span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => set(value + 1)}
        className="flex h-[14px] w-[14px] items-center justify-center text-[var(--color-text-muted)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 7h10M7 2v10" />
        </svg>
      </button>
    </div>
  );
}