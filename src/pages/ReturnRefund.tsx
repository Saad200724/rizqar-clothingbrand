import { MainLayout } from "@/components/layout/MainLayout";
import { Footer } from "@/components/home/Footer";

export default function ReturnRefund() {
  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Return and Refund Policy</h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>We want you to be completely satisfied with your purchase. If you are not happy, we are here to help.</p>
            <h2 className="text-2xl font-bold text-foreground">Returns</h2>
            <p>You have 30 days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it.</p>
            <h2 className="text-2xl font-bold text-foreground">Refunds</h2>
            <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.</p>
          </div>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
}