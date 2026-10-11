# Code Studio — QR Code & Barcode Generator

An elegant, modern, zero-dependency QR Code and Code 128 Barcode generator web application built with **Next.js** and [`code-generator-library`](https://www.npmjs.com/package/code-generator-library). Ready for deployment to **GitHub Pages**.

![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-ISC-green?style=flat-square)
![code-generator-library](https://img.shields.io/badge/code--generator--library-v1.0.5-violet?style=flat-square)

---

## ✨ Features

- 🔲 **Customizable QR Code Generator**:
  - Encodes URLs, plain text, Wi-Fi network configurations, vCard contacts, email links, phone numbers, and SMS.
  - Configurable dimensions (width and height from 120px to 600px).
  - Quiet zone margin padding adjustment (0 to 10 blocks).
  - Error correction levels: **L** (~7%), **M** (~15%), **Q** (~25%), **H** (~30%).
  - Full color customization (custom foreground/dark module colors and background colors with curated swatches).
- 📊 **Code 128 Barcode Generator**:
  - High-density standard Code 128 (Set B) symbology for logistics, shipping, inventory, and retail.
  - Real-time ASCII validation (ASCII 32–127).
  - Configurable bar height and width scale multiplier.
  - Quick sample presets: Product SKU, Tracking Numbers, Asset Tags, Serial Numbers, and Numeric barcodes.
- 🎨 **Elegant & Responsive UI**:
  - Glassmorphic dark and light theme toggle.
  - Instant live rendering as you type.
  - Interactive preview zoom (fit, 50% to 250%).
- 📥 **Export & Sharing Hub**:
  - **Download SVG**: Crisp, infinite resolution vector graphics.
  - **Download PNG**: High-resolution 3× scaled raster images.
  - **Copy SVG Markup**: Direct XML snippet to clipboard.
  - **Copy Image**: Raster PNG copied directly to OS clipboard.
  - **Print Label**: Clean thermal and paper label printer view (`@media print`).
- 🕒 **History Drawer**:
  - Keeps recent generations in local storage for instant one-click reloading.
- 🚀 **GitHub Pages Ready**:
  - Pre-configured with Next.js static HTML export (`output: 'export'`).
  - Automated deployment workflow included (`.github/workflows/deploy.yml`).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Engine**: [`code-generator-library`](https://www.npmjs.com/package/code-generator-library) (Zero external dependencies)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Pure CSS with CSS Tokens and Glassmorphic aesthetics (No Tailwind dependency)

---

## 🚀 Getting Started Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build Static Export

```bash
npm run build
```

This compiles your application into an optimized static site located in the `./out` directory.

---

## 🌐 Deploying to GitHub Pages

### Method 1: Automated Deployment via GitHub Actions (Recommended)

1. Push your code to a repository on GitHub with the default branch named `main`.
2. Go to your repository on GitHub:
   - Click **Settings** → **Pages**
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**.
3. Every push to the `main` branch will automatically trigger the included workflow in `.github/workflows/deploy.yml` and publish your site!

### Method 2: Custom Base Path (Project Subpath)

If your repository is hosted at `https://<username>.github.io/<repo-name>/`, the included `next.config.ts` automatically detects your repository name when running in GitHub Actions.

If deploying manually or from another CI system, you can set the environment variable:

```bash
NEXT_PUBLIC_BASE_PATH="/<repo-name>" npm run build
```

---

## 📖 Library Reference

This project utilizes `code-generator-library`:

```typescript
import { generateQR, generateBarcode } from 'code-generator-library';

// QR Code
const qrSvg = await generateQR('https://example.com', {
  type: 'svg',
  width: 260,
  margin: 4,
  errorCorrectionLevel: 'H',
  color: { dark: '#000000', light: '#ffffff' }
});

// Barcode (Code 128)
const barcodeSvg = await generateBarcode('PACKAGE-98765', {
  type: 'svg',
  height: 60,
  scale: 2
});
```

---

## 📄 License

MIT / ISC.
