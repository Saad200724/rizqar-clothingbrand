import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Trash2, Move } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockBanners = [
  { id: 1, title: "THE NEW STANDARD", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800", active: true },
  { id: 2, title: "WINTER EDIT", image: "/attached_assets/stock_images/modern_premium_winte_69182a09.jpg", active: false },
];

export default function AdminBanners() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Homepage Banners</h1>
            <p className="text-muted-foreground">Manage the hero carousel sliders on your homepage.</p>
          </div>
          <Button className="bg-accent text-background hover:opacity-90 shadow-glow gap-2 font-bold py-6 px-6">
            <Plus className="w-5 h-5" />
            Add New Banner
          </Button>
        </div>

        <div className="grid gap-6">
          {mockBanners.map((banner) => (
            <div key={banner.id} className="bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="w-full md:w-64 aspect-video rounded-xl overflow-hidden bg-secondary border border-white/10 flex-shrink-0">
                <img src={banner.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                   <h3 className="font-bold text-lg">{banner.title}</h3>
                   {banner.active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">Active</span>}
                </div>
                <p className="text-sm text-muted-foreground">URL: /shop?collection=new-standard</p>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="border-white/10 gap-2"><Move className="w-4 h-4" /> Reorder</Button>
                  <Button variant="outline" size="sm" className="border-white/10 gap-2"><Trash2 className="w-4 h-4 text-red-500" /> Remove</Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Status</span>
                <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${banner.active ? 'bg-accent' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${banner.active ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}