# WWII CHRONOS — SEO-002 change log

Source: user-supplied git archive, GA4 ID preserved.
Production origin: https://ww2.recallecho.com

## Surgical changes

- Excluded nested duplicate source tree from Cloudflare assets via `.assetsignore`. Original tracked files preserved for safety.
- Removed conflicting canonical and false hreflang tags on 13 noindex redirect pages; existing meta refresh destination preserved.
- Added standard Open Graph title, URL, description (where available) and Twitter summary card metadata to the indexable pages without changing visible content.
- Filled missing description only if existing visible historical text supports it.

Counts: {'og_metadata_added': 876, 'twitter_card_added': 876, 'missing_description_filled': 12, 'redirect_conflicting_canonical_removed': 13, 'redirect_invalid_hreflang_removed': 52}

## Deliberately untouched

- Existing titles, historical descriptions, facts, interactive timeline app, translations, CSS and JS, GA4 measurement ID.
- Sitemap (already accepted in Search Console, 876 URLs), robots.txt, valid canonical and hreflang of regular pages.

## Before declaring PASS

1. Check Cloudflare build is successful.
2. Check production nested source URL returns 404; if not, exclude via a separate public output directory.
3. Verify at least one event URL in each language and open it in Safari.
4. Use Search Console to monitor coverage/duplicate canonical status over time.

No ranking position is guaranteed by metadata changes.
