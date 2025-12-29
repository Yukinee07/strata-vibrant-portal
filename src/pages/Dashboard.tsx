import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t, language } = useLanguage();

  const recentTransactions = [
    {
      date: "01/10/25",
      description: language === "ms" ? "Yuran Keselamatan Oktober" : "October Security Fee",
      amount: "RM150.00",
      status: "paid",
    },
    {
      date: "01/09/25",
      description: language === "ms" ? "Yuran Keselamatan September" : "September Security Fee",
      amount: "RM150.00",
      status: "paid",
    },
    {
      date: "01/08/25",
      description: language === "ms" ? "Yuran Keselamatan Ogos" : "August Security Fee",
      amount: "RM150.00",
      status: "paid",
    },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Quick Action Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              {t("dashboard.totalPaid")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">RM 1,350.00</p>
            <p className="text-sm text-muted-foreground mt-1">
              {language === "ms" ? "9 pembayaran selesai" : "9 payments completed"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {t("dashboard.recentTrans")}
          </CardTitle>
          <Link
            to="/dashboard/payments"
            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
          >
            {t("dashboard.viewHistory")} <ArrowRight className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("dashboard.date")}</TableHead>
                <TableHead>{t("dashboard.description")}</TableHead>
                <TableHead>{t("dashboard.amount")}</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell className="text-muted-foreground">
                    {transaction.date}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      {t("dashboard.paid")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
