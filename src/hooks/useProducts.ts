import { useState, useEffect, useMemo } from "react";
import { products as defaultProducts, Product } from "@/data/products";

export function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("admin_products");
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("admin_products");
      setProducts(saved ? JSON.parse(saved) : defaultProducts);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return products;
}

function getStoredProducts(): Product[] {
  const saved = localStorage.getItem("admin_products");
  return saved ? JSON.parse(saved) : defaultProducts;
}

export function getFeaturedProducts(): Product[] {
  return getStoredProducts().filter((p: Product) => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return getStoredProducts().filter((p: Product) => p.isNew);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getStoredProducts().find((p: Product) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getStoredProducts().filter((p: Product) => p.categorySlug === categorySlug);
}
