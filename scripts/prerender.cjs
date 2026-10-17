const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');
const site = require('../src/siteContent.json');
const build = path.resolve(__dirname, '../build');
const types = { '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json' };
async function main() {
  const template = await fs.readFile(path.join(build, 'index.html'));
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = path.resolve(build, '.' + pathname);
      if (!file.startsWith(build + path.sep) && file !== build) { res.writeHead(403).end(); return; }
      if (!path.extname(pathname)) { res.setHeader('Content-Type', 'text/html'); res.end(template); return; }
      res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
      res.end(await fs.readFile(file));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch(process.env.PRERENDER_CHROME_CHANNEL ? { channel: process.env.PRERENDER_CHROME_CHANNEL } : {});
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    for (const entry of site.pages) {
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on('pageerror', onError);
      await page.goto(`http://127.0.0.1:${server.address().port}${entry.path}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('main h1');
      await page.evaluate(({ entry, site }) => {
        document.title = entry.title;
        const add = (tag, attributes) => {
          const element = document.createElement(tag);
          Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
          document.head.append(element);
        };
        add('meta', { name: 'description', content: entry.description });
        add('link', { rel: 'canonical', href: site.origin + entry.path });
        for (const [property, content] of Object.entries({ 'og:type': 'website', 'og:site_name': site.name, 'og:title': entry.title, 'og:description': entry.description, 'og:url': site.origin + entry.path, 'og:image': site.origin + site.ogImage, 'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': 'Executive Suite at The Barli Hotel & Apartments, Jabi, Abuja', 'og:locale': 'en_NG' })) add('meta', { property, content });
        add('meta', { name: 'robots', content: 'index, follow, max-image-preview:large' });
        add('meta', { name: 'geo.region', content: 'NG-FC' });
        add('meta', { name: 'geo.placename', content: 'Jabi, Abuja' });
        for (const [name, content] of Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': entry.title, 'twitter:description': entry.description, 'twitter:image': site.origin + site.ogImage, 'twitter:image:alt': 'Executive Suite at The Barli Hotel & Apartments, Jabi, Abuja' })) add('meta', { name, content });
        if (entry.path === '/') {
          const schema = { '@context': 'https://schema.org', '@type': 'Hotel', '@id': site.origin + '/#hotel', name: site.name, url: site.origin + '/', telephone: site.phone, email: site.email, description: site.description, priceRange: site.priceRange, checkinTime: site.checkinTime, checkoutTime: site.checkoutTime, openingHoursSpecification: site.openingHoursSpecification, address: { '@type': 'PostalAddress', streetAddress: '29 Asheik Jarma Street, Jabi', addressLocality: 'Abuja', addressRegion: 'Federal Capital Territory', postalCode: '900108', addressCountry: 'NG' }, image: [site.origin + site.ogImage], photo: [site.origin + site.ogImage], amenityFeature: site.amenities.map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })), sameAs: site.socialProfiles };
          const script = document.createElement('script'); script.type = 'application/ld+json'; script.textContent = JSON.stringify(schema); document.head.append(script);
        }
        document.querySelectorAll('main [style], footer[style], footer [style]').forEach(element => {
          for (const property of ['opacity', 'transform', 'clip-path']) element.style.removeProperty(property);
        });
        document.querySelectorAll('.cookie-consent').forEach(element => element.remove());
        document.documentElement.style.cssText = '';
      }, { entry, site });
      if (errors.length) throw new Error(errors.join('\n'));
      const html = await page.content();
      if (!html.includes(site.address) || !html.includes('property="og:title"')) throw new Error(`Incomplete HTML: ${entry.path}`);
      const target = path.join(build, entry.path === '/' ? 'index.html' : entry.path.slice(1) + '.html');
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, html);
      page.off('pageerror', onError);
      console.log(`Pre-rendered ${entry.path}`);
    }
    await fs.writeFile(path.join(build, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + site.pages.map(entry => `  <url><loc>${site.origin}${entry.path}</loc></url>`).join('\n') + '\n</urlset>\n');
    await fs.writeFile(path.join(build, '404.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page not found | THE BARLI</title><meta name="robots" content="noindex"></head><body><h1>Page not found</h1><a href="/">Return to THE BARLI</a></body></html>');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
