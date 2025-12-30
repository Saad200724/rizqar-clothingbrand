import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { AnimatePresence } from "framer-motion";

export function FloatingCartButton() {
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <motion.button
      onClick={openCart}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 bg-accent rounded-full shadow-lg flex items-center justify-center text-background hover:shadow-xl transition-shadow"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-6 h-6" />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
