const fs = require("fs/promises");
const path = require("path");

const SITE_URL = (process.env.REACT_APP_SITE_URL || "https://grupsardanistacastelldefels.cat").replace(
  /\/$/,
  ""
);
const API_BASE = (process.env.REACT_APP_API_BASE || "https://admin.sardana.newwweb.cat").replace(
  /\/$/,
  ""
);

const STATIC_ROUTES = [
  "/",
  "/quisom",
  "/agenda",
  "/blog",
  "/galeria",
  "/calendari",
  "/contacte",
  "/neta",
  "/legal/terms",
  "/legal/privacy",
  "/legal/cookies",
];

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function xmlEscape(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function asIsoDate(dateStr) {
  const date = dateStr ? new Date(dateStr) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function toAbsoluteUrl(route) {
  if (route.startsWith("http")) return route;
  return `${SITE_URL}${route.startsWith("/") ? route : `/${route}`}`;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${url}`);
  }
  return response.json();
}

async function fetchDynamicRoutes() {
  const dynamic = [];

  try {
    const [articles, events, galleries] = await Promise.all([
      fetchJson(
        `${API_BASE}/jsonapi/node/article?fields[node--article]=field_slug,path,changed&filter[status][value]=1&page[limit]=200`
      ),
      fetchJson(
        `${API_BASE}/jsonapi/node/esdeveniment?fields[node--esdeveniment]=field_slug,changed&filter[status][value]=1&page[limit]=200`
      ),
      fetchJson(
        `${API_BASE}/jsonapi/node/galeria?fields[node--galeria]=title,changed&filter[status][value]=1&page[limit]=200`
      ),
    ]);

    (articles.data || []).forEach((item) => {
      const slug = item.attributes?.field_slug;
      if (slug) {
        dynamic.push({
          loc: toAbsoluteUrl(`/blog/${slug}`),
          lastmod: asIsoDate(item.attributes?.changed),
        });
      }
    });

    (events.data || []).forEach((item) => {
      const slug = item.attributes?.field_slug;
      if (slug) {
        dynamic.push({
          loc: toAbsoluteUrl(`/agenda/${slug}`),
          lastmod: asIsoDate(item.attributes?.changed),
        });
      }
    });

    (galleries.data || []).forEach((item) => {
      const slug = slugify(item.attributes?.title);
      if (slug) {
        dynamic.push({
          loc: toAbsoluteUrl(`/galeria/${slug}`),
          lastmod: asIsoDate(item.attributes?.changed),
        });
      }
    });
  } catch (error) {
    console.warn("[sitemap] No s'han pogut obtenir rutes dinamiques de Drupal:", error.message);
  }

  return dynamic;
}

function buildXml(entries) {
  const unique = new Map();

  entries.forEach((entry) => {
    if (!entry.loc) return;
    unique.set(entry.loc, entry.lastmod || new Date().toISOString());
  });

  const body = Array.from(unique.entries())
    .map(
      ([loc, lastmod]) =>
        `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${xmlEscape(lastmod)}</lastmod>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

async function main() {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    loc: toAbsoluteUrl(route),
    lastmod: new Date().toISOString(),
  }));

  const dynamicEntries = await fetchDynamicRoutes();
  const xml = buildXml([...staticEntries, ...dynamicEntries]);

  const outputPath = path.join(__dirname, "..", "public", "sitemap.xml");
  await fs.writeFile(outputPath, xml, "utf8");

  console.log(`[sitemap] Generat: ${outputPath}`);
  console.log(`[sitemap] URL totals: ${staticEntries.length + dynamicEntries.length}`);
}

main().catch((error) => {
  console.error("[sitemap] Error inesperat:", error);
  process.exit(1);
});
