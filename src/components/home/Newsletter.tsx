import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Subscribe Our Newsletter
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Get notifications about exclusive offers, product updates and good deals.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Address..."
              className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-colors text-sm"
              required
            />
            <Button type="submit" className="magnetic-btn px-6">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
