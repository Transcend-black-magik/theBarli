const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const site = require('../src/siteContent.json');
const root = path.resolve(__dirname, '../build');

(async () => {
  const sitemap = await fs.readFile(path.join(root, 'sitemap.xml'), 'utf8');
  assert((await fs.readFile(path.join(root, 'robots.txt'), 'utf8')).includes('Sitemap: https://thebarli.com/sitemap.xml'));
  const server = http.createServer(async (req, res) => {
    let pathname = new URL(req.url, 'http://localhost').pathname;
    if (pathname === '/') pathname = '/index.html';
    else if (!path.extname(pathname)) pathname += '.html';
    try {
      const file = path.resolve(root, '.' + decodeURIComponent(pathname));
      assert(file.startsWith(root + path.sep));
      res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg' })[path.extname(file)] || 'application/octet-stream');
      res.end(await fs.readFile(file));
    } catch { res.writeHead(404).end('Not found'); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch(process.env.PRERENDER_CHROME_CHANNEL ? { channel: process.env.PRERENDER_CHROME_CHANNEL } : {});
    const nojs = await browser.newContext({ javaScriptEnabled: false });
    const page = await nojs.newPage();
    const base = `http://127.0.0.1:${server.address().port}`;
    await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    for (const entry of site.pages) {
      const html = await fs.readFile(path.join(root, entry.path === '/' ? 'index.html' : entry.path.slice(1) + '.html'), 'utf8');
      assert(html.includes(site.address));
      assert(!html.includes('You need to enable JavaScript'));
      assert(sitemap.includes(`<loc>${site.origin}${entry.path}</loc>`));
      await page.goto(base + entry.path);
      assert.equal(await page.title(), entry.title);
      assert(await page.locator('h1').isVisible());
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), site.origin + entry.path);
      assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), site.origin + '/social-hero.jpg');
      assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute('content'), 'summary_large_image');
      assert((await page.locator('main').innerText()).includes(site.address));
      if (entry.path === '/') {
        assert.equal(await page.locator('#rooms').evaluate(element => getComputedStyle(element).opacity), '1');
        const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
        assert.equal(schema['@type'], 'LodgingBusiness');
        assert.equal(schema.telephone, site.phone);
        assert.equal(schema.address.streetAddress, '29 Asheik Jarma Street');
        await page.screenshot({ path: 'build/seo-home-check.png', fullPage: true });
      }
      console.log(`Verified source and JavaScript-disabled page: ${entry.path}`);
    }
    const live = await browser.newPage();
    live.setDefaultTimeout(15000);
    await live.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    const errors = [];
    live.on('pageerror', error => errors.push(error.message));
    await live.goto(base + '/', { waitUntil: 'networkidle' });
    await live.getByRole('link', { name: 'Executive Suite', exact: true }).click();
    await live.waitForURL('**/rooms/executive-suite', { waitUntil: 'domcontentloaded' });
    await live.getByRole('heading', { name: 'Executive Suite', exact: true }).waitFor();
    assert.equal(await live.locator('h1').textContent(), 'Executive Suite');
    assert((await live.getByRole('link', { name: 'Enquire on WhatsApp' }).getAttribute('href')).includes('Executive%20Suite'));
    assert.deepEqual(errors, []);
    await live.setViewportSize({ width: 390, height: 844 });
    assert(await live.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
    const missing = await live.goto(base + '/does-not-exist');
    assert.equal(missing.status(), 404);
    console.log('Verified navigation, booking link, mobile width and missing-route status.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
    // Verification images are local review artifacts, never part of the deployment.
    await fs.mkdir(path.resolve(__dirname, '../artifacts'), { recursive: true });
    await fs.rename(path.join(root, 'seo-home-check.png'), path.resolve(__dirname, '../artifacts/seo-home-check.png')).catch(() => {});
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
