import { useToast } from "../contexts/ToastContext";

export function Toast() {
  const { message, hideToast } = useToast();
  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[var(--color-accent-dark)] px-6 py-3 text-sm font-bold text-white shadow-lg"
    >
      {message}
      <button
        type="button"
        onClick={hideToast}
        aria-label="Fechar"
        className="ml-3 text-white/80 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}