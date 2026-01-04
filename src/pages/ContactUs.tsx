import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import qrAduanCadangan from "@/assets/qr-aduan-cadangan.png";

const ContactUs = () => {
  const { t, language } = useLanguage();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-grow">
        {/* Page Title Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("contact.title")}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>
        </section>

        {/* QR Code & Form Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* QR Code Card */}
              <Card className="bg-card shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-primary">
                    {t("contact.formTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <p className="text-muted-foreground mb-6 text-center">
                    {t("contact.scanInstruction")}
                  </p>
                  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <img 
                      src={qrAduanCadangan} 
                      alt="QR Code for Complaint/Suggestion Form" 
                      className="w-64 h-64 md:w-80 md:h-80 object-contain"
                    />
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSfc_rtuEJTd0DFIiznl8t66rn7fi3fw7jcx3qScs74mudDQBg/viewform", "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("contact.fillForm")}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-6">
                    {language === "ms" 
                      ? "Persatuan Penduduk The Strata Bandar Puteri Bangi" 
                      : "The Strata Bandar Puteri Bangi Residents' Association"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ContactUs;
