import { AdminLayout } from "@/components/admin/AdminLayout";
import { Package, MoreHorizontal, Edit2, Trash2, Eye, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialOrders = [
  { id: "#ORD-7241", customer: "Ahmed Khan", date: "Oct 24, 2024", total: "৳4,250", status: "Delivered", items: 2 },
  { id: "#ORD-7242", customer: "Sara Ali", date: "Oct 25, 2024", total: "৳2,100", status: "Processing", items: 1 },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    // Load persisted orders from checkout
    const persistedOrders = JSON.parse(localStorage.getItem("rizqar_orders") || "[]");
    if (persistedOrders.length > 0) {
      // Merge unique orders (avoiding duplicates if user refreshes)
      const combined = [...persistedOrders, ...initialOrders];
      const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
      setOrders(unique);
    }
  }, []);

  const deleteOrder = (id: string) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    // Also update storage
    const persisted = JSON.parse(localStorage.getItem("rizqar_orders") || "[]");
    localStorage.setItem("rizqar_orders", JSON.stringify(persisted.filter((o: any) => o.id !== id)));
  };
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