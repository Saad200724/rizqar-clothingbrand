import { MainLayout } from "@/components/layout/MainLayout";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (items.length === 0 && !isOrdered) {
    return (
      <MainLayout>
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4 text-white">Your cart is empty</h1>
          <Button onClick={() => navigate("/shop")} className="bg-accent text-background">Return to Shop</Button>
        </div>
      </MainLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: formData.name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: `৳${cartTotal.toLocaleString()}`,
      status: "Pending",
      items: items.length
    };
    const existingOrders = JSON.parse(localStorage.getItem("rizqar_orders") || "[]");
    localStorage.setItem("rizqar_orders", JSON.stringify([newOrder, ...existingOrders]));
    setIsOrdered(true);
    clearCart();
    toast.success("Order placed successfully!");
  };

  if (isOrdered) {
    return (
      <MainLayout>
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-card border border-white/10 p-12 rounded-[2rem] space-y-6">
            <CheckCircle2 className="w-20 h-20 text-accent mx-auto" />
            <h1 className="text-4xl font-bold text-white">Order Confirmed</h1>
            <p className="text-muted-foreground">Thank you for choosing RIZQAR. Your order is being processed.</p>
            <Button onClick={() => navigate("/")} className="w-full bg-accent text-background rounded-full py-6 font-bold">Back to Home</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-32 pb-20 container mx-auto px-4 text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Checkout</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required className="bg-white/5 border-white/10" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" required className="bg-white/5 border-white/10" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required className="bg-white/5 border-white/10" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>
              <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-sm font-bold text-accent">Payment: Cash on Delivery (COD)</p>
              </div>
              <Button type="submit" className="w-full bg-accent text-background py-6 rounded-full font-bold">Confirm Order (৳{cartTotal.toLocaleString()})</Button>
            </form>
          </div>
          <div className="bg-card border border-white/10 rounded-[2rem] p-8 h-fit">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between font-bold text-xl pt-4 border-t border-white/10">
                <span>Total</span>
                <span className="text-accent">৳{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}