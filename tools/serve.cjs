const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.webmanifest':'application/manifest+json', '.mp3':'audio/mpeg', '.svg':'image/svg+xml' };
const server = http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url,'http://localhost');
    const file = path.resolve(root,'.'+decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!file.startsWith(root+path.sep) || file.split(path.sep).some(p=>p.startsWith('.'))) { res.writeHead(403); res.end(); return; }
    const buffer = await fs.readFile(file);
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});
    res.end(buffer);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(4173,'127.0.0.1',()=>console.log('TALA: http://localhost:4173'));
