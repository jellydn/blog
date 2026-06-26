---
name: ProductsWay
description: Personal tech blog and portfolio for Dung Huynh Duc
version: alpha
colors:
  primary: "#000000"
  primary-content: "#ffffff"
  secondary: "#ffffff"
  secondary-content: "#000000"
  accent: "#1a1a1a"
  accent-content: "#ffffff"
  neutral: "#1f2937"
  neutral-content: "#ffffff"
  base-100: "#ffffff"
  base-200: "#f9fafb"
  base-300: "#f3f4f6"
  base-content: "#111827"
  info: "#000000"
  info-content: "#ffffff"
  success: "#1a1a1a"
  success-content: "#ffffff"
  warning: "#4b5563"
  warning-content: "#ffffff"
  error: "#000000"
  error-content: "#ffffff"
  dark-primary: "#93c5fd"
  dark-primary-content: "#1e3a5f"
  dark-secondary: "#c4b5fd"
  dark-secondary-content: "#3b1e42"
  dark-accent: "#f9a8d4"
  dark-accent-content: "#4a1e2e"
  dark-neutral: "#6b7280"
  dark-neutral-content: "#f3f4f6"
  dark-base-100: "#1f2937"
  dark-base-200: "#111827"
  dark-base-300: "#0f172a"
  dark-base-content: "#f9fafb"
  dark-info: "#1d4ed8"
  dark-info-content: "#ffffff"
  dark-success: "#22c55e"
  dark-success-content: "#ffffff"
  dark-warning: "#92400e"
  dark-warning-content: "#ffffff"
  dark-error: "#b91c1c"
  dark-error-content: "#ffffff"
typography:
  h1:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 2.25rem
    fontWeight: 700
  h2:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 1.875rem
    fontWeight: 600
  h3:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 1.5rem
    fontWeight: 600
  body:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 1rem
    lineHeight: 1.75
  caption:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 0.875rem
    lineHeight: 1.5
rounded:
  none: 0
  sm: 0.125rem
  md: 0.25rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
  "3xl": 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-content}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    fontWeight: 600
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-content}"
  button-ghost:
    textColor: "{colors.base-content}"
    rounded: "{rounded.sm}"
  link-nav:
    textColor: "{colors.base-content} / 0.7"
    hoverTextColor: "{colors.primary}"
  badge:
    rounded: "{rounded.sm}"
    padding: 2px 8px
    fontSize: 0.75rem
  card:
    backgroundColor: "{colors.base-200} / 0.5"
    borderColor: "{colors.base-300}"
    rounded: "{rounded.lg}"
  section-header:
    fontSize: 2.25rem
    fontWeight: 700
    marginBottom: 16px
  container:
    maxWidth: 1280px
    padding: 16px
---

## Overview

ProductsWay is a personal tech blog and portfolio site for Dung Huynh Duc, a Senior Full Stack Software Engineer. The design prioritizes readability, performance, and accessibility. It uses a minimal black-and-white light theme with a high-contrast dark theme, ensuring WCAG AAA compliance across all color pairs.

The UI evokes a clean, developer-focused aesthetic — content-forward with subtle borders, generous whitespace, and restrained use of color for interactive elements.

## Colors

The palette uses two distinct themes: "minimal" (light) and "dark".

### Light Theme

The light theme is stark and editorial — pure white backgrounds, near-black text, and no decorative color on informational elements. This maximizes contrast and reading comfort for long-form technical content.

- **Primary (#000000):** Pure black for headlines, buttons, and core interactive text.
- **Base-100 (#ffffff):** Pure white page background for maximum contrast.
- **Base-content (#111827):** Near-black for body text — softer than pure black but still AAA-passing on white.
- **Warning (#4b5563):** Dark gray (not yellow) — muted warning indicators that maintain AAA contrast on white.
- **All other semantic colors (info, success, error):** Pure black for AAA compliance with white content text.

### Dark Theme

The dark theme uses a deep slate base with lighter, pastel-tinted accent colors. Every color pair has been verified for WCAG AAA (7:1) contrast.

- **Primary (#93c5fd):** Soft blue — the main interactive color, AAA-visible on the dark slate background.
- **Secondary (#c4b5fd):** Soft purple — for secondary actions and accents.
- **Accent (#f9a8d4):** Soft pink — for decorative highlights.
- **Base-100 (#1f2937):** Deep slate gray — the main dark background.
- **Base-content (#f9fafb):** Near-white text — excellent contrast on the dark background.
- **Info (#1d4ed8):** Deep blue — dark enough for white text to achieve AAA on badges.
- **Warning (#92400e):** Deep amber — chosen so white warning-label text passes AAA.
- **Error (#b91c1c):** Deep red — chosen so white error-label text passes AAA.

## Typography

The site uses the system UI font stack for maximum performance and native feel. No custom fonts are loaded — avoiding any FOUT/FOIT and keeping initial page loads fast.

- **h1 (2.25rem / bold):** Page and section titles.
- **h2 (1.875rem / semibold):** Subsection headings.
- **h3 (1.5rem / semibold):** Card and sidebar headings.
- **Body (1rem / 1.75 line-height):** Article content and body text — generous leading for reading comfort.
- **Caption (0.875rem):** Metadata, timestamps, and secondary information.

## Layout & Spacing

The layout is a single-column centered design with a maximum container width of 1280px.

- **Content max-width:** 1024px (articles), 1280px (full pages)
- **Vertical rhythm:** Spacing tokens scale from 4px (xs) to 64px (3xl)
- **Container padding:** 16px on each side (responsive)
- **Sections are separated by generous padding (py-12 to py-20)**

## Elevation & Depth

The site uses flat design with no card shadows. Depth is communicated through:

- **Backdrop blur:** The sticky header uses `backdrop-blur` for a subtle frosted-glass effect.
- **Border separation:** Cards and sections use `border-base-300` borders instead of shadows.
- **Hover states:** Interactive elements transition color only — no elevation changes.

## Shapes

- **Buttons/fields:** 0.125rem (2px) radius — nearly squared for a clean, modern look.
- **Cards:** 0.5rem (8px) radius — soft but not rounded.
- **Container boxes:** 0.25rem (4px) radius.

## Components

### Header
- Sticky top bar with the site logo, navigation links, theme toggle, and social icons.
- Mobile: hamburger menu that expands into a full navigation drawer.
- Theme toggle: sun/moon icon switching between "minimal" and "dark" themes.

### Cards
- Used for project listings, video thumbnails, and blog post previews.
- Background: `base-200` at 50% opacity, bordered with `base-300`.
- No shadow — depth through border separation only.

### Badges
- Inline tags for categories (TIL, React, Neovim, etc.).
- Small pill shapes with `badge` DaisyUI component.
- Interactive: linked to the tag filtering page.

### Buttons
- Primary: solid black background, white text, sharp 2px radius.
- Ghost: transparent with hover underline effect.
- No shadow, minimal radius — utilitarian and clean.

### Code Blocks
- Dark code blocks (`#1e293b` background) in both light and dark themes.
- Prism.js Okaidia theme for syntax highlighting.
- Inline code: tinted background from `base-300` in light mode, `#475569` in dark mode.

## Do's and Don'ts

### Do
- Use `base-content` for all body text to maintain AAA contrast.
- Apply `primary` sparingly — only for the most important interactive elements.
- Keep code blocks dark in both themes for visual consistency.
- Use `text-base-content/70` for secondary text to establish visual hierarchy.

### Don't
- Don't add shadows — the design uses borders, not elevation.
- Don't use custom fonts — the system stack is faster and more reliable.
- Don't mix multiple accent colors — primary is the sole interactive color.
- Don't reduce contrast below WCAG AAA for body text.
