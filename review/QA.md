# Apple-04 validation — 30 September 2026

## Executed checks

| Area | Evidence / result |
| --- | --- |
| Web TypeScript | Passed |
| React Native TypeScript | Passed |
| Unused-import checks | Both application projects passed `tsc --noEmit --noUnusedLocals` |
| Behavior and asset tests | 5 tests passed: immutable bag merging, distinct configurations, quantity cap, all 100 original asset hashes, plausible asset dimensions |
| Production web | Vite production build passed |
| Packaged clean install | Unzipped the delivered project to a separate temporary directory; `npm ci` and `npm run check` both passed using a task-local npm cache |
| Mobile exports | Expo compiled web plus iOS and Android Hermes bundles |
| Web responsive widths | 320, 390, 768, 1024, 1440 px emulated via DevTools protocol; no horizontal document overflow with dialogs closed and normal body scrolling |
| Page audit script | `npm run audit:page` drives headless Chrome, emulates exact viewports, and fails on overflow, broken images, dead anchors, or Figma height drift |
| Web assets/anchors | No failed loaded images or missing internal anchor targets in DOM audit |
| Web bag | Yellow iPhone 14 / 256 GB → $899; quantity 2 → $1,798; persistence across reload; remove → empty bag |
| Web search | Filtering and no-results state; Escape closes dialog and restores focus to Search |
| Web navigation | Phone menu expands and closes on section selection; comparison and accessory/service anchors work; footer disclosure toggles |
| Tour | Preview dialog opens and exposes official-channel destination |
| Mobile browser | Discover, Compare, Accessories, Bag; search empty state; differences filter; configuration sheet; add, quantity, remove, empty bag |
| Small mobile layout | 320 × 700 product sheet and bag visually reviewed; 390 × 844 Discover and Compare reviewed |
| Native iOS | Expo Go SDK 57, iPhone 16 Pro Max, iOS 18.4: launch, native artwork, safe areas, product sheet, Yellow/256 GB selection, add, quantity 2 / $1,798, Compare navigation and differences-only filter |

Screenshots in `screenshots/` distinguish `web-*`, `mobile-*` (React Native web), and `ios-*` (native simulator). `responsive.json` contains measured web section heights. The Figma reference is retained in `docs/figma-apple-04.png` for visual review.

## Corrections made during review

- Corrected dimensions for exported raster files whose bytes were JPEG despite their PNG extension, preventing distorted product logos and image spacing.
- Aligned major desktop section heights with the source frame.
- Fixed Escape behavior in the search field and focus restoration under React Strict Mode.
- Replaced the iPhone 13 comparison self-link with the official comparison destination.
- Used a JavaScript animation driver only for React Native web; native platforms retain the native driver.
- Split native screens into modules and formatted the source.
- Resolved the simulator's IPv4/IPv6 localhost mismatch without opening Metro to the local network.
- Replaced the duplicated search-entry list in `App.tsx` with one module-level
  `searchTargets` array plus a memoized result filter; the empty-state check had
  duplicated the entry names and matched the query in the opposite direction from
  the filter.
- Added `scripts/audit-page.mjs`. The earlier responsive evidence used Chrome's
  `--window-size`, which macOS clamps to ~500 px, so 320 and 390 px were never
  genuinely measured; the audit now emulates those viewports over the DevTools
  protocol. Both widths still report no overflow.

## Boundaries

- Native iOS simulator evidence is available. Android was compiled/exported; an Android emulator and physical iOS/Android devices were not exercised.
- No signed APK/IPA or store release is claimed. The deliverables are the working Expo project, compiled platform bundles, and static web builds.
- Visual checks were performed in Chromium previews and the iOS simulator. Safari/Firefox, screen-reader traversal, dynamic text at every accessibility size, and exhaustive cross-device regression remain additional review work.
- Layout dimensions and original artwork were checked, but no automated pixel-diff score against Figma is claimed. Operating-system font rendering can vary.
- External Apple services open their official destinations. No live shopping, payment, carrier, or subscription integration is implemented in this frontend assignment.
