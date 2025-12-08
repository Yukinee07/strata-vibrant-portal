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

const recentTransactions = [
  {
    date: "01/10/25",
    description: "October Security Fee",
    amount: "RM150.00",
    status: "paid",
  },
  {
    date: "01/09/25",
    description: "September Security Fee",
    amount: "RM150.00",
    status: "paid",
  },
  {
    date: "01/08/25",
    description: "August Security Fee",
    amount: "RM150.00",
    status: "paid",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your account.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Outstanding Levy Card */}
        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-accent" />
              Outstanding Security Levy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">RM 150.00</p>
            <p className="text-sm text-muted-foreground mt-1">
              Due Date: 30 Oct 2025
            </p>
            <Button size="sm" className="mt-4 bg-primary hover:bg-primary/90">
              Pay Now
            </Button>
          </CardContent>
        </Card>

        {/* Current Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">Active</p>
            <p className="text-sm text-muted-foreground mt-1">
              All facilities accessible
            </p>
          </CardContent>
        </Card>

        {/* Quick Action Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Total Paid This Year
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">RM 1,350.00</p>
            <p className="text-sm text-muted-foreground mt-1">
              9 payments completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Recent Transactions
          </CardTitle>
          <Link
            to="/dashboard/payments"
            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
          >
            View Full History <ArrowRight className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
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
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground"
                    >
                      Paid
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
