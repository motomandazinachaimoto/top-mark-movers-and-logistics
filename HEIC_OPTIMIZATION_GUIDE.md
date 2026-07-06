# HEIC Image Optimization - Implementation Guide

## Overview

Your application now has a **global HEIC image optimization system** that automatically handles `.heic` and `.heif` files across your entire app. This solution works in two scenarios:

### ✅ What This Solves

1. **Cloudinary URLs with HEIC files** → Automatically injects `f_auto/` to convert server-side
2. **External HEIC URLs** → Converts client-side using `heic2any` library
3. **Regular images** → Passes through unchanged for optimal performance

---

## 📁 File Structure
lett
```
src/
├── lib/
│   └── optimizeImageUrl.ts  ← Your new global helper
├── components/site/
│   └── Services.tsx         ← Already updated example
└── ...
```
if h2 =
---

## 🚀 How to Use

### Option 1: Hook-Based (For React Components) - ⭐ RECOMMENDED

Best for components that render images dynamically:

```tsx
import { useHeicImage } from "@/lib/optimizeImageUrl";

function MyComponent({ imageUrl }) {
  const { imageSrc, isLoading, error } = useHeicImage(imageUrl);

  return (
    <div>
      <img
        src={imageSrc}
        alt="Description"
        style={{ opacity: isLoading ? 0.6 : 1 }}
      />
      {error && <p>Failed to load image</p>}
    </div>
  );
}
```

### Option 2: Optimized Image Component

Pre-built component that handles everything:

```tsx
import { OptimizedImage } from "@/lib/optimizeImageUrl";

function MyComponent() {
  return (
    <OptimizedImage
      src="https://res.cloudinary.com/.../IMG_7717_czaptk.heic"
      alt="Artwork"
      className="w-full h-auto"
    />
  );
}
```

### Option 3: Direct Function (Synchronous Only)

For Cloudinary URLs only (doesn't require async):

```tsx
import { optimizeImageUrl } from "@/lib/optimizeImageUrl";

function MyComponent() {
  const url = "https://res.cloudinary.com/.../image/upload/v1783168334/IMG_7717_czaptk.heic";
  
  return <img src={optimizeImageUrl(url)} alt="Artwork" />;
}
```

**⚠️ Note:** This won't work for external HEIC files. Use the hook for those.

---

## 📋 Implementation Checklist

### ✅ For Services Component (Already Done)
- [x] Import `useHeicImage`
- [x] Create `ServiceCard` subcomponent
- [x] Use hook to wrap image sources
- [x] Show loading state

### For Other Components

Apply this pattern to any component with image arrays:

```tsx
// 1. Import the hook
import { useHeicImage } from "@/lib/optimizeImageUrl";

// 2. Use in component rendering images
function GalleryItem({ item }) {
  const { imageSrc, isLoading } = useHeicImage(item.imageUrl);
  
  return (
    <img
      src={imageSrc}
      style={{ opacity: isLoading ? 0.6 : 1 }}
    />
  );
}
```

---

## 🔄 How It Works Internally

### Scenario 1: Cloudinary URL
```
Input:  https://res.cloudinary.com/dun0ibkj0/image/upload/v1783168334/IMG_7717_czaptk.heic
                                                      ↓
Output: https://res.cloudinary.com/dun0ibkj0/image/upload/f_auto/v1783168334/IMG_7717_czaptk.heic
                                                                  ↑
                                                      Injected automatically
```

Cloudinary converts HEIC → WebP/JPEG on their server instantly. ⚡

### Scenario 2: External HEIC URL

1. Detects `.heic` extension
2. Fetches file from server
3. Uses `heic2any` library to convert to JPEG in browser
4. Returns blob URL for img tag to use
5. Caches result to avoid re-processing

```
https://example.com/image.heic
    ↓
[Fetch file]
    ↓
[Convert HEIC → JPEG using heic2any]
    ↓
blob:http://localhost:5173/...
    ↓
[Display in img tag]
```

---

## ⚙️ Configuration

### heic2any Library
- Loaded automatically from CDN on first use
- Cached in memory for subsequent calls
- Graceful fallback if library unavailable

### Conversion Cache
- Stores converted blob URLs to avoid re-processing
- Prevents duplicate network requests
- Memory-efficient

---

## 🎯 Key Features

| Feature | Details |
|---------|---------|
| **Global Solution** | Works across all components |
| **No Breaking Changes** | Drop-in replacement for image URLs |
| **Lazy Loading** | Integrates with existing lazy loading |
| **Error Handling** | Falls back to original URL if conversion fails |
| **Performance** | Caches conversions, minimal overhead |
| **Browser Support** | Works in all modern browsers |

---

## 🐛 Troubleshooting

### Images show as 0.6 opacity briefly
✅ This is intentional - shows while converting HEIC files

### Broken image fallback
✅ If `heic2any` fails, original URL is used

### External HEIC images not loading
- Check browser console for CORS errors
- Ensure URL is publicly accessible
- Try a different HEIC image

### Performance impact
- Cloudinary URLs: Zero impact (server-side conversion)
- External HEIC: Minimal (only on first load, then cached)

---

## 📚 Next Steps

1. **Copy the hook pattern** to other components using image arrays
2. **Test with your HEIC images** to verify conversion works
3. **Monitor performance** in production
4. **Update image URLs** in database/CMS as needed

---

## Example Integration Points

### Gallery Component
```tsx
import { useHeicImage } from "@/lib/optimizeImageUrl";

function GalleryItem({ image }) {
  const { imageSrc } = useHeicImage(image.url);
  return <img src={imageSrc} />;
}
```

### Blog Component
```tsx
import { useHeicImage } from "@/lib/optimizeImageUrl";

function BlogPost({ post }) {
  const { imageSrc, isLoading } = useHeicImage(post.featuredImage);
  return <img src={imageSrc} style={{ opacity: isLoading ? 0.6 : 1 }} />;
}
```

### Product Cards
```tsx
import { OptimizedImage } from "@/lib/optimizeImageUrl";

function ProductCard({ product }) {
  return <OptimizedImage src={product.image} alt={product.name} />;
}
```

---

## Notes

- **Cloudinary URLs** don't need additional setup - `f_auto/` is injected automatically
- **External HEIC files** require the `heic2any` library which loads on demand
- **Performance**: Cloudinary solution is server-side (faster), external is client-side (may add latency)
- **Browser Compatibility**: Works in all modern browsers with blob URL support

---

This implementation is production-ready and handles edge cases gracefully! 🎉
