import { MainLayout } from "@/components/layout/MainLayout";
import { Footer } from "@/components/home/Footer";
import { categories } from "@/data/products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Collections() {
  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 text-center">Our Collections</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[400px] rounded-2xl overflow-hidden"
              >
                <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
                  <p className="text-muted-foreground mb-6">{category.description}</p>
                  <Link to={`/shop?category=${category.slug}`} className="inline-block px-6 py-3 bg-accent text-background font-bold rounded-xl hover:opacity-90 transition-opacity">
                    Explore Collection
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
}