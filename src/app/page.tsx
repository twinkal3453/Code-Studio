"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { generateQR, generateBarcode } from "code-generator-library";
import { Header } from "@/components/Header";
import { Tabs } from "@/components/Tabs";
import { QRCodeForm } from "@/components/QRCodeForm";
import { BarcodeForm } from "@/components/BarcodeForm";
import { PreviewCard } from "@/components/PreviewCard";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { DocsModal } from "@/components/DocsModal";
import { ToastContainer } from "@/components/ToastContainer";
import { Footer } from "@/components/Footer";
import {
  GeneratorMode,
  QRConfig,
  BarcodeConfig,
  HistoryItem,
  ToastMessage,
} from "@/types/generator";

const DEFAULT_QR_CONFIG: QRConfig = {
  text: "https://github.com/twinkal3453/code-generator-lib",
  width: 260,
  margin: 4,
  errorCorrectionLevel: "M",
  darkColor: "#000000",
  lightColor: "#ffffff",
  type: "svg",
};

const DEFAULT_BARCODE_CONFIG: BarcodeConfig = {
  text: "SKU-984210-PRO",
  height: 60,
  scale: 2,
  type: "svg",
};

const STORAGE_KEYS = {
  THEME: "code_generator_theme",
  HISTORY: "code_generator_history",
};

export default function Home() {
  const [mode, setMode] = useState<GeneratorMode>("qr");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [qrConfig, setQrConfig] = useState<QRConfig>(DEFAULT_QR_CONFIG);
  const [barcodeConfig, setBarcodeConfig] =
    useState<BarcodeConfig>(DEFAULT_BARCODE_CONFIG);

  const [svgOutput, setSvgOutput] = useState<string>("");
  const [dataUrlOutput, setDataUrlOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const lastRecordedRef = useRef<string>("");

  // Initialize theme from storage / system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as
        | "dark"
        | "light"
        | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const initial = prefersDark ? "dark" : "light";
        setTheme(initial);
        document.documentElement.setAttribute("data-theme", initial);
      }

      // Load history
      try {
        const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (e) {
        console.error("Failed to parse history from localStorage", e);
      }
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, nextTheme);
  };

  const addToast = useCallback(
    (
      title: string,
      description?: string,
      type: "success" | "info" | "error" = "info"
    ) => {
      const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
      setToasts((prev) => [...prev, { id, title, description, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Generate code whenever configs or mode change
  const runGeneration = useCallback(async () => {
    try {
      if (mode === "qr") {
        if (!qrConfig.text.trim()) {
          setSvgOutput("");
          setDataUrlOutput("");
          setError(null);
          return;
        }

        const [svg, dataUrl] = await Promise.all([
          generateQR(qrConfig.text, {
            type: "svg",
            width: qrConfig.width,
            margin: qrConfig.margin,
            errorCorrectionLevel: qrConfig.errorCorrectionLevel,
            color: {
              dark: qrConfig.darkColor,
              light: qrConfig.lightColor,
            },
          }),
          generateQR(qrConfig.text, {
            type: "dataUrl",
            width: qrConfig.width,
            margin: qrConfig.margin,
            errorCorrectionLevel: qrConfig.errorCorrectionLevel,
            color: {
              dark: qrConfig.darkColor,
              light: qrConfig.lightColor,
            },
          }),
        ]);

        setSvgOutput(svg);
        setDataUrlOutput(dataUrl);
        setError(null);

        // Record in history if distinct
        const payloadKey = `qr:${qrConfig.text}:${qrConfig.width}:${qrConfig.darkColor}`;
        if (lastRecordedRef.current !== payloadKey && qrConfig.text.length > 2) {
          lastRecordedRef.current = payloadKey;
          setHistory((prev) => {
            const newItem: HistoryItem = {
              id: Date.now().toString(),
              mode: "qr",
              text: qrConfig.text,
              timestamp: Date.now(),
              previewDataUrl: dataUrl,
              qrConfig: { ...qrConfig },
            };
            const updated = [newItem, ...prev.slice(0, 14)];
            localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
            return updated;
          });
        }
      } else {
        if (!barcodeConfig.text.trim()) {
          setSvgOutput("");
          setDataUrlOutput("");
          setError(null);
          return;
        }

        const [svg, dataUrl] = await Promise.all([
          generateBarcode(barcodeConfig.text, {
            type: "svg",
            height: barcodeConfig.height,
            scale: barcodeConfig.scale,
          }),
          generateBarcode(barcodeConfig.text, {
            type: "dataUrl",
            height: barcodeConfig.height,
            scale: barcodeConfig.scale,
          }),
        ]);

        setSvgOutput(svg);
        setDataUrlOutput(dataUrl);
        setError(null);

        // Record in history if distinct
        const payloadKey = `barcode:${barcodeConfig.text}:${barcodeConfig.height}`;
        if (
          lastRecordedRef.current !== payloadKey &&
          barcodeConfig.text.length > 1
        ) {
          lastRecordedRef.current = payloadKey;
          setHistory((prev) => {
            const newItem: HistoryItem = {
              id: Date.now().toString(),
              mode: "barcode",
              text: barcodeConfig.text,
              timestamp: Date.now(),
              previewDataUrl: dataUrl,
              barcodeConfig: { ...barcodeConfig },
            };
            const updated = [newItem, ...prev.slice(0, 14)];
            localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
            return updated;
          });
        }
      }
    } catch (err: unknown) {
      console.warn("Generation error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to generate code";
      setError(message);
      setSvgOutput("");
      setDataUrlOutput("");
    }
  }, [mode, qrConfig, barcodeConfig]);

  useEffect(() => {
    runGeneration();
  }, [runGeneration]);

  const handleRestoreHistory = (item: HistoryItem) => {
    if (item.mode === "qr") {
      setMode("qr");
      if (item.qrConfig) {
        setQrConfig((prev) => ({ ...prev, ...item.qrConfig }));
      } else {
        setQrConfig((prev) => ({ ...prev, text: item.text }));
      }
    } else {
      setMode("barcode");
      if (item.barcodeConfig) {
        setBarcodeConfig((prev) => ({ ...prev, ...item.barcodeConfig }));
      } else {
        setBarcodeConfig((prev) => ({ ...prev, text: item.text }));
      }
    }
    setIsHistoryOpen(false);
    addToast("Loaded from History", item.text.slice(0, 30), "success");
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    addToast("History Cleared", "Recent items removed", "info");
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
      return updated;
    });
  };

  const currentPayload =
    mode === "qr" ? qrConfig.text : barcodeConfig.text;

  return (
    <>
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      <main
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 20px 40px",
          flex: 1,
        }}
      >
        <Tabs mode={mode} onChange={setMode} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Controls Panel (Left Column) */}
          <section
            className="glass-card no-print controls-panel"
            style={{
              padding: "26px",
            }}
            aria-label="Configuration Settings"
          >
            <div
              style={{
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "16px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                {mode === "qr" ? "QR Code Customizer" : "Barcode (Code 128) Configurator"}
              </h2>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                {mode === "qr"
                  ? "Configure payload, dimensions, error tolerance, and colors."
                  : "Input standard Code 128 Set B text, adjust bar height and scaling."}
              </p>
            </div>

            {mode === "qr" ? (
              <QRCodeForm
                config={qrConfig}
                onChange={setQrConfig}
                onReset={() => {
                  setQrConfig(DEFAULT_QR_CONFIG);
                  addToast("Reset Settings", "QR parameters set to defaults", "info");
                }}
              />
            ) : (
              <BarcodeForm
                config={barcodeConfig}
                onChange={setBarcodeConfig}
                onReset={() => {
                  setBarcodeConfig(DEFAULT_BARCODE_CONFIG);
                  addToast(
                    "Reset Settings",
                    "Barcode parameters set to defaults",
                    "info"
                  );
                }}
              />
            )}
          </section>

          {/* Live Preview Panel (Right Column) */}
          <section
            style={{ position: "sticky", top: "20px" }}
            aria-label="Live Preview Output"
          >
            <PreviewCard
              mode={mode}
              svgContent={svgOutput}
              dataUrlContent={dataUrlOutput}
              error={error}
              textPayload={currentPayload}
              onToast={addToast}
            />
          </section>
        </div>
      </main>

      {/* Clean container for browser print (window.print) */}
      <div className="print-only-container" style={{ display: "none" }}>
        {svgOutput && (
          <div
            dangerouslySetInnerHTML={{ __html: svgOutput }}
            style={{ marginBottom: "16px" }}
          />
        )}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          {currentPayload}
        </div>
      </div>

      <Footer />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={history}
        onRestore={handleRestoreHistory}
        onClear={handleClearHistory}
        onDeleteItem={handleDeleteHistoryItem}
      />

      <DocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </>
  );
}
