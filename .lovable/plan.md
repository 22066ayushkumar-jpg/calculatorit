# CalculateIt — Vanilla Multi-Page Site

A 6-page static website for CalculateIt.net, built with strict HTML5 + vanilla CSS3 + vanilla JS, styled in the Organic/Wabi-Sabi design system. Delivered as plain static files (no React, no Tailwind, no build step) so it loads near-instantly.

## Delivery approach

The current project is a TanStack Start app, but your brief mandates pure HTML/CSS/JS. I'll place the static site in `public/site/` so it ships unmodified through Vite (served at `/site/index.html`, `/site/vehicles.html`, etc.). The TanStack root remains untouched. If you'd rather replace the TanStack app entirely, say the word and I'll move files to `public/` root and add redirect/rewrite handling.

## File structure

```text
public/site/
├── index.html          Home + hero + hub portal grid
├── vehicles.html       Directory of all 50 US state vehicle registration calculators
├── about.html          Chetan Kumar profile + social pills
├── contact.html        Glassmorphic form + mailto CTA
├── privacy.html        Privacy policy (readable legal layout)
├── disclaimer.html     Disclaimer (same legal layout)
└── assets/
    ├── css/
    │   ├── tokens.css      Design tokens (:root vars: colors, fonts, radii, shadows)
    │   ├── base.css        Reset, typography, grain overlay, layout primitives
    │   ├── components.css  Nav pill, buttons, cards, form, blobs, footer
    │   └── pages.css       Page-specific tweaks (hero, hub grid, legal prose)
    └── js/
        └── main.js         Mobile nav toggle, current-year, form validation, lazy nav prefetch
```

Single shared header/footer markup copied per page (kept tiny, no JS hydration cost). Optional: a 20-line JS include-helper for DRY if you prefer.

## Design system → CSS translation

`tokens.css` defines every value as a CSS variable:

- Colors: `--bg-rice-paper #FDFCF8`, `--text-loam #2C2C24`, `--moss #5D7052`, `--moss-fg #F3F4F1`, `--terracotta #C18C5D`, `--sand #E6DCCD`, `--stone #F0EBE5`, `--timber #DED8CF`, `--dried-grass #78786C`, `--burnt-sienna #A85448`.
- Type: `--font-display: 'Fraunces', Georgia, serif`, `--font-body: 'Nunito', system-ui, sans-serif`. Fluid scale via `clamp()`.
- Radii: `--r-md 1rem`, `--r-lg 2rem`, `--r-xl 2.5rem`, `--r-pill 999px`; blob utility classes with the asymmetric percentage radii from the brief.
- Shadows: `--shadow-soft 0 4px 20px -2px rgba(93,112,82,.15)`, `--shadow-float 0 10px 40px -10px rgba(193,140,93,.2)`.
- Grain: body `::before` pseudo-element with inline base64 SVG noise, `mix-blend-mode: multiply`, opacity .04.

## Components (vanilla CSS)

- **Floating nav pill**: `position: sticky; top: 1rem`, `backdrop-filter: blur(12px)`, `background: rgba(255,255,255,.7)`, `border-radius: var(--r-pill)`, timber border. Links: Home · Vehicle Hub · Contact. Mobile: hamburger toggles a rounded panel (JS adds `[data-open]`).
- **Buttons**: `.btn`, `.btn--primary` (moss), `.btn--outline` (terracotta), `.btn--ghost`. Pill shape, hover `transform: scale(1.03)` + deeper shadow, `:active scale(.97)`. (Per your final SEO note, motion is minimized but tactile hover stays as it's free.)
- **Cards**: `.card` with `border-radius: var(--r-lg)`, soft moss shadow, half-opacity timber border. Variants `.card--blob-a/b/c` cycle the asymmetric corner radii.
- **Blobs**: absolutely positioned `<div class="blob blob--moss">` with large size, `filter: blur(60px)`, low opacity. Used in hero, about, contact, legal headers.
- **Form**: pill inputs, `background: rgba(255,255,255,.5)`, focus ring `0 0 0 4px rgba(93,112,82,.25)`. Native HTML5 validation + tiny JS for inline error display.
- **Footer**: stone-tinted band, 3-column on desktop / stacked on mobile, links to all 6 pages, copyright year via JS.

## Page-by-page content

1. **index.html** — Hero `<h1>` "Calculators that respect your time.", subhead, primary CTA → vehicles.html, secondary → about.html. Two blurred blobs behind. Below: 3-card portal ("Vehicle Calculators", "About the Architect", "Get in Touch"). Trust strip with 4 stats.
2. **vehicles.html** — `<h1>` "Vehicle Registration Calculators". Intro paragraph. Responsive card grid (1 / 2 / 3 cols) listing all 50 US states + DC, each card: state name, short blurb, "Calculate →" link (href placeholders `#` ready for your real URLs — tell me the URL pattern and I'll wire them).
3. **about.html** — Portrait placeholder in organic mask, `<h1>` "Chetan Kumar — Digital Tool Architect", 2–3 paragraphs of bio, pill social buttons (LinkedIn + GitHub) opening in new tab with `rel="noopener"`.
4. **contact.html** — Glassmorphic form card: name, email, message, submit. Submits via `mailto:` fallback (no backend). Prominent "Email me directly" pill button → `mailto:ashusuyavanshi@gmail.com`.
5. **privacy.html / disclaimer.html** — Centered `max-width: 70ch` prose column, generous line-height 1.7, semantic `<h2>`/`<h3>` structure, last-updated date, standard placeholder legal text you can edit.

## Performance plan (your "speed of light" requirement)

Realistic target: **LCP < 1s on 4G, total payload ~30–50 KB gzipped per page.** (The literal 0.023 ms target isn't physically achievable in any browser — happy to commit to the real budget instead.)

- Zero JS frameworks, zero runtime dependencies.
- Single `main.js` (~1 KB) with `defer`.
- Critical CSS inlined in `<head>` per page; non-critical loaded via `<link rel="preload" as="style" onload>`.
- Self-host Fraunces + Nunito as `woff2` subset (Latin only), `font-display: swap`, preload one weight each.
- SVG-only icons inlined where used (no icon font, no Lucide).
- Per-page SEO: unique `<title>` (<60ch), meta description (<160ch), Open Graph + Twitter tags, canonical link, JSON-LD `WebSite` on home + `Person` on about.
- One `<h1>` per page, semantic landmarks, alt text, visible focus rings, AA contrast verified.
- `sitemap.xml` + `robots.txt` in `public/site/`.

## Technical notes

- Per your final SEO line "Use no animations, nothing" — I'll keep only hover state changes (free, no layout cost) and drop all `@keyframes` / scroll animations. Confirm if you also want hover transforms removed.
- Vehicle hub links are placeholders until you share the destination URL pattern (e.g. `https://calculateit.net/vehicle-registration/{state-slug}`).
- Form has no backend; `mailto:` is the only submission path as specified.

## Open questions before I build

1. Keep the static site at `/site/*` inside the TanStack project, or fully replace the TanStack app with these files at the root?
2. Vehicle hub: list all 50 states + DC, or only a curated subset? And what's the URL pattern for each state's calculator?
3. Strip hover transforms too, or keep the subtle scale on buttons/cards?
