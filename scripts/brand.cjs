const fs = require('node:fs/promises');
const sharp = require('sharp');
(async () => {
  for (const [name, size] of [['favicon.png', 64], ['logo192.png', 192], ['logo512.png', 512]]) {
    await sharp('src/assets/logo.png').trim().resize(size, size, { fit: 'contain', background: '#060606' }).png().toFile(`public/${name}`);
  }
  const png = await fs.readFile('public/favicon.png');
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4); header[6] = 64; header[7] = 64;
  header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
  await fs.writeFile('public/favicon.ico', Buffer.concat([header, png]));
  await sharp('src/assets/landscape-images/WhatsApp Image 2026-09-09 at 1.31.40 PM.jpeg').resize(1200, 630).jpeg({ quality: 85 }).toFile('public/social-hero.jpg');
})().catch(error => { console.error(error); process.exitCode = 1; });
