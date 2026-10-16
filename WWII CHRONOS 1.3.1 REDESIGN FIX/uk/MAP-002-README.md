# MAP-002 — WWII CHRONOS 1.0.6

Base: 1.0.5. Region-only changes: ten SVG viewBox attributes to enlarge displayed geography. No path geometry, JS, CSS, content, chronology or world.svg changes. No verified point marker coordinates added. More expansive views retained for ocean-wide regions.

## Region viewBox changes

| Region | Old | New | Scale |
|---|---|---|---|
| north-africa | `420 155 190 112` | `462.222 179.889 105.556 62.222` | 1.8× |
| americas | `70 60 290 290` | `129.706 119.706 170.588 170.588` | 1.7× |
| pacific | `0 55 360 270` | `55.862 96.897 248.276 186.207` | 1.45× |
| atlantic | `215 90 340 255` | `267.759 129.569 234.483 175.862` | 1.45× |
| hawaii | `0 80 355 210` | `78.889 126.667 197.222 116.667` | 1.8× |
| europe | `415 75 190 135` | `458.649 106.014 102.703 72.973` | 1.85× |
| asia | `515 75 255 185` | `560.242 107.823 164.516 119.355` | 1.55× |
| east-europe | `470 65 185 145` | `511.111 97.222 102.778 80.556` | 1.8× |
| mediterranean | `425 120 172 115` | `461.857 144.643 98.286 65.714` | 1.75× |
| britain | `425 93 60 65` | `438.333 107.444 33.333 36.111` | 1.8× |

## Verification
- ZIP integrity: verified after packaging.
- SVGs parse as XML.
- All other files byte-identical to version 1.0.5 (excluding root folder rename).
- Live visual behavior in Safari not verified.
