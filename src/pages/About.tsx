import { MainLayout } from "@/components/layout/MainLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote, Award, Users, Globe } from "lucide-react";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <MainLayout>
      <div ref={containerRef} className="bg-[#050505] text-white font-['Sora'] selection:bg-accent selection:text-background">
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50" />
          </div>
          
          <div className="container mx-auto px-4 z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="text-accent font-bold tracking-[0.5em] uppercase text-sm mb-6 inline-block">ESTABLISHED 2025</span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-none">
                OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent bg-300% animate-gradient">LEGACY</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                Defining the intersection of sacred tradition and avant-garde modest fashion for the global citizen.
              </p>
            </motion.div>
          </div>

          <motion.div 
            style={{ opacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] tracking-[0.3em] text-accent/50 uppercase">Scroll to explore</span>
            <div className="w-px h-20 bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </section>

        {/* Founder Feature */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src="/attached_assets/image_1767080601251.png" 
                    alt="Mahmud Sahol" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8">
                     <h3 className="text-2xl font-bold mb-1">Mahmud Sahol</h3>
                     <p className="text-accent text-sm font-semibold tracking-widest uppercase">Founder & Creative Director</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-10"
              >
                <div className="inline-flex items-center gap-4 text-accent">
                   <div className="h-px w-12 bg-accent" />
                   <span className="text-sm font-bold uppercase tracking-widest">The Visionary</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                  Crafting a new <br />
                  <span className="text-accent">narrative</span> for modesty.
                </h2>
                
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
                  <p>
                    RIZQAR was founded in 2025 by <strong>Mahmud Sahol</strong> with a singular mission: to liberate modest fashion from the constraints of the past.
                  </p>
                  <p>
                    By merging high-performance textiles with timeless silhouettes, Mahmud has redefined what it means to dress with intention. Every collection is a testament to the belief that modesty is not about hiding, but about expressing character with quiet confidence.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8">
                   <div className="space-y-2">
                      <p className="text-3xl font-bold text-white">2025</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Inception</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-3xl font-bold text-white">Dhaka</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Hq Location</p>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy / Stats */}
        <section className="py-32 bg-white/5 relative border-y border-white/5">
           <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-16 text-center">
                 {[
                   { icon: Globe, label: "Heritage", value: "Bangladesh", desc: "Proudly rooted in Dhaka" },
                   { icon: Award, label: "Quality First", value: "Premium Craft", desc: "Masterfully sourced materials" },
                   { icon: Users, label: "Community", value: "10k+ Members", desc: "The growing RIZQAR circle" }
                 ].map((item, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.2 }}
                     className="space-y-4"
                   >
                     <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group hover:bg-accent transition-colors duration-500">
                        <item.icon className="w-8 h-8 text-accent group-hover:text-background transition-colors duration-500" />
                     </div>
                     <h4 className="text-3xl font-bold">{item.value}</h4>
                     <p className="text-accent text-sm font-bold uppercase tracking-widest">{item.label}</p>
                     <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">{item.desc}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Signature Quote */}
        <section className="py-40 relative">
          <div className="container mx-auto px-4 text-center">
             <Quote className="w-12 h-12 text-accent/30 mx-auto mb-10" />
             <motion.h3 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="text-3xl md:text-5xl lg:text-6xl font-bold italic tracking-tight max-w-5xl mx-auto leading-tight"
             >
               "Modesty is the ultimate sophistication. It is not an outfit, it's an <span className="text-accent">ethos</span> that we carry with pride."
             </motion.h3>
             <p className="mt-10 text-accent font-bold tracking-[0.3em] uppercase">– Mahmud Sahol</p>
          </div>
        </section>

      </div>
    </MainLayout>
  );
}