import { products, type Product } from "../../shared/catalog";
import { Picture, Link } from "./ui";
export function Comparison({ onBuy }: { onBuy: (p: Product) => void }) {
  return (
    <section className="comparison" id="compare">
      <h2>Which iPhone is right for you?</h2>
      <div className="comparison-grid">
        {products.map((p, i) => (
          <article key={p.id} className="compare-product">
            <div className="compare-intro">
              <Picture name={p.image} alt={p.name} className="compare-phone" />
              <Picture
                name={p.swatches}
                alt={`Available colors: ${p.colors.join(", ")}`}
                className="swatches"
              />
              <span className="new-label">{p.isNew ? "New" : "\u00a0"}</span>
              <h3>
                <Picture name={p.logo} alt={p.name} />
              </h3>
              <p className="tagline">{p.tagline}</p>
              <p>
                From ${p.price}
                {i === 1 || i === 2 ? "*" : ""}
              </p>
              <button
                className="buy small"
                onClick={() => onBuy(p)}
                aria-label={`Buy ${p.name}`}
              >
                Buy
              </button>
              <Link
                href={
                  p.id === "iphone-13"
                    ? "https://www.apple.com/iphone/compare/"
                    : `#${p.id}`
                }
              >
                Learn more
              </Link>
            </div>
            <div className="spec display">
              <strong>{p.display}</strong>
              <p>
                {p.displayType}
                {i < 3 && <sup>3</sup>}
              </p>
              {i === 0 && (
                <>
                  <p>ProMotion technology</p>
                  <p>Always-On display</p>
                </>
              )}
            </div>
            {p.featureIcons.map((icon, row) => (
              <div key={row} className={`spec spec-${row}`}>
                {icon ? (
                  <Picture name={`comparison/${icon}`} className="spec-icon" />
                ) : (
                  <span className="dash">—</span>
                )}
                {row === 0 && i === 0 && (
                  <>
                    <p>Dynamic Island</p>
                    <p>
                      A new way to
                      <br />
                      interact with iPhone
                    </p>
                  </>
                )}
                {row === 1 && (
                  <>
                    {i < 2 && (
                      <p>
                        Emergency SOS via satellite<sup>4</sup>
                      </p>
                    )}
                    <p>Emergency SOS</p>
                    {i < 2 && (
                      <p>
                        Crash Detection<sup>5</sup>
                      </p>
                    )}
                  </>
                )}
                {row === 2 && (
                  <>
                    <p>{p.camera}</p>
                    <p className="muted">
                      {i === 0
                        ? "48MP Main | Ultra Wide | Telephoto"
                        : i === 3
                          ? "12MP Main"
                          : "12MP Main | Ultra Wide"}
                    </p>
                    {i < 2 && (
                      <p className="muted">
                        Photonic Engine for incredible detail and color
                      </p>
                    )}
                    <p className="muted">
                      {i < 2
                        ? "Autofocus on TrueDepth front camera"
                        : i === 2
                          ? "TrueDepth front camera"
                          : "Front camera"}
                    </p>
                  </>
                )}
                {row === 3 && i < 2 && (
                  <p>
                    Action mode smooths out
                    <br />
                    shaky handheld videos
                  </p>
                )}
                {row === 4 && (
                  <p>
                    Up to {p.battery} hours
                    <br />
                    video playback<sup>6</sup>
                  </p>
                )}
                {row === 5 && (
                  <p>
                    {p.chip}
                    {p.gpu && (
                      <>
                        <br />
                        with {p.gpu}
                      </>
                    )}
                  </p>
                )}
                {row === 6 && <p>{p.biometric}</p>}
                {row === 7 && (
                  <p>
                    {i < 3 ? "Superfast " : ""}5G cellular<sup>7</sup>
                  </p>
                )}
              </div>
            ))}
          </article>
        ))}
      </div>
      <div className="comparison-links">
        <Link href="https://www.apple.com/iphone/compare/">
          Compare all iPhone models
        </Link>
        <Link href="#iphone-14">Shop iPhone</Link>
      </div>
    </section>
  );
}
