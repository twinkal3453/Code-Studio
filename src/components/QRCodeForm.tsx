"use client";

import React, { useState } from "react";
import {
  Link2,
  FileText,
  Wifi,
  Mail,
  Phone,
  UserCheck,
  RotateCcw,
  Palette,
  Sliders,
  ShieldCheck,
  Info,
} from "lucide-react";
import { QRConfig, QRErrorCorrection } from "@/types/generator";

interface QRCodeFormProps {
  config: QRConfig;
  onChange: (config: QRConfig) => void;
  onReset: () => void;
}

const PRESET_TEMPLATES = [
  {
    id: "url",
    name: "Website URL",
    icon: Link2,
    sample: "https://github.com/twinkal3453/code-generator-lib",
  },
  {
    id: "wifi",
    name: "Wi-Fi Network",
    icon: Wifi,
    sample: "WIFI:S:Studio_Office_5G;T:WPA;P:HighSpeedPass2026;;",
  },
  {
    id: "vcard",
    name: "vCard Contact",
    icon: UserCheck,
    sample:
      "BEGIN:VCARD\nVERSION:3.0\nN:Smith;Alex;;;\nFN:Alex Smith\nORG:Code Studio Inc\nTEL;TYPE=CELL:+12025550143\nEMAIL:alex.smith@example.com\nURL:https://example.com\nEND:VCARD",
  },
  {
    id: "email",
    name: "Email Message",
    icon: Mail,
    sample: "mailto:hello@example.com?subject=Code%20Studio%20Inquiry&body=Hi%20there!",
  },
  {
    id: "phone",
    name: "Phone Number",
    icon: Phone,
    sample: "tel:+12025550198",
  },
  {
    id: "text",
    name: "Plain Text",
    icon: FileText,
    sample: "Code Generator Library: Fast zero-dependency QR & Barcode generator.",
  },
];

const COLOR_SWATCHES_DARK = [
  { name: "Pure Black", hex: "#000000" },
  { name: "Deep Slate", hex: "#0f172a" },
  { name: "Midnight Indigo", hex: "#312e81" },
  { name: "Neon Violet", hex: "#7c3aed" },
  { name: "Emerald Forest", hex: "#065f46" },
  { name: "Crimson Red", hex: "#991b1b" },
  { name: "Cyan Teal", hex: "#0e7490" },
];

const COLOR_SWATCHES_LIGHT = [
  { name: "Pure White", hex: "#ffffff" },
  { name: "Ghost White", hex: "#f8fafc" },
  { name: "Warm Cream", hex: "#fffbeb" },
  { name: "Soft Emerald", hex: "#f0fdf4" },
  { name: "Soft Sky", hex: "#f0f9ff" },
];

export function QRCodeForm({ config, onChange, onReset }: QRCodeFormProps) {
  const [activePreset, setActivePreset] = useState<string>("url");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...config, text: e.target.value });
  };

  const handlePresetClick = (presetId: string, sample: string) => {
    setActivePreset(presetId);
    onChange({ ...config, text: sample });
  };

  const handleNumberChange = (field: keyof QRConfig, value: number) => {
    onChange({ ...config, [field]: value });
  };

  const handleECLChange = (ecl: QRErrorCorrection) => {
    onChange({ ...config, errorCorrectionLevel: ecl });
  };

  const handleColorChange = (field: "darkColor" | "lightColor", hex: string) => {
    onChange({ ...config, [field]: hex });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      {/* Preset Quick Chips */}
      <div>
        <label className="input-label" style={{ marginBottom: "10px" }}>
          Template Presets
        </label>
        <div className="chips-grid">
          {PRESET_TEMPLATES.map((preset) => {
            const Icon = preset.icon;
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetClick(preset.id, preset.sample)}
                className={`chip-btn ${isSelected ? "active" : ""}`}
              >
                <Icon size={14} />
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Payload */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <label className="input-label" htmlFor="qr-payload-input" style={{ marginBottom: 0 }}>
            Payload / Text / URL
          </label>
          <span
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color:
                config.text.length > 1800
                  ? "var(--accent-tertiary)"
                  : "var(--text-muted)",
            }}
          >
            {config.text.length} / 2000 chars
          </span>
        </div>
        <textarea
          id="qr-payload-input"
          value={config.text}
          onChange={handleTextChange}
          placeholder="Enter text, URL, Wi-Fi config or contact information..."
          className="input-field"
          rows={3}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem" }}
          maxLength={2000}
        />
      </div>

      {/* Error Correction Level */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <label className="input-label" style={{ marginBottom: 0 }}>
            <ShieldCheck size={14} style={{ display: "inline", marginRight: "4px" }} />
            Error Correction Level (ECL)
          </label>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Redundancy Recovery
          </span>
        </div>

        <div className="segmented-control">
          {(
            [
              { level: "L", label: "L (~7%)", desc: "Low" },
              { level: "M", label: "M (~15%)", desc: "Standard" },
              { level: "Q", label: "Q (~25%)", desc: "High" },
              { level: "H", label: "H (~30%)", desc: "Best" },
            ] as const
          ).map((item) => (
            <button
              key={item.level}
              type="button"
              onClick={() => handleECLChange(item.level)}
              className={`segmented-btn ${
                config.errorCorrectionLevel === item.level ? "active" : ""
              }`}
              title={`${item.desc} redundancy`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions & Margin Sliders */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <div className="slider-container">
          <div className="slider-header">
            <span className="input-label" style={{ marginBottom: 0 }}>
              <Sliders size={13} style={{ display: "inline", marginRight: "4px" }} />
              Dimension (Width & Height)
            </span>
            <span className="slider-value">{config.width}px</span>
          </div>
          <input
            type="range"
            min="120"
            max="600"
            step="10"
            value={config.width}
            onChange={(e) => handleNumberChange("width", parseInt(e.target.value, 10))}
            className="range-slider"
          />
        </div>

        <div className="slider-container">
          <div className="slider-header">
            <span className="input-label" style={{ marginBottom: 0 }}>
              Quiet Zone Margin
            </span>
            <span className="slider-value">{config.margin} blocks</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={config.margin}
            onChange={(e) => handleNumberChange("margin", parseInt(e.target.value, 10))}
            className="range-slider"
          />
        </div>
      </div>

      {/* Color Customization */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: "16px",
          background: "var(--bg-subtle)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {/* Module Color (Dark) */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
            <Palette size={14} style={{ color: "var(--accent-primary)" }} />
            <span className="input-label" style={{ marginBottom: 0 }}>
              Module Color (Foreground)
            </span>
          </div>
          <div className="color-picker-row">
            <div className="color-input-wrapper">
              <input
                type="color"
                value={config.darkColor}
                onChange={(e) => handleColorChange("darkColor", e.target.value)}
                className="native-color-picker"
                aria-label="Pick foreground color"
              />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: config.darkColor,
                }}
              />
            </div>
            <div className="color-swatches">
              {COLOR_SWATCHES_DARK.map((swatch) => (
                <button
                  key={swatch.hex}
                  type="button"
                  onClick={() => handleColorChange("darkColor", swatch.hex)}
                  className={`swatch-btn ${config.darkColor.toLowerCase() === swatch.hex.toLowerCase() ? "active" : ""}`}
                  style={{ background: swatch.hex }}
                  title={swatch.name}
                  aria-label={swatch.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Background Color (Light) */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
            <Palette size={14} style={{ color: "var(--accent-cyan)" }} />
            <span className="input-label" style={{ marginBottom: 0 }}>
              Background Color
            </span>
          </div>
          <div className="color-picker-row">
            <div className="color-input-wrapper">
              <input
                type="color"
                value={config.lightColor}
                onChange={(e) => handleColorChange("lightColor", e.target.value)}
                className="native-color-picker"
                aria-label="Pick background color"
              />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: config.lightColor,
                }}
              />
            </div>
            <div className="color-swatches">
              {COLOR_SWATCHES_LIGHT.map((swatch) => (
                <button
                  key={swatch.hex}
                  type="button"
                  onClick={() => handleColorChange("lightColor", swatch.hex)}
                  className={`swatch-btn ${config.lightColor.toLowerCase() === swatch.hex.toLowerCase() ? "active" : ""}`}
                  style={{ background: swatch.hex }}
                  title={swatch.name}
                  aria-label={swatch.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reset & Status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "6px",
        }}
      >
        <span
          style={{
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Info size={13} />
          Direct client-side SVG rendering via code-generator-library
        </span>
        <button
          type="button"
          onClick={onReset}
          className="btn btn-ghost btn-sm"
          title="Reset to default settings"
        >
          <RotateCcw size={13} />
          <span>Reset Defaults</span>
        </button>
      </div>
    </div>
  );
}
