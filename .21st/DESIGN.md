# LumiNails design context

## Direction

The TEST UI uses a quiet-luxury editorial direction built only from the user-approved five-color earth-neutral palette: warm ivory canvas, deep cacao text and primary actions, plus blush, clay and caramel supporting surfaces. Large Cormorant Garamond headings and Manrope functional text remain unchanged.

## Core tokens

- Approved palette: ivory `#f1edea`, blush `#e3d0ca`, clay `#d0b4a8`, caramel `#b39178`, cacao `#806353`.
- Primary and foreground: `#806353`; on-primary, background and surface: `#f1edea`.
- Normal text uses the cacao/ivory extremes; the three middle tones are mainly for supporting surfaces, borders and decoration.
- Control radius: `14px`; card radius: `24px`; hero radius: `30px`.
- Public layout is spacious. Admin workspace remains compact and supports its existing dark theme.

## Patterns

- Split editorial home hero with one primary booking CTA.
- Dark service showcase with readable image overlays.
- Progressive booking steps presented as clear surface cards.
- Split branded admin authentication on desktop and a compact single card on mobile.

## Constraints

- Edit source CSS and rebuild generated bundles.
- Preserve public/admin CSS ownership and existing flows.
- Use semantic tokens, visible focus, 44 px touch targets, and 16 px mobile inputs.
- Do not use `!important`, duplicate override layers, decorative glass, or ungrounded gradients.
- Do not add tests to GitHub Actions or change the LIVE project without separate approval.

## Decision record

The user explicitly approved this redesign on 2026-09-01 and supplied the final five-color palette on 2026-09-02. The palette and component direction are recorded in `.21st/design.json` and detailed in `docs/design-system.md`.
