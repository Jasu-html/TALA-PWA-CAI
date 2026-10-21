// Package only the public app, never development scripts, caches, or credentials.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });
for (const file of ['index.html', 'manifest.webmanifest', 'sw.js']) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}
for (const folder of ['css', 'js', 'assets']) {
  fs.cpSync(path.join(root, folder), path.join(dist, folder), {
    recursive: true,
    filter: source => !/\.(md|partial)$/i.test(source)
  });
}
console.log('Android web assets prepared in dist/ (including all bundled MP3s).');
