# LumiNails design context

## Direction

The TEST UI follows the supplied Figma file: a light editorial beauty-salon system using a dusty pink accent, slate ink, warm greige canvas, pale pink surfaces, and a restrained terracotta secondary accent.

## Core tokens

- Primary `#dd8ea4`; ink/footer `#31383f`.
- Background `#e3dcd2`; surface `#f2e9eb`; warm accent `#cc8b65`.
- Display typography: Playfair Display. Functional typography: DM Sans.
- Card radius 4px; control radius 3px; pill only for semantic pills/circular controls.
- Shared content width 1200px and responsive `--ui-gutter`.

## Patterns

- Full-width split homepage hero with existing homepage imagery.
- Full-width split introduction, dark service showcase, and pink account/booking CTA.
- Two-column desktop gallery with consistent caption backgrounds on every image; one column on mobile.
- One shared dark footer across all public pages, pinned after the page content without trailing canvas.
- Compact admin workspace using the same light palette while preserving its functional dark theme.

## Constraints

- Source CSS only; rebuild generated bundles.
- Preserve existing flows, gallery image files and admin PWA zoom policy.
- No `!important`, duplicate override layers or GitHub test jobs.
- Visible focus, minimum 44px touch targets and minimum 16px mobile form text.
