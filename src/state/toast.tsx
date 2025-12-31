import * as React from "react";

export type ToastTone = "default" | "ok" | "warn" | "err";

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
};

type ToastContextValue = {
  toasts: ToastItem[];
  push: (t: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

function id() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  }, []);

  const push = React.useCallback(
    (t: Omit<ToastItem, "id">) => {
      const toastId = id();
      setToasts((prev) => [...prev, { id: toastId, ...t }]);
      window.setTimeout(() => dismiss(toastId), 2200);
    },
    [dismiss],
  );

  const value = React.useMemo<ToastContextValue>(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

