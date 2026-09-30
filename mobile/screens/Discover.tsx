import { ScrollView, Text, View } from "react-native";
import {
  products,
  type Product,
  destinations as d,
  money,
} from "../../shared/catalog";
import { Art, Button, ExternalLink, Heading, Promo, s } from "../components";
import { styles } from "../styles";
function ProductTile({
  product,
  onBuy,
  onCompare,
}: {
  product: Product;
  onBuy: () => void;
  onCompare: () => void;
}) {
  return (
    <View style={styles.productTile}>
      <Art name={product.image} label={product.name} height={195} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productTag}>{product.tagline}</Text>
      <Art name={product.swatches} height={14} />
      <Text style={styles.tilePrice}>From {money(product.price)}</Text>
      <View style={s.row}>
        <Button
          label="Buy"
          accessibilityLabel={`Buy ${product.name}`}
          onPress={onBuy}
        />
        <Button label="Compare" secondary onPress={onCompare} />
      </View>
    </View>
  );
}
export function Discover({
  buy,
  compare,
  query,
}: {
  buy: (p: Product) => void;
  compare: () => void;
  query: string;
}) {
  if (query)
    return (
      <>
        <Heading>Search results</Heading>
        {products
          .filter((p) =>
            (p.name + " " + p.tagline)
              .toLowerCase()
              .includes(query.toLowerCase()),
          )
          .map((p) => (
            <ProductTile
              key={p.id}
              product={p}
              onBuy={() => buy(p)}
              onCompare={compare}
            />
          ))}
        {!products.some((p) =>
          (p.name + " " + p.tagline)
            .toLowerCase()
            .includes(query.toLowerCase()),
        ) && (
          <View style={s.card}>
            <Text>No products found. Try “iPhone 14” or “SE”.</Text>
          </View>
        )}
      </>
    );
  return (
    <>
      <Heading kicker="Made for your everyday">Meet your next iPhone.</Heading>
      <View style={styles.yellowHero}>
        <Text style={styles.new}>New</Text>
        <Text style={styles.heroLabel}>iPhone 14</Text>
        <Text style={styles.heroTitle}>
          Two great sizes.{"\n"}A splash of yellow.
        </Text>
        <Text style={styles.productTag}>
          From $799 or $33.29/mo. for 24 mo.
        </Text>
        <View style={[s.row, { marginVertical: 20 }]}>
          <Button label="Buy iPhone 14" onPress={() => buy(products[1])} />
          <Button label="Compare" secondary onPress={compare} />
        </View>
        <Art
          name="heroes/imgFigure1"
          label="iPhone 14 color lineup"
          height={220}
        />
      </View>
      <View style={[styles.yellowHero, { backgroundColor: "#000" }]}>
        <Text style={[styles.heroLabel, { color: "#f5f5f7" }]}>
          iPhone 14 Pro
        </Text>
        <Text style={[styles.heroTitle, { color: "#fff" }]}>Pro. Beyond.</Text>
        <Text style={[styles.productTag, { color: "#bbb" }]}>
          From $999 or $41.62/mo. for 24 mo.
        </Text>
        <View style={[s.row, { marginVertical: 20 }]}>
          <Button label="Buy iPhone 14 Pro" onPress={() => buy(products[0])} />
        </View>
        <Art name="heroes/imgFigure3" label="iPhone 14 Pro" height={185} />
      </View>
      <View style={styles.yellowHero}>
        <Text style={styles.heroLabel}>iPhone SE</Text>
        <Text style={[styles.heroTitle, { color: "#2948b1" }]}>
          Love the power.{"\n"}Love the price.
        </Text>
        <Text style={styles.productTag}>
          From $429 or $17.87/mo. for 24 mo.
        </Text>
        <View style={[s.row, { marginVertical: 20 }]}>
          <Button label="Buy iPhone SE" onPress={() => buy(products[3])} />
        </View>
        <Art name="heroes/imgFigure5" label="iPhone SE" height={310} />
      </View>
      <View style={s.card}>
        <Art name="tour/imgFigure" label="iPhone guided tour" height={190} />
        <Text style={[styles.productName, { marginTop: 18 }]}>
          A Guided Tour of iPhone 14 & iPhone 14 Pro
        </Text>
        <ExternalLink
          label="Watch on Apple’s channel"
          url="https://www.youtube.com/@Apple/search?query=iPhone%2014%20guided%20tour"
        />
      </View>
      <Heading kicker="Find your fit">Which iPhone is right for you?</Heading>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {products.map((p) => (
          <View key={p.id} style={{ width: 300 }}>
            <ProductTile product={p} onBuy={() => buy(p)} onCompare={compare} />
          </View>
        ))}
      </ScrollView>
      <Heading>Ways to save.</Heading>
      <Promo
        title="Trade in. Move up."
        copy="Get $200–$600 in credit when you trade in iPhone 11 or higher and upgrade to iPhone 14 or iPhone 14 Pro."
        asset="savings/imgFigure"
        href={d.tradein}
      />
      <View style={s.card}>
        <Text style={s.promoTitle}>
          Save up to $800 with select carrier deals.
        </Text>
        <Text style={s.copy}>
          Get the carrier deals you love and save on a new iPhone when you trade
          in and purchase at Apple.
        </Text>
        <View style={[s.row, { flexWrap: "wrap", marginTop: 25 }]}>
          {["imgH4", "imgH5", "imgH6"].map((a, i) => (
            <View key={a} style={{ width: 130 }}>
              <Art
                name={`savings/${a}`}
                label={["AT&T", "T-Mobile", "Verizon"][i]}
                height={60}
              />
              <Text style={[s.fine, { textAlign: "center" }]}>
                Up to ${i === 1 ? 400 : 800} credit
              </Text>
            </View>
          ))}
        </View>
        <ExternalLink label="Find your deal" url={d.carrier} />
      </View>
      <Promo
        title="Get 3% Daily Cash back."
        copy="Pay for your new iPhone over 24 months, interest-free with Apple Card Monthly Installments."
        asset="savings/imgFigure1"
        href={d.card}
      />
      <Promo
        title="Why Apple is the best place to buy iPhone."
        copy="Choose your payment option, trade in, connect to your carrier, and get help from a Specialist."
        asset="savings/imgDiv"
        href={d.iphone}
      />
      <Heading>More iPhone. More you.</Heading>
      <Promo
        title="iOS 16"
        copy="Personal is powerful."
        asset="why-iphone/imgDiv"
        href={d.ios}
      />
      <Promo
        title="Switching to iPhone is super simple."
        copy="Make the move. Bring the things you love."
        asset="why-iphone/imgFigure"
        href={d.switch}
      />
      <Heading>Get more out of your iPhone.</Heading>
      <Promo
        title="Apple One"
        copy="Bundle up to six Apple services. And enjoy more for less."
        asset="ecosystem/imgFigure"
        href={d.one}
        action="Try it free"
      />
      <Promo
        title="Apple TV+"
        copy="Get 3 months of Apple TV+ free when you buy an iPhone."
        asset="ecosystem/imgLi1"
        href={d.tv}
        dark
        action="Explore Apple TV+"
      />
      <Promo
        title="Apple Music"
        copy="Over 100 million songs. Start listening for free today."
        asset="ecosystem/imgMusicAlbumMiddleEo1Xuly5GmqaLargeJpg"
        href={d.music}
        action="Try it free"
      />
      <Promo
        title="Apple News+"
        copy="Get 3 months free when you buy an iPhone."
        asset="ecosystem/imgDiv"
        href={d.news}
      />
      <Promo
        title="Apple Arcade"
        copy="Get 3 months free when you buy an iPhone."
        asset="ecosystem/imgDiv2"
        href={d.arcade}
        action="Try it free"
      />
      <Promo
        title="Apple Fitness+"
        copy="Fitness for everyone. Now all you need is iPhone."
        asset="ecosystem/imgFigure1"
        href={d.fitness}
        action="Try it free"
      />
      <Promo
        title="Apple Gift Card"
        copy="For everything and everyone."
        asset="ecosystem/imgFigure2"
        href={d.gift}
        action="Explore gift cards"
      />
      <Promo
        title="Introducing the Apple Research app."
        copy="The future of health research is you."
        asset="ecosystem/imgFigure3"
        href={d.research}
      />
    </>
  );
}
