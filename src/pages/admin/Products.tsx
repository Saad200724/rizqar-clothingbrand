import { AdminLayout } from "@/components/admin/AdminLayout";
import { products as initialProducts } from "@/data/products";
import { Plus, Search, Filter, MoreHorizontal, Edit2, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Management</h1>
            <p className="text-muted-foreground">Manage your catalog, stock, and pricing here.</p>
          </div>
          <Button className="bg-accent text-background hover:opacity-90 shadow-glow gap-2 font-bold py-6 px-6">
            <Plus className="w-5 h-5" />
            Add New Product
          </Button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products by name, SKU..." 
              className="w-full bg-card border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-accent/50 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 border-white/10 h-auto py-3">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Products Table */}
        <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {initialProducts.slice(0, 10).map((product) => (
                  <tr key={product._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="max-w-[200px]">
                          <h4 className="font-semibold line-clamp-1 group-hover:text-accent transition-colors">{product.name}</h4>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">SKU: {product._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-accent">৳{product.salePrice || product.price}</div>
                      {product.salePrice && <div className="text-[10px] text-muted-foreground line-through opacity-50">৳{product.price}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs ${product.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-accent/10 hover:text-accent">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-white/10 text-white font-['Sora']">
                          <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-accent focus:text-background">
                            <Eye className="w-4 h-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-accent focus:text-background">
                            <Edit2 className="w-4 h-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer text-red-500 focus:bg-red-500 focus:text-white">
                            <Trash2 className="w-4 h-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing 1-10 of {initialProducts.length} products</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled className="border-white/10">Prev</Button>
              <Button variant="outline" size="sm" className="border-white/10">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}