import { MainLayout } from "@/components/layout/MainLayout";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag, PhoneCall, ShoppingCart } from "lucide-react";

// Bangladesh Divisions and Districts
const BD_DIVISIONS = [
  { name: "Dhaka", id: "dhaka" },
  { name: "Chattogram", id: "chattogram" },
  { name: "Khulna", id: "khulna" },
  { name: "Rajshahi", id: "rajshahi" },
  { name: "Rangpur", id: "rangpur" },
  { name: "Barisal", id: "barisal" },
  { name: "Sylhet", id: "sylhet" },
  { name: "Mymensingh", id: "mymensingh" }
];

const BD_DISTRICTS: Record<string, string[]> = {
  dhaka: ["Dhaka", "Faridpur", "Gazipur", "Manikganj", "Munshiganj", "Narayanganj", "Shariatpur", "Tangail"],
  chattogram: ["Chattogram", "Bandarban", "Brahmanbaria", "Chandpur", "Cumilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali"],
  khulna: ["Khulna", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Magura", "Narail", "Satkhira"],
  rajshahi: ["Rajshahi", "Bogura", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Rajshahi"],
  rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  barisal: ["Barisal", "Barguna", "Barisal", "Bhola", "Jhalokati", "Jhaloketo", "Patuakhali", "Pirojpur"],
  sylhet: ["Sylhet", "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
  mymensingh: ["Mymensingh", "Jamalpur", "Kishoreganj", "Mymensingh", "Netrokona"]
};

const DHAKA_DISTRICTS = ["Dhaka"];
const SHIPPING_COST = {
  dhaka: 80,
  other: 130
};

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    altPhone: "",
    division: "",
    district: "",
    thana: "",
    postCode: "",
    address: "",
    email: "",
    notes: "",
    paymentMethod: "cod"
  });

  if (items.length === 0 && !isOrdered) {
    return (
      <MainLayout>
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4 text-white font-['Sora']">Your cart is empty</h1>
          <Button onClick={() => navigate("/shop")} className="bg-accent text-background rounded-full px-8 py-6 font-bold">Return to Shop</Button>
        </div>
      </MainLayout>
    );
  }

  // Calculate shipping cost
  const shippingCost = DHAKA_DISTRICTS.includes(formData.district) ? SHIPPING_COST.dhaka : SHIPPING_COST.other;
  const tax = Math.round(cartTotal * 0.1);
  const grandTotal = cartTotal + (formData.district ? shippingCost : 0) + tax;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newOrder = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: `${formData.firstName} ${formData.lastName}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: `৳${grandTotal.toLocaleString()}`,
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
            <h1 className="text-4xl font-bold text-white font-['Sora']">Order Confirmed</h1>
            <p className="text-muted-foreground">Thank you for choosing RIZQAR. Your order is being processed.</p>
            <Button onClick={() => navigate("/")} className="w-full bg-accent text-background rounded-full py-6 font-bold">Back to Home</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-32 pb-20 bg-background min-h-screen text-foreground font-['Sora']">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-card p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-bold text-background text-2xl">R</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Checkout</h1>
                <p className="text-sm text-muted-foreground">Complete your order</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 text-right">
              <PhoneCall className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-bold text-white">01XXX-XXXXXX</p>
                <p className="text-xs text-muted-foreground">Customer Support</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Forms */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Customer Information */}
              <div className="bg-card p-8 rounded-2xl border border-white/10 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-6 bg-accent rounded-full" />
                   <h2 className="text-lg font-bold text-white">Customer Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-white">First Name *</Label>
                    <Input id="firstName" required className="bg-secondary border-white/10 py-6 text-white" placeholder="Ex: Mahmud" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-white">Last Name *</Label>
                    <Input id="lastName" required className="bg-secondary border-white/10 py-6 text-white" placeholder="Ex: Sahol" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-white">Phone *</Label>
                    <Input id="phone" required className="bg-secondary border-white/10 py-6 text-white" placeholder="Ex: 01XXXXXXXXX" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altPhone" className="text-sm font-semibold text-white">Alternative Phone</Label>
                    <Input id="altPhone" className="bg-secondary border-white/10 py-6 text-white" placeholder="Ex: 01XXXXXXXXX" value={formData.altPhone} onChange={(e) => setFormData({...formData, altPhone: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Select Location */}
              <div className="bg-card p-8 rounded-2xl border border-white/10 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-6 bg-accent rounded-full" />
                   <h2 className="text-lg font-bold text-white">Select Location</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="division" className="text-sm font-semibold text-white">Division *</Label>
                    <select id="division" required className="w-full bg-secondary border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent" value={formData.division} onChange={(e) => setFormData({...formData, division: e.target.value, district: ""})}>
                      <option value="">Select Division</option>
                      {BD_DIVISIONS.map((div) => (
                        <option key={div.id} value={div.id}>{div.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-sm font-semibold text-white">District *</Label>
                    <select id="district" required className="w-full bg-secondary border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} disabled={!formData.division}>
                      <option value="">Select District</option>
                      {formData.division && BD_DISTRICTS[formData.division]?.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thana" className="text-sm font-semibold text-white">Thana/Upazilla *</Label>
                    <Input id="thana" required className="bg-secondary border-white/10 py-6 text-white" placeholder="Enter your thana/upazilla" value={formData.thana} onChange={(e) => setFormData({...formData, thana: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postCode" className="text-sm font-semibold text-white">Post Code</Label>
                    <Input id="postCode" className="bg-secondary border-white/10 py-6 text-white" placeholder="Enter post code" value={formData.postCode} onChange={(e) => setFormData({...formData, postCode: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-semibold text-white">Full Address *</Label>
                  <textarea id="address" required className="w-full bg-secondary border border-white/10 rounded-lg p-4 text-sm min-h-[100px] text-white focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Your full address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-white">Email *</Label>
                  <Input id="email" type="email" required className="bg-secondary border-white/10 py-6 text-white" placeholder="yourname@gmail.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-card p-8 rounded-2xl border border-white/10 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-6 bg-accent rounded-full" />
                   <h2 className="text-lg font-bold text-white">Order Notes</h2>
                </div>
                <textarea id="notes" className="w-full bg-secondary border border-white/10 rounded-lg p-4 text-sm min-h-[100px] text-white focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Notes about your order, e.g. special notes for delivery." value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
              <div className="bg-card p-8 rounded-2xl border border-white/10 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-6 bg-accent rounded-full" />
                   <h2 className="text-lg font-bold text-white">Order Overview</h2>
                </div>

                {/* Cart Link */}
                <Link to="/cart" className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-white/5 transition-colors group">
                  <span className="text-sm text-muted-foreground">View full cart</span>
                  <ShoppingCart className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-start text-sm">
                      <span className="font-medium max-w-[200px] text-white">{item.name} × {item.quantity}</span>
                      <span className="font-bold text-accent">৳{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">SubTotal</span>
                    <span className="font-bold text-white">৳{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-bold text-white">{formData.district ? `৳${shippingCost}` : "TBD"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-bold text-white">৳{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-4 border-t border-white/10">
                    <span className="text-white">Grand Total</span>
                    <span className="text-accent">৳{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-muted-foreground">Have a coupon?</span>
                     <button type="button" className="text-accent font-bold hover:underline">Apply coupon ▾</button>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="font-bold text-sm text-white">Payment Method</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 border border-accent rounded-xl bg-accent/10 cursor-pointer transition-all">
                        <input type="radio" name="payment" value="cod" checked className="accent-accent" readOnly />
                        <span className="text-sm font-semibold text-white">Cash On Delivery</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-white/10 rounded-xl bg-white/5 cursor-not-allowed opacity-60">
                        <input type="radio" name="payment" disabled className="accent-accent" />
                        <span className="text-sm font-semibold text-white">Bkash</span>
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:opacity-90 text-background font-bold py-8 rounded-xl text-lg">
                    Place Order
                  </Button>
                </div>

                <div className="pt-6 text-center space-y-2">
                   <h4 className="font-bold text-sm text-white">Rizqar Modest Wear</h4>
                   <p className="text-[10px] text-muted-foreground leading-relaxed">
                     ADDRESS: Dhaka, Bangladesh<br />
                     Hotline: 01XXX-XXXXXX<br />
                     Email: contact@rizqar.com
                   </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}