import { motion } from "framer-motion";
import { Award, RotateCcw, Truck, ShieldCheck } from "lucide-react";

const badges = [
  { icon: Award, text: "Premium Quality" },
  { icon: RotateCcw, text: "Easy Return" },
  { icon: Truck, text: "National Delivery" },
  { icon: ShieldCheck, text: "Safe Payment" },
];

export function TrustBadges() {
  return (
    <section className="py-6 border-y border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center gap-2 py-2"
            >
              <badge.icon className="w-4 h-4 text-accent" />
              <span className="text-xs sm:text-sm text-muted-foreground">{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
