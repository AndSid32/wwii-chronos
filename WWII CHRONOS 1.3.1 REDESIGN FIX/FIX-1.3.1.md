# WWII CHRONOS 1.3.1 REDESIGN FIX

## BUG-LANG-001

Fixed local `file://` language switching.

EN / DE / UA controls now point to explicit `index.html` files rather than directory paths. This prevents macOS/Finder from opening a folder when the site is tested locally.

No design, content, data, maps, or timeline behavior was changed.
