"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
//   CardTitle,
//   CardContent,
  // CardDescription,
  CardFooter,
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

import { Search } from "lucide-react";



type Customers = {
  name: string;
  spent: string;
  phone: string;
  date: string;
  id: string;
  visits?: string;
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
    phone: "0244123456",
    visits: "3",
    spent: "200",
    date: "2023-10-15",
  },
];

export default function CustomersPage() {
  // State management
  const [searchTerm, setSearchTerm] = useState("");


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

      {/* <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-[250px_1fr] w-full overflow-x-hidden"> */}

      {/* Main content */}
      <div className="space-y-6 w-full overflow-auto">
        {/* Search and actions */}
        <Card>
          <CardHeader className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-9 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Contacts table */}
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
                  <TableHead className="w-[40px]"></TableHead>
                </TableRow>
              </TableHeader>
               <TableBody>
              {customers.map((customers) => (
                <TableRow key={customers.id}>
                  <TableCell>{customers.date}</TableCell>
                  <TableCell className="font-medium">
                    {customers.name}
                  </TableCell>
                  <TableCell>{customers.phone}</TableCell>
                  <TableCell>{customers.spent}</TableCell>
                  <TableCell>{customers.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </CardHeader>
           <CardFooter className="flex items-center justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            <strong>1-{customers.length}</strong> of{" "}
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
    </div>
  );
}
