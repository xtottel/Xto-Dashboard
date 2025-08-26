"use client";

import { BadgeCent, Wallet, Users, RotateCcw } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { ActivityChart } from "./components/ActivityChart";
import Link from "next/link";

// Updated data for payment gateway
const paymentData = [
  { name: "Jan", transactions: 4000, successful: 3800 },
  { name: "Feb", transactions: 3000, successful: 2800 },
  { name: "Mar", transactions: 5000, successful: 4800 },
  { name: "Apr", transactions: 2780, successful: 2500 },
  { name: "May", transactions: 3890, successful: 3700 },
  { name: "Jun", transactions: 2390, successful: 2200 },
];

const channelData = [
  { name: "Mobile Money", value: 70 },
  { name: "Card", value: 30 },
];

type Transaction = {
  customer: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  date: string;
  id: string;
  phone?: string;
  method?: string;
};

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2023-06-15 09:30:45",
    customer: "Collins Joe",
    amount: "GHS 10.00",
    phone: "0244123456",
    method: "MTN Mobile Money",
    status: "paid",
  },
  {
    id: "2",
    date: "2023-06-16 10:15:30",
    customer: "Mary Jane",
    amount: "GHS 20.00",
    phone: "0244765432",
    method: "VISA **** 4242",
    status: "pending",
  },
  {
    id: "3",
    date: "2023-06-17 11:45:00",
    customer: "Samuel Doe",
    amount: "GHS 15.00",
    phone: "0245987654",
    method: "Mastercard **** 5555",
    status: "failed",
  },
  {
    id: "4",
    date: "2023-06-18 12:30:15",
    customer: "Alice Smith",
    amount: "GHS 25.00",
    phone: "0245123456",
    method: "AirtelTigo Money",
    status: "paid",
  },
  {
    id: "5",
    date: "2023-06-19 13:20:30",
    customer: "Bob Johnson",
    amount: "GHS 30.00",
    phone: "0245234567",
    method: "Vodafone Cash",
    status: "pending",
  },
];

const COLORS = ["#facc15", "#3b82f6"]; // Yellow for MoMo, Blue for Card

export default function DashboardHome() {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    // Update date time every minute
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Africa/Accra",
      };
      const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
        now
      );
      setCurrentDateTime(formattedDate + " (Accra / GMT)");
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: Transaction["status"]) => {
    return (
      <Badge variant="status" status={status}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Dynamic date/time display */}

      <div className="text-base font-semibold text-muted-foreground">
        Your snapshot for today, {currentDateTime || "loading..."}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-amber-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵ 42,869.00</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        {/* Changed to Green */}
        <Card className="bg-emerald-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Payments
            </CardTitle>
            <BadgeCent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵ 8,742.00</div>
            <p className="text-xs text-muted-foreground">1,200 this month</p>
          </CardContent>
        </Card>

        {/* Changed Success Rate → Refunds and Blue */}
        <Card className="bg-sky-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Refunds Processed Today
            </CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵ 1,230.00</div>
            <p className="text-xs text-muted-foreground">
              12 refund requests approved today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2806</div>
            <p className="text-xs text-muted-foreground">
              People who paid you this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="h-[350px]">
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>
              Monthly transactions vs successful payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="transactions"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="successful"
                  fill="#82ca9d"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>


        <Card className="h-[350px]">
          <CardHeader>
            <CardTitle>Payment Channels</CardTitle>
            <CardDescription>
              Transaction distribution by channel
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {channelData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <ActivityChart />

      {/* Recent Transactions */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Recent Transactions
        </h1>
      </div>

      <Card>
        <CardHeader className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted text-muted-foreground">
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                {/* <TableHead>Payment Method</TableHead> */}
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">
                    {transaction.customer}
                  </TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  {/* <TableCell>{transaction.method}</TableCell> */}
                  <TableCell>{transaction.phone}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardHeader>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1-{transactions.length}</strong> of{" "}
            <strong>{transactions.length}</strong>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <Link href={`/home/payments/`}>View All</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
