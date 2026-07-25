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

// ---------- calculators.json (state code -> URL) ----------
// Lets vehicles.html auto-link states to their published calculator pages
// without editing HTML each time a new state calculator ships.
const STATES = [
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],
  ["CA","California"],["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],
  ["DC","District of Columbia"],["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],
  ["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],
  ["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],
  ["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],
  ["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],
  ["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],
  ["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],
  ["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],
  ["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],
  ["UT","Utah"],["VT","Vermont"],["VA","Virginia"],["WA","Washington"],
  ["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"],
];
const calculatorFiles = htmlFiles.filter((f) => /-calculator\.html$/.test(f));
const calculators = {};
for (const [code, name] of STATES) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const match = calculatorFiles.find((f) => f.startsWith(`${slug}-`));
  if (match) calculators[code] = `${BASE_URL}/${match}`;
}
const manifestOut = join(PUBLIC_DIR, "calculators.json");
writeFileSync(manifestOut, JSON.stringify(calculators, null, 2) + "\n");
console.log(`calculators.json written with ${Object.keys(calculators).length} states -> ${manifestOut}`);
