import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ToastContextValue {
  message: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    window.setTimeout(() => setMessage(null), 2500);
  }, []);

  const hideToast = useCallback(() => setMessage(null), []);

  return (
    <ToastContext.Provider value={{ message, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}