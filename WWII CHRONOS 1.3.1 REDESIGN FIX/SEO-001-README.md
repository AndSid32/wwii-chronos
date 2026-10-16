# WWII CHRONOS — SEO-001 release

Production URL: https://ww2.recallecho.com

## Included
- `.assetsignore`: prevent Git, Wrangler caches, development files and docs from public static asset uploads.
- `wrangler.jsonc`: deterministic Workers Static Assets deployment, same Worker name and root HTML tree.
- `robots.txt`: allow indexing; point to production `sitemap.xml`.
- `sitemap.xml`: generated from all existing HTML files with absolute URLs.
- HTML: absolute canonical, verified locale alternates, conservative WebPage JSON-LD, optional centrally managed GA4 loading. Main body preserved verbatim.
- GA4 is **not activated**: create a separate web stream for this domain and insert its `G-...` measurement ID in `assets/analytics-config.js`.

## Terminal deployment (inside existing checked-out repo)
Do not replace `.git` or erase the existing project. Copy the CONTENTS of this release directory into the existing repo directory, overwriting same-named site files. Then run:

```sh
cd "$HOME/Downloads/WWII CHRONOS 1.3.1 REDESIGN FIX 2"
git status --short
git add -A
git commit -m "SEO-001: safe static assets, sitemap and multilingual metadata"
git push origin main
```

The connected Cloudflare Worker should auto-deploy from main. If build settings still auto-run `npx wrangler deploy`, it will use wrangler.jsonc. Confirm `ww2.recallecho.com` and both /robots.txt and /sitemap.xml after deploy.

## Google Search Console
1. In https://search.google.com/search-console use URL-prefix property `https://ww2.recallecho.com/` (or existing Domain property `recallecho.com`).
2. Verify ownership using a supported method (Cloudflare DNS TXT, HTML file or existing domain ownership). Do not claim verification is complete until Google confirms.
3. Submit `https://ww2.recallecho.com/sitemap.xml` in Sitemaps and monitor indexing.

## QA still required after production deploy
- Check that `/.git/config` and `/.wrangler/` cannot be fetched (HTTP 404), and that old cached copies are purged if still accessible.
- Check response status of top-level `/`, `/de/`, `/uk/`, sitemap, robots and multiple event URLs.
- Inspect Search Console URL inspection and hreflang once crawled; validate GA4 Realtime after inserting a real Measurement ID.
- No live browser/mobile or production HTTP checks conducted as part of this static build.
