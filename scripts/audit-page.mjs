#!/usr/bin/env node
/**
 * Headless Chrome audit of the built web page at exact Figma viewports.
 *
 * Verifies rendered section heights, container widths, typography, colors and
 * horizontal overflow against the values extracted from the Figma frame
 * (docs/figma-structure.xml, docs/design-context/*).
 *
 * Usage: node scripts/audit-page.mjs [baseUrl]
 * Requires: Google Chrome installed, `npm run preview` already running.
 */
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.argv[2] ?? "http://127.0.0.1:4173/";
const WIDTHS = [320, 390, 768, 1024, 1440];
const HEIGHT = 900;

/** Expected desktop geometry from the Figma frame (1440 x 18663.265625). */
const EXPECT = {
  "iphone-14": 1069,
  "iphone-14-pro": 788,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launch(width) {
  const profile = await mkdtemp(join(tmpdir(), "apple04-audit-"));
  const port = 9500 + Math.floor(width % 500);
  const proc = spawn(
    CHROME,
    [
      "--headless=new",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      `--window-size=${width},${HEIGHT}`,
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "about:blank",
    ],
    { stdio: "ignore" },
  );
  for (let i = 0; i < 60; i += 1) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) return { proc, port, profile };
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  proc.kill();
  throw new Error("Chrome did not expose a debugging port");
}

async function connect(port) {
  const targets = await (
    await fetch(`http://127.0.0.1:${port}/json/list`)
  ).json();
  const page = targets.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error
        ? reject(new Error(JSON.stringify(msg.error)))
        : resolve(msg.result);
    }
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      id += 1;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });

  /** Evaluate an expression in the page and return its JSON value. */
  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
    return r.result.value;
  };

  return { send, evaluate, close: () => ws.close() };
}

/**
 * Resolves once every eagerly-loaded image has either completed or failed.
 * A CDN on a cold edge fetches assets from deploy storage on first request, so
 * an in-flight image must not be reported as broken.
 */
const SETTLE = `new Promise((resolve) => {
  const deadline = Date.now() + 15000;
  const pending = () =>
    [...document.images].filter((i) => i.loading !== "lazy" && !i.complete).length;
  const tick = () => {
    if (pending() === 0 || Date.now() > deadline) resolve(pending());
    else setTimeout(tick, 120);
  };
  if (document.readyState !== "complete") {
    window.addEventListener("load", () => setTimeout(tick, 100), { once: true });
  } else {
    tick();
  }
})`;

const MEASURE = `(() => {
  const px = (v) => Math.round(parseFloat(v) * 100) / 100;
  const short = (src) => (src || "").replace(/^data:[^,]{0,24},/, "data:…").slice(0, 70);
  // Only images that are eagerly loaded / already near the viewport can be judged;
  // lazy images below the fold legitimately report complete === false.
  const brokenImages = [...document.images]
    .filter((i) => i.loading !== "lazy" && (!i.complete || i.naturalWidth === 0))
    .map((i) => short(i.getAttribute("src")));
  const out = {
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    documentHeight: document.documentElement.scrollHeight,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    brokenImages: brokenImages.length > 6 ? brokenImages.slice(0, 6).concat(["+" + (brokenImages.length - 6) + " more"]) : brokenImages,
    sections: [...document.querySelectorAll("section")].map((s) => ({
      id: s.id || null,
      height: px(s.getBoundingClientRect().height),
      background: getComputedStyle(s).backgroundColor,
    })),
    anchorsWithoutTarget: [...new Set(
      [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h.length > 1 && !document.querySelector(h)),
    )],
    // Widest offending elements when the document scrolls horizontally.
    overflowCulprits:
      document.documentElement.scrollWidth > window.innerWidth + 1
        ? [...document.querySelectorAll("body *")]
            .map((el) => {
              const r = el.getBoundingClientRect();
              return { tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 40), right: Math.round(r.right) };
            })
            .filter((x) => x.right > window.innerWidth + 1)
            .slice(0, 8)
        : [],
  };

  const pick = (sel, props) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const o = { width: px(r.width), text: (el.textContent || "").trim().slice(0, 48) };
    for (const p of props) o[p] = cs.getPropertyValue(p);
    return o;
  };

  const type = [
    "font-size",
    "line-height",
    "font-weight",
    "letter-spacing",
    "color",
    "font-family",
  ];
  out.spec = {
    offerStrip: pick(".offer", ["background-color", "font-size", "height"]),
    heroEyebrow: pick("#iphone-14 .eyebrow", type),
    heroHeadline: pick("#iphone-14 h1", type),
    heroSubhead: pick("#iphone-14 .hero-copy > p", type),
    heroPrimaryCta: pick("#iphone-14 .buy", [
      ...type,
      "background-color",
      "border-radius",
      "padding",
    ]),
    heroSecondaryCta: pick("#iphone-14 .text-link", type),
    heroContainer: pick("#iphone-14 .hero-copy", ["max-width", "padding-top"]),
    tourEyebrow: pick(".tour p", type),
    tourHeadline: pick(".tour h2", type),
  };
  out.spec = Object.fromEntries(Object.entries(out.spec).filter(([, v]) => v));
  return out;
})()`;

const results = [];
for (const width of WIDTHS) {
  const { proc, port, profile } = await launch(width);
  try {
    const cdp = await connect(port);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    // macOS clamps real window width to ~500px, so small viewports must be
    // emulated through the protocol or they are silently never tested.
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: HEIGHT,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send("Page.navigate", { url: BASE });
    await cdp.evaluate(SETTLE);
    const data = await cdp.evaluate(MEASURE);
    results.push({ width, ...data });
    cdp.close();
  } finally {
    proc.kill();
    await new Promise((r) => proc.once("exit", r));
    // Chrome flushes profile files on shutdown; cleanup is best-effort.
    await rm(profile, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 200,
    }).catch(() => {});
  }
}

let failures = 0;
for (const r of results) {
  const problems = [];
  if (r.horizontalOverflow) {
    problems.push(
      `horizontal overflow (doc ${r.documentWidth} > vp ${r.viewportWidth})`,
    );
    for (const c of r.overflowCulprits ?? [])
      problems.push(
        `  overflow by <${c.tag} class="${c.cls}"> right=${c.right}`,
      );
  }
  if (r.brokenImages.length)
    problems.push(`broken images: ${r.brokenImages.join(", ")}`);
  if (r.anchorsWithoutTarget.length)
    problems.push(
      `dead anchors: ${[...new Set(r.anchorsWithoutTarget)].join(", ")}`,
    );
  if (r.width === 1440) {
    for (const [id, expected] of Object.entries(EXPECT)) {
      const found = r.sections.find((s) => s.id === id);
      if (!found) problems.push(`missing section #${id}`);
      else if (Math.abs(found.height - expected) > 1) {
        problems.push(`#${id} height ${found.height} != Figma ${expected}`);
      }
    }
  }
  failures += problems.length;
  const status = problems.length ? "FAIL" : "ok";
  console.log(
    `[${status}] ${String(r.width).padStart(4)}px  doc=${r.documentWidth}  page=${r.documentHeight}px  sections=${r.sections.length}`,
  );
  for (const p of problems) console.log(`        ${p}`);
}

const desktop = results.find((r) => r.width === 1440);
console.log("\nTypography sample @1440:");
console.log(JSON.stringify(desktop?.spec, null, 2));
console.log("\nSection heights @1440:");
for (const s of desktop?.sections ?? [])
  console.log(
    `  ${(s.id || "(anon)").padEnd(16)} ${String(s.height).padStart(7)}px  ${s.background}`,
  );

console.log(
  `\n${failures === 0 ? "AUDIT PASSED" : `AUDIT FAILED (${failures})`}`,
);
process.exit(failures === 0 ? 0 : 1);
