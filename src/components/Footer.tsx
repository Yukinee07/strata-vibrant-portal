import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Logo & About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">THE STRATA</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Persatuan Penduduk The Strata Bandar Puteri Bangi — {t("hero.tagline")}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t("footer.login")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/sitemap"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t("footer.sitemap")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-foreground/60 flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  The Strata, Bandar Puteri Bangi, Selangor, Malaysia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-foreground/60 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  019-333 4283
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-foreground/60 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  pptsbpbangi@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Persatuan Penduduk The Strata Bandar
            Puteri Bangi. {t("footer.copyright")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
