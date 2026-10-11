import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Code Generator Studio — QR Code & Code 128 Barcode Generator",
  description:
    "An elegant, zero-dependency QR Code and Code 128 Barcode generator built with Next.js and code-generator-library. Export as SVG or PNG, customize colors, scale, and print directly.",
  keywords: [
    "qr code generator",
    "barcode generator",
    "code 128",
    "code-generator-library",
    "svg qr code",
    "next.js qr code",
    "github pages",
  ],
  authors: [{ name: "Code Generator Studio" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
