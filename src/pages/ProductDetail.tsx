import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Truck, RotateCcw, Shield, ChevronDown, Check, Share2, Facebook, Twitter, Linkedin, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Footer } from "@/components/home/Footer";
import { getProductBySlug, getProductsByCategory, Product, products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

function ProductCard({ product }: { product: Product }) {
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
        ৳{product.salePrice || product.price}
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
    addItem({
      productId: product._id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor?.name || product.colors[0].name,
      quantity: quantity
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="pt-24 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-foreground">Shop</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Images */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-12 gap-4">
                {/* Thumbnails */}
                <div className="col-span-2 space-y-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-full aspect-[4/5] rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? "border-accent shadow-glow" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                {/* Main Image */}
                <div className="col-span-10">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary border border-border/50"
                  >
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                    {product.category}
                  </Badge>
                  {product.isNew && (
                    <Badge className="bg-accent text-background">NEW ARRIVAL</Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-accent">৳{product.salePrice || product.price}</span>
                  {product.salePrice && (
                    <span className="text-xl text-muted-foreground line-through opacity-50">৳{product.price}</span>
                  )}
                </div>
              </div>

              {/* Selection */}
              <div className="space-y-6 p-6 rounded-2xl bg-card border border-border/50">
                {/* Size */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold uppercase tracking-wider">Select Size: <span className="text-accent">{selectedSize}</span></span>
                    <button className="text-xs text-accent hover:underline font-medium">View Size Chart</button>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 flex items-center justify-center text-sm font-bold rounded-xl transition-all ${
                          selectedSize === size
                            ? "bg-accent text-background shadow-glow"
                            : "bg-secondary hover:bg-muted border border-border/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wider block mb-4">Color: <span className="text-accent">{selectedColor?.name}</span></span>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          selectedColor?.hex === color.hex
                            ? "ring-2 ring-accent ring-offset-4 ring-offset-background scale-110"
                            : "hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {selectedColor?.hex === color.hex && (
                          <Check className="w-4 h-4 text-background invert" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 space-y-4">
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="flex-1 h-14 text-base font-bold bg-secondary text-foreground hover:bg-muted"
                      onClick={handleAddToCart}
                    >
                      Add To Cart
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 h-14 text-base font-bold bg-accent text-background hover:opacity-90 shadow-glow"
                      onClick={() => { handleAddToCart(); navigate('/cart'); }}
                    >
                      Order Now
                    </Button>
                    <Button variant="outline" className="h-14 w-14 rounded-xl">
                      <Heart className="w-6 h-6" />
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] text-center">
                    SKU: {product._id.slice(-8).toUpperCase()} | Category: {product.category.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Details Tabs */}
              <Accordion type="single" collapsible defaultValue="description" className="w-full">
                <AccordionItem value="description" className="border-border/50">
                  <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:text-accent">Description</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {product.description}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="delivery" className="border-border/50">
                  <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:text-accent">Delivery</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Inside Dhaka: 2-3 Working Days</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Outside Dhaka: 3-5 Working Days</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Cash on Delivery Available</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Social Share */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Share:</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-accent"><Facebook className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-accent"><Twitter className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-accent"><Linkedin className="w-4 h-4" /></Button>
                </div>
                <Button variant="outline" size="sm" className="ml-auto gap-2 text-[10px] font-bold uppercase tracking-wider">
                  <Store className="w-3 h-3" /> Find in store
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Recommended For You</h2>
              <Button variant="ghost" className="text-accent" asChild>
                <Link to="/shop">View All Collections</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </MainLayout>
  );
}
