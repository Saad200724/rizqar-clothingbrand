import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, RefreshCw, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { categories, getFeaturedProducts, Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addItem } = useCartStore();

  const handleQuickAdd = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      size: selectedSize,
      color: product.colors[0].name,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-secondary mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover img-zoom"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-foreground text-background text-xs font-medium rounded-full">
              New
            </span>
          )}
          {product.salePrice && (
            <span className="absolute top-3 right-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
              Sale
            </span>
          )}
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 hover-reveal">
            <div className="bg-card/95 backdrop-blur-sm rounded-xl p-3 space-y-3">
              <div className="flex gap-1.5 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                      selectedSize === size
                        ? "bg-foreground text-background"
                        : "bg-secondary hover:bg-muted"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <Button
                onClick={(e) => { e.preventDefault(); handleQuickAdd(); }}
                size="sm"
                className="w-full magnetic-btn"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
      <div className="space-y-1">
        <h3 className="font-medium text-sm">{product.name}</h3>
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="font-semibold">£{product.salePrice}</span>
              <span className="text-sm text-muted-foreground line-through">
                £{product.price}
              </span>
            </>
          ) : (
            <span className="font-semibold">£{product.price}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Index() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const featuredProducts = getFeaturedProducts();

  const trustBadges = [
    { icon: Truck, text: "Free Shipping Over £150" },
    { icon: RefreshCw, text: "30-Day Returns" },
    { icon: Shield, text: "Secure Payment" },
    { icon: Star, text: "Premium Quality" },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background z-10" />
          <img
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=80"
            alt="Rizqar Collection"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm tracking-[0.3em] text-muted-foreground mb-4"
          >
            INTRODUCING
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            The New Standard
            <br />
            <span className="text-gradient-gold">of Modesty</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground max-w-md mb-8"
          >
            Elevated essentials for the modern man. Crafted with intention, designed for distinction.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <Button size="lg" className="magnetic-btn btn-expand" asChild>
              <Link to="/shop">
                Explore Collection <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center gap-3"
              >
                <badge.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Curated collections for every aspect of your wardrobe
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/shop?category=${category.slug}`}
                  className="group block relative aspect-4/5 rounded-2xl overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                      Shop Now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured</h2>
              <p className="text-muted-foreground">Handpicked essentials</p>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/shop">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Movement
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to receive updates on new collections, exclusive offers, and style inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border focus:border-foreground focus:outline-none transition-colors"
              />
              <Button className="magnetic-btn">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
