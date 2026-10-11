"use client";

import React from "react";
import { QrCode, Barcode } from "lucide-react";
import { GeneratorMode } from "@/types/generator";

interface TabsProps {
  mode: GeneratorMode;
  onChange: (mode: GeneratorMode) => void;
}

export function Tabs({ mode, onChange }: TabsProps) {
  return (
    <div
      className="no-print"
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "24px",
      }}
    >
      <div
        className="glass-card"
        style={{
          display: "inline-flex",
          padding: "6px",
          gap: "8px",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-medium)",
          background: "var(--bg-card)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <button
          onClick={() => onChange("qr")}
          className={`btn ${
            mode === "qr" ? "btn-primary" : "btn-ghost"
          }`}
          style={{
            borderRadius: "var(--radius-lg)",
            padding: "10px 22px",
            fontSize: "0.95rem",
          }}
        >
          <QrCode size={19} />
          <span>QR Code</span>
          <span
            style={{
              fontSize: "0.72rem",
              opacity: mode === "qr" ? 0.9 : 0.6,
              background: mode === "qr" ? "rgba(255, 255, 255, 0.2)" : "var(--bg-subtle)",
              padding: "2px 7px",
              borderRadius: "var(--radius-full)",
              marginLeft: "4px",
            }}
          >
            SVG & PNG
          </span>
        </button>

        <button
          onClick={() => onChange("barcode")}
          className={`btn ${
            mode === "barcode" ? "btn-primary" : "btn-ghost"
          }`}
          style={{
            borderRadius: "var(--radius-lg)",
            padding: "10px 22px",
            fontSize: "0.95rem",
          }}
        >
          <Barcode size={19} />
          <span>Barcode</span>
          <span
            style={{
              fontSize: "0.72rem",
              opacity: mode === "barcode" ? 0.9 : 0.6,
              background:
                mode === "barcode" ? "rgba(255, 255, 255, 0.2)" : "var(--bg-subtle)",
              padding: "2px 7px",
              borderRadius: "var(--radius-full)",
              marginLeft: "4px",
            }}
          >
            Code 128
          </span>
        </button>
      </div>
    </div>
  );
}
