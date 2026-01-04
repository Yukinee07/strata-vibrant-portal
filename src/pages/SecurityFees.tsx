import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Download, Mail, ExternalLink } from "lucide-react";

const SecurityFees = () => {
  const { t, language } = useLanguage();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-background">
        {/* Hero Section */}
        <section className="bg-primary py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("fees.title")}
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              {t("fees.subtitle")}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Download Button */}
            <div className="text-center mb-10">
              <Button
                size="lg"
                className="gap-2"
                asChild
              >
                <a
                  href="https://thestrata.com.my/joomla30/images/Sekuriti/The%20Strata%20Security%20Payment%2026%20June%202024%20wo%20name.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-5 h-5" />
                  {t("fees.download")}
                </a>
              </Button>
            </div>

            {/* Info Card */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
                {t("fees.checkTitle")}
              </h2>
              
              <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
                <p className="text-foreground mb-4">
                  {t("fees.greeting")}
                </p>
                
                <p className="text-muted-foreground mb-4">
                  {t("fees.intro")}
                </p>
                
                <div className="bg-secondary rounded-lg p-4 my-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {t("fees.stepsTitle")}
                  </h3>
                  <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                    <li>{t("fees.step1")}</li>
                    <li>{t("fees.step2")}</li>
                    <li>{t("fees.step3")}</li>
                    <li>{t("fees.step4")}</li>
                  </ol>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {t("fees.contactInfo")}
                </p>
                
                <div className="flex items-center gap-2 text-primary font-medium mb-6">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:thestratapayment@gmail.com" className="hover:underline">
                    thestratapayment@gmail.com
                  </a>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {t("fees.appreciation")}
                </p>
                
                <p className="text-foreground font-medium">
                  {t("fees.signature")}
                </p>
              </div>
            </div>

            {/* Attachment Section */}
            <div className="mt-10 bg-accent/20 border border-accent rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t("fees.attachmentTitle")}
              </h3>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <a
                  href="https://thestrata.com.my/joomla30/images/Sekuriti/The%20Strata%20Security%20Payment%2026%20June%202024%20wo%20name.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5" />
                  {t("fees.viewAttachment")}
                </a>
              </Button>
            </div>
          </div>
        </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default SecurityFees;
