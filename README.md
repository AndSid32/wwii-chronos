# WWII CHRONOS 1.2.1 — Multilingual Edition

Primary language: **English** at `/`.

- English: `/`
- Deutsch: `/de/`
- Українська: `/uk/`

Content model per language:
- 252 dated timeline entries (180 pre-existing historical events + 72 precisely dated industrial/technology events).
- 18 additional industry articles with year/month/period-only dating.
- Total editorial materials: **270 per language**.

The approved visual design, timeline interaction, maps and audio behaviour are preserved. Language switching is added as `EN | DE | UA`.

## SEO deployment note
Canonical and `hreflang` links are relative so the static build works before a production domain is known. `sitemap-template.xml` uses `{{SITE_BASE_URL}}`; replace it with the final HTTPS origin at deployment and save as `sitemap.xml`.

## Historical editorial rules
- No precise day is invented when the source supports only a month, year or period.
- Physical measurements use the metric system.
- Historical monetary amounts, if later added, must be accompanied by a clearly described purchasing-power equivalent in 2026 prices.

## 1.2.2 runtime asset deduplication
- EN/DE/UA now share one `assets/site.css` and one language-aware `assets/theme.js`.
- EN/DE/UA now share one `data/participants.js`.
- Historical flag raster assets are stored once in the root `assets/flags/` directory; DE/UA app paths point to the shared files.
- Duplicate localized CSS/theme/participant/flag copies were removed.
- No layout, content, timeline logic, maps, or localized event databases were changed by this optimization.

## 1.3.0 REDESIGN branch
This package is an isolated visual redesign of 1.2.2: rounded geometry, restrained glass surfaces and softer depth, while retaining the vintage-radio/archive concept and existing application behavior. See `REDESIGN-1.3.0.md`.
