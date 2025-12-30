import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-8"
        >
          Shop By Category
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/shop?category=${category.slug}`}
                className="group block relative aspect-[4/5] rounded-xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                
                {/* Category Name Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-center px-2 text-foreground drop-shadow-lg">
                    {category.name}
                  </span>
                </div>
                
                {/* Bottom Label */}
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {category.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
