// Vérifie que les URLs des front-matters et du corps des fiches répondent (sans dépendance).
// Usage : node scripts/check-links.mjs   (code de sortie 1 si un lien est mort)
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['src/content/fiches', 'src/content/courriers'];
const urls = new Map();
for (const dir of roots) {
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
    const text = readFileSync(join(dir, f), 'utf8');
    for (const m of text.matchAll(/https?:\/\/[^\s)"'<>]+/g)) {
      const u = m[0].replace(/[.,;]+$/, '');
      urls.set(u, [...(urls.get(u) ?? []), join(dir, f)]);
    }
  }
}

let failed = 0;
for (const [url, files] of urls) {
  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) });
    if (res.status === 405 || res.status === 403) res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
    // 403 : certains sites (Légifrance) bloquent les robots → avertissement seulement.
    if (res.status === 403) console.warn(`WARN ${res.status} ${url}`);
    else if (!res.ok) { failed++; console.error(`FAIL ${res.status} ${url} (${files.join(', ')})`); }
    else console.log(`ok   ${res.status} ${url}`);
  } catch (e) {
    failed++; console.error(`FAIL ${e.message} ${url} (${files.join(', ')})`);
  }
}
process.exit(failed ? 1 : 0);
