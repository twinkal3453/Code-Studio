"use client";

import React, { useState } from "react";
import {
  Download,
  Copy,
  Printer,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
  FileCode,
  Image as ImageIcon,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import {
  downloadSvg,
  downloadPng,
  copySvgToClipboard,
  copyPngToClipboard,
} from "@/lib/exportUtils";
import { GeneratorMode } from "@/types/generator";

interface PreviewCardProps {
  mode: GeneratorMode;
  svgContent: string;
  dataUrlContent: string;
  error: string | null;
  textPayload: string;
  onToast: (title: string, description?: string, type?: "success" | "info" | "error") => void;
}

export function PreviewCard({
  mode,
  svgContent,
  dataUrlContent,
  error,
  textPayload,
  onToast,
}: PreviewCardProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [copiedType, setCopiedType] = useState<"svg" | "png" | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  const getCleanFilename = (ext: string) => {
    const slug = textPayload
      .replace(/[^a-zA-Z0-9]/g, "-")
      .slice(0, 20)
      .toLowerCase() || "code";
    return `${mode}-${slug}.${ext}`;
  };

  const handleDownloadSvg = () => {
    if (!svgContent) return;
    downloadSvg(svgContent, getCleanFilename("svg"));
    onToast("SVG Downloaded", `Saved vector as ${getCleanFilename("svg")}`, "success");
  };

  const handleDownloadPng = async () => {
    if (!svgContent) return;
    try {
      setIsExporting(true);
      await downloadPng(svgContent, getCleanFilename("png"), 3);
      onToast("PNG Downloaded", `Saved high-res raster as ${getCleanFilename("png")}`, "success");
    } catch (err) {
      console.error(err);
      onToast("Export Failed", "Could not export PNG", "error");
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopySvg = async () => {
    if (!svgContent) return;
    const ok = await copySvgToClipboard(svgContent);
    if (ok) {
      setCopiedType("svg");
      setTimeout(() => setCopiedType(null), 2000);
      onToast("Copied SVG Markup", "Raw SVG XML copied to clipboard", "success");
    } else {
      onToast("Copy Failed", "Clipboard access was denied", "error");
    }
  };

  const handleCopyPng = async () => {
    if (!svgContent) return;
    try {
      const ok = await copyPngToClipboard(svgContent);
      if (ok) {
        setCopiedType("png");
        setTimeout(() => setCopiedType(null), 2000);
        onToast("Copied PNG Image", "Raster image copied to clipboard", "success");
      } else {
        // Fallback to copying Data URI
        await navigator.clipboard.writeText(dataUrlContent);
        onToast("Copied Data URI", "Base64 image URL copied", "info");
      }
    } catch {
      onToast("Copy Failed", "Unable to write image to clipboard", "error");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "100%",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Live Output</h2>
          <span className="badge badge-success" style={{ fontSize: "0.68rem" }}>
            <Sparkles size={11} />
            Rendered
          </span>
        </div>

        {/* Zoom Controls */}
        <div
          className="no-print"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "var(--bg-subtle)",
            padding: "3px 6px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <button
            onClick={handleZoomOut}
            className="btn btn-ghost btn-sm"
            style={{ padding: "4px 8px" }}
            title="Zoom Out"
            disabled={zoom <= 0.5}
            aria-label="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={handleResetZoom}
            className="btn btn-ghost btn-sm"
            style={{ padding: "4px 8px", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}
            title="Reset Zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="btn btn-ghost btn-sm"
            style={{ padding: "4px 8px" }}
            title="Zoom In"
            disabled={zoom >= 2.5}
            aria-label="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
        </div>
      </div>

      {/* Main Display Stage */}
      <div
        style={{
          flex: 1,
          minHeight: "340px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)",
          borderRadius: "var(--radius-lg)",
          border: "1px dashed var(--border-medium)",
          padding: "24px",
          overflow: "auto",
          position: "relative",
        }}
      >
        {error ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              color: "var(--accent-tertiary)",
              textAlign: "center",
              maxWidth: "320px",
            }}
          >
            <AlertTriangle size={36} />
            <h3 style={{ fontSize: "1rem" }}>Generation Error</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              {error}
            </p>
          </div>
        ) : svgContent ? (
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              transition: "transform 0.15s ease-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              background: "#ffffff",
              borderRadius: "var(--radius-md)",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
              maxWidth: "100%",
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: svgContent }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 0,
              }}
            />
          </div>
        ) : (
          <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Enter content to render code...
          </div>
        )}
      </div>

      {/* Export Action Hub */}
      <div
        className="no-print"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <button
            onClick={handleDownloadSvg}
            disabled={!svgContent || !!error || isExporting}
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            <Download size={16} />
            <span>Download SVG</span>
          </button>

          <button
            onClick={handleDownloadPng}
            disabled={!svgContent || !!error || isExporting}
            className="btn btn-secondary"
            style={{ width: "100%" }}
          >
            <ImageIcon size={16} />
            <span>Download PNG</span>
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "8px",
          }}
        >
          <button
            onClick={handleCopySvg}
            disabled={!svgContent || !!error}
            className="btn btn-secondary btn-sm"
            title="Copy SVG markup to clipboard"
          >
            {copiedType === "svg" ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <FileCode size={14} />}
            <span>{copiedType === "svg" ? "Copied SVG" : "Copy SVG"}</span>
          </button>

          <button
            onClick={handleCopyPng}
            disabled={!svgContent || !!error}
            className="btn btn-secondary btn-sm"
            title="Copy image to clipboard"
          >
            {copiedType === "png" ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <Copy size={14} />}
            <span>{copiedType === "png" ? "Copied PNG" : "Copy Image"}</span>
          </button>

          <button
            onClick={handlePrint}
            disabled={!svgContent || !!error}
            className="btn btn-secondary btn-sm"
            title="Print barcode or QR code"
          >
            <Printer size={14} />
            <span>Print Label</span>
          </button>
        </div>
      </div>
    </div>
  );
}
