import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import rizqarLogo from "@/assets/rizqar-logo.jpeg";

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand & Vision */}
          <div className="md:col-span-4 space-y-8">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-bold text-background group-hover:scale-110 transition-transform">R</div>
                <span className="text-2xl font-bold tracking-tighter text-white">RIZQAR</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Crafting premium modest fashion since 2016. Our mission is to provide the modern Muslim man with sophisticated attire that honors tradition through contemporary design.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {['Shop All', 'Collections', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-muted-foreground hover:text-accent text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-4">
              {['Track Order', 'Shipping Info', 'Returns', 'Size Guide'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-muted-foreground hover:text-accent text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Stay Connected</h4>
            <p className="text-muted-foreground text-sm">Join the RIZQAR inner circle for exclusive early access to the 2026 collection.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-background hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
              <span className="text-[10px] font-bold tracking-tighter border border-white/20 px-2 py-0.5 rounded">VISA</span>
              <span className="text-[10px] font-bold tracking-tighter border border-white/20 px-2 py-0.5 rounded">BKASH</span>
              <span className="text-[10px] font-bold tracking-tighter border border-white/20 px-2 py-0.5 rounded">COD</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em]">
            © 2026 RIZQAR EST. 2016 • Dhaka, Bangladesh
          </p>
          
          <div className="flex gap-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-white text-[10px] uppercase tracking-widest transition-colors">Privacy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-white text-[10px] uppercase tracking-widest transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
