/**
 * Global image URL optimizer
 * Uses Cloudinary server-side transforms + browser prefetch cache for fast loading.
 */

import { useEffect } from "react";

// ── URL optimization cache ──────────────────────────────────────────────────
// Avoid recomputing the same string transform on every render.
const urlCache = new Map<string, string>();

/**
 * Injects Cloudinary transforms into a URL:
 *  - f_auto  → serves WebP on Chrome/Firefox, JPEG on Safari (handles HEIC server-side)
 *  - q_auto  → Cloudinary picks optimal quality (typically 50–70% smaller files)
 *  - w_1200  → caps width at 1200px (cards never need full resolution)
 */
export function optimizeImageUrl(url: string): string {
  if (!url) return "";
  if (urlCache.has(url)) return urlCache.get(url)!;

  let result = url;
  if (url.includes("/image/upload/")) {
    result = url.includes("/image/upload/f_auto")
      ? url
      : url.replace("/image/upload/", "/image/upload/f_auto,q_auto,w_1200/");
  }

  urlCache.set(url, result);
  return result;
}

// ── Background prefetch ─────────────────────────────────────────────────────
// Track which URLs have already been prefetched so we only do it once globally.
const prefetched = new Set<string>();

/**
 * Silently loads images into the browser cache in the background.
 * When the real <img> tag renders later, the browser serves from cache instantly.
 */
export function prefetchImages(urls: string[]): void {
  for (const raw of urls) {
    if (!raw) continue;
    const url = optimizeImageUrl(raw);
    if (prefetched.has(url)) continue;
    prefetched.add(url);

    // Use <link rel="prefetch"> when available — lowest priority, non-blocking
    if (typeof document !== "undefined") {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    }
  }
}

/**
 * Hook: prefetches a list of image URLs when the component mounts.
 * Use this at the top of any component that will render multiple images.
 *
 * @example
 *   usePrefetchImages(items.map(i => i.image));
 */
export function usePrefetchImages(urls: (string | undefined)[]): void {
  useEffect(() => {
    prefetchImages(urls.filter(Boolean) as string[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount only
}

/**
 * Drop-in replacement for the old useHeicImage hook.
 * Purely synchronous — no fetch, no heic2any, no hanging.
 * Cloudinary does all format conversion on their CDN edge.
 */
export function useHeicImage(url: string) {
  const imageSrc = optimizeImageUrl(url);
  return { imageSrc, isLoading: false, error: null };
}

