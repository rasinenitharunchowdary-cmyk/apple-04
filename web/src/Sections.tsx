import { destinations as d } from "../../shared/catalog";
import { Picture, Link, SectionTitle } from "./ui";
export function Savings() {
  return (
    <section className="savings section-pad" id="savings">
      <SectionTitle>Ways to save on iPhone</SectionTitle>
      <article className="tradein card">
        <div className="card-copy">
          <h3>Trade in your current phone for credit toward a new one.</h3>
          <p>
            Get $200–$600 in credit when you trade in iPhone 11 or higher and
            upgrade to iPhone 14 or iPhone 14 Pro.<sup>1</sup>
          </p>
          <Link href={d.tradein}>Learn more</Link>
        </div>
        <Picture
          name="savings/imgFigure"
          alt="An older iPhone exchanged for a new iPhone"
        />
      </article>
      <div className="two-column">
        <article className="carrier card">
          <h3>
            Save up to $800 with select carrier deals at Apple.<sup>8</sup>
          </h3>
          <p>
            Get the carrier deals you love and save on a new iPhone when you
            trade in and purchase right here at Apple.
          </p>
          <Link href={d.carrier}>Find your deal</Link>
          <div className="carrier-logos">
            {["imgH4", "imgH5", "imgH6"].map((name, i) => (
              <div key={name}>
                <Picture
                  name={`savings/${name}`}
                  alt={["AT&T", "T-Mobile", "Verizon"][i]}
                />
                <p>
                  Get up to ${i === 1 ? 400 : 800}
                  <br />
                  credit after trade-in
                </p>
              </div>
            ))}
          </div>
        </article>
        <article className="apple-card card" id="apple-card">
          <h3>Get 3% Daily Cash back with Apple Card.</h3>
          <p>
            And pay for your new iPhone over 24 months, interest-free when you
            choose to check out with Apple Card Monthly Installments.**
          </p>
          <Link href={d.card}>Learn more</Link>
          <Picture
            name="savings/imgFigure1"
            alt="Apple Card and iPhone Wallet"
          />
        </article>
      </div>
      <article className="why-buy card">
        <Picture name="savings/imgDiv" alt="A collection of iPhones" />
        <div className="card-copy">
          <h3>
            Why Apple is the best
            <br />
            place to buy iPhone.
          </h3>
          <p>
            You can choose a payment option that works for you, pay less with a
            trade-in, connect your new iPhone to your carrier, and get set up
            quickly. You can also chat with a Specialist anytime.
          </p>
          <Link href={d.iphone}>Learn more</Link>
        </div>
      </article>
    </section>
  );
}
export function Accessories() {
  return (
    <section className="accessories section-pad" id="accessories">
      <SectionTitle>Featured accessories</SectionTitle>
      <article className="accessory card magsafe">
        <div>
          <h3>MagSafe</h3>
          <p>
            Snap on a magnetic case, wallet, or both. And get faster wireless
            charging.
          </p>
          <Link href={d.magsafe}>Shop MagSafe accessories</Link>
        </div>
        <Picture
          name="accessories/imgFigure"
          alt="MagSafe cases, wallet and charger"
        />
      </article>
      <article className="accessory card airtag" id="airtag">
        <Picture
          name="accessories/imgFigure1"
          alt="AirTag key rings in several colors"
        />
        <div>
          <h3>AirTag</h3>
          <p>
            Attach one to your keys. Put another in your backpack. If they’re
            misplaced, just use the Find My app.
          </p>
          <div className="actions">
            <Link href={d.airtag}>Buy</Link>
            <Link href={d.airtag}>Learn more</Link>
          </div>
        </div>
      </article>
      <article className="airpods card" id="airpods">
        <h3>
          Magic runs
          <br />
          in the family.
        </h3>
        <p>
          Explore all AirPods models and
          <br />
          find the best ones for you.
        </p>
        <Link href={d.airpods}>Learn more</Link>
        <Picture
          name="accessories/imgFigure2"
          alt="AirPods, AirPods Pro and AirPods Max"
        />
      </article>
      <div className="accessory-all">
        <Link href={d.accessories}>Shop all iPhone accessories</Link>
      </div>
    </section>
  );
}
export function Services() {
  return (
    <section className="services" aria-label="Shopping services">
      {[
        {
          icon: "imgFigure",
          title: "Fast, free delivery",
          copy: "Or pick up available items at an Apple Store.",
          href: d.delivery,
        },
        {
          icon: "imgFigure1",
          title: "Pay monthly at 0% APR",
          copy: "You can pay over time when you choose to check out with Apple Card Monthly Installments.**",
          href: d.card,
        },
        {
          icon: "imgFigure2",
          title: "Get help buying",
          copy: "Have a question? Call a Specialist or chat online. Call 1-800-MY-APPLE.",
          href: d.support,
        },
      ].map((s) => (
        <article key={s.title}>
          <Picture name={`services/${s.icon}`} />
          <h3>{s.title}</h3>
          <p>{s.copy}</p>
          <Link href={s.href}>Learn more</Link>
        </article>
      ))}
    </section>
  );
}
export function WhyIphone() {
  return (
    <section className="why-iphone section-pad" id="ios">
      <SectionTitle>What makes an iPhone an iPhone?</SectionTitle>
      <article className="ios-card card">
        <h3>iOS 16</h3>
        <p>Personal is powerful.</p>
        <Link href={d.ios}>Learn more</Link>
        <Picture
          name="why-iphone/imgDiv"
          alt="Personalized iOS 16 Lock Screens"
        />
      </article>
      <article className="switch-card card">
        <h3>
          Switching to iPhone
          <br />
          is super simple.
        </h3>
        <Link href={d.switch}>Learn more</Link>
        <Picture name="why-iphone/imgFigure" alt="A lineup of iPhone models" />
      </article>
    </section>
  );
}
export function Ecosystem() {
  return (
    <section className="ecosystem section-pad" id="entertainment">
      <SectionTitle>Get more out of your iPhone.</SectionTitle>
      <article className="one-card card">
        <Picture name="ecosystem/imgFigure" alt="Six Apple services" />
        <div>
          <Picture name="ecosystem/imgH2" alt="Apple One" />
          <p>
            Bundle up to six Apple services.
            <br />
            And enjoy more for less.
          </p>
          <div className="actions">
            <Link href={d.one}>
              Try it free<sup>9</sup>
            </Link>
            <Link href={d.one}>Learn more</Link>
          </div>
        </div>
      </article>
      <div className="two-column ecosystem-grid">
        <article className="tv-card service-card card">
          <Picture
            name="ecosystem/imgH3"
            alt="Apple TV+"
            className="service-logo"
          />
          <p>
            Get 3 months of Apple TV+ free
            <br />
            when you buy an iPhone.<sup>10</sup>
          </p>
          <div className="actions">
            <Link href={d.tv}>Try it free</Link>
            <Link href={d.tv}>Learn more</Link>
          </div>
          <div className="tv-posters">
            {Array.from({ length: 7 }, (_, i) => (
              <a
                href={d.tv}
                target="_blank"
                rel="noreferrer"
                key={i}
                aria-label={`Stream Apple TV+ feature ${i + 1}`}
              >
                <Picture
                  name={`ecosystem/imgLi${i || ""}`}
                  alt="Apple TV+ original"
                />
                <span>Stream now ↗</span>
              </a>
            ))}
          </div>
        </article>
        <article className="music-card service-card card">
          <Picture
            name="ecosystem/imgAppleMusicLogo"
            alt="Apple Music"
            className="service-logo"
          />
          <p>
            Over 100 million songs.
            <br />
            Start listening for free today.
          </p>
          <div className="actions">
            <Link href={d.music}>
              Try it free<sup>11</sup>
            </Link>
            <Link href={d.music}>Learn more</Link>
          </div>
          <div className="music-art">
            {[
              "imgMusicAlbumLeftErm7O9E8F9MeLargeJpg",
              "imgMusicAlbumMiddleEo1Xuly5GmqaLargeJpg",
              "imgMusicAlbumRightCtoplsymatsiLargeJpg",
            ].map((name) => (
              <Picture
                key={name}
                name={`ecosystem/${name}`}
                alt="Apple Music playlist artwork"
              />
            ))}
          </div>
        </article>
        <article className="news-card service-card card">
          <Picture
            name="ecosystem/imgDiv"
            alt="Apple News+ magazines"
            className="news-art"
          />
          <div className="foreground">
            <Picture
              name="ecosystem/imgDiv1"
              alt="Apple News+"
              className="service-logo"
            />
            <p>
              Get 3 months of Apple News+ free
              <br />
              when you buy an iPhone.<sup>12</sup>
            </p>
            <Link href={d.news}>Learn more</Link>
          </div>
        </article>
        <article className="arcade-card service-card card">
          <Picture
            name="ecosystem/imgDiv3"
            alt="Apple Arcade"
            className="service-logo"
          />
          <p>
            Get 3 months of Apple Arcade free
            <br />
            when you buy an iPhone.
          </p>
          <div className="actions">
            <Link href={d.arcade}>
              Try it free<sup>13</sup>
            </Link>
            <Link href={d.arcade}>Learn more</Link>
          </div>
          <Picture
            name="ecosystem/imgDiv2"
            alt="Apple Arcade icon"
            className="arcade-art"
          />
        </article>
        <article className="fitness-card service-card card">
          <Picture
            name="ecosystem/imgDiv4"
            alt="Apple Fitness+"
            className="service-logo"
          />
          <p>
            Fitness for everyone.
            <br />
            Now all you need is iPhone.
          </p>
          <div className="actions">
            <Link href={d.fitness}>Learn more</Link>
            <Link href={d.fitness}>
              Try it free<sup>14</sup>
            </Link>
          </div>
          <Picture
            name="ecosystem/imgFigure1"
            alt="Fitness+ workout on iPhone"
            className="fitness-art"
          />
        </article>
        <article className="gift-card service-card card">
          <Picture
            name="ecosystem/imgDiv5"
            alt="Apple Gift Card"
            className="service-logo"
          />
          <p>
            For everything
            <br />
            and everyone.
          </p>
          <div className="actions">
            <Link href={d.gift}>Learn more</Link>
            <Link href={d.gift}>Buy</Link>
          </div>
          <Picture
            name="ecosystem/imgFigure2"
            alt="Colorful Apple Gift Cards"
            className="gift-art"
          />
        </article>
      </div>
      <article className="research-card card">
        <div>
          <h3>
            Introducing
            <br />
            the Apple
            <br />
            Research app.
          </h3>
          <p>The future of health research is you.</p>
          <Link href={d.research}>Learn more</Link>
        </div>
        <Picture name="ecosystem/imgFigure3" alt="Apple Research app screens" />
      </article>
    </section>
  );
}
