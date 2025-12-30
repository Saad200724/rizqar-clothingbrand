import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { name: "Total Revenue", value: "৳128,430", change: "+12.5%", trend: "up", icon: TrendingUp },
  { name: "Active Orders", value: "42", change: "+4", trend: "up", icon: ShoppingCart },
  { name: "Total Products", value: "156", change: "+12", trend: "up", icon: Package },
  { name: "Customer Visits", value: "2,420", change: "-2.1%", trend: "down", icon: Users },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-white/5 p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-accent/10 rounded-xl">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  </div>
                </div>
                <h3 className="text-sm text-muted-foreground mb-1">{stat.name}</h3>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Activity & Orders */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Recent Orders</h3>
              <button className="text-xs text-accent hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((order) => (
                <div key={order} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center font-bold text-xs">#ORD</div>
                    <div>
                      <h4 className="text-sm font-semibold">Order #12{order}45</h4>
                      <p className="text-[10px] text-muted-foreground">Customer: Ahmed Khan • 2 items</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-accent">৳2,450</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">Processing</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-white/5 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-6">Activity Log</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-accent" />
                    </div>
                    {i < 4 && <div className="absolute top-8 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold">New Product Added</h4>
                    <p className="text-[10px] text-muted-foreground mb-1">Premium Silk Thobe added to collection</p>
                    <span className="text-[10px] text-accent/50">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}