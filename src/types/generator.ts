export type GeneratorMode = "qr" | "barcode";

export type QRErrorCorrection = "L" | "M" | "Q" | "H";

export interface QRConfig {
  text: string;
  width: number;
  margin: number;
  errorCorrectionLevel: QRErrorCorrection;
  darkColor: string;
  lightColor: string;
  type: "svg" | "dataUrl";
}

export interface BarcodeConfig {
  text: string;
  height: number;
  scale: number;
  type: "svg" | "dataUrl";
}

export interface HistoryItem {
  id: string;
  mode: GeneratorMode;
  text: string;
  timestamp: number;
  previewDataUrl: string;
  qrConfig?: Partial<QRConfig>;
  barcodeConfig?: Partial<BarcodeConfig>;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "error";
}
