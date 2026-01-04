import { Code, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeveloper } from "@/contexts/DeveloperContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DeveloperBanner = () => {
  const { isDeveloper, logout } = useDeveloper();
  const { language } = useLanguage();
  const navigate = useNavigate();

  if (!isDeveloper) return null;

  const handleLogout = () => {
    logout();
    toast.success(language === "ms" ? "Log keluar berjaya!" : "Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="bg-accent text-accent-foreground py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          <span className="text-sm font-medium">
            {language === "ms" ? "Mod Pembangun Aktif" : "Developer Mode Active"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-accent-foreground hover:bg-accent-foreground/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {language === "ms" ? "Log Keluar" : "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default DeveloperBanner;
