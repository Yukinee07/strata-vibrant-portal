import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-building.jpg";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-secondary py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-up">
              {t("hero.welcome")}
              <br />
              <span className="text-primary italic">{t("hero.association")}</span>{" "}
              <span className="text-foreground">{t("hero.of")}</span>
              <br />
              <span className="text-foreground font-extrabold">
                {t("hero.community")}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              {t("hero.tagline")}
            </p>
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Button
                size="lg"
                className="rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link to="/guide">{t("hero.cta")}</Link>
              </Button>
            </div>

            {/* Decorative Circle */}
            <div className="flex justify-center mt-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg"></div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative animate-fade-up">
            <div className="relative">
              {/* Strata Label */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-bold">THE</p>
                <p className="text-2xl font-extrabold tracking-wider">STRATA</p>
                <p className="text-xs">LINK TOWNHOUSE</p>
              </div>
              
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="The Strata Bandar Puteri Bangi"
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
