import type React from "react";
import { Text, View } from "react-native";
import {
  products,
  type BagItem,
  bagKey,
  configuredPrice,
  money,
  reviewNotice,
} from "../../shared/catalog";
import { Art, Button, Heading, s } from "../components";
import { styles } from "../styles";
export function Bag({
  bag,
  setBag,
  explore,
}: {
  bag: BagItem[];
  setBag: React.Dispatch<React.SetStateAction<BagItem[]>>;
  explore: () => void;
}) {
  const total = bag.reduce(
    (n, x) =>
      n +
      configuredPrice(
        products.find((p) => p.id === x.productId)!,
        x.storage,
      ) *
        x.quantity,
    0,
  );
  return (
    <>
      <Heading kicker="Your favorites, together">Your review bag.</Heading>
      {!bag.length ? (
        <View style={s.card}>
          <Text style={s.promoTitle}>Room for something great.</Text>
          <Text style={[s.copy, { marginBottom: 24 }]}>
            Explore iPhone and add a configuration to your review bag.
          </Text>
          <Button label="Explore iPhone" onPress={explore} />
        </View>
      ) : (
        <>
          {bag.map((x) => {
            const p = products.find((p) => p.id === x.productId)!;
            return (
              <View key={bagKey(x)} style={s.card}>
                <View style={s.row}>
                  <View style={{ width: 65 }}>
                    <Art name={p.image} label={p.name} height={100} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.productName}>{p.name}</Text>
                    <Text style={styles.productTag}>
                      {x.color} · {x.storage}GB
                    </Text>
                    <Text style={styles.tilePrice}>
                      {money(configuredPrice(p, x.storage) * x.quantity)}
                    </Text>
                  </View>
                </View>
                <View style={[s.row, { marginTop: 12 }]}>
                  <Button
                    label="−"
                    accessibilityLabel={`Decrease ${p.name} quantity`}
                    secondary
                    onPress={() =>
                      setBag((b) =>
                        b.map((a) =>
                          bagKey(a) === bagKey(x)
                            ? { ...a, quantity: Math.max(1, a.quantity - 1) }
                            : a,
                        ),
                      )
                    }
                  />
                  <Text
                    accessibilityLabel={`Quantity ${x.quantity}`}
                    style={styles.storageText}
                  >
                    {x.quantity}
                  </Text>
                  <Button
                    label="+"
                    accessibilityLabel={`Increase ${p.name} quantity`}
                    secondary
                    onPress={() =>
                      setBag((b) =>
                        b.map((a) =>
                          bagKey(a) === bagKey(x)
                            ? { ...a, quantity: Math.min(9, a.quantity + 1) }
                            : a,
                        ),
                      )
                    }
                  />
                  <Button
                    label="Remove"
                    secondary
                    onPress={() =>
                      setBag((b) => b.filter((a) => bagKey(a) !== bagKey(x)))
                    }
                  />
                </View>
              </View>
            );
          })}
          <View style={s.card}>
            <View
              style={[
                s.row,
                { justifyContent: "space-between", marginBottom: 20 },
              ]}
            >
              <Text style={styles.productName}>Total</Text>
              <Text style={styles.price}>{money(total)}</Text>
            </View>
            <Button label="Continue exploring" onPress={explore} />
          </View>
        </>
      )}
      <View style={s.card}>
        <Text style={s.fine}>
          {reviewNotice} The bag is retained for this app session.
        </Text>
      </View>
    </>
  );
}
