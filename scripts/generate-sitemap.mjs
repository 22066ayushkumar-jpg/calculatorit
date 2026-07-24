#!/usr/bin/env node
// Auto-generates public/sitemap.xml by scanning public/*.html.
// Add a new HTML page under public/ and run `npm run sitemap` (or a build) — it's included automatically.
import { readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");
const BASE_URL = "https://calculateit.net";

// Priority/changefreq rules by filename pattern. First match wins.
const RULES = [
  { test: (f) => f === "index.html",                     changefreq: "weekly",  priority: "1.0" },
  { test: (f) => f === "vehicles.html",                  changefreq: "weekly",  priority: "0.9" },
  { test: (f) => /-calculator\.html$/.test(f),           changefreq: "monthly", priority: "0.9" },
  { test: (f) => /^(privacy|disclaimer|terms)\.html$/.test(f), changefreq: "yearly", priority: "0.3" },
  { test: () => true,                                    changefreq: "monthly", priority: "0.6" },
];

// Files under public/ to omit from the sitemap.
const EXCLUDE = new Set(["404.html", "llms.txt"]);

const htmlFiles = readdirSync(PUBLIC_DIR)
  .filter((f) => f.endsWith(".html") && !EXCLUDE.has(f))
  .sort();

const entries = [];
// Canonical home entry.
entries.push({ loc: `${BASE_URL}/`, changefreq: "weekly", priority: "1.0" });

for (const file of htmlFiles) {
  const rule = RULES.find((r) => r.test(file));
  entries.push({
    loc: `${BASE_URL}/${file}`,
    changefreq: rule.changefreq,
    priority: rule.priority,
  });
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries
    .map(
      (e) =>
        `  <url><loc>${e.loc}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

const out = join(PUBLIC_DIR, "sitemap.xml");
writeFileSync(out, xml);
console.log(`sitemap.xml written with ${entries.length} entries -> ${out}`);
