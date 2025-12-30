import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product._id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      size: selectedSize,
      color: product.colors[0].name,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-accent text-background text-[10px] font-bold tracking-wider rounded-full">
                NEW
              </span>
            )}
            {product.salePrice && (
              <span className="px-3 py-1 bg-destructive text-destructive-foreground text-[10px] font-bold tracking-wider rounded-full">
                SALE
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button 
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-background"
            onClick={(e) => { e.preventDefault(); toast.info("Wishlist coming soon"); }}
          >
            <Heart className="w-4 h-4" />
          </button>

          {/* Quick Add Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute inset-x-3 bottom-3"
          >
            <div className="bg-background/95 backdrop-blur-md rounded-xl p-3 space-y-3 border border-border/50">
              {/* Size Selector */}
              <div className="flex gap-1.5 flex-wrap justify-center">
                {product.sizes.slice(0, 5).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                    className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-all ${
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
                size="sm"
                className="w-full magnetic-btn text-xs"
                onClick={handleQuickAdd}
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </motion.div>
        </div>
      </Link>
      
      <div className="space-y-2 px-1">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-sm line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="font-bold">৳{product.salePrice}</span>
              <span className="text-sm text-muted-foreground line-through">
                ৳{product.price}
              </span>
            </>
          ) : (
            <span className="font-bold">৳{product.price}</span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex gap-1.5">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color.name}
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  categorySlug?: string;
  subtitle?: string;
}

export function ProductSection({ title, products, categorySlug, subtitle }: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {subtitle && (
              <span className="text-accent text-xs font-semibold tracking-widest mb-2 block">{subtitle}</span>
            )}
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
              {title}
            </h2>
          </motion.div>
          
          {categorySlug && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Button variant="ghost" className="group text-accent" asChild>
                <Link to={`/shop?category=${categorySlug}`}>
                  View All 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
