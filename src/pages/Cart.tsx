import { useCartStore } from "@/store/cartStore";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Cart() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = subtotal > 0 ? 100 : 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {items.length === 0 ? "Your cart is empty" : `${items.length} item${items.length !== 1 ? "s" : ""} in your cart`}
            </p>
          </motion.div>

          {items.length === 0 ? (
            // Empty Cart
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
                <svg
                  className="w-10 h-10 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start shopping to add items to your cart and discover our collection of premium modest fashion.
              </p>
              <Link to="/shop">
                <Button className="bg-accent text-background hover:opacity-90">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            // Cart Items
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
                  <div className="divide-y divide-white/5">
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.productId}-${item.size}-${item.color}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-6 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex gap-4 md:gap-6">
                          {/* Product Image */}
                          <div className="w-24 h-32 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                              <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                                <span>Size: <span className="text-foreground font-medium">{item.size}</span></span>
                                <div className="flex items-center gap-2">
                                  Color:
                                  <div
                                    className="w-4 h-4 rounded-full border border-white/20"
                                    style={{ backgroundColor: item.color }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.size,
                                      item.color,
                                      item.quantity - 1
                                    )
                                  }
                                  className="p-1.5 hover:bg-white/10 rounded transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.size,
                                      item.color,
                                      item.quantity + 1
                                    )
                                  }
                                  className="p-1.5 hover:bg-white/10 rounded transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-muted-foreground mb-1">৳{item.price.toLocaleString()} each</p>
                                <p className="font-semibold text-lg text-accent">
                                  ৳{(item.price * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() =>
                              removeItem(item.productId, item.size, item.color)
                            }
                            className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors self-start"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link to="/shop">
                    <Button variant="outline" className="border-white/10 w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-1 h-fit sticky top-32"
              >
                <div className="bg-card border border-white/5 rounded-2xl p-6 space-y-6">
                  <h2 className="text-xl font-semibold">Order Summary</h2>

                  {/* Summary Items */}
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">৳{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">{subtotal > 0 ? `৳${shipping.toLocaleString()}` : "FREE"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="font-medium">৳{tax.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex justify-between text-base">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-accent text-lg">৳{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <Link to="/checkout" className="block">
                      <Button className="w-full bg-accent text-background hover:opacity-90 font-semibold py-6">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full border-white/10 text-red-500 hover:bg-red-500/10"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>

                  {/* Promo Code */}
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground block">Promo Code</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        className="bg-secondary border-white/10 text-sm h-10"
                      />
                      <Button variant="outline" className="border-white/10 h-10">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
