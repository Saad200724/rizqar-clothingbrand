import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Truck, RotateCcw, Shield, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Footer } from "@/components/home/Footer";
import { getProductBySlug, getProductsByCategory, Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function RelatedProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-secondary mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h4 className="text-sm font-medium group-hover:text-accent transition-colors">{product.name}</h4>
      <p className="text-sm text-muted-foreground">
        £{product.salePrice || product.price}
      </p>
    </Link>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || "");
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { addItem } = useCartStore();

  if (!product) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter(p => p._id !== product._id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product._id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor?.name || product.colors[0].name,
      });
    }
    toast.success(`${product.name} added to cart`);
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 md:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      {/* Product Detail */}
      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1fr,400px] xl:grid-cols-[1fr,480px] gap-8 lg:gap-12">
            {/* Left: Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary"
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-accent" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info - Sticky */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
              {/* Title & Price */}
              <div>
                <p className="text-sm text-accent font-medium tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center gap-3">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl font-bold">£{product.salePrice}</span>
                      <span className="text-lg text-muted-foreground line-through">
                        £{product.price}
                      </span>
                      <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded">
                        Save £{product.price - product.salePrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">£{product.price}</span>
                  )}
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Color</span>
                  <span className="text-sm text-muted-foreground">{selectedColor?.name}</span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        selectedColor?.hex === color.hex
                          ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                          : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor?.hex === color.hex && (
                        <Check className={`w-4 h-4 ${
                          color.hex === "#fafafa" || color.hex === "#f8f8f5" || color.hex === "#f5f0e8" 
                            ? "text-gray-800" 
                            : "text-white"
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Size</span>
                  <button className="text-sm text-accent hover:underline">Size Guide</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                        selectedSize === size
                          ? "bg-foreground text-background"
                          : "bg-secondary hover:bg-muted border border-border"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="text-sm font-medium block mb-3">Quantity</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 magnetic-btn py-6 text-base"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="py-6"
                  onClick={() => toast.info("Wishlist coming soon")}
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto mb-1 text-accent" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto mb-1 text-accent" />
                  <span className="text-xs text-muted-foreground">30-Day Returns</span>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-accent" />
                  <span className="text-xs text-muted-foreground">Secure Payment</span>
                </div>
              </div>

              {/* Accordions */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description">
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fabric">
                  <AccordionTrigger>Fabric Origin</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.fabricOrigin}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="care">
                  <AccordionTrigger>Care Instructions</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-4 h-4 text-accent" />
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <RelatedProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </MainLayout>
  );
}
