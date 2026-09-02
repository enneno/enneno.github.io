# LumiNails design context

## Direction

The TEST UI uses a quiet-luxury editorial direction: warm ivory canvas, deep cacao primary actions and showcase surfaces, muted blush accents, large Cormorant Garamond headings, and Manrope for functional text.

## Core tokens

- Primary: `#5d3d36`; on-primary: `#fffaf6`.
- Background: `#f8f3ed`; surface: `#fffcf8`; foreground: `#2c211e`.
- Accent: `#e8c9c3`; muted text: `#695a55`.
- Control radius: `14px`; card radius: `24px`; the desktop home hero is full-bleed, while its mobile image card uses `22px`.
- Shared public content width: `1240px`; responsive section padding comes from `--lumi-section-padding-inline` and `--lumi-section-padding-block`.
- Public layout is spacious. Admin workspace remains compact and supports its existing dark theme.

## Patterns

- Full-bleed split editorial home hero with one primary booking CTA; mobile keeps the same ivory color hierarchy.
- Dark service showcase with readable image overlays.
- Progressive booking steps use lightly tinted blush panels, ivory cards and deep cacao active actions.
- Split branded admin authentication on desktop and a compact single card on mobile.

## Constraints

- Edit source CSS and rebuild generated bundles.
- Preserve public/admin CSS ownership and existing flows.
- Use semantic tokens, visible focus, 44 px touch targets, and 16 px mobile inputs.
- Do not use `!important`, duplicate override layers, decorative glass, or ungrounded gradients.
- Do not add tests to GitHub Actions or change the LIVE project without separate approval.

## Decision record

The user explicitly approved this redesign on 2026-09-01. The original quiet-luxury palette was restored on 2026-09-02 while retaining the later layout and responsive fixes. The component direction is recorded in `.21st/design.json` and detailed in `docs/design-system.md`.
