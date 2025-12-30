import { MainLayout } from "@/components/layout/MainLayout";
import { Footer } from "@/components/home/Footer";

export default function TermsConditions() {
  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>Welcome to Rizqar. By using our website, you agree to comply with and be bound by the following terms and conditions.</p>
            <h2 className="text-2xl font-bold text-foreground">Ordering & Payments</h2>
            <p>All orders are subject to acceptance and availability. We accept various payment methods as indicated on our site.</p>
            <h2 className="text-2xl font-bold text-foreground">Intellectual Property</h2>
            <p>All content on this site is the property of Rizqar and is protected by international copyright laws.</p>
          </div>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
}