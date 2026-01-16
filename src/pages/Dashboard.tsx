import { CheckCircle, AlertCircle, CreditCard, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t, language } = useLanguage();

  // Dummy transaction data
  const transactions = [
    { date: "01/01/25", description: language === "ms" ? "Yuran Keselamatan Januari" : "January Security Fee", amount: "RM150.00", status: "Paid" },
    { date: "01/12/24", description: language === "ms" ? "Yuran Keselamatan Disember" : "December Security Fee", amount: "RM150.00", status: "Paid" },
    { date: "01/11/24", description: language === "ms" ? "Yuran Keselamatan November" : "November Security Fee", amount: "RM150.00", status: "Paid" },
  ];

  // Dummy appointment data
  const appointments = [
    { date: "20/01/25", time: "10:00 AM", purpose: language === "ms" ? "Temujanji Pejabat Pengurusan" : "Management Office Appointment" },
    { date: "15/02/25", time: "2:30 PM", purpose: language === "ms" ? "Pemeriksaan Unit" : "Unit Inspection" },
  ];

  // Total amount paid
  const totalAmountPaid = "RM1,800.00";

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

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {language === "ms" ? "Transaksi Terkini" : "Recent Transactions"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-muted-foreground">{language === "ms" ? "Tarikh" : "Date"}</th>
                  <th className="text-left py-2 text-sm font-medium text-muted-foreground">{language === "ms" ? "Penerangan" : "Description"}</th>
                  <th className="text-right py-2 text-sm font-medium text-muted-foreground">{language === "ms" ? "Jumlah" : "Amount"}</th>
                  <th className="text-center py-2 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 text-sm">{tx.date}</td>
                    <td className="py-3 text-sm">{tx.description}</td>
                    <td className="py-3 text-sm text-right">{tx.amount}</td>
                    <td className="py-3 text-center">
                      <Badge className="bg-primary text-primary-foreground">{language === "ms" ? "Dibayar" : tx.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-medium text-muted-foreground">
              {language === "ms" ? "Jumlah Dibayar Tahun Ini" : "Total Amount Paid This Year"}
            </span>
            <span className="text-xl font-bold text-primary">{totalAmountPaid}</span>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {language === "ms" ? "Temujanji Akan Datang" : "Upcoming Appointments"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {appointments.map((apt, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">{apt.purpose}</p>
                <p className="text-sm text-muted-foreground">{apt.date} • {apt.time}</p>
              </div>
              <Badge variant="outline">{language === "ms" ? "Dijadualkan" : "Scheduled"}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

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
