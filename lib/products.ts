// Synthetic sample catalog data only - no real vendor/product records,
// per the assignment's "use synthetic sample data" requirement.

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string; // emoji used as a lightweight placeholder "image"
  stock: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Aurora Desk Lamp",
    description:
      "A dimmable LED desk lamp with a warm-white and cool-white mode, ideal for late study sessions.",
    price: 1299,
    category: "Workspace",
    image: "💡",
    stock: 24,
  },
  {
    id: "p2",
    name: "Granite Mechanical Keyboard",
    description:
      "A compact 75% mechanical keyboard with hot-swappable switches and per-key backlighting.",
    price: 4499,
    category: "Workspace",
    image: "⌨️",
    stock: 12,
  },
  {
    id: "p3",
    name: "Horizon Wireless Mouse",
    description:
      "An ergonomic wireless mouse with a silent click and a 2-year battery life.",
    price: 1899,
    category: "Workspace",
    image: "🖱️",
    stock: 40,
  },
  {
    id: "p4",
    name: "Cascade Water Bottle",
    description:
      "A 1-litre insulated steel bottle that keeps drinks cold for 24 hours and hot for 12.",
    price: 899,
    category: "Lifestyle",
    image: "🧴",
    stock: 60,
  },
  {
    id: "p5",
    name: "Meridian Backpack",
    description:
      "A 20-litre water-resistant backpack with a padded 15-inch laptop sleeve.",
    price: 2999,
    category: "Lifestyle",
    image: "🎒",
    stock: 18,
  },
  {
    id: "p6",
    name: "Pulse Over-Ear Headphones",
    description:
      "Over-ear headphones with active noise cancellation and a 30-hour battery life.",
    price: 5999,
    category: "Audio",
    image: "🎧",
    stock: 8,
  },
  {
    id: "p7",
    name: "Nimbus Bluetooth Speaker",
    description:
      "A pocket-sized Bluetooth speaker rated IPX6, loud enough for a small room.",
    price: 2199,
    category: "Audio",
    image: "🔊",
    stock: 0,
  },
  {
    id: "p8",
    name: "Terra Notebook Set",
    description:
      "A set of three dot-grid notebooks with a recycled-paper cover.",
    price: 499,
    category: "Stationery",
    image: "📓",
    stock: 75,
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
