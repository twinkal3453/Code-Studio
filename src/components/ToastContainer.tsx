"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { ToastMessage } from "@/types/generator";

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container no-print" aria-live="polite">
      {toasts.map((t) => {
        const Icon =
          t.type === "error"
            ? AlertCircle
            : t.type === "info"
            ? Info
            : CheckCircle2;

        const iconColor =
          t.type === "error"
            ? "var(--accent-tertiary)"
            : t.type === "info"
            ? "var(--accent-cyan)"
            : "var(--accent-emerald)";

        return (
          <div key={t.id} className="toast" role="status">
            <Icon size={18} style={{ color: iconColor, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{t.title}</div>
              {t.description && (
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                  {t.description}
                </div>
              )}
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="btn btn-ghost btn-sm"
              style={{ padding: "2px 6px", opacity: 0.7 }}
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
