import { MainLayout } from "@/components/layout/MainLayout";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/home/Footer";
import { getNewProducts, getProductsByCategory, categories } from "@/data/products";

export default function Index() {
  const newArrivals = getNewProducts();
  
  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Categories Grid */}
      <CategoryGrid />

      {/* New Arrivals */}
      <ProductSection 
        title="New Arrival" 
        products={newArrivals} 
      />

      {/* Category-based Product Sections */}
      {categories.map((category) => {
        const categoryProducts = getProductsByCategory(category.slug);
        if (categoryProducts.length === 0) return null;
        
        return (
          <ProductSection
            key={category._id}
            title={category.name}
            products={categoryProducts}
            categorySlug={category.slug}
          />
        );
      })}

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </MainLayout>
  );
}
