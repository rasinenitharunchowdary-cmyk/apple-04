import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import ts from "typescript";
const source = fs.readFileSync(
  new URL("../shared/catalog.ts", import.meta.url),
  "utf8",
);
const js = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const { products, addToBag, bagKey, configuredPrice } = await import(
  "data:text/javascript;base64," + Buffer.from(js).toString("base64")
);
test("adding the same configuration increases quantity without mutating existing bag", () => {
  const item = { productId: "iphone-14", color: "Yellow", storage: 256 };
  const old = addToBag([], item);
  const next = addToBag(old, item);
  assert.equal(old[0].quantity, 1);
  assert.equal(next.length, 1);
  assert.equal(next[0].quantity, 2);
  assert.equal(configuredPrice(products[1], 256) * next[0].quantity, 1798);
});
test("different finishes and storage remain separate configurations", () => {
  const base = { productId: "iphone-14", color: "Yellow", storage: 128 };
  let bag = addToBag([], base);
  bag = addToBag(bag, { ...base, color: "Blue" });
  bag = addToBag(bag, { ...base, storage: 256 });
  assert.equal(new Set(bag.map(bagKey)).size, 3);
});
test("quantity limit survives repeated additions", () => {
  let bag = [];
  for (let i = 0; i < 20; i++)
    bag = addToBag(bag, {
      productId: "iphone-se",
      color: "Midnight",
      storage: 128,
    });
  assert.equal(bag[0].quantity, 9);
});
test("every exported original asset is nonempty and hash-identical to the download", () => {
  const assets = JSON.parse(
    fs.readFileSync(new URL("../docs/assets.json", import.meta.url)),
  );
  assert.equal(assets.length, 100);
  for (const asset of assets) {
    const bytes = fs.readFileSync(
      new URL("../assets/" + asset.file, import.meta.url),
    );
    assert.equal(bytes.length, asset.bytes);
    assert.equal(
      crypto.createHash("sha256").update(bytes).digest("hex"),
      asset.sha256,
      asset.file,
    );
  }
});
test("image dimensions are plausible and include the exact Figma hero wordmark", () => {
  const dims = JSON.parse(
    fs.readFileSync(new URL("../shared/dimensions.json", import.meta.url)),
  );
  assert.deepEqual(dims["heroes-imgFigure.png"], { width: 100, height: 21 });
  for (const [name, size] of Object.entries(dims)) {
    assert.ok(size.width > 0 && size.width < 5000, name);
    assert.ok(size.height > 0 && size.height < 5000, name);
  }
});
