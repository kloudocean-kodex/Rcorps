import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist');
const documents = new Map();
const files = [];
const failures = [];
let references = 0;
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else {
      files.push(full);
      if (entry.name.endsWith('.html') && !entry.name.startsWith('__')) documents.set(full, await fs.readFile(full, 'utf8'));
    }
  }
}
await walk(root);
for (const [full, html] of documents) {
  const route = '/' + path.relative(root, full).replaceAll('\\', '/').replace(/index\.html$/, '');
  if ((html.match(/<h1[ >]/g) || []).length !== 1) failures.push(`${route}: H1 count`);
  if (!html.includes('noindex,nofollow')) failures.push(`${route}: preview indexing`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, 'https://preview.invalid' + route);
    const resolved = path.join(root, decodeURIComponent(url.pathname));
    const target = url.pathname.endsWith('/') ? path.join(resolved, 'index.html') : resolved;
    references++;
    try { await fs.access(target); }
    catch { failures.push(`${route}: missing ${href}`); continue; }
    if (url.hash && documents.has(target) && !documents.get(target).includes(`id="${url.hash.slice(1)}"`)) failures.push(`${route}: missing anchor ${href}`);
  }
  if (/cropsservices|1000\+|Customer Monitoring Centres|Lorem ipsum/.test(html)) failures.push(`${route}: prohibited copy`);
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) await checkAsset(candidate.trim().split(/\s+/)[0], route);
  }
}
async function checkAsset(reference, source) {
  if (!reference.startsWith('/')) return;
  references++;
  try { await fs.access(path.join(root, reference)); }
  catch { failures.push(`${source}: missing asset ${reference}`); }
}
for (const full of files) {
  const relative = path.relative(root, full).replaceAll('\\', '/');
  if (/(^|\/)(?:__|\.env|audit|node_modules|scripts|content)|\.(?:pdf|zip|jpg|jpeg|map)$/i.test(relative)) failures.push(`Unexpected published file: ${relative}`);
  if (full.endsWith('.css')) {
    const css = await fs.readFile(full, 'utf8');
    for (const match of css.matchAll(/url\([\s"']*([^\s)"']+)/g)) await checkAsset(match[1], relative);
  }
}
assert.equal(documents.size, 14, 'Expected 13 routes and custom 404');
assert.match(await fs.readFile(path.join(root, '_headers'), 'utf8'), /X-Robots-Tag: noindex, nofollow/);
assert.equal(failures.length, 0, failures.join('\n'));
console.log(JSON.stringify({ htmlDocuments: documents.size, localReferences: references, brokenReferences: 0, previewIndexing: 'noindex on all', unsupportedCopyScan: 'pass' }, null, 2));
