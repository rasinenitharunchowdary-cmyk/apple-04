import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  type Product,
  type BagItem,
  colorHex,
  configuredPrice,
  money,
  reviewNotice,
  storageOptions,
} from "../../shared/catalog";
import { Art, Button, s } from "../components";
import { styles } from "../styles";
export function ProductSheet({
  product,
  onClose,
  onAdd,
  reduced,
}: {
  product: Product;
  onClose: () => void;
  onAdd: (item: Omit<BagItem, "quantity">) => void;
  reduced: boolean;
}) {
  const [color, setColor] = useState(product.colors[0]);
  const [storage, setStorage] = useState(128);
  return (
    <Modal
      visible
      animationType={reduced ? "none" : "slide"}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>{product.name}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close product"
            onPress={onClose}
            style={styles.close}
          >
            <Text style={styles.closeText}>×</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.sheetBody}>
          <Art name={product.image} label={product.name} height={230} />
          <Text style={styles.productTag}>{product.tagline}</Text>
          <Text style={styles.fieldTitle}>
            Finish. <Text style={styles.muted}>{color}</Text>
          </Text>
          <View style={styles.colors}>
            {product.colors.map((c) => (
              <Pressable
                key={c}
                accessibilityRole="radio"
                accessibilityLabel={c}
                accessibilityState={{ checked: color === c }}
                onPress={() => setColor(c)}
                style={[styles.colorRing, color === c && styles.selectedRing]}
              >
                <View
                  style={[styles.color, { backgroundColor: colorHex[c] }]}
                />
              </Pressable>
            ))}
          </View>
          <Text style={styles.fieldTitle}>Storage.</Text>
          <View style={s.row}>
            {storageOptions.map((n) => (
              <Pressable
                key={n}
                accessibilityRole="radio"
                accessibilityState={{ checked: storage === n }}
                accessibilityLabel={`${n} gigabytes`}
                onPress={() => setStorage(n)}
                style={[styles.storage, storage === n && styles.selectedRing]}
              >
                <Text style={styles.storageText}>{n}GB</Text>
              </Pressable>
            ))}
          </View>
          <Text style={[s.fine, { marginTop: 20 }]}>
            Reference product image. Selected finish: {color}. Storage prices
            are illustrative for the review.
          </Text>
          <Text style={[s.fine, { marginTop: 10 }]}>{reviewNotice}</Text>
        </ScrollView>
        <View style={styles.sheetFooter}>
          <Text style={styles.price}>
            {money(configuredPrice(product, storage))}
          </Text>
          <Button
            label="Add to review bag"
            onPress={() => onAdd({ productId: product.id, color, storage })}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
