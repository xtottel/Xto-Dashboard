
"use client";

import {
  Card,
  CardHeader,
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
import { Ellipsis } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query"; // You may need to create this

type Payout = {
  id: string;
  date: string;
  recipient: string;
  amount: string;
  fee: string;
  net: string;
  method: string;
  phone: string;
  status: "paid" | "pending" | "failed";
  account: string;
};

const payouts: Payout[] = [
  {
    id: "1",
    date: "2025-07-28 10:45:23",
    recipient: "Collins Joe",
    amount: "GHS 500.00",
    fee: "GHS 5.00",
    net: "GHS 495.00",
    method: "MTN Mobile Money",
    phone: "0244000000",
    status: "paid",
    account: "0244000000",
  },
  {
    id: "2",
    date: "2025-07-25 12:00:00",
    recipient: "Ethel Akorfa",
    amount: "GHS 300.00",
    fee: "GHS 3.00",
    net: "GHS 297.00",
    method: "VISA **** 4242",
    phone: "0244123456",
    status: "pending",
    account: "VISA 4242",
  },
];

const getStatusBadge = (status: Payout["status"]) => (
  <Badge variant="status" status={status}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </Badge>
);

export default function PayoutsPage() {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const DetailsContent = () => (
    <div className="space-y-3 p-4 text-sm">
      <p><strong>Recipient:</strong> {selectedPayout?.recipient}</p>
      <p><strong>Date:</strong> {selectedPayout?.date}</p>
      <p><strong>Amount:</strong> {selectedPayout?.amount}</p>
      <p><strong>Fee:</strong> {selectedPayout?.fee}</p>
      <p><strong>Net Amount:</strong> {selectedPayout?.net}</p>
      <p><strong>Account:</strong> {selectedPayout?.account}</p>
      <p><strong>Phone:</strong> {selectedPayout?.phone}</p>
      <p><strong>Status:</strong> {selectedPayout?.status}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payout History</h1>
          <p className="text-muted-foreground">Track all your payout records</p>
        </div>
        <Button>Request Payout</Button>
      </div>

      <Card>
        <CardHeader className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted text-muted-foreground">
                <TableHead>Date</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Payout Method</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell>{payout.date}</TableCell>
                  <TableCell>{payout.recipient}</TableCell>
                  <TableCell>{payout.amount}</TableCell>
                  <TableCell>{getStatusBadge(payout.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{payout.method}</TableCell>
                  <TableCell className="hidden md:table-cell">{payout.phone}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Ellipsis className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedPayout(payout)}>
                          View Details
                        </DropdownMenuItem>
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
            <strong>1-{payouts.length}</strong> of <strong>{payouts.length}</strong> Records
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>

      {/* Drawer for Mobile */}
      <Drawer open={!!selectedPayout && isMobile} onOpenChange={() => setSelectedPayout(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Payout Details</DrawerTitle>
          </DrawerHeader>
          {selectedPayout && <DetailsContent />}
        </DrawerContent>
      </Drawer>

      {/* Dialog for Desktop */}
      <Dialog open={!!selectedPayout && !isMobile} onOpenChange={() => setSelectedPayout(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payout Details</DialogTitle>
          </DialogHeader>
          {selectedPayout && <DetailsContent />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

