import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickActionsSection from "@/components/QuickActionsSection";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <QuickActionsSection />
        <AnnouncementsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
