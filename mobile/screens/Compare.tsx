import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { products, type Product, money } from "../../shared/catalog";
import { Art, Button, ExternalLink, Heading, s } from "../components";
import { styles } from "../styles";
export function Compare({ buy }: { buy: (p: Product) => void }) {
  const [selected, setSelected] = useState([products[0].id, products[1].id]);
  const [differences, setDifferences] = useState(false);
  const chosen = products.filter((p) => selected.includes(p.id));
  const toggle = (p: Product) =>
    setSelected((ids) =>
      ids.includes(p.id)
        ? ids.length > 1
          ? ids.filter((id) => id !== p.id)
          : ids
        : ids.length < 2
          ? [...ids, p.id]
          : [ids[1], p.id],
    );
  const rows: [string, (p: Product) => string][] = [
    ["Display", (p) => p.display],
    ["Display technology", (p) => p.displayType],
    ["Camera", (p) => p.camera],
    ["Video playback", (p) => `Up to ${p.battery} hours`],
    ["Chip", (p) => p.chip],
    ["Unlock", (p) => p.biometric],
    ["Dynamic Island", (p) => (p.id === "iphone-14-pro" ? "Yes" : "—")],
    ["Crash Detection", (p) => (p.isNew ? "Yes" : "—")],
    ["Emergency SOS via satellite", (p) => (p.isNew ? "Yes" : "—")],
  ];
  return (
    <>
      <Heading kicker="Side by side">Find your perfect fit.</Heading>
      <Text style={styles.sectionCopy}>
        Select up to two models. Tap another to replace the first.
      </Text>
      <View style={styles.modelChips}>
        {products.map((p) => (
          <Pressable
            key={p.id}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: selected.includes(p.id) }}
            onPress={() => toggle(p)}
            style={[styles.chip, selected.includes(p.id) && styles.activeChip]}
          >
            <Text
              style={[
                styles.chipText,
                selected.includes(p.id) && { color: "#fff" },
              ]}
            >
              {p.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: differences }}
        onPress={() => setDifferences(!differences)}
        style={styles.difference}
      >
        <Text style={styles.chipText}>
          {differences ? "●" : "○"} Show differences only
        </Text>
      </Pressable>
      <View style={s.card}>
        <View style={styles.compareRow}>
          {chosen.map((p) => (
            <View style={styles.compareCell} key={p.id}>
              <Art name={p.image} label={p.name} height={160} />
              <Text style={styles.compareName}>{p.name}</Text>
              <Text style={styles.productTag}>{money(p.price)}</Text>
              <Button
                label="Buy"
                accessibilityLabel={`Buy ${p.name}`}
                onPress={() => buy(p)}
              />
            </View>
          ))}
        </View>
        {rows
          .filter(
            ([, value]) =>
              !differences ||
              chosen.length < 2 ||
              value(chosen[0]) !== value(chosen[1]),
          )
          .map(([label, value]) => (
            <View style={styles.specRow} key={label}>
              <Text style={styles.specLabel}>{label}</Text>
              <View style={styles.compareRow}>
                {chosen.map((p) => (
                  <Text key={p.id} style={styles.specValue}>
                    {value(p)}
                  </Text>
                ))}
              </View>
            </View>
          ))}
      </View>
      <ExternalLink
        label="Compare all iPhone models"
        url="https://www.apple.com/iphone/compare/"
      />
    </>
  );
}
