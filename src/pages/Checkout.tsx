import { MainLayout } from "@/components/layout/MainLayout";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ShoppingBag, PhoneCall } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: `${formData.firstName} ${formData.lastName}`,
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
      <div className="pt-32 pb-20 bg-[#f8f9fa] min-h-screen text-[#222] font-['Sora']">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-bold text-background text-2xl">R</div>
              <div>
                <h1 className="text-2xl font-bold">Checkout</h1>
                <p className="text-sm text-gray-500">Complete your order</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 text-right">
              <PhoneCall className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-bold">01XXX-XXXXXX</p>
                <p className="text-xs text-gray-500">Customer Support</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Forms */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Customer Information */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-6 bg-accent rounded-full" />
                   <h2 className="text-lg font-bold">Customer Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold">First Name *</Label>
                    <Input id="firstName" required className="bg-gray-50 border-gray-200 py-6" placeholder="Ex: Mahmud" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold">Last Name *</Label>
                    <Input id="lastName" required className="bg-gray-50 border-gray-200 py-6" placeholder="Ex: Sahol" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold">Phone *</Label>
                    <Input id="phone" required className="bg-gray-50 border-gray-200 py-6" placeholder="Ex: 01XXXXXXXXX" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altPhone" className="text-sm font-semibold">Alternative Phone</Label>
                    <Input id="altPhone" className="bg-gray-50 border-gray-200 py-6" placeholder="Ex: 01XXXXXXXXX" value={formData.altPhone} onChange={(e) => setFormData({...formData, altPhone: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Select Location */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-6 bg-accent rounded-full" />
                   <h2 className="text-lg font-bold">Select Location</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="division" className="text-sm font-semibold">Division *</Label>
                    <select id="division" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent" value={formData.division} onChange={(e) => setFormData({...formData, division: e.target.value})}>
                      <option value="">Select Division</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chattogram">Chattogram</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-sm font-semibold">District *</Label>
                    <select id="district" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})}>
                      <option value="">Select District</option>
                      <option value="Dhaka">Dhaka</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thana" className="text-sm font-semibold">Thana/Upazilla *</Label>
                    <Input id="thana" required className="bg-gray-50 border-gray-200 py-6" placeholder="Enter your thana/upazilla" value={formData.thana} onChange={(e) => setFormData({...formData, thana: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postCode" className="text-sm font-semibold">Post Code</Label>
                    <Input id="postCode" className="bg-gray-50 border-gray-200 py-6" placeholder="Enter post code" value={formData.postCode} onChange={(e) => setFormData({...formData, postCode: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-semibold">Full Address *</Label>
                  <textarea id="address" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Your full address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email *</Label>
                  <Input id="email" type="email" required className="bg-gray-50 border-gray-200 py-6" placeholder="yourname@gmail.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-6 bg-accent rounded-full" />
                   <h2 className="text-lg font-bold">Order Notes</h2>
                </div>
                <textarea id="notes" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Notes about your order, e.g. special notes for delivery." value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-6 bg-accent rounded-full" />
                   <h2 className="text-lg font-bold">Order Overview</h2>
                </div>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item._id} className="flex justify-between items-start text-sm">
                      <span className="font-medium max-w-[200px]">{item.name} × {item.quantity}</span>
                      <span className="font-bold">৳{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">SubTotal</span>
                    <span className="font-bold">৳{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Charge</span>
                    <span className="font-bold">৳0</span>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg text-[10px] space-y-1 text-red-800 border border-red-100">
                    <p className="font-bold uppercase flex items-center gap-1"><span className="text-lg leading-none">⚠</span> Select a district above</p>
                    <p>• Inside Dhaka: ৳80 (up to 2kg)</p>
                    <p>• Outside Dhaka: ৳130 (up to 1kg)</p>
                    <p>Additional ৳20/kg will be charged for extra weight</p>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-100">
                    <span>Grand Total</span>
                    <span className="text-accent">৳{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-500">Have a coupon?</span>
                     <button type="button" className="text-accent font-bold hover:underline">Apply coupon ▾</button>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="font-bold text-sm">Payment Method</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 border border-accent rounded-xl bg-accent/5 cursor-pointer transition-all">
                        <input type="radio" name="payment" value="cod" checked className="accent-accent" readOnly />
                        <span className="text-sm font-semibold">Cash On Delivery</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50 cursor-not-allowed opacity-60">
                        <input type="radio" name="payment" disabled className="accent-accent" />
                        <span className="text-sm font-semibold">Bkash</span>
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#fcd34d] hover:bg-[#fbd13c] text-black font-bold py-8 rounded-xl shadow-sm text-lg border border-[#f59e0b]/20">
                    Place Order
                  </Button>
                </div>

                <div className="pt-6 text-center space-y-2">
                   <h4 className="font-bold text-sm">Rizqar Modest Wear</h4>
                   <p className="text-[10px] text-gray-500 leading-relaxed">
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