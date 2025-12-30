import { MainLayout } from "@/components/layout/MainLayout";
import { Footer } from "@/components/home/Footer";
import { motion } from "framer-motion";

export default function About() {
  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Our Story</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2016, Rizqar was born out of a desire to create high-quality, modest fashion that resonates with the modern Muslim man. We believe that modesty and contemporary style can coexist beautifully.
            </p>
            
            <div className="py-12">
              <div className="w-32 h-32 mx-auto rounded-full bg-secondary mb-6 overflow-hidden border-2 border-accent">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" alt="Mahmud Sahol" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold">Mahmud Sahol</h2>
              <p className="text-accent font-medium uppercase tracking-widest text-sm">Founder & CEO</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left pt-12">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">To empower individuals through modest apparel that reflects their values and personality, without compromising on quality or design.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Our Quality</h3>
                <p className="text-muted-foreground">Every piece is designed with intention, using premium materials sourced from around the world to ensure longevity and comfort.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
}