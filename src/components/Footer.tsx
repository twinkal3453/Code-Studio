"use client";

import React from "react";
import { Heart, Package, ShieldCheck, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="no-print"
      style={{
        marginTop: "auto",
        padding: "40px 24px 30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        borderTop: "1px solid var(--border-subtle)",
        background: "rgba(10, 13, 20, 0.4)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Zap size={15} style={{ color: "var(--accent-primary)" }} />
          Zero External Dependencies
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <ShieldCheck size={15} style={{ color: "var(--accent-emerald)" }} />
          Standard Code 128 & QR Specs
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Package size={15} style={{ color: "var(--accent-cyan)" }} />
          Client-Side SVG & Base64
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "0.82rem",
          color: "var(--text-muted)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span>
          Built with <strong style={{ color: "var(--text-primary)" }}>Next.js</strong> &amp;{" "}
          <a
            href="https://www.npmjs.com/package/code-generator-library"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent-primary)", textDecoration: "underline" }}
          >
            code-generator-library
          </a>
        </span>
        <span>•</span>
        <span>Ready for GitHub Pages</span>
      </div>
    </footer>
  );
}
