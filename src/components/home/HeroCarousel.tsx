import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import rizqarLogo from "@/assets/rizqar-logo.jpeg";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  image: string;
  badge?: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "THE NEW STANDARD",
    subtitle: "Men's Modest Fashion, Elevated",
    cta: "Shop Collection",
    link: "/shop",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1920&q=80",
    badge: "NEW COLLECTION 2024",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  return (
    <section className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20 z-10" />
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Logo Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        className="absolute top-1/2 right-10 -translate-y-1/2 z-10 hidden lg:block"
      >
        <img src={rizqarLogo} alt="" className="w-96 h-96 object-cover rounded-full" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {heroSlides[currentSlide].badge && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs font-semibold tracking-widest rounded-full mb-6 backdrop-blur-md border border-accent/20"
                >
                  {heroSlides[currentSlide].badge}
                </motion.span>
              )}
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 leading-none"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 font-light"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <Button size="lg" className="magnetic-btn group px-8 py-6 text-base" asChild>
                  <Link to={heroSlides[currentSlide].link}>
                    {heroSlides[currentSlide].cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-6 text-base glass-panel" asChild>
                  <Link to="/shop">
                    View All
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <div className="absolute inset-y-0 left-6 right-6 z-20 hidden md:flex items-center justify-between pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto glass-panel rounded-full w-12 h-12 hover:scale-110 transition-transform"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto glass-panel rounded-full w-12 h-12 hover:scale-110 transition-transform"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Premium Dots Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "bg-accent w-12"
                : "bg-foreground/20 w-6 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 right-10 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest rotate-90 origin-center translate-y-8">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
