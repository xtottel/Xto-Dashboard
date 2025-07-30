// CustomersPage.tsx

"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Search, Users, Repeat, DollarSign, Crown } from "lucide-react";

// Dummy Data
type Customers = {
  id: string;
  name: string;
  spent: string;
  phone: string;
  date: string;
  visits: string;
};

const customers: Customers[] = [
  {
    id: "1",
    name: "Collins Joe",
    phone: "0244123456",
    visits: "3",
    spent: "200",
    date: "2023-10-15",
  },
  {
    id: "2",
    name: "John Doe",
    phone: "0244762351",
    visits: "2",
    spent: "180",
    date: "2023-09-12",
  },
  {
    id: "3",
    name: "Ama Serwaa",
    phone: "0209876543",
    visits: "5",
    spent: "450",
    date: "2023-11-02",
  },
  {
    id: "4",
    name: "Kwame Asante",
    phone: "0272223344",
    visits: "1",
    spent: "90",
    date: "2023-12-01",
  },
  {
    id: "5",
    name: "Linda Mensah",
    phone: "0543217890",
    visits: "4",
    spent: "375",
    date: "2024-01-20",
  },
  {
    id: "6",
    name: "Michael Owusu",
    phone: "0551122334",
    visits: "6",
    spent: "520",
    date: "2024-02-11",
  },
];

// Derived stats
const totalCustomers = customers.length;
const repeatCustomers = customers.filter((c) => Number(c.visits) > 1).length;
const averageSpend =
  customers.reduce((sum, c) => sum + Number(c.spent), 0) / totalCustomers;
const topCustomer = customers.reduce((prev, current) =>
  Number(current.spent) > Number(prev.spent) ? current : prev
);

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Dive deep into who your customers are.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#f2f7fa]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#ebfceb]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Repeat Customers
            </CardTitle>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repeatCustomers}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#fae8e8]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Spend per Customer
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              GHS {averageSpend.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#fdf6e3]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Customer</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-md font-bold">{topCustomer.name}</div>
            <p className="text-sm text-muted-foreground">
              Spent: GHS {topCustomer.spent}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search Filter */}
      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Customers Table */}
      <Card className="overflow-auto">
        <CardHeader className="p-0">
          <Table className="min-w-[800px] w-full">
            <TableHeader>
              <TableRow className="bg-muted text-muted-foreground">
                <TableHead>Date of Last Transaction</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Total Amount Spent</TableHead>
                <TableHead>Number of Visits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.date}</TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>GHS {customer.spent}</TableCell>
                  <TableCell>{customer.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardHeader>
        <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            <strong>1-{filtered.length}</strong> of{" "}
            <strong>{customers.length}</strong> Records
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
