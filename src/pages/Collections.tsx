import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { categories } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Collections() {
  return (
    <MainLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">Collections</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10"
              >
                <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 transition-opacity group-hover:opacity-40" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
                  <p className="text-muted-foreground mb-6 max-w-sm">{category.description}</p>
                  <Link to={`/shop?category=${category.slug}`} className="flex items-center gap-2 text-accent font-bold group/link">
                    Explore Collection <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}