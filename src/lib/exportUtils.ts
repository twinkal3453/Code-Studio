/**
 * Utilities for downloading and copying generated SVGs and PNGs
 */

export function downloadSvg(svgString: string, filename: string = "code.svg") {
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export async function convertSvgToPngBlob(
  svgString: string,
  pixelRatio: number = 2
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Parse dimensions from SVG
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgEl = doc.querySelector("svg");

    if (!svgEl) {
      return reject(new Error("Invalid SVG content"));
    }

    let width = parseFloat(svgEl.getAttribute("width") || "300");
    let height = parseFloat(svgEl.getAttribute("height") || "300");

    if (isNaN(width) || isNaN(height)) {
      const viewBox = svgEl.getAttribute("viewBox");
      if (viewBox) {
        const parts = viewBox.split(" ").map(Number);
        width = parts[2] || 300;
        height = parts[3] || 300;
      } else {
        width = 300;
        height = 300;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return reject(new Error("Unable to obtain canvas 2D context"));
    }

    ctx.scale(pixelRatio, pixelRatio);

    const img = new Image();
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas to Blob conversion failed"));
        }
      }, "image/png");
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load SVG into image for rendering"));
    };

    img.src = url;
  });
}

export async function downloadPng(
  svgString: string,
  filename: string = "code.png",
  scale: number = 2
) {
  const blob = await convertSvgToPngBlob(svgString, scale);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export async function copySvgToClipboard(svgString: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(svgString);
    return true;
  } catch (err) {
    console.error("Failed to copy SVG text:", err);
    return false;
  }
}

export async function copyPngToClipboard(svgString: string): Promise<boolean> {
  try {
    const blob = await convertSvgToPngBlob(svgString, 2);
    if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
      return true;
    } else {
      // Fallback
      return false;
    }
  } catch (err) {
    console.error("Failed to copy PNG to clipboard:", err);
    return false;
  }
}
