import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Trash2, Move, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialBanners = [
  { id: 1, title: "THE NEW STANDARD", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800", active: true },
];

export default function AdminBanners() {
  const [banners, setBanners] = useState(initialBanners);

  const handleAdd = () => {
    const newBanner = {
      id: Date.now(),
      title: "NEW CAMPAIGN",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800",
      active: true
    };
    setBanners([...banners, newBanner]);
    toast.success("Banner added successfully");
  };

  const handleRemove = (id: number) => {
    setBanners(banners.filter(b => b.id !== id));
    toast.success("Banner removed");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Homepage Banners</h1>
            <p className="text-muted-foreground">Manage the hero carousel sliders on your homepage.</p>
          </div>
          <Button onClick={handleAdd} className="bg-accent text-background hover:opacity-90 shadow-glow gap-2 font-bold py-6 px-6">
            <Plus className="w-5 h-5" />
            Add New Banner
          </Button>
        </div>

        <Alert className="bg-accent/10 border-accent/20 text-accent">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Image Resolution Guide</AlertTitle>
          <AlertDescription>
            For the best visual results in the Hero section, please use images with a resolution of <strong>1920x1080px (16:9)</strong> or higher. The aspect ratio is critical for high-end modest fashion presentation.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="w-full md:w-64 aspect-video rounded-xl overflow-hidden bg-secondary border border-white/10 flex-shrink-0">
                <img src={banner.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-lg">{banner.title}</h3>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="border-white/10 gap-2" onClick={() => handleRemove(banner.id)}><Trash2 className="w-4 h-4 text-red-500" /> Remove</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}