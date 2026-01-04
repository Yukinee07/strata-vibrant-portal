import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnnouncementsCarousel from "@/components/AnnouncementsCarousel";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Book, Download, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t, language } = useLanguage();

  const announcements = [
    {
      date: "12 Okt",
      title: language === "ms" ? "Mesyuarat Agung Tahunan Dijadualkan" : "AGM Meeting Scheduled",
      excerpt: language === "ms" 
        ? "Mesyuarat Agung Tahunan untuk semua penduduk telah dijadualkan. Penyertaan anda amat penting untuk keputusan komuniti." 
        : "The Annual General Meeting for all residents has been scheduled. Your participation is crucial for community decisions.",
    },
    {
      date: "05 Okt",
      title: language === "ms" ? "Makluman Penyelenggaraan Lif" : "Lift Maintenance Alert",
      excerpt: language === "ms"
        ? "Penyelenggaraan berjadual untuk Lif B di Blok A akan berlaku pada 15 Oktober dari 9PG hingga 5PTG."
        : "Scheduled maintenance for Lift B in Block A will occur on October 15th from 9AM to 5PM.",
    },
    {
      date: "28 Sep",
      title: language === "ms" ? "Garis Panduan Parkir Baru" : "New Parking Guidelines",
      excerpt: language === "ms"
        ? "Peraturan parkir yang dikemaskini akan berkuat kuasa mulai 1 November. Semua penduduk perlu mendaftarkan kenderaan."
        : "Updated parking regulations will take effect from November 1st. All residents are required to register their vehicles.",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
      <main className="flex-grow">
        <HeroSection />
        <AnnouncementsCarousel />
        
        {/* Main Content Area - Two Column Layout */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - 70% - Announcements */}
              <div className="lg:w-[70%]">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {t("news.title")}
                  </h2>
                  <div className="w-16 h-1 bg-accent rounded-full"></div>
                </div>

                <div className="space-y-6">
                  {announcements.map((item, index) => (
                    <article
                      key={index}
                      className="bg-card rounded-lg p-6 border-l-4 border-accent shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-accent text-accent-foreground px-3 py-2 rounded text-sm font-semibold whitespace-nowrap shrink-0">
                          {item.date}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-primary mb-2">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                            {item.excerpt}
                          </p>
                          <Link
                            to="/announcements"
                            className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
                          >
                            {t("news.readMore")} <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Right Column - 30% - Quick Links Sidebar */}
              <aside className="lg:w-[30%]">
                <div className="bg-secondary rounded-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    {t("quick.resources")}
                  </h3>

                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link to="/guide">
                        <Book className="w-5 h-5" />
                        <span className="font-medium">{t("quick.guide")}</span>
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link to="/forms">
                        <Download className="w-5 h-5" />
                        <span className="font-medium">{t("quick.forms")}</span>
                      </Link>
                    </Button>
                  </div>

                  {/* Need Help Widget */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-4">
                      {t("quick.help")}
                    </h4>
                    <div className="space-y-3">
                      <a
                        href="mailto:pptsbpbangi@gmail.com"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        pptsbpbangi@gmail.com
                      </a>
                      <a
                        href="tel:+60193334283"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        019-333 4283
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
