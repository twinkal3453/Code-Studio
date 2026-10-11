"use client";

import React from "react";
import {
  QrCode,
  Barcode,
  Sun,
  Moon,
  History,
  BookOpen,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface HeaderProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onOpenHistory: () => void;
  historyCount: number;
  onOpenDocs: () => void;
}

export function Header({
  theme,
  onToggleTheme,
  onOpenHistory,
  historyCount,
  onOpenDocs,
}: HeaderProps) {
  return (
    <header
      className="glass-card no-print"
      style={{
        margin: "16px 20px 24px",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "14px",
            background: "var(--gradient-brand)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <QrCode size={24} strokeWidth={2.2} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800 }}>
              Code <span className="gradient-text">Studio</span>
            </h1>
            <span className="badge badge-brand" style={{ fontSize: "0.68rem" }}>
              <Sparkles size={11} />
              Zero-Dep
            </span>
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            High-Performance QR Code & Code 128 Barcode Generator
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onOpenDocs}
          className="btn btn-secondary btn-sm"
          title="Library API & Documentation"
          aria-label="Library API and Docs"
        >
          <BookOpen size={15} />
          <span>Library Docs</span>
        </button>

        <button
          onClick={onOpenHistory}
          className="btn btn-secondary btn-sm"
          title="Recent History"
          aria-label="View Generation History"
          style={{ position: "relative" }}
        >
          <History size={15} />
          <span>History</span>
          {historyCount > 0 && (
            <span
              style={{
                background: "var(--accent-primary)",
                color: "#ffffff",
                fontSize: "0.7rem",
                fontWeight: 700,
                borderRadius: "9999px",
                padding: "1px 6px",
                marginLeft: "2px",
              }}
            >
              {historyCount}
            </span>
          )}
        </button>

        <a
          href="https://www.npmjs.com/package/code-generator-library"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          title="View code-generator-library on npm"
        >
          <span>npm v1.0.5</span>
          <ExternalLink size={13} />
        </a>

        <button
          onClick={onToggleTheme}
          className="btn btn-secondary btn-icon"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
