# HEIC Image Fix — Reusable Prompt

Paste this into Copilot Chat any time you add new images and they aren't showing:

---

> I have HEIC images from Cloudinary that aren't displaying in the browser. Fix them using our existing `optimizeImageUrl` and `usePrefetchImages` utilities from `@/lib/optimizeImageUrl`.
>
> Rules:
> 1. Any `<img src={someVar}>` where the URL may be a Cloudinary HEIC — change to `<img src={optimizeImageUrl(someVar)}>`
> 2. Any component that renders a list of images — add `usePrefetchImages(items.map(i => i.image))` at the top of the component
> 3. Import both: `import { optimizeImageUrl, usePrefetchImages } from "@/lib/optimizeImageUrl";`
> 4. Do NOT use `useHeicImage` for plain `<img>` tags — only use `optimizeImageUrl()` directly
> 5. Do NOT add heic2any, fetch, or any client-side conversion — Cloudinary handles it server-side via `f_auto,q_auto,w_1200`
>
> Apply this fix to: **[paste your file name here]**

---

## Quick Checklist When Adding New Images

| Situation | What to do |
|---|---|
| New `<img src={cloudinaryUrl}>` | Wrap: `<img src={optimizeImageUrl(cloudinaryUrl)}>` |
| New component with image list | Add `usePrefetchImages(items.map(i => i.image))` at top |
| New `.heic` URL in pages.ts | Leave as-is — `optimizeImageUrl` handles it at render |
| Slow/hanging page | Check for any `<img>` tags NOT using `optimizeImageUrl` |

## How It Works

Cloudinary URL before:
```
https://res.cloudinary.com/dun0ibkj0/image/upload/v1783168303/IMG_3115.heic
```

Cloudinary URL after `optimizeImageUrl()`:
```
https://res.cloudinary.com/dun0ibkj0/image/upload/f_auto,q_auto,w_1200/v1783168303/IMG_3115.heic
```

- `f_auto` — Cloudinary detects the browser and serves **WebP** (Chrome) or **JPEG** (Safari). HEIC never reaches the browser.
- `q_auto` — Auto quality compression. Images go from 3–4 MB → ~80–150 KB.
- `w_1200` — Max width 1200px. Cards and thumbnails never need full resolution.
