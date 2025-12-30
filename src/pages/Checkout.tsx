import { MainLayout } from "@/components/layout/MainLayout";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ChevronRight, ShoppingBag } from "lucide-react";

export default function Checkout() {
  const { items, clearCart, total } = useCartStore();
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Dhaka",
    paymentMethod: "cod"
  });

  if (items.length === 0 && !isOrdered) {
    return (
      <MainLayout>
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate("/shop")} className="bg-accent text-background">Return to Shop</Button>
        </div>
      </MainLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order object for persistence
    const newOrder = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: `৳${total().toLocaleString()}`,
      status: "Pending",
      items: items.length
    };

    // Save to localStorage for Admin Panel access
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
            <h1 className="text-4xl font-bold">Order Confirmed</h1>
            <p className="text-muted-foreground">Thank you for choosing RIZQAR. Your order is being processed and will be delivered soon.</p>
            <Button onClick={() => navigate("/")} className="w-full bg-accent text-background rounded-full py-6 font-bold">Back to Home</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-32 pb-20 container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Checkout</h1>
              <p className="text-muted-foreground">Please provide your delivery details below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    required 
                    className="bg-white/5 border-white/10 rounded-xl" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      className="bg-white/5 border-white/10 rounded-xl"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      required 
                      placeholder="017XXXXXXXX"
                      className="bg-white/5 border-white/10 rounded-xl"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input 
                    id="address" 
                    required 
                    className="bg-white/5 border-white/10 rounded-xl"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value="Dhaka" disabled className="bg-white/5 border-white/10 rounded-xl opacity-50" />
                </div>
              </div>

              <div className="p-6 bg-accent/5 rounded-2xl border border-accent/10">
                <h3 className="font-bold mb-2">Payment Method</h3>
                <p className="text-sm text-accent">Cash on Delivery (COD)</p>
                <p className="text-[10px] text-muted-foreground mt-1">Available across Bangladesh</p>
              </div>

              <Button type="submit" className="w-full bg-accent text-background py-7 rounded-full font-bold text-lg shadow-glow">
                Confirm Order (৳{total().toLocaleString()})
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-32 h-fit space-y-8">
            <div className="bg-card border border-white/10 rounded-[2rem] p-8 space-y-6">
              <h3 className="text-xl font-bold">Order Summary</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-20 h-24 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">Size: {item.size} • Color: {item.color}</p>
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-xs">Qty: {item.quantity}</span>
                        <span className="font-bold text-accent">৳{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>৳{total().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-green-500 font-bold uppercase text-[10px]">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 text-white">
                  <span>Total</span>
                  <span className="text-accent">৳{total().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}