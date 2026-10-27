---
name: CivicTrack Public Redressal
colors:
  surface: '#f6f9ff'
  surface-dim: '#c8dcf0'
  surface-bright: '#f6f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf5ff'
  surface-container: '#e1f0ff'
  surface-container-high: '#d6ebff'
  surface-container-highest: '#d0e5f9'
  on-surface: '#081d2c'
  on-surface-variant: '#43474f'
  inverse-surface: '#1f3242'
  inverse-on-surface: '#e6f2ff'
  outline: '#737780'
  outline-variant: '#c3c6d0'
  surface-tint: '#3c5f93'
  primary: '#00254e'
  on-primary: '#ffffff'
  primary-container: '#123b6d'
  on-primary-container: '#84a6df'
  inverse-primary: '#a8c8ff'
  secondary: '#0261a2'
  on-secondary: '#ffffff'
  secondary-container: '#76b8fe'
  on-secondary-container: '#00487a'
  tertiary: '#002c10'
  on-tertiary: '#ffffff'
  tertiary-container: '#00451c'
  on-tertiary-container: '#48ba68'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a8c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#22477a'
  secondary-fixed: '#d1e4ff'
  secondary-fixed-dim: '#9dcaff'
  on-secondary-fixed: '#001d36'
  on-secondary-fixed-variant: '#00497c'
  tertiary-fixed: '#88faa0'
  tertiary-fixed-dim: '#6cdd86'
  on-tertiary-fixed: '#00210a'
  on-tertiary-fixed-variant: '#005323'
  background: '#f6f9ff'
  on-background: '#081d2c'
  surface-variant: '#d0e5f9'
typography:
  display:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-lg:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter, Noto Sans Tamil, system-ui, sans-serif
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system serves a high-stakes municipal e-governance interface: the public grievance registration, tracking, and municipal workflow engine for citizens and administrative officers across urban local bodies and rural district panchayats in Tamil Nadu.

The design language is unapologetically institutional, balanced, and civic:
- **Tone & Identity:** Sober, authoritative, transparent, and duty-bound. It eschews ephemeral consumer trends, neo-brutalist novelties, and decorative skeuomorphism in favor of structural clarity, predictable state machines, and institutional trust.
- **Visual Movement:** Corporate Modern blended with Public Service Functionalism. Visual interest is derived not from decorative motifs, but from robust data hierarchy, crisp contrast, precise tabular alignments, and explicit tracking workflows.
- **Emotional Response:** Reassurance, institutional accountability, clarity of progress, and unambiguous legal/civic validity. The citizen must instantly perceive that their grievance is officially registered, tracked by an immutable reference token, and routed directly to a verified municipal officer.
- **Accessibility Mandate:** Strict adherence to WCAG 2.2 Level AA requirements, with minimum touch targets (44×44px), explicit field validations, zero color-only status indicators, and full cross-linguistic parity between Tamil and English.

## Colors

The palette balances administrative gravitas with accessible functional indicators. Every semantic role has explicit background, text, and border tokens to maintain AAA/AA contrast against the `#F6F8FA` application canvas.

### Color Tokens & Semantic Roles
- **Primary Navy (`#123B6D`):** Represents governmental authority. Used for header bars, sidebar navigation, modal titles, heavy tabular headers, and primary branding elements. Never used as an interactive state hover to avoid ambiguity.
- **Action Blue (`#1769AA`):** Direct citizen interactions. Primary call-to-action buttons, inline links, active tab indicators, and progress step markers. Hover state transitions to `#104E80`, pressed to `#0C3B61`.
- **Civic Green / Success (`#159447` / `#187847`):** Represents verified resolution, acknowledgment receipts, completed SLAs, and citizen validation. Paired with Pale Green (`#EDF7F0`) surfaces and `#187847` typography for badges.
- **Canvas & Surface:**
  - Application Canvas: `#F6F8FA`
  - Elevated Container / Card Surface: `#FFFFFF`
  - Highlight Tint Neutral / Inset Surface: `#F1F6FB`
- **Text & Hierarchy:**
  - Primary Content (`#172B3A`): Body copy, table entries, input text, and headings. Meets 9.8:1 contrast on `#FFFFFF`.
  - Secondary Content (`#596B7A`): Metadata, timestamps, reference labels, breadcrumbs, and helper copy. Meets 4.8:1 contrast on `#FFFFFF`.
- **Borders & Dividers:**
  - Structural Divider: `#DCE3E9` (1px solid on cards, headers, form fields).
  - Subtle Field Rule: `#E5EBF0`.
- **System Feedback States:**
  - Error: `#B42318` text/border on `#FDF2F2` background (invalid inputs, overdue SLAs, rejected appeals).
  - Warning / In Progress: `#946200` text/border on `#FEFBE8` background (pending officer review, escalated status).
  - Success / Closed: `#187847` text/border on `#EDF7F0` background (resolved, citizen acknowledged).

## Typography

The typographic engine uses **Inter** for Latin characters, paired with **Noto Sans Tamil** and system fallbacks (`Latha`, `Mukta Malar`) to guarantee zero font flicker across Tamil Nadu government portals.

### Typographic Principles
- **Bilingual Metrics:** Tamil letterforms feature intricate conjunct glyphs and tall ascender/descender bounds. Generous line-height multipliers (minimum 1.4x–1.5x) prevent vertical clipping of Tamil vowel markers (kombu, pulli).
- **Scale Restraint:** Display sizes are capped at `32px` to preserve administrative utility. Headlines are dense, stable, and highly legible across both high-DPI desktop terminals and low-cost entry-level mobile devices.
- **Reference Numbers & Data:** Reference IDs, complaint numbers (e.g., `TN-CORP-2024-88491`), ward numbers, and numeric values use tabular numerals (`font-feature-settings: "tnum" 1`) to ensure perfect vertical alignment across dashboards and PDF print orders.

## Layout & Spacing

The layout is built on a responsive fixed-max-width hybrid grid system anchored to a strict **4px/8px incremental spatial rhythm**.

### Grid Architecture
- **Desktop (≥1024px):** 12-column layout with max-width `1280px`, `1.5rem` (`24px`) gutters, and `2rem` (`32px`) screen margin. Structural sidebars (Ward officer lists, filter panels) occupy 3 columns, and central complaint tracking streams take 9 columns.
- **Tablet (768px - 1023px):** 8-column layout with `1rem` (`16px`) gutters and `1.5rem` (`24px`) margins. Sidebar transforms into a collateral drawer or top filter bar.
- **Mobile (≤767px):** 4-column layout with `1rem` (`16px`) margins and gutters. Multi-column forms reflow into strict single-column steps.

### Spacing Principles
- Compact spatial tokens (`space-xs` = 4px, `space-sm` = 8px) govern relationships inside grouped form elements and badge padding.
- Structural tokens (`space-md` = 16px, `space-lg` = 24px) establish container boundaries and field spacing.
- Administrative dense tables enforce an 8px vertical padding limit per row to optimize screen real estate for municipal desk operators processing hundreds of grievances daily.

## Elevation & Depth

To maintain visual discipline and print compatibility, depth is achieved primarily through **structural borders and planar surface tiers** rather than heavy drop shadows.

### Elevation Hierarchy
- **Level 0 (Base Canvas):** `#F6F8FA`. Neutral, non-distracting background for the entire application.
- **Level 1 (Surface Cards & Tables):** `#FFFFFF` paired with a crisp 1px solid border (`#DCE3E9`) and an ultra-subtle ambient shadow:
  `box-shadow: 0 1px 2px 0 rgba(23, 43, 58, 0.05)`.
- **Level 2 (Dropdowns, Popovers & Context Menus):** `#FFFFFF` surface with a 1px border (`#DCE3E9`) and a focused, disciplined shadow:
  `box-shadow: 0 4px 12px 0 rgba(23, 43, 58, 0.08)`.
- **Level 3 (Modals, Citizen Action Drawers & Verification Overlays):** `#FFFFFF` backed by a neutral scrim (`rgba(18, 59, 109, 0.45)`):
  `box-shadow: 0 12px 32px 0 rgba(23, 43, 58, 0.16)`.
- **Focus Rings:** Accessible, non-blur outline using Action Blue: `outline: 2px solid #1769AA; outline-offset: 2px`.

## Shapes

The design system enforces a **Soft (Level 1)** geometric standard. Roundness is minimal and disciplined, creating a calm, institutional appearance that aligns with official certificates, state circulars, and civic forms.

### Corner Radii Guidelines
- **Input Fields, Form Selects & Buttons:** `4px` (`rounded`). Precise, stable, and clearly bounded.
- **Cards, Panels & Table Wrappers:** `6px` to `8px` (`rounded-lg`). Gentle containment that separates data sets without feeling playful.
- **Status Badges, SLA Pills & Token Tags:** `4px` (`rounded`). Strictly non-pill, rectangular tags with soft corners ensure badge labels read as official categorization stamps rather than social media tags.

## Components

### Buttons
- **Primary Action:** Solid `#1769AA` background, `#FFFFFF` text, `4px` radius, `44px` height (Desktop: `40px`), padding `10px 20px`. Hover: `#104E80`. Active: `#0C3B61`. Disabled: `#DCE3E9` background, `#596B7A` text.
- **Secondary Authority:** `#123B6D` background for high-level administrative submissions (e.g., "Sanction Work Order", "Issue Official Closing Order").
- **Secondary Outline:** `#FFFFFF` background, `1px solid #DCE3E9`, text `#172B3A`. Hover: `#F1F6FB` background, border `#1769AA`.
- **Destructive:** `#B42318` text or outline, transitioning to solid `#B42318` with `#FFFFFF` text only on final irreversible actions (e.g., "Reject Grievance").

### Status Badges & Priority Pills
Never rely on color alone; every pill contains an icon or prefix alongside explicit text:
- **Registered / New:** `#F1F6FB` background, `#123B6D` text, `1px solid #C7D9EA`. Label: `● Registered / பதிவு செய்யப்பட்டது`.
- **Under Investigation / SLA Active:** `#FEFBE8` background, `#946200` text, `1px solid #F5E096`. Label: `⏳ In Progress / விசாரணையில்`.
- **Resolved / Closed:** `#EDF7F0` background, `#187847` text, `1px solid #B8E4C3`. Label: `✓ Resolved / தீர்க்கப்பட்டது`.
- **Overdue / Escalated:** `#FDF2F2` background, `#B42318` text, `1px solid #F8C9C5`. Label: `⚠ SLA Breached / காலக்கெடு மீறியது`.

### Form Inputs & Selects
- Height: `40px` (Dense) or `48px` (Citizen submission flow).
- Surface: `#FFFFFF` with `1px solid #DCE3E9` border.
- Floating/Stacked Labels: Label placed persistently above the input field in `label-md` (`#172B3A`), with Tamil translation subtitle in `label-sm` (`#596B7A`).
- Error state: `1px solid #B42318` with an error message container below including an alert icon.

### Cards & Grievance Dossiers
- Background: `#FFFFFF`, border: `1px solid #DCE3E9`, radius: `6px`.
- Card Header: Features complaint reference badge (`TN-CHN-2024-XXXX`), date of filing, and Ward/Zone tag.
- Card Body: Details citizen statement, geo-tagged street address, and uploaded inspection photographs in a 3-column micro-grid.
- Card Footer: Direct breadcrumb progress bar representing the redressal pipeline: `Registered → Officer Assigned → Site Inspection → Resolution → Citizen Feedback`.

### Data Tables (Officer Worklist)
- Header row: `#F1F6FB` background, `#123B6D` text, uppercase `12px` font weight `600`, subtle bottom border `2px solid #DCE3E9`.
- Row height: `44px`, alternated with subtle white and `#FAFBFD` striping.
- Fixed right column for instant actions: `View Dossier`, `Reassign`, `Update Status`.

### Citizen Tracking Stepper
- Horizontal progression rail displaying milestones.
- Completed node: Solid `#159447` circle with checkmark.
- Active node: Solid `#1769AA` with pulsating status ring.
- Pending node: `#DCE3E9` circle with `#596B7A` step number.
- Connecting line: `2px solid #159447` for completed phases; `2px dashed #DCE3E9` for prospective phases.