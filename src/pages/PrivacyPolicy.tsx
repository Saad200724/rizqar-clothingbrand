import { MainLayout } from "@/components/layout/MainLayout";
import { Footer } from "@/components/home/Footer";

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>At Rizqar, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.</p>
            <h2 className="text-2xl font-bold text-foreground">Information Collection</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our support team.</p>
            <h2 className="text-2xl font-bold text-foreground">Use of Information</h2>
            <p>We use the information we collect to process orders, provide customer support, and improve our services.</p>
          </div>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
}