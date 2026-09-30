import { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Modal,
  Pressable,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  type Product,
  type BagItem,
  addToBag,
  destinations as d,
  reviewNotice,
} from "../shared/catalog";
import footer from "../shared/footer.json";
import { Button, ExternalLink, s } from "./components";
import { styles } from "./styles";
import { ProductSheet } from "./screens/ProductSheet";
import { Discover } from "./screens/Discover";
import { Compare } from "./screens/Compare";
import { Accessories } from "./screens/Accessories";
import { Bag } from "./screens/Bag";
type Tab = "Discover" | "Compare" | "Accessories" | "Bag";
function AppContent() {
  const [tab, setTab] = useState<Tab>("Discover");
  const [product, setProduct] = useState<Product | null>(null);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [legal, setLegal] = useState(false);
  const [reduced, setReduced] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;
  const scroll = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduced);
    const sub = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduced,
    );
    return () => sub.remove();
  }, []);
  const navigate = (next: Tab) => {
    setTab(next);
    setQuery("");
    setSearch(false);
    scroll.current?.scrollTo({ y: 0, animated: false });
    if (!reduced) {
      opacity.setValue(0.35);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: Platform.OS !== "web",
      }).start();
    }
  };
  const count = bag.reduce((n, x) => n + x.quantity, 0);
  return (
    <SafeAreaView style={styles.app} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />
      <View
        style={[
          styles.topbar,
          width > 700 && { paddingHorizontal: (width - 650) / 2 },
        ]}
      >
        <Text accessibilityRole="header" style={styles.brand}>
          iPhone<Text style={styles.brandDot}>.</Text>
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={search ? "Close search" : "Search products"}
          onPress={() => {
            setTab("Discover");
            setSearch(!search);
            setQuery("");
            scroll.current?.scrollTo({ y: 0, animated: false });
          }}
          style={styles.searchButton}
        >
          <Text style={styles.searchSymbol}>{search ? "×" : "⌕"}</Text>
        </Pressable>
      </View>
      {search && (
        <View style={styles.searchWrap}>
          <TextInput
            autoFocus
            accessibilityLabel="Search products"
            placeholder="Search iPhone…"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      )}
      <Animated.View style={{ flex: 1, opacity }}>
        <ScrollView
          ref={scroll}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 30,
            width: "100%",
            maxWidth: 700,
            alignSelf: "center",
          }}
        >
          {tab === "Discover" && (
            <Discover
              query={query}
              buy={setProduct}
              compare={() => navigate("Compare")}
            />
          )}
          {tab === "Compare" && <Compare buy={setProduct} />}
          {tab === "Accessories" && <Accessories />}
          {tab === "Bag" && (
            <Bag
              bag={bag}
              setBag={setBag}
              explore={() => navigate("Discover")}
            />
          )}
          {tab !== "Bag" && (
            <>
              <View style={s.card}>
                <Text style={styles.productName}>
                  A little help. A lot of possibilities.
                </Text>
                <ExternalLink label="Fast, free delivery" url={d.delivery} />
                <ExternalLink label="Pay monthly at 0% APR" url={d.card} />
                <ExternalLink label="Get help buying" url={d.support} />
              </View>
              <View style={{ padding: 24 }}>
                <Text style={s.fine}>{reviewNotice}</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setLegal(true)}
                  style={{ paddingVertical: 16 }}
                >
                  <Text style={s.linkText}>
                    Design terms & acknowledgments ›
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>
      </Animated.View>
      <View
        style={[styles.tabbar, { paddingBottom: Math.max(insets.bottom, 10) }]}
      >
        {(["Discover", "Compare", "Accessories", "Bag"] as Tab[]).map(
          (t, i) => (
            <Pressable
              key={t}
              accessibilityRole="tab"
              accessibilityLabel={t === "Bag" ? `Bag, ${count} items` : t}
              accessibilityState={{ selected: tab === t }}
              onPress={() => navigate(t)}
              style={styles.tab}
            >
              <Text style={[styles.tabIcon, tab === t && styles.activeTab]}>
                {["◉", "▥", "◇", "▢"][i]}
                {t === "Bag" && count > 0 ? ` ${count}` : ""}
              </Text>
              <Text style={[styles.tabLabel, tab === t && styles.activeTab]}>
                {t}
              </Text>
            </Pressable>
          ),
        )}
      </View>
      {product && (
        <ProductSheet
          key={product.id}
          reduced={reduced}
          product={product}
          onClose={() => setProduct(null)}
          onAdd={(item) => {
            setBag((b) => addToBag(b, item));
            setProduct(null);
            navigate("Bag");
            AccessibilityInfo.announceForAccessibility(
              "Added to your review bag",
            );
          }}
        />
      )}
      {legal && (
        <Modal
          visible
          animationType={reduced ? "none" : "slide"}
          onRequestClose={() => setLegal(false)}
        >
          <SafeAreaView style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Design acknowledgments</Text>
              <Button label="Done" onPress={() => setLegal(false)} />
            </View>
            <ScrollView contentContainerStyle={{ padding: 24 }}>
              <Text style={[s.fine, { marginBottom: 20 }]}>{reviewNotice}</Text>
              {footer.legal.map((p) => (
                <Text key={p.id} style={[s.fine, { marginBottom: 15 }]}>
                  {p.text}
                </Text>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
