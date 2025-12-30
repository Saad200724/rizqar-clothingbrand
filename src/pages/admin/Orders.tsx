import { AdminLayout } from "@/components/admin/AdminLayout";
import { Trash2, MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const persisted = JSON.parse(localStorage.getItem("rizqar_orders") || "[]");
    setOrders(persisted);
  }, []);

  const deleteOrder = (id: string) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    localStorage.setItem("rizqar_orders", JSON.stringify(updated));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors group text-white">
                  <td className="px-6 py-4 font-bold text-accent">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 font-bold">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-accent/20 text-accent">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-white/10 text-white">
                        <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-accent focus:text-background"><Eye className="w-4 h-4" /> View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteOrder(order.id)} className="gap-2 cursor-pointer text-red-500 focus:bg-red-500 focus:text-white"><Trash2 className="w-4 h-4" /> Delete</DropdownMenuItem>
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