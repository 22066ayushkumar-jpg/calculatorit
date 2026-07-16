## Alabama Vehicle Registration Fee Calculator page

Mirror the pattern used for Nevada / Florida / Colorado.

### 1. Create `public/alabama-vehicle-registration-fee-calculator.html`
- Same shell as the other state pages (header, footer, tokens/base/components/pages CSS, fonts, mobile nav, footer year).
- Head:
  - `<title>Alabama Vehicle Registration Fee Calculator / Estimator 2026 — CalculateIt</title>`
  - meta description: "Estimate Alabama vehicle registration fees with our calculator. See cost factors, examples, and how fees are calculated."
  - canonical + og tags → `https://calculateit.net/alabama-vehicle-registration-fee-calculator.html`
- Body content:
  - H1: "Alabama Vehicle Registration Fee Calculator / Estimator 2026"
  - Calculator widget: the provided `#al-dmv-app` markup, `<style>`, and `<script>` reconstructed as a working form (inputs, selects, results panel, breakdown table) — the pasted snippet is missing element tags, so I'll build the DOM around the given IDs (`alPrice`, `alPreset`, `alStateFee`, `alFuel`, `alName`, `alCounty`, `alCity`, `cityContainer`, `alIncludeTitle`, `alIncludeIssuerFee`, `alPresetHelp`, `resTotal`, `resAdVal`, `resTag`, `tableTotal`, `resLabel`, `breakdownBody`) so the provided JS runs as-is.
  - 80–120 word intro including "Alabama vehicle registration fees calculator".
  - Sections: "How much will my tag and registration cost in Alabama?", "How fees are calculated in Alabama", "What affects your registration in Alabama?", "Estimated examples" (2–3 sample cases), "What this calculator may not include" disclaimer.
  - FAQs via `<details>`:
    1. What factors affect vehicle registration fees in Alabama?
    2. Is this calculator accurate for all vehicles in Alabama?
    3. Can I use this calculator for a new car and a used car in Alabama?
  - `FAQPage` JSON-LD with those 3 Q&A.

### 2. Wire up the hub
- `public/vehicles.html`: add an `AL` branch in the state grid script that points to `https://calculateit.net/alabama-vehicle-registration-fee-calculator.html`.

### 3. Sitemap
- `public/sitemap.xml`: add `<url>` for the Alabama page with `changefreq=monthly`, `priority=0.9`.

### Notes
- The provided JS references DOM nodes the pasted HTML doesn't clearly show; I'll build the surrounding form/results/table markup with matching IDs and CSS classes referenced by the given `<style>` block (`#al-dmv-app`, `.grid-row`, `.dash-grid`, `.dashboard-header`, `.info-box`, `.t-right`).
- URL will be lowercase `alabama-vehicle-registration-fee-calculator.html` (matches sibling files); the requested "Alabama -Vehicle-..." with capitals/space appears to be a display label, not a real slug.
