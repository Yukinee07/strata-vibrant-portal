import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import bannerAGM from "@/assets/banner-agm-2024.jpg";
import mapAGM from "@/assets/map-agm-location.png";

const Announcements = () => {
  const { t, language } = useLanguage();

  const documents = [
    {
      id: 0,
      title: "xyz",
      url: "#",
      isNew: true
    },
    {
      id: 1,
      title: language === "ms" ? "Notis Mesyuarat Agung kali ke-3 2024" : "Notice of 3rd Annual General Meeting 2024",
      url: "https://thestrata.com.my/joomla30/images/Download/AGM%202024/Notis%20Jemputan%20AGM%20.pdf"
    },
    {
      id: 2,
      title: language === "ms" ? "Buku Program Mesyuarat Agung Tahunan kali ke-3 2024" : "3rd Annual General Meeting Program Book 2024",
      url: "https://thestrata.com.my/joomla30/images/AGM%202024MAY/BUKU%20PROGRAM%20AGM%20PPTSBPB%202024.pdf"
    },
    {
      id: 3,
      title: language === "ms" ? "Minit Mesyuarat Agung kali ke-2 2023" : "Minutes of 2nd Annual General Meeting 2023",
      url: "https://thestrata.com.my/joomla30/images/AGM%202024MAY/MINIT%20AGM2023.pdf"
    },
    {
      id: 4,
      title: language === "ms" ? "Penyata Kewangan Berakhir 31 Dec 2023" : "Financial Statement Ending 31 Dec 2023",
      url: "https://thestrata.com.my/joomla30/images/AGM%202024MAY/Penyata%20kewangan%20berakhir%20311223.pdf"
    },
    {
      id: 5,
      title: language === "ms" ? "Penyata Kewangan Berakhir 30 Apr 2024" : "Financial Statement Ending 30 Apr 2024",
      url: "https://thestrata.com.my/joomla30/images/AGM%202024MAY/Penyata%20kewangan%20berakhir%20300424.pdf"
    },
    {
      id: 6,
      title: language === "ms" ? "Cadangan Pindaan Perlembagaan" : "Proposed Constitutional Amendments",
      url: "https://thestrata.com.my/joomla30/images/AGM%202024MAY/CADANGAN%20PINDAAN%20PERLEMBAGAAN_edited.pdf"
    },
    {
      id: 7,
      title: language === "ms" ? "Minit Mesyuarat Agung kali ke-3 2024" : "Minutes of 3rd Annual General Meeting 2024",
      url: "#",
      isNew: true
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-background">
        {/* Hero Banner */}
        <section className="relative">
          <img
            src={bannerAGM}
            alt="AGM 2024 Banner"
            className="w-full h-auto object-cover"
          />
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {t("announcements.agmTitle")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("announcements.hits")}
            </p>

            {/* RSVP Notice */}
            <div className="bg-accent/20 border border-accent rounded-xl p-6 mb-10 text-center">
              <p className="text-foreground font-medium">
                {t("announcements.rsvpClosed")}
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                {t("announcements.rsvpNote")}
              </p>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div
                  key={doc.id}
                  className="bg-card border border-border rounded-lg p-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm mr-2">{index + 1})</span>
                      <span className="text-foreground font-medium">{doc.title}</span>
                      {doc.isNew && (
                        <span className="ml-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded font-semibold">
                          {language === "ms" ? "BARU" : "NEW"}
                        </span>
                      )}
                    </div>
                  </div>
                  {doc.url !== "#" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shrink-0"
                      asChild
                    >
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        {t("guide.download")}
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Location Map */}
            <div className="mt-12">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                {t("announcements.location")}
              </h2>
              <div className="rounded-xl overflow-hidden border border-border shadow-sm">
                <img
                  src={mapAGM}
                  alt={language === "ms" ? "Lokasi AGM - Al-Araby Mathaam" : "AGM Location - Al-Araby Mathaam"}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-muted-foreground text-sm mt-3 text-center">
                {language === "ms" 
                  ? "Dewan MAPIM, Atas Restoran Al-Araby Mathaam Bandar Puteri Bangi" 
                  : "MAPIM Hall, Above Al-Araby Mathaam Restaurant Bandar Puteri Bangi"}
              </p>
            </div>
          </div>
        </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Announcements;
