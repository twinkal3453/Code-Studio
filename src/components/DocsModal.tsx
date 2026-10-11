"use client";

import React, { useState } from "react";
import { X, BookOpen, Terminal, Check, Copy, ExternalLink, Globe } from "lucide-react";

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocsModal({ isOpen, onClose }: DocsModalProps) {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const installCode = `npm install code-generator-library`;

  const qrCodeSnippet = `import { generateQR } from 'code-generator-library';

// Generate SVG string
const svg = await generateQR('https://example.com', {
  type: 'svg',
  width: 250,
  margin: 4,
  errorCorrectionLevel: 'H',
  color: { dark: '#000000', light: '#ffffff' }
});`;

  const barcodeSnippet = `import { generateBarcode } from 'code-generator-library';

// Generate Code 128 Barcode as Data URI or SVG
const barcodeSvg = await generateBarcode('PACKAGE-98765', {
  type: 'svg',
  height: 60,
  scale: 2
});`;

  return (
    <div
      className="no-print"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(8px)",
        zIndex: 9500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "680px",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          animation: "scaleIn 0.2s ease-out forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>

        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "var(--bg-active)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-primary)",
              }}
            >
              <BookOpen size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem" }}>code-generator-library Reference</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Zero-dependency QR & Code 128 generator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-icon"
            style={{ width: "32px", height: "32px" }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Install */}
        <div>
          <label className="input-label">Installation</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--bg-primary)",
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.88rem",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Terminal size={15} style={{ color: "var(--accent-primary)" }} />
              {installCode}
            </span>
            <button
              onClick={() => handleCopy(installCode, "install")}
              className="btn btn-ghost btn-sm"
              style={{ padding: "4px 8px" }}
            >
              {copiedSnippet === "install" ? (
                <Check size={14} style={{ color: "var(--accent-emerald)" }} />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        </div>

        {/* QR Code Usage */}
        <div>
          <label className="input-label">QR Code Generation</label>
          <div
            style={{
              position: "relative",
              background: "var(--bg-primary)",
              padding: "14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              lineHeight: 1.6,
              overflowX: "auto",
            }}
          >
            <button
              onClick={() => handleCopy(qrCodeSnippet, "qr")}
              className="btn btn-ghost btn-sm"
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              {copiedSnippet === "qr" ? (
                <Check size={14} style={{ color: "var(--accent-emerald)" }} />
              ) : (
                <Copy size={14} />
              )}
            </button>
            <pre style={{ margin: 0 }}>{qrCodeSnippet}</pre>
          </div>
        </div>

        {/* Barcode Usage */}
        <div>
          <label className="input-label">Barcode Generation (Code 128)</label>
          <div
            style={{
              position: "relative",
              background: "var(--bg-primary)",
              padding: "14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              lineHeight: 1.6,
              overflowX: "auto",
            }}
          >
            <button
              onClick={() => handleCopy(barcodeSnippet, "barcode")}
              className="btn btn-ghost btn-sm"
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              {copiedSnippet === "barcode" ? (
                <Check size={14} style={{ color: "var(--accent-emerald)" }} />
              ) : (
                <Copy size={14} />
              )}
            </button>
            <pre style={{ margin: 0 }}>{barcodeSnippet}</pre>
          </div>
        </div>

        {/* GitHub Pages Deployment Info */}
        <div
          style={{
            padding: "14px 16px",
            background: "rgba(99, 102, 241, 0.08)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(99, 102, 241, 0.25)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700 }}>
            <Globe size={16} style={{ color: "var(--accent-primary)" }} />
            <span>GitHub Pages Deployment Ready</span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", margin: 0 }}>
            This Next.js app is configured with static HTML export (<code>output: &apos;export&apos;</code>).
            Simply push to GitHub and enable GitHub Pages via GitHub Actions.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "6px",
          }}
        >
          <a
            href="https://www.npmjs.com/package/code-generator-library"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <span>View on npm</span>
            <ExternalLink size={13} />
          </a>

          <button onClick={onClose} className="btn btn-primary btn-sm">
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
