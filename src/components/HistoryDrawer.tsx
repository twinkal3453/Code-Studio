"use client";

import React from "react";
import { X, Trash2, RotateCcw, QrCode, Barcode, Clock } from "lucide-react";
import { HistoryItem } from "@/types/generator";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onClear: () => void;
  onDeleteItem: (id: string) => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  items,
  onRestore,
  onClear,
  onDeleteItem,
}: HistoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="no-print"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(6px)",
        zIndex: 9000,
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "100%",
          background: "var(--bg-secondary)",
          borderLeft: "1px solid var(--border-medium)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          gap: "18px",
          animation: "slideInDrawer 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideInDrawer {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Clock size={18} style={{ color: "var(--accent-primary)" }} />
            <h3 style={{ fontSize: "1.1rem" }}>Recent Generations</h3>
            <span className="badge" style={{ fontSize: "0.7rem" }}>
              {items.length}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {items.length > 0 && (
              <button
                onClick={onClear}
                className="btn btn-ghost btn-sm"
                title="Clear all history"
                style={{ color: "var(--accent-tertiary)" }}
              >
                <Trash2 size={14} />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="btn btn-ghost btn-icon"
              style={{ width: "32px", height: "32px" }}
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* List of items */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            paddingRight: "4px",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                gap: "10px",
                textAlign: "center",
              }}
            >
              <Clock size={36} opacity={0.4} />
              <p style={{ fontSize: "0.9rem" }}>No history yet.</p>
              <span style={{ fontSize: "0.78rem" }}>
                Generated codes will automatically appear here.
              </span>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "12px 14px",
                  background: "var(--bg-subtle)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  transition: "border-color 0.15s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className={`badge ${
                      item.mode === "qr" ? "badge-brand" : "badge-success"
                    }`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {item.mode === "qr" ? (
                      <QrCode size={12} />
                    ) : (
                      <Barcode size={12} />
                    )}
                    {item.mode === "qr" ? "QR Code" : "Barcode (128)"}
                  </span>

                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    color: "var(--text-primary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={item.text}
                >
                  {item.text}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "8px",
                    marginTop: "4px",
                  }}
                >
                  <button
                    onClick={() => onRestore(item)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: "4px 10px", fontSize: "0.78rem" }}
                  >
                    <RotateCcw size={12} />
                    <span>Load</span>
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="btn btn-ghost btn-sm"
                    style={{
                      padding: "4px 8px",
                      color: "var(--accent-tertiary)",
                    }}
                    title="Delete this entry"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
