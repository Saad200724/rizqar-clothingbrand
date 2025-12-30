import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Filter, X, ChevronDown, ShoppingCart, Heart, Grid3X3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Footer } from "@/components/home/Footer";
import { products, categories, Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProductCard({ product, index }: { product: Product; index: number }) {
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
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
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
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-background/95 backdrop-blur-md rounded-xl p-3 space-y-3 border border-border/50">
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
          </div>
        </div>
      </Link>
      
      <div className="space-y-2">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-sm line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="font-bold">£{product.salePrice}</span>
              <span className="text-sm text-muted-foreground line-through">
                £{product.price}
              </span>
            </>
          ) : (
            <span className="font-bold">£{product.price}</span>
          )}
        </div>

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

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const categoryFilter = searchParams.get("category") || "";

  const allSizes = ["S", "M", "L", "XL", "XXL", "S/M", "L/XL", "One Size"];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (categoryFilter) {
      result = result.filter(p => p.categorySlug === categoryFilter);
    }

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }

    // Price filter
    result = result.filter(p => {
      const price = p.salePrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-high":
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [categoryFilter, selectedSizes, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchParams({});
    setSelectedSizes([]);
    setPriceRange([0, 500]);
    setSortBy("featured");
  };

  const activeFiltersCount = (categoryFilter ? 1 : 0) + (selectedSizes.length > 0 ? 1 : 0);

  const currentCategory = categories.find(c => c.slug === categoryFilter);

  return (
    <MainLayout>
      {/* Header */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {currentCategory ? currentCategory.name : "All Products"}
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              {currentCategory ? currentCategory.description : "Explore our complete collection of men's modest fashion"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-y border-border py-4">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Filter Button */}
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-accent text-background text-xs flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Categories */}
                    <div>
                      <h4 className="font-semibold mb-3">Category</h4>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSearchParams({})}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            !categoryFilter ? "bg-accent text-background" : "hover:bg-secondary"
                          }`}
                        >
                          All Products
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat._id}
                            onClick={() => setSearchParams({ category: cat.slug })}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              categoryFilter === cat.slug ? "bg-accent text-background" : "hover:bg-secondary"
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sizes */}
                    <div>
                      <h4 className="font-semibold mb-3">Size</h4>
                      <div className="flex flex-wrap gap-2">
                        {allSizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => {
                              setSelectedSizes(prev =>
                                prev.includes(size)
                                  ? prev.filter(s => s !== size)
                                  : [...prev, size]
                              );
                            }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                              selectedSizes.includes(size)
                                ? "bg-foreground text-background"
                                : "bg-secondary hover:bg-muted"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                      <Button variant="outline" className="w-full" onClick={clearFilters}>
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Active Filters */}
              {categoryFilter && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full text-sm">
                  {currentCategory?.name}
                  <button onClick={() => setSearchParams({})} className="hover:text-accent">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Right: Sort & Grid */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {filteredProducts.length} products
              </span>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Grid Toggle - Desktop only */}
              <div className="hidden lg:flex items-center gap-1 border border-border rounded-lg p-1">
                <button
                  onClick={() => setGridCols(2)}
                  className={`p-1.5 rounded ${gridCols === 2 ? "bg-secondary" : ""}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded ${gridCols === 3 ? "bg-secondary" : ""}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded ${gridCols === 4 ? "bg-secondary" : ""}`}
                >
                  <div className="grid grid-cols-4 gap-0.5 w-4 h-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="w-0.5 h-0.5 bg-current rounded-full" />
                    ))}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No products found</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={`grid gap-4 md:gap-6 grid-cols-2 ${
              gridCols === 2 ? "lg:grid-cols-2" : gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </MainLayout>
  );
}
