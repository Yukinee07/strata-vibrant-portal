import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground mt-1">
          {language === "ms" 
            ? "Selamat kembali! Berikut adalah gambaran keseluruhan akaun anda." 
            : "Welcome back! Here's an overview of your account."}
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Outstanding Levy Card */}
        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-accent" />
              {t("dashboard.levy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">RM 150.00</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("dashboard.dueDate")}: 30 Okt 2025
            </p>
            <Button size="sm" className="mt-4 bg-primary hover:bg-primary/90">
              {t("dashboard.payNow")}
            </Button>
          </CardContent>
        </Card>

        {/* Current Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              {t("dashboard.status")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{t("dashboard.active")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {language === "ms" ? "Semua fasiliti boleh diakses" : "All facilities accessible"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {language === "ms" ? "Maklumat Ringkas" : "Quick Information"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">
                {language === "ms" ? "No. Ahli" : "Member ID"}
              </p>
              <p className="text-lg font-semibold text-foreground">STR-2024-0123</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">
                {language === "ms" ? "No. Unit" : "Unit Number"}
              </p>
              <p className="text-lg font-semibold text-foreground">A-12-03</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">
                {language === "ms" ? "Tarikh Daftar" : "Registration Date"}
              </p>
              <p className="text-lg font-semibold text-foreground">15 Jan 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
