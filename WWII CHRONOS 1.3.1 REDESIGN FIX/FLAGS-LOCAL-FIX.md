# FLAGS-LOCAL-FIX — WWII CHRONOS 1.3.1

Five previously external flags are now standalone local SVG files under `assets/flags/`: `de.svg`, `su.svg`, `it.svg`, `ca.svg`, `au.svg`. All three runtime-language flag mappings (`assets/app.js`, `uk/assets/app.js`, `de/assets/app.js`) and all three metadata JSON files now refer to local SVGs. Existing WebP flag assets and all historical narratives remain untouched.

**Historical fidelity:** these are hand-constructed SVG interpretations, **not verified byte-identical archival SVG files**. For complex heraldic devices, especially Canada's 1921 Red Ensign and Italy's Savoy shield, a detailed external historical comparison remains necessary. France's WWII factional ambiguity and the distinction between the Kingdom of Italy and the Italian Social Republic remain unchanged. No browser/Safari visual QA was possible here.

Checks: XML well-formedness; all 17 flag references resolve to packaged files in every language; JSON and JavaScript syntax checks.
