import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Moon, Sun, Languages, User, LogOut, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useDeveloper } from "@/contexts/DeveloperContext";
import { useAuth } from "@/contexts/AuthContext";
import logoPersatuan from "@/assets/logo-persatuan.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isDeveloper, logout: developerLogout } = useDeveloper();
  const { user, profile, signOut } = useAuth();

  const isLoggedIn = isDeveloper || !!user;

  const navLinks = [
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.guidelines"), href: "/guide" },
    { name: t("nav.fees"), href: "/fees" },
    { name: t("nav.announcements"), href: "/announcements" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = async () => {
    if (isDeveloper) {
      developerLogout();
    } else {
      await signOut();
    }
    navigate("/");
  };

  const getDisplayName = () => {
    if (isDeveloper) return "Developer";
    return profile?.full_name || user?.email?.split("@")[0] || "User";
  };

  const getInitial = () => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Side - Logo + Login/Profile */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logoPersatuan} 
                alt="Persatuan Penduduk The Strata Bandar Puteri Bangi" 
                className="h-12 md:h-14 w-auto object-contain"
              />
            </Link>

            {/* Login/Profile Button */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitial()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{getDisplayName()}</p>
                      <p className="text-xs text-muted-foreground">
                        {isDeveloper 
                          ? (language === "ms" ? "Mod Pembangun Aktif" : "Developer Mode Active")
                          : (user?.email || "")}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{language === "ms" ? "Tetapan Profil" : "Profile Settings"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{language === "ms" ? "Log Keluar" : "Logout"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => navigate("/login")}
              >
                <User className="h-4 w-4" />
                {language === "ms" ? "Log Masuk" : "Login"}
              </Button>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Search className="w-5 h-5 text-foreground/70" />
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="hidden md:flex items-center gap-2">
              <Languages className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">BM</span>
              <Switch
                checked={language === "en"}
                onCheckedChange={(checked) => setLanguage(checked ? "en" : "ms")}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-xs font-medium text-muted-foreground">EN</span>
            </div>

            {/* Theme Toggle */}
            <div className="hidden md:flex items-center gap-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {/* Mobile Login/Profile */}
              {isLoggedIn ? (
                <div className="flex items-center justify-between py-2 px-2 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-primary">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitial()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{getDisplayName()}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="justify-start gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4" />
                  {language === "ms" ? "Log Masuk" : "Login"}
                </Button>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block font-medium py-2 ${
                    isActive(link.href) ? "text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Toggles */}
              <div className="flex items-center justify-between py-2 border-t border-border mt-2">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">BM / EN</span>
                </div>
                <Switch
                  checked={language === "en"}
                  onCheckedChange={(checked) => setLanguage(checked ? "en" : "ms")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  {theme === "dark" ? (
                    <Moon className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Sun className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-sm">{theme === "dark" ? t("theme.dark") : t("theme.light")}</span>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
