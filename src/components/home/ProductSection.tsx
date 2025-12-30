import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useState, useRef } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px]"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-secondary mb-3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-semibold rounded-md">
              New
            </span>
          )}
          {product.salePrice && (
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-md">
              Sale
            </span>
          )}
        </div>
      </Link>
      
      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm font-medium line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-sm font-semibold">£{product.salePrice}</span>
              <span className="text-xs text-muted-foreground line-through">
                £{product.price}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold">£{product.price}</span>
          )}
        </div>

        {/* Size Selector */}
        <div className="flex gap-1 flex-wrap">
          {product.sizes.slice(0, 4).map((size) => (
            <button
              key={size}
              onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
              className={`px-2 py-0.5 text-[10px] rounded-md transition-colors ${
                selectedSize === size
                  ? "bg-foreground text-background"
                  : "bg-secondary hover:bg-muted border border-border"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs"
            asChild
          >
            <Link to={`/product/${product.slug}`}>
              Order Now
            </Link>
          </Button>
          <Button
            size="sm"
            className="h-8 px-3"
            onClick={handleQuickAdd}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  categorySlug?: string;
}

export function ProductSection({ title, products, categorySlug }: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold"
          >
            {title}
          </motion.h2>
          {categorySlug && (
            <Button variant="link" size="sm" className="text-accent" asChild>
              <Link to={`/shop?category=${categorySlug}`}>
                View All <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4"
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
