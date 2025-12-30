import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import founderImage from "@/assets/rizqar-logo.jpeg"; // Using logo as placeholder for founder if specific image not available

export default function About() {
  return (
    <MainLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Our Story</h1>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-secondary border border-white/10">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800" alt="Mahmud Sahol" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-accent">The Visionary</h2>
                <h3 className="text-xl font-semibold">Mahmud Sahol</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2016 by <strong>Mahmud Sahol</strong>, RIZQAR was born from a desire to bridge the gap between traditional modest values and contemporary global fashion.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mahmud's vision was clear: to empower the modern Muslim man with clothing that doesn't compromise on style, quality, or faith. Every stitch in a RIZQAR garment reflects our founder's dedication to craftsmanship and community.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold">Our Philosophy</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto italic">
                "Modesty is not just a way of dressing, it's a way of living. We strive to provide the tools for that lifestyle."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}