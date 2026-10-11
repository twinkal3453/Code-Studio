"use client";

import React, { useState } from "react";
import {
  Barcode,
  Package,
  Boxes,
  Truck,
  Hash,
  RotateCcw,
  Sliders,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { BarcodeConfig } from "@/types/generator";

interface BarcodeFormProps {
  config: BarcodeConfig;
  onChange: (config: BarcodeConfig) => void;
  onReset: () => void;
}

const BARCODE_PRESETS = [
  {
    id: "sku",
    name: "Product SKU",
    icon: Package,
    sample: "SKU-984210-PRO",
  },
  {
    id: "tracking",
    name: "Tracking No.",
    icon: Truck,
    sample: "TRK-EXP-8891402",
  },
  {
    id: "inventory",
    name: "Asset Tag",
    icon: Boxes,
    sample: "INV-ASSET-4029B",
  },
  {
    id: "serial",
    name: "Serial Number",
    icon: Hash,
    sample: "SN-2024-X8911",
  },
  {
    id: "digits",
    name: "Numeric Code",
    icon: Barcode,
    sample: "789102436512",
  },
];

export function BarcodeForm({ config, onChange, onReset }: BarcodeFormProps) {
  const [activePreset, setActivePreset] = useState<string>("sku");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...config, text: e.target.value });
  };

  const handlePresetClick = (presetId: string, sample: string) => {
    setActivePreset(presetId);
    onChange({ ...config, text: sample });
  };

  const handleNumberChange = (field: keyof BarcodeConfig, value: number) => {
    onChange({ ...config, [field]: value });
  };

  // Validate Code 128 Set B ASCII range (32 to 127)
  const isValidAscii = (text: string) => {
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code < 32 || code > 127) return false;
    }
    return true;
  };

  const textValid = config.text.length > 0 && isValidAscii(config.text);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      {/* Preset Quick Chips */}
      <div>
        <label className="input-label" style={{ marginBottom: "10px" }}>
          Barcode Templates (Code 128)
        </label>
        <div className="chips-grid">
          {BARCODE_PRESETS.map((preset) => {
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

      {/* Input Code */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <label className="input-label" htmlFor="barcode-text-input" style={{ marginBottom: 0 }}>
            Barcode String (Alphanumeric / Code 128 Set B)
          </label>
          <span
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
            }}
          >
            {config.text.length} chars
          </span>
        </div>

        <input
          id="barcode-text-input"
          type="text"
          value={config.text}
          onChange={handleTextChange}
          placeholder="e.g. PACKAGE-98765 or 1234567890"
          className="input-field"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.95rem",
            letterSpacing: "0.04em",
          }}
          maxLength={500}
        />

        {/* Validation hint */}
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.78rem",
          }}
        >
          {config.text.length === 0 ? (
            <span style={{ color: "var(--text-muted)" }}>
              Please enter text to generate a barcode.
            </span>
          ) : textValid ? (
            <span
              style={{
                color: "var(--accent-emerald)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <CheckCircle2 size={13} />
              Valid Code 128 Set B characters (ASCII 32-127)
            </span>
          ) : (
            <span
              style={{
                color: "var(--accent-tertiary)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <AlertCircle size={13} />
              Contains non-standard characters. Code 128 Set B accepts ASCII 32 to 127.
            </span>
          )}
        </div>
      </div>

      {/* Dimensions & Scale Sliders */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "18px",
        }}
      >
        <div className="slider-container">
          <div className="slider-header">
            <span className="input-label" style={{ marginBottom: 0 }}>
              <Sliders size={13} style={{ display: "inline", marginRight: "4px" }} />
              Bar Height
            </span>
            <span className="slider-value">{config.height}px</span>
          </div>
          <input
            type="range"
            min="30"
            max="160"
            step="5"
            value={config.height}
            onChange={(e) =>
              handleNumberChange("height", parseInt(e.target.value, 10))
            }
            className="range-slider"
          />
        </div>

        <div className="slider-container">
          <div className="slider-header">
            <span className="input-label" style={{ marginBottom: 0 }}>
              Scale Multiplier (Width)
            </span>
            <span className="slider-value">{config.scale}x</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={config.scale}
            onChange={(e) =>
              handleNumberChange("scale", parseInt(e.target.value, 10))
            }
            className="range-slider"
          />
        </div>
      </div>

      {/* Barcode Info Card */}
      <div
        style={{
          padding: "14px 16px",
          background: "var(--bg-subtle)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          fontSize: "0.82rem",
          color: "var(--text-secondary)",
        }}
      >
        <Info size={16} style={{ color: "var(--accent-primary)", flexShrink: 0, marginTop: "2px" }} />
        <div>
          <strong style={{ color: "var(--text-primary)" }}>Code 128 High-Density Symbology:</strong>{" "}
          Standard format used worldwide in supply chain, logistics, shipping containers, and inventory management. Includes automatic checksum calculation.
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
          }}
        >
          High-resolution vector SVG output
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
