# Static rendering and content

Run `npm ci`, `npx playwright install chromium`, then `npm run build`. The build creates static HTML for all seven routes, including per-page canonical, Open Graph and Twitter metadata. Firebase serves these files with clean URLs. Unknown paths return the real 404 page instead of the homepage.

Alternatively, use installed Chrome in PowerShell with `$env:PRERENDER_CHROME_CHANNEL='chrome'` before the build. Run `node scripts/verify-seo.cjs` after building to verify all routes with JavaScript disabled, metadata, sitemap coverage, room navigation and the booking link.

Update room descriptions and FAQ entries in `src/siteContent.json`. The structured data currently uses the supplied ₦200,000–₦400,000 range, 2:00 pm check-in and 12:00 noon check-out. Confirm those values before publishing if they have changed. The shared preview image at `/og-image.jpg` is generated from the Executive Suite wide shot at 1200×630 by `scripts/brand.cjs`.

The homepage title is “The BARLI Hotel and Apartments | Luxury Shortlet in Jabi, Abuja”. Its description mentions Jabi Lake Mall and VIP airport pickup. Each rendered page gets canonical, Open Graph and Twitter metadata. The homepage JSON-LD is a Hotel with address, phone, email, rate range, check-in/out, 24-hour opening specification, amenities, image and Instagram, TikTok and Facebook profile links. The HTML template includes a useful server/source fallback plus a `<noscript>` block with the hotel's name, address, phone, email and stay details.

`public/robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://thebarli.com/sitemap.xml
```

`public/sitemap.xml` (the build regenerates the same URL list from the page registry):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://thebarli.com/</loc></url>
  <url><loc>https://thebarli.com/rooms/executive-suite</loc></url>
  <url><loc>https://thebarli.com/rooms/prestige-room</loc></url>
  <url><loc>https://thebarli.com/rooms/deluxe-room</loc></url>
  <url><loc>https://thebarli.com/rooms/comfort-room</loc></url>
  <url><loc>https://thebarli.com/shortlet-in-jabi</loc></url>
  <url><loc>https://thebarli.com/faq</loc></url>
</urlset>
```

The React favicon and install metadata have been replaced with the gold B and THE BARLI branding (`public/favicon.ico`, `favicon.png`, `logo192.png`, `logo512.png`, and `manifest.json`).

The production output is `build/`; the development server still renders client-side. Inspect the built HTML or a hosted build to check page source.

# Legacy domain redirect

`public/canonical-host.js` redirects browsers on the two legacy Firebase hostnames to the matching path on thebarli.com. Canonical metadata also points to thebarli.com. This is a browser redirect, not an HTTP 301.

Firebase serves a site's default domains and connected custom domains using the same path-based redirect configuration. Applying a blanket redirect to the current site while thebarli.com is connected to it would redirect thebarli.com to itself.

To enable a true permanent redirect:

1. Create a separate Firebase Hosting site for the main website and deploy `build/` there using the existing security headers and clean URL configuration.
2. Move thebarli.com to that site, complete the Firebase DNS/certificate steps, and verify it serves the seven rendered pages.
3. Only then deploy `firebase.legacy.json` to the original `the-barli-latest` site: `npx -y firebase-tools@latest deploy --only hosting --config firebase.legacy.json`.
4. Verify HTTP 301 responses on the legacy root and room paths, and HTTP 200 on the matching thebarli.com destinations.

The legacy config must not be deployed before the custom domain has moved. No deployment or domain migration has been performed as part of these source changes.

Firebase reference: https://firebase.google.com/docs/hosting/full-config
