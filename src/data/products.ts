// MongoDB-ready product data structure
export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  category: string;
  categorySlug: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  description: string;
  fabricOrigin: string;
  careInstructions: string[];
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    _id: "cat-001",
    name: "Hoodies & Sweatshirts",
    slug: "hoodies-sweatshirts",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    description: "Premium comfort wear with modest cuts",
  },
  {
    _id: "cat-002",
    name: "Thobes & Kurtis",
    slug: "thobes-kurtis",
    image: "https://images.unsplash.com/photo-1589363460779-a0d894afb04a?w=800&q=80",
    description: "Traditional elegance, modern design",
  },
  {
    _id: "cat-003",
    name: "Outerwear & Jackets",
    slug: "outerwear-jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    description: "Statement pieces for every season",
  },
  {
    _id: "cat-004",
    name: "Caps & Accessories",
    slug: "caps-accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    description: "Complete your look with refined details",
  },
];

export const products: Product[] = [
  {
    _id: "prod-001",
    name: "Obsidian Oversized Hoodie",
    slug: "obsidian-oversized-hoodie",
    price: 129,
    category: "Hoodies & Sweatshirts",
    categorySlug: "hoodies-sweatshirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", hex: "#1a1a1a" },
      { name: "Cream", hex: "#f5f0e8" },
    ],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80",
    ],
    description: "A masterfully crafted oversized hoodie featuring premium heavyweight cotton. The extended silhouette provides both modesty and contemporary style.",
    fabricOrigin: "Sourced from sustainable cotton farms in Egypt, known for producing the world's finest long-staple cotton.",
    careInstructions: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Iron on low heat"],
    stock: 45,
    isFeatured: true,
    isNew: true,
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    _id: "prod-002",
    name: "Midnight Thobe",
    slug: "midnight-thobe",
    price: 189,
    salePrice: 159,
    category: "Thobes & Kurtis",
    categorySlug: "thobes-kurtis",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Navy", hex: "#1a1a2e" },
    ],
    images: [
      "https://images.unsplash.com/photo-1589363460779-a0d894afb04a?w=800&q=80",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    ],
    description: "The Midnight Thobe reimagines traditional elegance with a modern minimalist approach. Crafted from premium breathable fabric.",
    fabricOrigin: "Woven in Morocco using time-honored techniques passed down through generations of master craftsmen.",
    careInstructions: ["Hand wash recommended", "Hang dry", "Steam iron", "Store hanging"],
    stock: 28,
    isFeatured: true,
    isNew: false,
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    _id: "prod-003",
    name: "Storm Technical Jacket",
    slug: "storm-technical-jacket",
    price: 249,
    category: "Outerwear & Jackets",
    categorySlug: "outerwear-jackets",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Graphite", hex: "#2d2d2d" },
      { name: "Olive", hex: "#3d3d29" },
    ],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1544923246-77307dd628b7?w=800&q=80",
    ],
    description: "Engineered for the modern man, the Storm Jacket combines water-resistant technology with refined aesthetics.",
    fabricOrigin: "Developed in collaboration with Japanese textile engineers, utilizing cutting-edge sustainable materials.",
    careInstructions: ["Machine wash cold", "Do not tumble dry", "Hang dry only", "Do not iron"],
    stock: 15,
    isFeatured: true,
    isNew: true,
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    _id: "prod-004",
    name: "Essential Kufi Cap",
    slug: "essential-kufi-cap",
    price: 45,
    category: "Caps & Accessories",
    categorySlug: "caps-accessories",
    sizes: ["S/M", "L/XL"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "White", hex: "#fafafa" },
      { name: "Sand", hex: "#c2b280" },
    ],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    ],
    description: "A refined take on the classic kufi, featuring premium cotton construction and a comfortable fit.",
    fabricOrigin: "Handcrafted in Turkey using traditional methods with contemporary finishing.",
    careInstructions: ["Hand wash only", "Reshape while damp", "Air dry flat"],
    stock: 120,
    isFeatured: false,
    isNew: false,
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    _id: "prod-005",
    name: "Zenith Crew Sweatshirt",
    slug: "zenith-crew-sweatshirt",
    price: 99,
    category: "Hoodies & Sweatshirts",
    categorySlug: "hoodies-sweatshirts",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Stone", hex: "#8b8b7a" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    images: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80",
    ],
    description: "The Zenith Crew embodies understated luxury. A relaxed fit with meticulous attention to detail.",
    fabricOrigin: "Made from organic cotton grown in the fertile valleys of Portugal.",
    careInstructions: ["Machine wash cold", "Tumble dry low", "Do not bleach"],
    stock: 67,
    isFeatured: false,
    isNew: true,
    createdAt: "2024-01-18T00:00:00Z",
  },
  {
    _id: "prod-006",
    name: "Heritage Bomber",
    slug: "heritage-bomber",
    price: 279,
    salePrice: 229,
    category: "Outerwear & Jackets",
    categorySlug: "outerwear-jackets",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Obsidian", hex: "#0d0d0d" },
    ],
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd628b7?w=800&q=80",
    ],
    description: "A contemporary interpretation of the classic bomber, featuring premium materials and extended length for modesty.",
    fabricOrigin: "Constructed in Italy using the finest nylon and wool blend linings.",
    careInstructions: ["Dry clean only", "Store on wide hanger"],
    stock: 22,
    isFeatured: true,
    isNew: false,
    createdAt: "2024-01-08T00:00:00Z",
  },
  {
    _id: "prod-007",
    name: "Lunar White Thobe",
    slug: "lunar-white-thobe",
    price: 169,
    category: "Thobes & Kurtis",
    categorySlug: "thobes-kurtis",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Pearl White", hex: "#f8f8f5" },
    ],
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    ],
    description: "Pure elegance in pearl white. The Lunar Thobe features a refined collar and hidden placket for a seamless look.",
    fabricOrigin: "Woven from premium cotton in the UAE, designed for the discerning gentleman.",
    careInstructions: ["Machine wash cold with like colors", "Iron on medium heat", "Hang immediately after washing"],
    stock: 34,
    isFeatured: false,
    isNew: true,
    createdAt: "2024-01-22T00:00:00Z",
  },
  {
    _id: "prod-008",
    name: "Nomad Crossbody Bag",
    slug: "nomad-crossbody-bag",
    price: 89,
    category: "Caps & Accessories",
    categorySlug: "caps-accessories",
    sizes: ["One Size"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Tan", hex: "#c19a6b" },
    ],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    description: "The Nomad bag combines functionality with refined aesthetics. Water-resistant exterior with organized interior.",
    fabricOrigin: "Crafted from recycled materials by artisans in Vietnam.",
    careInstructions: ["Wipe clean with damp cloth", "Air dry only", "Avoid prolonged sun exposure"],
    stock: 55,
    isFeatured: false,
    isNew: false,
    createdAt: "2024-01-12T00:00:00Z",
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);
export const getNewProducts = () => products.filter((p) => p.isNew);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (categorySlug: string) => 
  products.filter((p) => p.categorySlug === categorySlug);
