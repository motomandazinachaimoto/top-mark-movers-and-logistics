/**
 * Global image URL optimizer
 * Handles HEIC/HEIF conversion and Cloudinary format optimization.
 */

import { useEffect, useState } from "react";

const heicConversionCache = new Map<string, string>();
let heic2anyLoaded = false;

declare global {
  interface Window {
    heic2any?: (options: {
      blob: Blob;
      toType: string;
      quality?: number;
    }) => Promise<Blob | Blob[]>;
  }
}

async function loadHeic2Any(): Promise<boolean> {
  if (heic2anyLoaded) return true;

  try {
    if (window.heic2any) {
      heic2anyLoaded = true;
      return true;
    }

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js";
      script.async = true;
      script.onload = () => {
        heic2anyLoaded = true;
        resolve(true);
      };
      script.onerror = () => {
        console.warn("Failed to load heic2any library");
        resolve(false);
      };
      document.head.appendChild(script);
    });
  } catch (error) {
    console.error("Error loading heic2any:", error);
    return false;
  }
}

async function convertHeicToJpeg(blob: Blob): Promise<Blob> {
  const loaded = await loadHeic2Any();
  if (!loaded || !window.heic2any) {
    throw new Error("heic2any library not available");
  }

  const converted = await window.heic2any({
    blob,
    toType: "image/jpeg",
    quality: 0.9,
  });

  return Array.isArray(converted) ? converted[0] : converted;
}

async function convertExternalHeic(url: string): Promise<string> {
  if (heicConversionCache.has(url)) {
    return heicConversionCache.get(url)!;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Image fetch failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const jpegBlob = await convertHeicToJpeg(blob);
    const objectUrl = URL.createObjectURL(jpegBlob);
    heicConversionCache.set(url, objectUrl);
    return objectUrl;
  } catch (error) {
    console.error(`Failed to convert HEIC image: ${url}`, error);
    return url;
  }
}

export function optimizeImageUrl(url: string): string {
  if (!url) return "";

  if (url.includes("/image/upload/")) {
    if (url.includes("/image/upload/f_auto/")) return url;
    return url.replace("/image/upload/", "/image/upload/f_auto/");
  }

  return url;
}

export function useHeicImage(url: string) {
  const [imageSrc, setImageSrc] = useState<string>(optimizeImageUrl(url));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) {
      setImageSrc("");
      return;
    }

    const optimizedUrl = optimizeImageUrl(url);
    const isHeic = /\.(heic|heif)(\?|#|$)/i.test(url);
    const isCloudinary = optimizedUrl.includes("/image/upload/");
    let canceled = false;

    if (isHeic && !isCloudinary) {
      setIsLoading(true);
      convertExternalHeic(url)
        .then((convertedUrl) => {
          if (canceled) return;
          setImageSrc(convertedUrl);
          setError(null);
        })
        .catch((err: unknown) => {
          if (canceled) return;
          setError(err instanceof Error ? err : new Error("Unknown conversion error"));
          setImageSrc(url);
        })
        .finally(() => {
          if (!canceled) setIsLoading(false);
        });
    } else {
      setImageSrc(optimizedUrl);
      setIsLoading(false);
      setError(null);
    }

    return () => {
      canceled = true;
    };
  }, [url]);

  return { imageSrc, isLoading, error };
}
