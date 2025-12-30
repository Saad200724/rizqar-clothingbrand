import { AdminLayout } from "@/components/admin/AdminLayout";
import { Package, MoreHorizontal, Edit2, Trash2, Eye, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockOrders = [
  { id: "#ORD-7241", customer: "Ahmed Khan", date: "Oct 24, 2024", total: "৳4,250", status: "Delivered", items: 2 },
  { id: "#ORD-7242", customer: "Sara Ali", date: "Oct 25, 2024", total: "৳2,100", status: "Processing", items: 1 },
  { id: "#ORD-7243", customer: "Zaid Omar", date: "Oct 25, 2024", total: "৳8,450", status: "Shipped", items: 4 },
  { id: "#ORD-7244", customer: "Fatima Noor", date: "Oct 26, 2024", total: "৳1,850", status: "Pending", items: 1 },
  { id: "#ORD-7245", customer: "Rahat Kabir", date: "Oct 26, 2024", total: "৳5,600", status: "Cancelled", items: 3 },
];

export default function AdminOrders() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders and fulfillment.</p>
        </div>

        <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-accent">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4 font-bold">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border",
                      order.status === "Delivered" && "text-green-500 border-green-500/20 bg-green-500/10",
                      order.status === "Processing" && "text-blue-500 border-blue-500/20 bg-blue-500/10",
                      order.status === "Shipped" && "text-purple-500 border-purple-500/20 bg-purple-500/10",
                      order.status === "Pending" && "text-yellow-500 border-yellow-500/20 bg-yellow-500/10",
                      order.status === "Cancelled" && "text-red-500 border-red-500/20 bg-red-500/10"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-white/10 text-white">
                        <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-accent focus:text-background"><Eye className="w-4 h-4" /> View Details</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-accent focus:text-background"><Edit2 className="w-4 h-4" /> Update Status</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}