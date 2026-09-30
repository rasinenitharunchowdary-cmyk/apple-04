import { useEffect, useMemo, useState } from "react";
import {
  products,
  type Product,
  type BagItem,
  type ProductId,
  addToBag,
  bagKey,
  colorHex,
  configuredPrice,
  destinations as d,
  money,
  reviewNotice,
  storageOptions,
} from "../../shared/catalog";
import { assets } from "../../shared/assets";
import footer from "../../shared/footer.json";
import { Picture, Link, Modal } from "./ui";
import { Comparison } from "./Comparison";
import {
  Savings,
  Accessories,
  Services,
  WhyIphone,
  Ecosystem,
} from "./Sections";
const navNames = [
  "Store",
  "Mac",
  "iPad",
  "iPhone",
  "Watch",
  "AirPods",
  "TV & Home",
  "Entertainment",
  "Accessories",
  "Support",
];
const navHrefs = [
  d.store,
  "https://www.apple.com/mac/",
  "https://www.apple.com/ipad/",
  "#iphone-14",
  "https://www.apple.com/watch/",
  "#airpods",
  "https://www.apple.com/tv-home/",
  "#entertainment",
  "#accessories",
  d.support,
];
const chapterNames = [
  "iPhone 14 Pro",
  "iPhone 14",
  "iPhone 13",
  "iPhone SE",
  "iPhone 12",
  "Compare",
  "AirPods",
  "AirTag",
  "Accessories",
  "Apple Card",
  "iOS 16",
  "Shop iPhone",
];
const chapterHrefs = [
  "#iphone-14-pro",
  "#iphone-14",
  "#compare",
  "#iphone-se",
  "https://www.apple.com/iphone/compare/",
  "#compare",
  "#airpods",
  "#airtag",
  "#accessories",
  "#apple-card",
  "#ios",
  "#iphone-14",
];
const chapterAssets = Object.keys(assets).filter((a) =>
  a.startsWith("chapter-nav/"),
);
/** Destinations offered by the global search dialog. */
const searchTargets: { name: string; href: string }[] = [
  ...products.map((p) => ({ name: p.name, href: "#compare" })),
  { name: "Featured accessories", href: "#accessories" },
  { name: "AirPods", href: "#airpods" },
  { name: "AirTag", href: "#airtag" },
  { name: "Ways to save on iPhone", href: "#savings" },
  { name: "iOS 16", href: "#ios" },
];
function Header({
  count,
  onBag,
  onSearch,
}: {
  count: number;
  onBag: () => void;
  onSearch: () => void;
}) {
  const [menu, setMenu] = useState(false);
  return (
    <header>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav className="global-nav" aria-label="Global">
        <a href="#main" aria-label="Apple home">
          <Picture name="global-nav/imgFrame" priority />
        </a>
        <div className={menu ? "nav-links expanded" : "nav-links"}>
          {navNames.map((n, i) => (
            <a
              href={navHrefs[i]}
              key={n}
              onClick={() => setMenu(false)}
              aria-label={n}
            >
              <Picture name={`global-nav/imgFrame${i + 1}`} priority />
              <span>{n}</span>
            </a>
          ))}
        </div>
        <button aria-label="Search" onClick={onSearch}>
          <Picture name="global-nav/imgFrame11" priority />
        </button>
        <button aria-label={`Shopping bag, ${count} items`} onClick={onBag}>
          <Picture name="global-nav/imgFrame12" priority />
          {count > 0 && <span className="bag-count">{count}</span>}
        </button>
        <button
          className="menu-toggle"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? "×" : "☰"}
        </button>
      </nav>
      <nav className="chapter-nav" aria-label="Explore iPhone">
        {chapterNames.map((name, i) => (
          <a href={chapterHrefs[i]} key={name}>
            <span className="chapter-icon">
              <Picture name={chapterAssets[i]} priority />
            </span>
            <span>{name}</span>
            {i < 2 && <small>New</small>}
          </a>
        ))}
      </nav>
    </header>
  );
}
function Footer() {
  const cols = [[0, 1], [2, 3], [4], [5, 6, 7, 8], [9, 10]];
  return (
    <footer className="footer" id="footnotes">
      <div className="footer-inner">
        <aside className="review-notice">{reviewNotice}</aside>
        <div className="legal">
          {footer.legal.map((p, i) => (
            <p key={p.id} id={`note-${i}`}>
              {p.text}
            </p>
          ))}
        </div>
        <div className="breadcrumb">
          <Picture name="footer/imgApple2" alt="Apple" />
          <Picture name="footer/imgSeperator1" />
          <span>iPhone</span>
        </div>
        <div className="footer-columns">
          {cols.map((column, i) => (
            <div key={i}>
              {column.map((j) => (
                <details key={j} open>
                  <summary>{footer.columns[j].title}</summary>
                  <ul>
                    {footer.columns[j].items.map((item) => (
                      <li key={item}>
                        <a
                          href={footerDestination(item)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          ))}
        </div>
        <p className="more-shop">
          More ways to shop:{" "}
          <a href="https://www.apple.com/retail/">Find an Apple Store</a> or{" "}
          <a href="https://locate.apple.com/">other retailer</a> near you. Or
          call <a href="tel:18006927753">1-800-MY-APPLE</a>.
        </p>
        <div className="footer-bottom">
          <span>Copyright © 2023 Apple Inc. All rights reserved.</span>
          <div>
            {[
              "Privacy Policy",
              "Terms of Use",
              "Sales and Refunds",
              "Legal",
              "Site Map",
            ].map((t) => (
              <a
                key={t}
                href={footerDestination(t)}
                target="_blank"
                rel="noreferrer"
              >
                {t}
              </a>
            ))}
          </div>
          <span>United States</span>
        </div>
      </div>
    </footer>
  );
}
function footerDestination(name: string) {
  const known: Record<string, string> = {
    "Privacy Policy": "https://www.apple.com/legal/privacy/",
    "Terms of Use":
      "https://www.apple.com/legal/internet-services/terms/site.html",
    "Sales and Refunds": "https://www.apple.com/shop/help/returns_refund",
    Legal: "https://www.apple.com/legal/",
    "Site Map": "https://www.apple.com/sitemap/",
    iPhone: d.iphone,
    "Apple Card": d.card,
    "Apple Trade In": d.tradein,
    AirPods: d.airpods,
    AirTag: d.airtag,
    Accessories: d.accessories,
    "Gift Cards": d.gift,
    "Find a Store": "https://www.apple.com/retail/",
  };
  return (
    known[name] ||
    `https://www.apple.com/us/search/${encodeURIComponent(name)}?src=globalnav`
  );
}
function ProductDialog({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (item: Omit<BagItem, "quantity">) => void;
}) {
  const [color, setColor] = useState(product.colors[0]);
  const [storage, setStorage] = useState(128);
  return (
    <div className="product-dialog">
      <div className="product-preview">
        <Picture
          name={product.image}
          alt={`${product.name} reference product image`}
        />
        <small>Reference product image; finish selection is shown below.</small>
      </div>
      <div>
        <p>{product.tagline}</p>
        <fieldset>
          <legend>
            Finish. <span>{color}</span>
          </legend>
          <div className="color-options">
            {product.colors.map((c) => (
              <button
                key={c}
                aria-label={c}
                aria-pressed={color === c}
                style={{ background: colorHex[c] }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Storage.</legend>
          <div className="storage-options">
            {storageOptions.map((s) => (
              <button
                key={s}
                aria-pressed={storage === s}
                onClick={() => setStorage(s)}
              >
                {s}GB
              </button>
            ))}
          </div>
        </fieldset>
        <p className="configured-price">
          {money(configuredPrice(product, storage))}
        </p>
        <button
          className="buy"
          onClick={() => onAdd({ productId: product.id, color, storage })}
        >
          Add to review bag
        </button>
        <p className="fine-print">
          Storage prices are illustrative for this review. No payment is taken.
        </p>
      </div>
    </div>
  );
}
function loadBag(): BagItem[] {
  try {
    const data = JSON.parse(localStorage.getItem("apple04-bag") || "[]");
    return Array.isArray(data)
      ? data.filter(
          (x: BagItem) =>
            products.some(
              (p) => p.id === x.productId && p.colors.includes(x.color),
            ) &&
            [128, 256, 512].includes(x.storage) &&
            Number.isInteger(x.quantity) &&
            x.quantity > 0 &&
            x.quantity <= 9,
        )
      : [];
  } catch {
    return [];
  }
}
export default function App() {
  const [product, setProduct] = useState<Product | null>(null);
  const [panel, setPanel] = useState<"search" | "bag" | "film" | null>(null);
  const [query, setQuery] = useState("");
  const [bag, setBag] = useState<BagItem[]>(loadBag);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem("apple04-bag", JSON.stringify(bag));
    } catch {
      /* Private browsing may disable storage. */
    }
  }, [bag]);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(t);
  }, [notice]);
  const buy = (id: ProductId) => setProduct(products.find((p) => p.id === id)!);
  const onAdd = (item: Omit<BagItem, "quantity">) => {
    setBag((b) => addToBag(b, item));
    setProduct(null);
    setPanel("bag");
    setNotice("Added to your review bag.");
  };
  const count = bag.reduce((n, x) => n + x.quantity, 0);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q === ""
      ? []
      : searchTargets.filter((t) => t.name.toLowerCase().includes(q));
  }, [query]);
  return (
    <>
      <Header
        count={count}
        onBag={() => setPanel("bag")}
        onSearch={() => setPanel("search")}
      />
      <main id="main">
        <div className="offer">
          Get $200–$600 in credit toward iPhone 14 or iPhone 14 Pro when you
          trade in iPhone 11 or higher.<sup>1</sup>{" "}
          <Link href="#iphone-14">Shop iPhone</Link>
        </div>
        <section className="hero hero-yellow" id="iphone-14">
          <div className="hero-copy">
            <span className="eyebrow">New</span>
            <Picture
              name="heroes/imgFigure"
              alt="iPhone 14"
              className="product-logo"
              priority
            />
            <h1>
              Two great sizes.
              <br />
              Now with a splash of yellow.
            </h1>
            <p>
              From $799 or $33.29/mo. for 24 mo. before trade-in<sup>2</sup>
            </p>
            <div className="actions">
              <button className="buy" onClick={() => buy("iphone-14")}>
                Buy
              </button>
              <Link href="#compare">Learn more</Link>
            </div>
          </div>
          <Picture
            name="heroes/imgFigure1"
            alt="iPhone 14 in Midnight, Starlight, Red, Blue, Purple and Yellow"
            className="hero-image"
            priority
          />
        </section>
        <section className="hero hero-pro" id="iphone-14-pro">
          <div className="hero-copy">
            <Picture
              name="heroes/imgFigure2"
              alt="iPhone 14 Pro"
              className="product-logo"
            />
            <h2>Pro. Beyond.</h2>
            <p>
              From $999 or $41.62/mo. for 24 mo. before trade-in<sup>2</sup>
            </p>
            <div className="actions">
              <button className="buy" onClick={() => buy("iphone-14-pro")}>
                Buy
              </button>
              <Link href="#compare">Learn more</Link>
            </div>
          </div>
          <Picture
            name="heroes/imgFigure3"
            alt="iPhone 14 Pro with Dynamic Island"
            className="hero-image"
          />
        </section>
        <section className="hero-se" id="iphone-se">
          <div className="hero-copy">
            <Picture
              name="heroes/imgFigure4"
              alt="iPhone SE"
              className="product-logo"
            />
            <h2>
              Love the power.
              <br />
              Love the price.
            </h2>
            <p>
              From $429 or $17.87/mo. for 24 mo. before trade-in<sup>2</sup>
            </p>
            <div className="actions">
              <button className="buy" onClick={() => buy("iphone-se")}>
                Buy
              </button>
              <Link href="#compare">Learn more</Link>
            </div>
          </div>
          <Picture name="heroes/imgFigure5" alt="Three iPhone SE models" />
        </section>
        <section className="tour">
          <Picture
            name="tour/imgFigure"
            alt="An Apple specialist presenting iPhone 14 and iPhone 14 Pro"
          />
          <div>
            <p>A Guided Tour of</p>
            <h2>
              iPhone 14 &amp;
              <br />
              iPhone 14 Pro
            </h2>
            <button className="buy light" onClick={() => setPanel("film")}>
              Watch the film
            </button>
          </div>
        </section>
        <Comparison onBuy={setProduct} />
        <Savings />
        <Accessories />
        <Services />
        <WhyIphone />
        <Ecosystem />
      </main>
      <Footer />
      {product && (
        <Modal
          title={`Buy ${product.name}`}
          onClose={() => setProduct(null)}
          wide
        >
          <ProductDialog product={product} onAdd={onAdd} />
        </Modal>
      )}
      {panel === "search" && (
        <Modal title="Search iPhone" onClose={() => setPanel(null)}>
          <label className="search-label" htmlFor="search">
            Find a product or explore a section
          </label>
          <input
            autoFocus
            id="search"
            type="search"
            placeholder="Search iPhone, AirPods, accessories…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="search-results">
            {results.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  onClick={() => {
                    setPanel(null);
                    setQuery("");
                  }}
                >
                  {p.name} <span>↗</span>
                </a>
              </li>
            ))}
          </ul>
          {query.trim() !== "" && results.length === 0 && (
            <p role="status">No results. Try “iPhone” or “accessories”.</p>
          )}
        </Modal>
      )}
      {panel === "bag" && (
        <Modal
          title={count ? `Your review bag (${count})` : "Your bag is empty."}
          onClose={() => setPanel(null)}
        >
          <p className="fine-print">{reviewNotice}</p>
          {bag.map((item) => {
            const p = products.find((p) => p.id === item.productId)!;
            return (
              <article className="bag-item" key={bagKey(item)}>
                <Picture name={p.image} alt={p.name} />
                <div>
                  <h3>{p.name}</h3>
                  <p>
                    {item.color} · {item.storage}GB
                  </p>
                  <label>
                    Quantity{" "}
                    <select
                      aria-label={`Quantity for ${p.name} ${item.color} ${item.storage}GB`}
                      value={item.quantity}
                      onChange={(e) =>
                        setBag((b) =>
                          b.map((x) =>
                            bagKey(x) === bagKey(item)
                              ? { ...x, quantity: Number(e.target.value) }
                              : x,
                          ),
                        )
                      }
                    >
                      {Array.from({ length: 9 }, (_, i) => (
                        <option key={i}>{i + 1}</option>
                      ))}
                    </select>
                  </label>
                  <button
                    className="remove"
                    onClick={() =>
                      setBag((b) => b.filter((x) => bagKey(x) !== bagKey(item)))
                    }
                  >
                    Remove {p.name}
                  </button>
                </div>
                <strong>
                  {money(configuredPrice(p, item.storage) * item.quantity)}
                </strong>
              </article>
            );
          })}
          {count > 0 && (
            <p className="bag-total">
              Total{" "}
              <strong>
                {money(
                  bag.reduce(
                    (sum, x) =>
                      sum +
                      configuredPrice(
                        products.find((p) => p.id === x.productId)!,
                        x.storage,
                      ) *
                        x.quantity,
                    0,
                  ),
                )}
              </strong>
            </p>
          )}
          <button className="buy" onClick={() => setPanel(null)}>
            Continue exploring
          </button>
          {count > 0 && (
            <p className="fine-print">
              This review bag demonstrates the interface. Visit Apple to check
              current availability.
            </p>
          )}
        </Modal>
      )}
      {panel === "film" && (
        <Modal
          title="A Guided Tour of iPhone 14"
          onClose={() => setPanel(null)}
          wide
        >
          <Picture
            name="tour/imgFigure"
            alt="Guided tour preview"
            className="film-preview"
          />
          <p>Explore iPhone 14 and iPhone 14 Pro with an Apple Specialist.</p>
          <p className="fine-print">
            Discover the cameras, displays, and everyday features in Apple’s
            iPhone video collection.
          </p>
          <Link href="https://www.youtube.com/@Apple/search?query=iPhone%2014%20guided%20tour">
            Watch on Apple’s channel
          </Link>
        </Modal>
      )}
      <div
        role="status"
        aria-live="polite"
        className={notice ? "toast visible" : "toast"}
      >
        {notice}
      </div>
    </>
  );
}
