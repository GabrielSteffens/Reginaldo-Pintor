import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static-output site: builds to plain HTML/CSS/JS, deployable on any host
// (Vercel, Netlify, or a plain cPanel/static host) with no Node server required.
export default defineConfig({
  site: "https://www.reginaldopinturas.com.br", // CONFIGURE: replace with the real domain once one is chosen
  output: "static",
  trailingSlash: "never",
  compressHTML: true,
  // Generates dist/sitemap-index.xml + dist/sitemap-0.xml at build time —
  // robots.txt already points here, so this was a dangling 404 until now.
  integrations: [sitemap()],
});
