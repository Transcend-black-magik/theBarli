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
  await sharp('src/assets/rooms/generated/room-desktop-02.png').resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 88 }).toFile('public/og-image.jpg');
})().catch(error => { console.error(error); process.exitCode = 1; });
