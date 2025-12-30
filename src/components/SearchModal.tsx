import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { products as initialProducts } from "@/data/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<typeof initialProducts>([]);
  const navigate = useNavigate();

  // Get products from localStorage or use initial
  const products = (() => {
    const saved = localStorage.getItem("admin_products");
    return saved ? JSON.parse(saved) : initialProducts;
  })();

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = products.filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [searchTerm, products]);

  const handleProductClick = (slug: string) => {
    navigate(`/product/${slug}`);
    onClose();
    setSearchTerm("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 pt-24"
          >
            <div className="container mx-auto px-4 max-w-2xl">
              <div className="bg-card border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                {/* Search Input */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3">
                    <SearchIcon className="w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search products by name, category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                      className="flex-1 bg-transparent outline-none text-white placeholder:text-muted-foreground"
                    />
                    <button
                      onClick={onClose}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Search Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {searchTerm.trim() === "" ? (
                    <div className="p-8 text-center">
                      <SearchIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground">Start typing to search products</p>
                    </div>
                  ) : results.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No products found for "{searchTerm}"</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {results.map((product, index) => (
                        <motion.button
                          key={product._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleProductClick(product.slug)}
                          className="w-full p-4 flex gap-4 hover:bg-white/5 transition-colors text-left group"
                        >
                          {/* Product Image */}
                          <div className="w-16 h-20 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white group-hover:text-accent transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-accent font-bold">৳{product.salePrice || product.price}</span>
                              {product.salePrice && product.price > product.salePrice && (
                                <span className="text-xs text-muted-foreground line-through">৳{product.price}</span>
                              )}
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex items-center">
                            <span className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all">→</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {results.length > 0 && (
                  <div className="p-3 bg-secondary text-center text-xs text-muted-foreground border-t border-white/10">
                    {results.length} product{results.length !== 1 ? "s" : ""} found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
