import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    title: "NEW ARRIVAL",
    subtitle: "Modest Fashion Redefined",
    cta: "Shop Now",
    link: "/shop",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=80",
    badge: "NEW COLLECTION 2024",
  },
  {
    id: 2,
    title: "WINTER EDIT",
    subtitle: "Premium Outerwear Collection",
    cta: "Explore",
    link: "/shop?category=outerwear-jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1920&q=80",
  },
  {
    id: 3,
    title: "ESSENTIALS",
    subtitle: "Timeless Thobes & Kurtis",
    cta: "Discover",
    link: "/shop?category=thobes-kurtis",
    image: "https://images.unsplash.com/photo-1589363460779-a0d894afb04a?w=1920&q=80",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent z-10" />
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg"
            >
              {heroSlides[currentSlide].badge && (
                <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full mb-4 backdrop-blur-sm border border-accent/30">
                  {heroSlides[currentSlide].badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Button size="lg" className="magnetic-btn" asChild>
                <Link to={heroSlides[currentSlide].link}>
                  {heroSlides[currentSlide].cta}
                </Link>
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto glass-panel rounded-full w-10 h-10"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto glass-panel rounded-full w-10 h-10"
          onClick={nextSlide}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-foreground w-8"
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
