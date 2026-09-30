import React from "react";
import {
  Image,
  Linking,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import { nativeAssets } from "./assets";
export async function openLink(url: string) {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(
      "Unable to open link",
      "Please check your connection and try again.",
    );
  }
}
export function Art({
  name,
  label,
  height = 220,
  style,
}: {
  name: string;
  label?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{ height, width: "100%" }, style]}>
      <Image
        source={nativeAssets[name]}
        accessibilityLabel={label}
        accessible={!!label}
        resizeMode="contain"
        style={{ height: "100%", width: "100%" }}
      />
    </View>
  );
}
export function Button({
  label,
  onPress,
  secondary = false,
  selected = false,
  accessibilityLabel,
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
  selected?: boolean;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
      ]}
    >
      <Text style={[s.buttonText, secondary && s.secondaryText]}>{label}</Text>
    </Pressable>
  );
}
export function ExternalLink({
  label = "Learn more",
  url,
  light = false,
}: {
  label?: string;
  url: string;
  light?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => openLink(url)}
      style={s.link}
    >
      <Text style={[s.linkText, light && { color: "#66b2ff" }]}>{label} ›</Text>
    </Pressable>
  );
}
export function Heading({
  children,
  kicker,
}: {
  children: React.ReactNode;
  kicker?: string;
}) {
  return (
    <View style={s.headingWrap}>
      {kicker && <Text style={s.kicker}>{kicker}</Text>}
      <Text accessibilityRole="header" style={s.heading}>
        {children}
      </Text>
    </View>
  );
}
export function Promo({
  title,
  copy,
  asset,
  href,
  dark = false,
  eyebrow,
  action = "Learn more",
}: {
  title: string;
  copy: string;
  asset: string;
  href: string;
  dark?: boolean;
  eyebrow?: string;
  action?: string;
}) {
  return (
    <View style={[s.promo, dark && { backgroundColor: "#090a0b" }]}>
      {eyebrow && (
        <Text style={[s.kicker, dark && { color: "#b7b7be" }]}>{eyebrow}</Text>
      )}
      <Text
        accessibilityRole="header"
        style={[s.promoTitle, dark && { color: "#fff" }]}
      >
        {title}
      </Text>
      <Text style={[s.copy, dark && { color: "#ddd" }]}>{copy}</Text>
      <ExternalLink label={action} url={href} light={dark} />
      <Art name={asset} label={title} height={240} />
    </View>
  );
}
export const s = StyleSheet.create({
  button: {
    minHeight: 44,
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 12,
    backgroundColor: "#0071e3",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  secondary: { backgroundColor: "#edf4ff" },
  secondaryText: { color: "#0066cc" },
  link: {
    minHeight: 44,
    paddingVertical: 12,
    paddingHorizontal: 5,
    alignSelf: "center",
    justifyContent: "center",
  },
  linkText: { color: "#0066cc", fontSize: 16 },
  headingWrap: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 20 },
  heading: {
    fontSize: 32,
    lineHeight: 37,
    fontWeight: "700",
    letterSpacing: -0.8,
    color: "#1d1d1f",
  },
  kicker: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#6e6e73",
    marginBottom: 8,
  },
  promo: {
    borderRadius: 26,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 18,
    paddingTop: 32,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  promoTitle: {
    fontSize: 29,
    lineHeight: 34,
    fontWeight: "700",
    textAlign: "center",
    color: "#1d1d1f",
    letterSpacing: -0.6,
  },
  copy: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    color: "#515154",
    marginTop: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  fine: { fontSize: 12, lineHeight: 18, color: "#6e6e73" },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    backgroundColor: "#fff",
    padding: 24,
  },
});
