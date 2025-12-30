import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import rizqarLogo from "@/assets/rizqar-logo.jpeg";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-12 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src={rizqarLogo}
                alt="Rizqar"
                className="h-12 w-auto rounded-lg"
              />
            </Link>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Empowering the Muslim lifestyle since 2016. Dedicated to providing quality products that align with faith, culture, and modern living.
            </p>
            {/* Payment Icons Placeholder */}
            <div className="flex gap-2">
              <div className="px-2 py-1 bg-secondary rounded text-[8px] font-bold text-muted-foreground">VISA</div>
              <div className="px-2 py-1 bg-secondary rounded text-[8px] font-bold text-muted-foreground">BKASH</div>
              <div className="px-2 py-1 bg-secondary rounded text-[8px] font-bold text-muted-foreground">CASH ON DELIVERY</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Security</Link></li>
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Track Order</Link></li>
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Full Catalog</Link></li>
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Affiliate Registration</Link></li>
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Return and Refund</Link></li>
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Contact us</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>+44 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>rizqarmodest@gmail.com</span>
              </li>
            </ul>
            
            <h4 className="font-semibold mt-6 mb-3 text-sm">Follow us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            ©RIZQAR {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
