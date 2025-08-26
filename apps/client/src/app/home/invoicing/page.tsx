"use client";

import {
  TriangleAlert,
  CircleCheckBig,
  ReceiptCent,
  FileText,
  Plus,
  Ellipsis,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

type Invoices = {
  customer: string;
  amount: string;
  status: "paid" | "pending" | "canceled";
  date: string;
  id: string;
  type?: string;
};

const invoices: Invoices[] = [
  {
    id: "1",
    date: "2023-06-15 09:30:45",
    customer: "Collins Joe",
    amount: "GHS 10.00",
    type: "Pay at once",
    status: "paid",
  },
  {
    id: "2",
    date: "2023-06-16 10:15:30",
    customer: "Mary Jane",
    amount: "GHS 20.00",
    type: "Pay at once",
    status: "pending",
  },
  {
    id: "3",
    date: "2023-06-17 11:45:00",
    customer: "Samuel Doe",
    amount: "GHS 15.00",
    type: "Pay at once",
    status: "canceled",
  },
  {
    id: "4",
    date: "2023-06-18 12:30:15",
    customer: "Alice Smith",
    amount: "GHS 25.00",
    type: "Pay at once",
    status: "paid",
  },
  {
    id: "5",
    date: "2023-06-19 13:20:30",
    customer: "Bob Johnson",
    amount: "GHS 30.00",
    type: "Pay in instalments",
    status: "pending",
  },
];

export default function DashboardHome() {
  const router = useRouter();
  const getStatusBadge = (status: Invoices["status"]) => {
    return (
      <Badge variant="status" status={status}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#f2f7fa]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invoice Generated
            </CardTitle>
            <ReceiptCent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 81,245.00</div>
          </CardContent>
        </Card>
        <Card className="bg-[#ebfceb]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CircleCheckBig className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 24,500</div>
          </CardContent>
        </Card>
        <Card className="bg-[#fae8e8]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overdue Instalments
            </CardTitle>
            <TriangleAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 6,912.00</div>
          </CardContent>
        </Card>
        <Card className="bg-[#f2f2f2]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Draft Invoices
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent invoicess */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoicing</h1>
          <p className="text-muted-foreground">
            View and create your invoices here
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            className="flex items-center gap-2"
            // onClick={() => (window.location.href = "/home/invoicing/new")}
            onClick={() => router.push("/home/invoicing/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted text-muted-foreground">
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead> Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoices) => (
                <TableRow key={invoices.id}>
                  <TableCell>{invoices.date}</TableCell>
                  <TableCell className="font-medium">
                    {invoices.customer}
                  </TableCell>
                  <TableCell>{invoices.amount}</TableCell>
                  <TableCell>{invoices.type}</TableCell>
                  <TableCell>{getStatusBadge(invoices.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Ellipsis className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Resend Email/SMS</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardHeader>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1-{invoices.length}</strong> of{" "}
            <strong>{invoices.length}</strong>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
