import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Grid3X3, Search, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const tabs = [
  { name: "Home", path: "/", icon: Home },
  { name: "Shop", path: "/shop", icon: Grid3X3 },
  { name: "Search", path: "/search", icon: Search },
  { name: "Cart", path: "cart", icon: ShoppingBag, isAction: true },
  { name: "Profile", path: "/profile", icon: User },
];

export function BottomTabBar() {
  const location = useLocation();
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-strong pb-safe"
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          if (tab.isAction) {
            return (
              <button
                key={tab.name}
                onClick={openCart}
                className="relative flex flex-col items-center justify-center w-16 h-full"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {itemCount > 9 ? "9+" : itemCount}
                    </motion.span>
                  )}
                </motion.div>
                <span className="text-[10px] mt-1 text-muted-foreground">
                  {tab.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="relative flex flex-col items-center justify-center w-16 h-full"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
              <span
                className={`text-[10px] mt-1 transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
