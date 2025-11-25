# Design Quick Reference Guide

## 🎨 Color Palette

### Primary Colors
- **Gold**: `#a37e2c` (rolex-gold)
- **Gold Light**: `#c5a85f` (hover states)
- **Gold Dark**: `#8a6a24` (active states)

### Neutrals
- **Black Pure**: `#000000` (backgrounds)
- **Black Soft**: `#0a0a0a` (secondary surfaces)
- **Black Elevated**: `#1a1a1a` (cards)
- **Gray Light**: `#999999` (tertiary text)
- **White Muted**: `#cccccc` (body text)
- **White Pure**: `#ffffff` (primary text)

## 📐 Typography

### Fonts
- **Display**: `Playfair Display` (headings)
- **Body**: `-apple-system, Helvetica Neue` (content)

### Sizes
- **Hero**: `4.5rem` (72px)
- **H1**: `3.5rem` (56px)
- **H2**: `2rem` (32px)
- **Body**: `1rem` (16px)
- **Label**: `0.75rem` (12px)

### Letter Spacing
- **Tight**: `-0.02em` (display text)
- **Wide**: `0.15em` (labels, buttons)
- **Widest**: `0.3em` (uppercase labels)

## 🏗️ Page Structures

### Homepage
1. **Hero** (100vh) - Full-screen video/image
2. **Featured Collections** - 3-4 card grid
3. **Brand Story** - Split image/text layout
4. **New Arrivals** - Horizontal carousel
5. **Craftsmanship** - Video/gallery section

### Product Listing Page (PLP)
- **Left**: Filter sidebar (280px)
- **Right**: Product grid (responsive 1-4 columns)
- **Top**: Breadcrumbs, title, sort controls

### Product Detail Page (PDP)
- **Left**: Image gallery (50% width)
- **Right**: Product info, specs, CTAs (50% width)
- **Bottom**: Related products carousel

## 🧭 Navigation Header

### Layout
```
[Logo] [Nav Items] [Account] [Wishlist] [Cart]
```

### Specifications
- **Height**: 80px (desktop), 64px (mobile)
- **Background**: `rgba(0, 0, 0, 0.95)` + blur
- **Icons**: 24px × 24px, 24px spacing
- **Badge**: 20px circular (cart count)

## 🎯 Key Interactions

### Hover Effects
- **Buttons**: Scale 1.02x, 200ms
- **Cards**: TranslateY -4px, 300ms
- **Icons**: Scale 1.1x, color to gold, 200ms

### Transitions
- **Fast**: 150ms
- **Base**: 300ms
- **Slow**: 500ms

## 📱 Breakpoints

- **Mobile**: < 640px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+
- **Large**: 1280px+
- **XL**: 1536px+

## ✅ Design Principles

1. **Minimalism** - White space is luxury
2. **Premium Materiality** - Subtle textures, smooth animations
3. **Timeless Elegance** - Classic typography, restrained colors
4. **Performance** - Fast load, smooth interactions
5. **Sensory Experience** - High-quality imagery, micro-interactions

## 🎨 Tailwind Classes

### Colors
```tsx
bg-rolex-gold          // Primary gold
bg-rolex-gold-light    // Hover states
text-rolex-gold        // Gold text
border-rolex-gold      // Gold borders
bg-luxury-black-pure   // Pure black
bg-luxury-black-elevated // Elevated surfaces
text-luxury-white-muted // Body text
```

### Typography
```tsx
font-display           // Playfair Display
font-body              // System font
tracking-wider         // 0.15em spacing
tracking-widest        // 0.3em spacing
```

### Shadows
```tsx
shadow-gold            // Gold glow effect
shadow-gold-lg         // Larger gold glow
```

## 📋 Component Checklist

### Navigation
- [ ] Logo (left)
- [ ] Nav items (center)
- [ ] Account icon (right)
- [ ] Wishlist icon (right)
- [ ] Cart icon with badge (right)
- [ ] Sticky/fixed positioning
- [ ] Mobile hamburger menu

### Homepage
- [ ] Full-screen hero
- [ ] Featured collections grid
- [ ] Brand storytelling section
- [ ] New arrivals carousel
- [ ] Craftsmanship showcase

### PLP
- [ ] Filter sidebar
- [ ] Product grid
- [ ] Sort controls
- [ ] View toggle
- [ ] Pagination

### PDP
- [ ] Image gallery with zoom
- [ ] Product information
- [ ] Specifications tabs
- [ ] Add to cart button
- [ ] Wishlist button
- [ ] Related products

