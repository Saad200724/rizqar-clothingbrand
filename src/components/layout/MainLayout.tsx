import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { BottomTabBar } from "./BottomTabBar";
import { CartDrawer } from "./CartDrawer";
import { FloatingCartButton } from "../FloatingCartButton";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pb-20 lg:pb-0">{children}</main>
      <BottomTabBar />
      <FloatingCartButton />
      <CartDrawer />
    </div>
  );
}
