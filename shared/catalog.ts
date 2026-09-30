export type ProductId =
  "iphone-14-pro" | "iphone-14" | "iphone-13" | "iphone-se";
export interface Product {
  id: ProductId;
  name: string;
  tagline: string;
  price: number;
  image: string;
  logo: string;
  swatches: string;
  colors: string[];
  display: string;
  displayType: string;
  camera: string;
  battery: number;
  chip: string;
  gpu?: string;
  biometric: string;
  featureIcons: string[];
  isNew?: boolean;
}
const comparison = "comparison/";
export const products: Product[] = [
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    tagline: "The ultimate iPhone.",
    price: 999,
    image: comparison + "imgFigure",
    logo: comparison + "imgFigure1",
    swatches:
      comparison + "imgIPhone14ProAvailableInDeepPurpleGoldSilverAndSpaceBlack",
    colors: ["Deep Purple", "Gold", "Silver", "Space Black"],
    display: "6.7″ or 6.1″",
    displayType: "Super Retina XDR display",
    camera: "Pro camera system",
    battery: 29,
    chip: "A16 Bionic chip",
    biometric: "Face ID",
    featureIcons: [
      "imgFigure2",
      "imgFigure3",
      "imgFigure4",
      "imgFigure5",
      "imgFigure6",
      "imgFigure7",
      "imgFigure8",
      "imgFigure9",
    ],
    isNew: true,
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    tagline: "A total powerhouse.",
    price: 799,
    image: comparison + "imgFigure10",
    logo: comparison + "imgFigure11",
    swatches:
      comparison +
      "imgIPhone14AvailableInBluePurpleYellowMidnightStarlightAndProductRed",
    colors: [
      "Blue",
      "Purple",
      "Yellow",
      "Midnight",
      "Starlight",
      "(PRODUCT)RED",
    ],
    display: "6.7″ or 6.1″",
    displayType: "Super Retina XDR display",
    camera: "Advanced dual-camera system",
    battery: 26,
    chip: "A15 Bionic chip",
    gpu: "5-core GPU",
    biometric: "Face ID",
    featureIcons: [
      "",
      "imgFigure3",
      "imgFigure12",
      "imgFigure5",
      "imgFigure6",
      "imgFigure13",
      "imgFigure8",
      "imgFigure9",
    ],
    isNew: true,
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    tagline: "As amazing as ever.",
    price: 599,
    image: comparison + "imgFigure14",
    logo: comparison + "imgFigure15",
    swatches:
      comparison +
      "imgIPhone13AvailableInGreenPinkBlueMidnightStarlightAndProductRed",
    colors: ["Green", "Pink", "Blue", "Midnight", "Starlight", "(PRODUCT)RED"],
    display: "6.1″ or 5.4″",
    displayType: "Super Retina XDR display",
    camera: "Dual-camera system",
    battery: 19,
    chip: "A15 Bionic chip",
    gpu: "4-core GPU",
    biometric: "Face ID",
    featureIcons: [
      "",
      "imgFigure3",
      "imgFigure16",
      "",
      "imgFigure6",
      "imgFigure13",
      "imgFigure8",
      "imgFigure9",
    ],
  },
  {
    id: "iphone-se",
    name: "iPhone SE",
    tagline: "Serious power. Serious value.",
    price: 429,
    image: comparison + "imgFigure17",
    logo: comparison + "imgFigure18",
    swatches:
      comparison + "imgIPhoneSeAvailableInMidnightStarlightAndProductRed",
    colors: ["Midnight", "Starlight", "(PRODUCT)RED"],
    display: "4.7″",
    displayType: "Retina HD display",
    camera: "Advanced camera system",
    battery: 15,
    chip: "A15 Bionic chip",
    gpu: "4-core GPU",
    biometric: "Touch ID",
    featureIcons: [
      "",
      "imgFigure3",
      "imgFigure19",
      "",
      "imgFigure6",
      "imgFigure13",
      "imgFigure20",
      "imgFigure9",
    ],
  },
];
export const money = (n: number) => "$" + n.toLocaleString("en-US");
export const colorHex: Record<string, string> = {
  "Deep Purple": "#61586b",
  Gold: "#f4e4ca",
  Silver: "#e7e7e2",
  "Space Black": "#424244",
  Blue: "#a0b4c7",
  Purple: "#e2d5ec",
  Yellow: "#f5d95d",
  Midnight: "#303941",
  Starlight: "#f2eee4",
  "(PRODUCT)RED": "#d82e3e",
  Green: "#54675e",
  Pink: "#f2dbd9",
};
export const destinations = {
  store: "https://www.apple.com/store",
  iphone: "https://www.apple.com/iphone/",
  tradein: "https://www.apple.com/shop/trade-in",
  carrier: "https://www.apple.com/shop/buy-iphone/carrier-offers",
  card: "https://www.apple.com/apple-card/",
  magsafe: "https://www.apple.com/shop/accessories/all/magsafe",
  airtag: "https://www.apple.com/airtag/",
  airpods: "https://www.apple.com/airpods/",
  accessories: "https://www.apple.com/shop/iphone/accessories",
  delivery: "https://www.apple.com/shop/shipping-pickup",
  support: "https://support.apple.com/",
  ios: "https://www.apple.com/ios/",
  switch: "https://www.apple.com/iphone/switch/",
  one: "https://www.apple.com/apple-one/",
  tv: "https://tv.apple.com/",
  music: "https://music.apple.com/",
  news: "https://www.apple.com/apple-news/",
  arcade: "https://www.apple.com/apple-arcade/",
  fitness: "https://www.apple.com/apple-fitness-plus/",
  gift: "https://www.apple.com/shop/gift-cards",
  research: "https://www.apple.com/ios/research-app/",
};
export const storageOptions = [128, 256, 512] as const;
export const configuredPrice = (product: Product, storage: number) =>
  product.price + (storage === 256 ? 100 : storage === 512 ? 300 : 0);
export const reviewNotice =
  "Independent frontend recreation. Prices and offers reproduce the 2023 Figma design and are not current offers. No purchases or payments are processed.";
export type BagItem = {
  productId: ProductId;
  color: string;
  storage: number;
  quantity: number;
};
export const bagKey = (x: Pick<BagItem, "productId" | "color" | "storage">) =>
  `${x.productId}:${x.color}:${x.storage}`;
export function addToBag(
  bag: BagItem[],
  item: Omit<BagItem, "quantity">,
): BagItem[] {
  const found = bag.find((x) => bagKey(x) === bagKey(item));
  return found
    ? bag.map((x) =>
        x === found ? { ...x, quantity: Math.min(9, x.quantity + 1) } : x,
      )
    : [...bag, { ...item, quantity: 1 }];
}
