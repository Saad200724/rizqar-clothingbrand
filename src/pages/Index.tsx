import { MainLayout } from "@/components/layout/MainLayout";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/home/Footer";
import { getNewProducts, getProductsByCategory, getFeaturedProducts, categories } from "@/data/products";
import { motion } from "framer-motion";
import rizqarLogo from "@/assets/rizqar-logo.jpeg";

export default function Index() {
  const newArrivals = getNewProducts();
  const featuredProducts = getFeaturedProducts();
  
  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Brand Statement */}
      <section className="py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-8 rounded-2xl overflow-hidden"
            >
              <img src={rizqarLogo} alt="Rizqar" className="w-full h-full object-cover" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Modest Fashion for the
              <span className="text-accent block">Modern Muslim Man</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We craft elevated essentials that honor tradition while embracing contemporary design. 
              Every piece is designed with intention, built with premium materials, and made to last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductSection 
        title="Featured Collection" 
        subtitle="HANDPICKED"
        products={featuredProducts} 
      />

      {/* Categories Grid */}
      <CategoryGrid />

      {/* New Arrivals */}
      <ProductSection 
        title="New Arrivals" 
        subtitle="JUST DROPPED"
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
