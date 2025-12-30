import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Search, Filter, MoreHorizontal, Edit2, Trash2, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products as initialProducts, Product } from "@/data/products";
import { toast } from "sonner";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "",
    stock: 0,
    images: [""]
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: 0, category: "", stock: 0, images: ["https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800"] });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p._id !== id));
    toast.success("Product deleted successfully");
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => p._id === editingProduct._id ? { ...p, ...formData } as Product : p));
      toast.success("Product updated successfully");
    } else {
      const newProduct = {
        ...formData,
        _id: Math.random().toString(36).substr(2, 9),
        slug: formData.name?.toLowerCase().replace(/ /g, "-"),
        createdAt: new Date().toISOString(),
      } as Product;
      setProducts([newProduct, ...products]);
      toast.success("Product added successfully");
    }
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Management</h1>
            <p className="text-muted-foreground">Manage your catalog, stock, and pricing here.</p>
          </div>
          <Button onClick={handleOpenAdd} className="bg-accent text-background hover:opacity-90 shadow-glow gap-2 font-bold py-6 px-6">
            <Plus className="w-5 h-5" />
            Add New Product
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products by name, SKU..." 
              className="w-full bg-card border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-accent/50 transition-colors text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                  <tr key={product._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="max-w-[200px]">
                          <h4 className="font-semibold line-clamp-1 group-hover:text-accent transition-colors">{product.name}</h4>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-accent">৳{product.salePrice || product.price}</td>
                    <td className="px-6 py-4 text-xs">{product.stock} in stock</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(product)}><Edit2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(product._id)} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card text-white border-white/10 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-background border-white/10" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price (৳)</Label>
              <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="bg-background border-white/10" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="bg-background border-white/10" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} className="bg-background border-white/10" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} className="bg-accent text-background w-full">Save Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}