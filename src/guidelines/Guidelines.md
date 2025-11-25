# Rolex E-Commerce Design Guidelines

## 📚 Design System Documentation

For complete design system specifications, see:
- **[Luxury Design System](./Luxury_Design_System.md)** - Comprehensive design system documentation
- **[Design Quick Reference](./Design_Quick_Reference.md)** - Quick reference guide

## 🎯 General Guidelines

### Code Quality
* Only use absolute positioning when necessary. Opt for responsive and well-structured layouts using flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files
* Use TypeScript for type safety
* Follow React best practices (hooks, component composition)

### Layout Principles
* Mobile-first responsive design
* Use CSS Grid and Flexbox for layouts
* Maintain consistent spacing rhythm (8px base unit)
* Maximum content width: 1600px for large screens
* Generous padding: 96px vertical for major sections

### Typography
* Display font (Playfair Display) for headings only
* System font stack for body text
* Minimum body text size: 16px
* Use letter-spacing for labels and buttons (0.15em - 0.3em)
* Maintain proper line-height (1.6-1.8 for body text)

## 🎨 Design System Guidelines

### Color Usage
* **Primary Accent**: Use `rolex-gold` (#a37e2c) sparingly for CTAs, highlights, and interactive elements
* **Backgrounds**: Use `luxury-black-pure` (#000000) for main backgrounds, `luxury-black-elevated` (#1a1a1a) for cards
* **Text**: Use `luxury-white-pure` (#ffffff) for primary text, `luxury-white-muted` (#cccccc) for body text
* **Never use**: Bright colors, excessive gradients, or clashing color combinations

### Component Guidelines

#### Navigation Header
* Fixed position at top of viewport
* Height: 80px (desktop), 64px (mobile)
* Background: `rgba(0, 0, 0, 0.95)` with backdrop blur
* Must include: Logo, Nav items, Account icon, Wishlist icon, Cart icon (with badge)
* Icons: 24px × 24px, 24px spacing between icons
* Responsive: Hamburger menu on mobile/tablet

#### Buttons
* **Primary**: Gold background (`rolex-gold`), black text on hover
* **Secondary**: Gold border, transparent background, gold text
* **Tertiary**: Text-only, gold color
* Letter spacing: 0.15em
* Padding: 12px 48px (horizontal), 16px 32px (vertical)
* Smooth transitions: 200-300ms

#### Cards
* Background: `luxury-black-elevated` (#1a1a1a)
* Border: Subtle gold border on hover (`rolex-gold` at 10-40% opacity)
* Hover effect: TranslateY -4px, enhanced shadow
* Border radius: 8px (md)
* Padding: 32px

#### Product Images
* Aspect ratio: 4:5 for product cards
* Aspect ratio: 1:1 for product detail main image
* High-resolution images with lazy loading
* Zoom functionality on hover/click for PDP
* Fallback images for all ImageWithFallback components

### Interaction Patterns
* All interactive elements must have hover states
* Smooth transitions: 200-300ms for most interactions
* Use scale transforms (1.02x - 1.1x) for hover effects
* Loading states: Skeleton loaders matching content structure
* Error states: Elegant empty states with helpful messaging

### Accessibility
* WCAG AA color contrast minimum (4.5:1 for text)
* Full keyboard navigation support
* Visible focus indicators (gold outline)
* Semantic HTML5 elements
* Descriptive alt text for all images
* ARIA labels where appropriate

### Performance
* Lazy load images below the fold
* Optimize images (WebP format, responsive sizes)
* Minimize JavaScript bundle size
* Use CSS for animations when possible
* Target: First Contentful Paint < 1.5s

## 📄 Page-Specific Guidelines

### Homepage
* Hero section: Full viewport height (100vh - nav height)
* Sections: Generous vertical padding (96px)
* Featured collections: 3-column grid (desktop), responsive
* Use parallax effects sparingly and smoothly
* Balance brand storytelling with product promotion

### Product Listing Page (PLP)
* Filter sidebar: 280px width, sticky positioning
* Product grid: Responsive (1-4 columns based on viewport)
* Sort controls: Top right of grid area
* View toggle: Grid/List view options
* Pagination: Bottom of grid
* Active filters: Display as removable chips

### Product Detail Page (PDP)
* Image gallery: Left side, 50% width (desktop)
* Product info: Right side, 50% width (desktop)
* Sticky product info on scroll (desktop)
* Specifications: Tabbed interface
* Related products: Horizontal carousel at bottom
* 360° view indicator if available
* High-resolution zoom functionality

## 🚫 What to Avoid

* Cluttered layouts - maintain white space
* Too many colors - stick to the palette
* Slow animations - keep transitions under 500ms
* Small touch targets - minimum 44px × 44px
* Hard-to-read text - maintain contrast
* Overuse of gold - it's an accent, not a primary color
* Inconsistent spacing - use the 8px rhythm
* Poor mobile experience - test on real devices

## ✅ Implementation Checklist

When creating new components:
- [ ] Uses design system colors from Tailwind config
- [ ] Responsive design (mobile-first)
- [ ] Proper hover states and transitions
- [ ] Accessible (keyboard nav, focus states, ARIA)
- [ ] TypeScript types defined
- [ ] Loading and error states considered
- [ ] Performance optimized (lazy loading, etc.)
- [ ] Matches luxury aesthetic (spacing, typography, colors)
