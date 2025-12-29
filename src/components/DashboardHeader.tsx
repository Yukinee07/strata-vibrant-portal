import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut, Settings, Menu, X, Moon, Sun, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

interface DashboardHeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const DashboardHeader = ({ onMenuToggle, isMobileMenuOpen }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const residentName = "Ahmad";

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>

        {/* Toggles */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Language Toggle */}
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-muted-foreground" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-primary"
            />
            <Moon className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 h-auto py-2">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                  AR
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium text-foreground">
                {t("dashboard.welcome")}, {residentName}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover">
            <DropdownMenuItem asChild>
              <Link to="/dashboard/profile" className="flex items-center gap-2 cursor-pointer">
                <User className="w-4 h-4" />
                <span>{t("dashboard.profile")}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                <span>{language === "ms" ? "Tetapan" : "Settings"}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="w-4 h-4" />
              <span>{t("dashboard.logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
