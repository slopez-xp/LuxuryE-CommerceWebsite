# Luxury Watch E-Commerce Design System

## Design Philosophy

### Core Principles
1. **Minimalism with Purpose**: Every element serves a function. White space is a luxury statement.
2. **Premium Materiality**: Subtle textures, refined shadows, and smooth animations convey quality.
3. **Timeless Elegance**: Classic typography and restrained color palettes that won't date.
4. **Performance & Precision**: Fast load times, smooth interactions, and pixel-perfect execution.
5. **Sensory Experience**: High-quality imagery, micro-interactions, and thoughtful transitions.

---

## Enhanced Color Palette

### Primary Colors
```css
/* Luxury Gold (Primary Accent) */
--rolex-gold: #a37e2c;           /* Primary gold */
--rolex-gold-light: #c5a85f;     /* Hover states, highlights */
--rolex-gold-dark: #8a6a24;      /* Active states, borders */
--rolex-gold-glow: rgba(163, 126, 44, 0.3); /* Subtle glows */

/* Neutrals (Foundation) */
--black-pure: #000000;            /* Primary background */
--black-soft: #0a0a0a;            /* Secondary surfaces */
--black-elevated: #1a1a1a;        /* Cards, elevated surfaces */
--gray-dark: #2a2a2a;             /* Borders, dividers */
--gray-medium: #666666;           /* Secondary text */
--gray-light: #999999;            /* Tertiary text */
--white-pure: #ffffff;            /* Primary text */
--white-soft: #f5f5f5;            /* Subtle backgrounds */
--white-muted: #cccccc;           /* Body text */
```

### Semantic Colors
```css
--success: #4a9b50;               /* Success states */
--error: #c94a4a;                 /* Error states */
--warning: #d4af37;               /* Warning states */
--info: #5a8fa8;                  /* Informational states */
```

### Gradients
```css
--gradient-gold: linear-gradient(135deg, #d4af37 0%, #a37e2c 50%, #c5a85f 100%);
--gradient-dark: linear-gradient(180deg, #000000 0%, #1a1a1a 50%, #000000 100%);
--gradient-overlay: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
```

---

## Typography System

### Font Families
```css
/* Display (Headings) */
--font-display: 'Playfair Display', 'Georgia', serif;
/* Body (Content) */
--font-body: -apple-system, 'Helvetica Neue', 'Arial', sans-serif;
/* Monospace (Technical specs) */
--font-mono: 'SF Mono', 'Monaco', 'Courier New', monospace;
```

### Type Scale
```css
/* Display */
--text-display-1: 4.5rem;         /* Hero headlines */
--text-display-2: 3.5rem;         /* Section headlines */
--text-display-3: 2.5rem;         /* Subsection headlines */

/* Headings */
--text-h1: 2rem;                  /* Page titles */
--text-h2: 1.5rem;                /* Section titles */
--text-h3: 1.25rem;               /* Subsection titles */
--text-h4: 1.125rem;              /* Card titles */

/* Body */
--text-body-lg: 1.125rem;         /* Large body text */
--text-body: 1rem;                /* Standard body text */
--text-body-sm: 0.875rem;         /* Small body text */

/* Labels & Captions */
--text-label: 0.75rem;            /* Labels, buttons */
--text-caption: 0.7rem;           /* Captions, metadata */
```

### Letter Spacing
```css
--tracking-tight: -0.02em;        /* Display text */
--tracking-normal: 0em;           /* Body text */
--tracking-wide: 0.02em;          /* Body emphasis */
--tracking-wider: 0.15em;         /* Labels, buttons */
--tracking-widest: 0.3em;         /* Uppercase labels */
```

---

## Spacing System

### Base Unit: 8px
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

---

## Component Specifications

### Navigation Header

**Structure:**
```
[Logo] [Nav Items] [Account Icon] [Wishlist Icon] [Cart Icon]
```

**Specifications:**
- **Height**: 80px (desktop), 64px (mobile)
- **Background**: `rgba(0, 0, 0, 0.95)` with `backdrop-blur(12px)`
- **Border**: `1px solid rgba(163, 126, 44, 0.1)` at bottom
- **Position**: Fixed, top of viewport
- **Z-index**: 1000

**Icon Specifications:**
- **Size**: 24px × 24px
- **Spacing**: 24px between icons
- **Color**: `#ffffff` (default), `#a37e2c` (hover/active)
- **Badge**: Small circular badge for cart count (min-width: 20px, height: 20px)
- **Animation**: Subtle scale on hover (1.1x), smooth transition (200ms)

**Responsive Behavior:**
- Desktop: Full horizontal layout
- Tablet: Logo + hamburger menu, icons remain visible
- Mobile: Logo + hamburger menu, icons in dropdown

---

## Page Layouts

### 1. Homepage

**Structure:**
```
┌─────────────────────────────────────┐
│         Navigation Header            │
├─────────────────────────────────────┤
│                                     │
│         Hero Section (100vh)        │
│    - Full-screen video/image        │
│    - Centered headline              │
│    - CTA button                     │
│    - Scroll indicator               │
│                                     │
├─────────────────────────────────────┤
│    Featured Collections Section     │
│    - 3-4 large cards (grid)        │
│    - Hover reveals details          │
│                                     │
├─────────────────────────────────────┤
│    Brand Storytelling Section       │
│    - Image + text (split layout)    │
│    - Heritage narrative             │
│                                     │
├─────────────────────────────────────┤
│    New Arrivals / Featured          │
│    - Horizontal scroll carousel      │
│    - Product cards                  │
│                                     │
├─────────────────────────────────────┤
│    Craftsmanship Section            │
│    - Video or image gallery         │
│    - Technical highlights           │
│                                     │
├─────────────────────────────────────┤
│         Footer                      │
└─────────────────────────────────────┘
```

**Key Features:**
- **Hero**: Full viewport height, immersive video/image, minimal text overlay
- **Sections**: Generous padding (96px vertical), max-width 1600px
- **Grid**: Responsive 1/2/3 column layouts
- **Animations**: Fade-in on scroll, parallax effects, smooth transitions

---

### 2. Product Listing Page (PLP)

**Structure:**
```
┌─────────────────────────────────────┐
│         Navigation Header            │
├─────────────────────────────────────┤
│  Breadcrumbs                         │
│  Page Title + Results Count          │
├──────────────┬───────────────────────┤
│              │                       │
│  Filters     │  Product Grid         │
│  Sidebar     │  - Sort dropdown      │
│              │  - View toggle        │
│  - Category  │  - Product cards      │
│  - Price     │  - Pagination         │
│  - Material  │                       │
│  - Size      │                       │
│  - Features  │                       │
│              │                       │
│  [Apply]     │                       │
│  [Clear]     │                       │
└──────────────┴───────────────────────┘
```

**Filter Sidebar Specifications:**
- **Width**: 280px (desktop), hidden drawer (mobile)
- **Background**: `#0a0a0a`
- **Padding**: 32px
- **Sticky**: Yes, scrolls with content
- **Sections**: Accordion-style collapsible groups
- **Active Filters**: Chips with remove buttons

**Product Grid Specifications:**
- **Layout**: Responsive grid (1/2/3/4 columns)
- **Card Size**: Minimum 320px width
- **Card Elements**:
  - Image (aspect ratio 4:5)
  - Product name
  - Price
  - Quick view button (on hover)
  - Wishlist icon (corner)
- **Hover State**: Subtle lift (translateY -4px), shadow enhancement
- **Loading**: Skeleton loaders

**Sort & View Controls:**
- **Position**: Top right of grid
- **Sort Options**: Relevance, Price (Low-High), Price (High-Low), Newest
- **View Toggle**: Grid/List view icons

---

### 3. Product Detail Page (PDP)

**Structure:**
```
┌─────────────────────────────────────┐
│         Navigation Header            │
├─────────────────────────────────────┤
│  Breadcrumbs                         │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────┬───────────────────┐ │
│  │           │  Product Title     │ │
│  │           │  Subtitle          │ │
│  │  Image    │  Price             │ │
│  │  Gallery  │                    │ │
│  │           │  [Add to Cart]     │ │
│  │           │  [Wishlist]        │ │
│  │           │                    │ │
│  │           │  Specifications    │ │
│  │           │  (Tabs)            │ │
│  │           │                    │ │
│  │           │  [Find Boutique]  │ │
│  └───────────┴───────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  Detailed Specifications             │
│  - Expandable accordions            │
│                                     │
├─────────────────────────────────────┤
│  Related Products                    │
│  - Horizontal carousel               │
│                                     │
├─────────────────────────────────────┤
│         Footer                      │
└─────────────────────────────────────┘
```

**Image Gallery Specifications:**
- **Layout**: Left side, 50% width (desktop)
- **Main Image**: Large, high-resolution, zoom on hover
- **Thumbnails**: Vertical strip (4-6 thumbnails)
- **360° View**: Badge indicator, interactive rotation
- **Zoom**: Click to open full-screen lightbox
- **Aspect Ratio**: Square (1:1) for main display

**Product Information Specifications:**
- **Layout**: Right side, 50% width (desktop)
- **Title**: Large serif font (3.5rem)
- **Price**: Prominent, gold accent
- **CTA Buttons**: 
  - Primary: "Add to Cart" (full width, gold background)
  - Secondary: "Add to Wishlist" (outlined, gold border)
- **Specifications**: Tabbed interface (Movement, Case, Dial, Bracelet)
- **Sticky**: Product info sticks on scroll (desktop)

**Key Features:**
- **Image Zoom**: Hover to zoom, click for lightbox
- **360° Rotation**: Interactive product rotation
- **Video Integration**: Optional product video
- **Size Guide**: Modal with sizing information
- **Availability**: Real-time stock status
- **Social Proof**: Reviews, ratings (if applicable)

---

## Interaction Patterns

### Micro-interactions

1. **Button Hover**
   - Scale: 1.02x
   - Duration: 200ms
   - Easing: `ease-out`

2. **Card Hover**
   - Transform: `translateY(-4px)`
   - Shadow: Enhanced elevation
   - Duration: 300ms
   - Easing: `cubic-bezier(0.4, 0, 0.2, 1)`

3. **Icon Hover**
   - Scale: 1.1x
   - Color: Gold transition
   - Duration: 200ms

4. **Page Transitions**
   - Fade: 300ms
   - Slide: 400ms
   - Easing: `cubic-bezier(0.4, 0, 0.2, 1)`

### Loading States
- **Skeleton Loaders**: Animated placeholders matching content structure
- **Spinner**: Minimal gold spinner for async operations
- **Progress Bar**: Top of page for page transitions

### Error States
- **Empty States**: Elegant illustrations with helpful messaging
- **Error Messages**: Clear, actionable, non-intrusive
- **404 Pages**: Branded, helpful navigation

---

## Responsive Breakpoints

```css
--breakpoint-sm: 640px;   /* Mobile */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large Desktop */
--breakpoint-2xl: 1536px; /* Extra Large */
```

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly targets (min 44px × 44px)
- Simplified navigation (hamburger menu)

---

## Accessibility Standards

1. **Color Contrast**: WCAG AA minimum (4.5:1 for text)
2. **Keyboard Navigation**: Full keyboard support
3. **Screen Readers**: Semantic HTML, ARIA labels
4. **Focus States**: Visible focus indicators (gold outline)
5. **Alt Text**: Descriptive alt text for all images
6. **Font Sizing**: Minimum 16px for body text

---

## Performance Targets

1. **First Contentful Paint**: < 1.5s
2. **Largest Contentful Paint**: < 2.5s
3. **Time to Interactive**: < 3.5s
4. **Cumulative Layout Shift**: < 0.1
5. **Image Optimization**: WebP format, lazy loading, responsive sizes

---

## Implementation Priority

### Phase 1: Foundation
- [ ] Enhanced color system in Tailwind config
- [ ] Typography system implementation
- [ ] Navigation header with icons (Account, Wishlist, Cart)
- [ ] Base component library updates

### Phase 2: Homepage
- [ ] Hero section enhancements
- [ ] Featured collections grid
- [ ] Brand storytelling section
- [ ] New arrivals carousel

### Phase 3: Product Listing Page
- [ ] Filter sidebar component
- [ ] Product grid with cards
- [ ] Sort and view controls
- [ ] Pagination component

### Phase 4: Product Detail Page
- [ ] Image gallery with zoom
- [ ] Product information layout
- [ ] Specifications tabs
- [ ] Related products section

### Phase 5: Polish
- [ ] Micro-interactions
- [ ] Loading states
- [ ] Error handling
- [ ] Performance optimization
- [ ] Accessibility audit

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --rolex-gold: #a37e2c;
  --rolex-gold-light: #c5a85f;
  --rolex-gold-dark: #8a6a24;
  --rolex-gold-glow: rgba(163, 126, 44, 0.3);
  
  --black-pure: #000000;
  --black-soft: #0a0a0a;
  --black-elevated: #1a1a1a;
  --gray-dark: #2a2a2a;
  --gray-medium: #666666;
  --gray-light: #999999;
  --white-pure: #ffffff;
  --white-soft: #f5f5f5;
  --white-muted: #cccccc;
  
  /* Typography */
  --font-display: 'Playfair Display', 'Georgia', serif;
  --font-body: -apple-system, 'Helvetica Neue', 'Arial', sans-serif;
  
  /* Spacing */
  --space-base: 8px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
  --shadow-gold: 0 0 20px rgba(163, 126, 44, 0.3);
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-base: 300ms ease-out;
  --transition-slow: 500ms ease-out;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

---

## Notes

- All measurements use rem units for scalability
- Maintain consistent spacing rhythm (8px base unit)
- Use semantic HTML5 elements
- Implement progressive enhancement
- Test on multiple devices and browsers
- Regular design audits for consistency

