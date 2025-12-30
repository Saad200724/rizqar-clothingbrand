import { Product } from "@/data/products";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: Product | null;
  formData: Partial<Product>;
  setFormData: (data: Partial<Product>) => void;
  onSave: () => void;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  editingProduct,
  formData,
  setFormData,
  onSave,
}: ProductFormDialogProps) {
  const addImage = () => {
    const images = formData.images || [];
    setFormData({ ...formData, images: [...images, ""] });
  };

  const removeImage = (index: number) => {
    const images = (formData.images || []).filter((_, i) => i !== index);
    setFormData({ ...formData, images });
  };

  const updateImage = (index: number, value: string) => {
    const images = [...(formData.images || [])];
    images[index] = value;
    setFormData({ ...formData, images });
  };

  const addSize = () => {
    const sizes = formData.sizes || [];
    const newSize = prompt("Enter size (e.g., S, M, L, XL)");
    if (newSize) {
      setFormData({ ...formData, sizes: [...sizes, newSize] });
    }
  };

  const removeSize = (index: number) => {
    const sizes = (formData.sizes || []).filter((_, i) => i !== index);
    setFormData({ ...formData, sizes });
  };

  const addColor = () => {
    const colorName = prompt("Enter color name (e.g., Black, Red)");
    if (!colorName) return;
    const colorHex = prompt("Enter color hex (e.g., #000000)");
    if (!colorHex) return;
    const colors = formData.colors || [];
    setFormData({ ...formData, colors: [...colors, { name: colorName, hex: colorHex }] });
  };

  const removeColor = (index: number) => {
    const colors = (formData.colors || []).filter((_, i) => i !== index);
    setFormData({ ...formData, colors });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card text-white border-white/10 max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-180px)] pr-4">
          <div className="space-y-6 pr-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-accent">Basic Information</h3>
              
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-white/10"
                  placeholder="e.g., Obsidian Oversized Hoodie"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (৳) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="bg-background border-white/10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salePrice">Sale Price (৳)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    value={formData.salePrice || ""}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="bg-background border-white/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-background border-white/10"
                    placeholder="e.g., Hoodies & Sweatshirts"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock || 0}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="bg-background border-white/10"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-accent">Description</h3>
              <div className="grid gap-2">
                <Label htmlFor="description">Product Description</Label>
                <textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-background border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-accent/50 min-h-24"
                  placeholder="Describe your product..."
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-accent">Product Images (URL or Upload)</h3>
                <Button size="sm" onClick={addImage} className="bg-accent text-background hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>
              
              <div className="space-y-3">
                {(formData.images || []).map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        value={image}
                        onChange={(e) => updateImage(index, e.target.value)}
                        className="bg-background border-white/10"
                        placeholder="Paste image URL or upload..."
                      />
                    </div>
                    {image && (
                      <div className="w-16 h-20 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    {(formData.images || []).length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="text-red-500 hover:bg-red-500/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                📦 Product Image Box: Width: 320px (w-12 table), Height: 400px (h-20 table) | Shop: 4:5 aspect ratio
              </p>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-accent">Sizes</h3>
                <Button size="sm" onClick={addSize} className="bg-accent text-background hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Size
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(formData.sizes || []).map((size, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-white/10 rounded-lg text-sm flex items-center gap-2 border border-white/20"
                  >
                    {size}
                    <button
                      onClick={() => removeSize(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-accent">Color Palette</h3>
                <Button size="sm" onClick={addColor} className="bg-accent text-background hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Color
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {(formData.colors || []).map((color, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/10">
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-white/20 flex-shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{color.name}</p>
                      <p className="text-xs text-muted-foreground">{color.hex}</p>
                    </div>
                    <button
                      onClick={() => removeColor(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Flags */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-accent">Flags</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured || false}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded border-white/20 bg-background"
                  />
                  <span className="text-sm">Featured Product</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNew || false}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="w-4 h-4 rounded border-white/20 bg-background"
                  />
                  <span className="text-sm">New Product</span>
                </label>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button onClick={() => onOpenChange(false)} variant="outline" className="border-white/10">
            Cancel
          </Button>
          <Button onClick={onSave} className="bg-accent text-background hover:opacity-90">
            {editingProduct ? "Update Product" : "Create Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
