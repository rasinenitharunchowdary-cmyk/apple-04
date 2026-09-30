# Apple-04 — React web + React Native

A working frontend recreation of the **Apple-04** page, with a separate native mobile experience. Built from the supplied Figma frame `0:1838` (1440 × 18663.265625). All 100 exported design assets are bundled locally.

[Original Figma](https://www.figma.com/design/bBtwVBCYZLdlvRwUMrkpDI/Apple-UI---Recreated--figmamarket.com-?node-id=0-1838)

## Review immediately

- Web development preview: `http://127.0.0.1:4173`
- React Native browser preview: `http://127.0.0.1:8083`
- Production web files: `web/dist/`
- Expo web export and iOS/Android Hermes bundles: `mobile/dist/`
- Screenshots and validation evidence: `review/`

The URLs work while their local servers are running. The browser mobile preview uses the same React Native screen components; it is useful for review, but is distinct from native-device verification. The iOS app was also run and exercised in Expo Go on an iPhone 16 Pro Max simulator (iOS 18.4).

## Install and run

Use Node.js 22.13 or newer (verified with 22.23), and npm. No environment secrets, backend, account, or Figma token is required to run the application.

```sh
npm ci
npm run dev
```

For the React Native app, open a separate terminal:

```sh
npm run mobile
```

Press `i` for an installed iOS simulator or `a` for an Android emulator. Expo Go must support SDK 57. On this Mac, Metro needed IPv4-first resolution for simulator access:

```sh
NODE_OPTIONS=--dns-result-order=ipv4first npm run mobile
```

Use `npm run mobile:web` for the React Native browser preview. Stop any static preview already using port 8083 before starting Expo on that port.

## Build and validate

```sh
npm run check          # TypeScript for both apps, tests, production web build
npm run audit:page     # Headless-Chrome audit of the built page at 320/390/768/1024/1440
npm run mobile:export  # Expo web, iOS, Android exports
npm run format        # Format maintained source
```

`npm run audit:page` needs `npm run preview` running in another terminal. It drives
Google Chrome over the DevTools protocol, emulating exact viewports (macOS clamps
real windows to ~500 px wide, so small viewports are emulated rather than
measured). It fails on horizontal overflow, broken images, dead in-page anchors,
and any drift between rendered section heights and the Figma frame.

Serve the production web build:

```sh
npm run preview
```

Or use any static HTTP server with `web/dist` as its root. The Vite build uses relative asset paths and supports deployment under a subdirectory. Do not open `index.html` directly through a file URL.

Review the exported React Native web build without Metro:

```sh
python3 -m http.server 8083 --bind 127.0.0.1 --directory mobile/dist
```

`mobile/dist` includes JavaScript/Hermes exports, not an installable APK or IPA. For standalone native projects, run `npx expo prebuild` inside `mobile`, then build through Xcode or Android Studio with the appropriate SDK and signing setup. The submitted source runs through Expo Go without generating those native projects.

## Implemented experience

**Web:** original navigation and chapter bar; offer strip; iPhone 14, Pro, and SE heroes; guided-tour preview; four-model specification comparison; trade-in/carrier/Apple Card savings; accessories; shopping services; iOS and switching sections; Apple services grid; original historical legal text and responsive footer. Responsive layouts cover phones, tablets, and desktops.

**Mobile:** native Discover, Compare, Accessories, and Bag tabs; a scrollable product feed; two-model comparison with a differences-only switch; product search with empty states; native finish/storage configuration sheets; quantity controls; safe areas; and reduced-motion-aware transitions. Native screens are independent components in `mobile/screens`.

**Interactions:** web search and section navigation, responsive menu, keyboard-dismissible dialogs with restored focus, finish/storage choices, bag quantities and removal, calculated totals, web bag persistence, footer disclosures, and official Apple destination links. The native bag is retained for the current app session.

## Structure

```text
assets/              Original Figma image and vector exports
shared/              Product data, bag rules, asset map and dimensions, legal text
web/src/             React page sections, shared UI, responsive CSS
mobile/screens/      Native Discover, Compare, Accessories, Bag, ProductSheet
mobile/components.tsx Reusable native artwork, buttons, links, headings, cards
mobile/styles.ts     Native design styles
mobile/App.tsx       Native navigation and shared app state
tests/              Catalog behavior and asset integrity checks
scripts/audit-page.mjs  Headless-Chrome responsive/Fidelity audit
docs/assets.json    Original asset hashes and byte sizes
netlify.toml        Netlify build and cache-header configuration
.github/workflows/  GitHub Pages build and publish pipeline
review/             QA report, screenshots, build logs, delivery archives
```

## Design and review notes

- The original asset files are used as product artwork and logos. The page is rendered from React components and CSS, not a screenshot.
- Desktop sizes and spacing follow the Figma reference; mobile layouts intentionally adapt its content into a native interface. Typography uses the available Helvetica/system stack, so glyph rendering can vary by operating system.
- Figma supplied a guided-tour still, not a playable video. The tour control opens its preview and links to Apple's video channel; a direct archived film is not bundled.
- Product information and offers reproduce the 2023 design. The review bag is a frontend interaction demo; no orders or payments are processed. Added storage prices are explicitly illustrative, and finish selection retains the supplied reference product photo.
- No third-party telemetry or authentication is included. Apple and Figma assets and trademarks remain the property of their respective owners; this is an independent implementation for the assigned review.

See [review/QA.md](review/QA.md) for executed checks and the remaining device-testing boundaries.

## Deploy the web build

**Live (recommended):** <https://rasinenitharunchowdary-cmyk.github.io/apple-04/>
**Netlify mirror:** <https://a04766320.netlify.app>

GitHub Pages is the primary review URL. `.github/workflows/pages.yml` rebuilds
and publishes `web/dist` on every push to `main`. Vite emits relative asset paths
(`base: "./"`), so the build serves correctly from the repository subdirectory.

The Netlify site carries the same build and is configured by `netlify.toml`
(`npm run build` from the repo root, publishing `web/dist`). Once the repository
is connected to the site in the Netlify dashboard, that configuration drives
automatic deploys.

To publish a prebuilt `web/dist` from the CLI instead, copy only the `[[headers]]`
blocks from `netlify.toml` into a scratch directory next to the built files:

```sh
npm run build
mkdir -p /tmp/apple04 && cp -R web/dist /tmp/apple04/dist
# copy the [[headers]] blocks into /tmp/apple04/netlify.toml
cd /tmp/apple04
npx netlify-cli deploy --prod --dir=dist --site=25dcb4bb-69a2-4798-a009-24954551c4cc
```

Keeping the `[build]` section in scope makes the CLI run `npm run build` in a
directory with no repository, which fails. Omitting it makes the CLI publish the
supplied directory and still apply the cache and security headers. Deploying
from outside the repo root also avoids the CLI's monorepo prompt about
`@apple04/web` and `@apple04/mobile`.

Prefer Pages for review links. The Netlify subdomain is randomly generated, and
Chrome showed one visitor a "Dangerous site" interstitial for it. Google Safe
Browsing reports the domain clean (status 6) and the build serves correctly, so
this looks like a heuristic flag on the throwaway-looking hostname rather than a
real finding — but a security warning on a client-facing link is unacceptable
either way.

The React Native app is not deployable as a web page; use `npm run mobile` or
the exports above.
