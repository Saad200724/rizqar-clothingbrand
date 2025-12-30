// MongoDB-ready order data structure
export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export const orders: Order[] = [
  {
    _id: "ord-001",
    orderNumber: "RZQ-2024-0001",
    customerId: "cust-001",
    customerName: "Ahmed Hassan",
    customerEmail: "ahmed@example.com",
    items: [
      {
        productId: "prod-001",
        productName: "Obsidian Oversized Hoodie",
        size: "L",
        color: "Charcoal",
        quantity: 1,
        price: 129,
      },
      {
        productId: "prod-004",
        productName: "Essential Kufi Cap",
        size: "L/XL",
        color: "Black",
        quantity: 2,
        price: 45,
      },
    ],
    status: "delivered",
    shippingAddress: {
      street: "123 Main Street",
      city: "London",
      state: "Greater London",
      zipCode: "SW1A 1AA",
      country: "United Kingdom",
    },
    subtotal: 219,
    shipping: 0,
    total: 219,
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-25T14:00:00Z",
  },
  {
    _id: "ord-002",
    orderNumber: "RZQ-2024-0002",
    customerId: "cust-002",
    customerName: "Omar Malik",
    customerEmail: "omar@example.com",
    items: [
      {
        productId: "prod-002",
        productName: "Midnight Thobe",
        size: "XL",
        color: "Black",
        quantity: 1,
        price: 159,
      },
    ],
    status: "shipped",
    shippingAddress: {
      street: "456 Oak Avenue",
      city: "Manchester",
      state: "Greater Manchester",
      zipCode: "M1 1AA",
      country: "United Kingdom",
    },
    subtotal: 159,
    shipping: 10,
    total: 169,
    createdAt: "2024-01-22T15:45:00Z",
    updatedAt: "2024-01-24T09:00:00Z",
  },
  {
    _id: "ord-003",
    orderNumber: "RZQ-2024-0003",
    customerId: "cust-003",
    customerName: "Yusuf Ali",
    customerEmail: "yusuf@example.com",
    items: [
      {
        productId: "prod-003",
        productName: "Storm Technical Jacket",
        size: "M",
        color: "Graphite",
        quantity: 1,
        price: 249,
      },
    ],
    status: "processing",
    shippingAddress: {
      street: "789 Park Lane",
      city: "Birmingham",
      state: "West Midlands",
      zipCode: "B1 1AA",
      country: "United Kingdom",
    },
    subtotal: 348,
    shipping: 0,
    total: 348,
    createdAt: "2024-01-25T11:20:00Z",
    updatedAt: "2024-01-25T11:20:00Z",
  },
  {
    _id: "ord-004",
    orderNumber: "RZQ-2024-0004",
    customerId: "cust-004",
    customerName: "Ibrahim Khan",
    customerEmail: "ibrahim@example.com",
    items: [
      {
        productId: "prod-006",
        productName: "Heritage Bomber",
        size: "L",
        color: "Obsidian",
        quantity: 1,
        price: 229,
      },
    ],
    status: "delivered",
    shippingAddress: {
      street: "321 Queen Street",
      city: "Edinburgh",
      state: "Scotland",
      zipCode: "EH1 1AA",
      country: "United Kingdom",
    },
    subtotal: 229,
    shipping: 15,
    total: 244,
    createdAt: "2024-01-18T09:00:00Z",
    updatedAt: "2024-01-23T16:30:00Z",
  },
  {
    _id: "ord-005",
    orderNumber: "RZQ-2024-0005",
    customerId: "cust-005",
    customerName: "Tariq Rahman",
    customerEmail: "tariq@example.com",
    items: [
      {
        productId: "prod-007",
        productName: "Lunar White Thobe",
        size: "L",
        color: "Pearl White",
        quantity: 2,
        price: 169,
      },
      {
        productId: "prod-008",
        productName: "Nomad Crossbody Bag",
        size: "One Size",
        color: "Tan",
        quantity: 1,
        price: 89,
      },
    ],
    status: "processing",
    shippingAddress: {
      street: "555 High Street",
      city: "Leeds",
      state: "West Yorkshire",
      zipCode: "LS1 1AA",
      country: "United Kingdom",
    },
    subtotal: 427,
    shipping: 0,
    total: 427,
    createdAt: "2024-01-26T14:15:00Z",
    updatedAt: "2024-01-26T14:15:00Z",
  },
];

export const getOrdersByStatus = (status: Order["status"]) => orders.filter((o) => o.status === status);

export const getRecentOrders = (limit: number = 5) =>
  [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);

export const getTotalRevenue = () => orders.reduce((sum, order) => sum + order.total, 0);

export const getOrderStats = () => ({
  total: orders.length,
  processing: orders.filter((o) => o.status === "processing").length,
  shipped: orders.filter((o) => o.status === "shipped").length,
  delivered: orders.filter((o) => o.status === "delivered").length,
  cancelled: orders.filter((o) => o.status === "cancelled").length,
});
