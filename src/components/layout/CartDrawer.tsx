import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
    useCartStore();
  const subtotal = getSubtotal();
  const shipping = subtotal >= 150 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md glass-strong border-l border-border"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">Your Cart</h2>
                  <span className="text-sm text-muted-foreground">
                    ({items.length} {items.length === 1 ? "item" : "items"})
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeCart}
                  className="p-2 rounded-xl hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Discover our collection and add items to your cart
                    </p>
                    <Button onClick={closeCart} asChild>
                      <Link to="/shop">Continue Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.productId}-${item.size}-${item.color}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4"
                      >
                        {/* Product Image */}
                        <div className="w-24 h-28 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-sm leading-tight">
                                {item.name}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.size} / {item.color}
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                removeItem(item.productId, item.size, item.color)
                              }
                              className="p-1 hover:bg-secondary rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4 text-muted-foreground" />
                            </motion.button>
                          </div>

                          <div className="flex items-end justify-between mt-auto">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.color,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1.5 hover:bg-muted rounded-md transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <span className="text-sm font-medium w-6 text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.color,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1.5 hover:bg-muted rounded-md transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <span className="font-semibold">
                              ৳{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border p-6 space-y-4">
                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-500">Free</span>
                        ) : (
                          `৳${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over ৳1500
                      </p>
                    )}
                    <div className="flex justify-between font-semibold pt-2 border-t border-border">
                      <span>Total</span>
                      <span>৳{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button className="w-full magnetic-btn" size="lg">
                      Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={closeCart}
                      asChild
                    >
                      <Link to="/shop">Continue Shopping</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
