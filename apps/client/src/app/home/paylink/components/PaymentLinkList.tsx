// app/(dashboard)/payment-links/components/PaymentLinkList.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Copy, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type PaymentLink = {
  id: string;
  name: string;
  url: string;
  status: "active" | "paused" | "expired";
  amount: string;
  currency: string;
  clicks: number;
  payments: number;
  createdAt: string;
};

export function PaymentLinkList() {
  const paymentLinks: PaymentLink[] = [
    {
      id: "pl_1",
      name: "Website Subscription",
      url: "xtopay.com/pay/website-sub",
      status: "active",
      amount: "50.00",
      currency: "USD",
      clicks: 245,
      payments: 128,
      createdAt: "2023-11-01",
    },
    {
      id: "pl_2",
      name: "Consultation Fee",
      url: "xtopay.com/pay/consultation",
      status: "active",
      amount: "150.00",
      currency: "USD",
      clicks: 89,
      payments: 42,
      createdAt: "2023-11-05",
    },
    {
      id: "pl_3",
      name: "Event Ticket",
      url: "xtopay.com/pay/event-ticket",
      status: "expired",
      amount: "25.00",
      currency: "USD",
      clicks: 532,
      payments: 487,
      createdAt: "2023-10-15",
    },
    {
      id: "pl_4",
      name: "Donation",
      url: "xtopay.com/pay/donation",
      status: "paused",
      amount: "Custom",
      currency: "USD",
      clicks: 178,
      payments: 92,
      createdAt: "2023-11-10",
    },
  ];

  const getStatusBadge = (status: PaymentLink["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "paused":
        return <Badge variant="secondary">Paused</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard. The payment link URL has been copied to your clipboard.");
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Payments</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentLinks.map((link) => (
            <TableRow key={link.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{link.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {link.url}
                  </span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(link.status)}</TableCell>
              <TableCell>
                {link.amount} {link.currency}
              </TableCell>
              <TableCell>{link.clicks}</TableCell>
              <TableCell>{link.payments}</TableCell>
              <TableCell>{link.createdAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(link.url)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`https://${link.url}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>
                        {link.status === "active" ? "Pause" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Payments</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}