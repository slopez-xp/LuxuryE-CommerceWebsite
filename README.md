# Luxury E-commerce Website

A modern, responsive luxury e‑commerce UI built with React + Vite + Tailwind.  
This repository is a Figma-to-code implementation of a high‑end storefront and includes pages for Home, Collections, Product detail, Boutiques and Support.

## Highlights
- Clean, minimal UI with a focus on hero media (image/video) and readable typography
- Component-driven: Navigation, Footer, Homepage, ProductDetail, Boutiques, etc.
- Lightweight page transitions and responsive layouts
- Video support with a VideoWithFallback component (autoplay muted loop + poster + image fallback)

## Prerequisites
- Node.js 18+ (or latest LTS)
- npm (or yarn/pnpm)

## Quickstart

1. Install dependencies
```bash
npm install
```

2. Start dev server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
```

4. Preview the production build
```bash
npm run preview
```

## Where to put media assets (video / images)
You have two common options:

- Serve from `public/` (recommended for large media):
  - Put files in `public/videos/` and reference them as `/videos/hero.mp4` in your JSX.
  - Pros: no bundling, easy to replace, predictable URL.
- Import from `src` (bundled):
  - Put files in `src/assets/` and import: `import heroMp4 from '../assets/homeVideo.mp4'`.
  - Pros: hashed filenames, integrated with the build.
Note: this codebase currently has an `assests/` folder name in some files — consider renaming to `assets/` and updating imports to avoid path errors.

## Video usage notes
- Autoplay works only on muted videos in most browsers. VideoWithFallback defaults to muted + playsInline + loop.
- Provide a `poster` image as fallback and ensure file sizes are reasonable (use webm/mp4 and compress).

## Project structure (important files)
- src/
  - components/
    - Navigation.tsx
    - Homepage.tsx
    - ProductDetailPage.tsx
    - Boutiques.tsx
    - VideoWithFallback.tsx
    - ImageWithFallback.tsx
    - PageTransition.tsx
    - Footer.tsx
  - assests/ or assets/ — media files
  - main.tsx, App.tsx, index.css

## Common troubleshooting
- Blank pages when navigating:
  - Ensure `App.tsx` page type includes the page id (e.g., `'boutiques'`) and passes `onNavigate` to components that call it.
- Video not playing:
  - Confirm correct import or public path and that the video is muted.
  - Fix any folder typos (`assests` → `assets`) and restart the dev server.
- Extra spacing under the navbar:
  - App measures navbar height and sets `main` padding; ensure pages don't also add top padding (remove `pt-*` on page root sections), and PageTransition uses `display: contents` so it doesn't affect layout.

## Contributing
- Fix typos in folder names (assets), keep media sizes optimized, and prefer semantic, accessible markup.
- Open issues or PRs for feature work or bug fixes.

## Credits
- Original design: Figma file (https://www.figma.com/design/dvwqhuQp6x3qq9BbADNAnC/Luxury-E-commerce-Website.)
- Built with: React, Vite, Tailwind CSS, lucide-react (icons)

## License
- MIT (or change to your preferred license)
