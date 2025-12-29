import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, User, CreditCard, MessageSquare, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const DashboardSidebar = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { icon: LayoutDashboard, label: t("dashboard.nav.dashboard"), href: "/dashboard" },
    { icon: User, label: t("dashboard.nav.profile"), href: "/dashboard/profile" },
    { icon: CreditCard, label: t("dashboard.nav.payments"), href: "/dashboard/payments" },
    { icon: MessageSquare, label: t("dashboard.nav.feedback"), href: "/dashboard/feedback" },
  ];

  return (
    <aside className="w-64 bg-primary min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-primary-foreground/20">
        <Link to="/dashboard" className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-primary-foreground" />
          <span className="text-lg font-bold text-primary-foreground">
            The Strata
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors",
                    isActive && "bg-primary-foreground/20 text-primary-foreground font-medium"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-primary-foreground/20">
        <p className="text-xs text-primary-foreground/60">
          © 2024 The Strata Community
        </p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
