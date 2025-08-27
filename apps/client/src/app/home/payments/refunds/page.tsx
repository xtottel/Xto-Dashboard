import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Filter, Search, ChevronDown, Ellipsis } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Refund = {
  id: string;
  dateRequested: string;
  dateApproved: string;
  requestedBy: string;
  paymentMethod: string;
  amount: string;
  status: "refunded" | "failed";
  originalTransactionId: string;
};

const refunds: Refund[] = [
  {
    id: "REF-001",
    dateRequested: "2023-06-18 14:30:45",
    dateApproved: "2023-06-19 10:15:22",
    requestedBy: "Collins Joe",
    paymentMethod: "MTN Mobile Money",
    amount: "GHS 10.00",
    status: "refunded",
    originalTransactionId: "1",
  },
  {
    id: "REF-002",
    dateRequested: "2023-06-20 11:20:30",
    dateApproved: "-",
    requestedBy: "Mary Jane",
    paymentMethod: "VISA **** 4242",
    amount: "GHS 20.00",
    status: "failed",
    originalTransactionId: "2",
  },
  {
    id: "REF-003",
    dateRequested: "2023-06-21 09:45:15",
    dateApproved: "2023-06-21 15:30:10",
    requestedBy: "Samuel Doe",
    paymentMethod: "Mastercard **** 5555",
    amount: "GHS 15.00",
    status: "failed",
    originalTransactionId: "3",
  },
  {
    id: "REF-004",
    dateRequested: "2023-06-22 16:40:35",
    dateApproved: "2023-06-23 09:20:45",
    requestedBy: "Alice Smith",
    paymentMethod: "AirtelTigo Money",
    amount: "GHS 25.00",
    status: "refunded",
    originalTransactionId: "4",
  },
  {
    id: "REF-005",
    dateRequested: "2023-06-24 13:25:50",
    dateApproved: "-",
    requestedBy: "Bob Johnson",
    paymentMethod: "Vodafone Cash",
    amount: "GHS 30.00",
    status: "failed",
    originalTransactionId: "5",
  },
];



const getStatusBadge = (status: Refund["status"]) => {
  return (
    <Badge variant="status" status={status}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function RefundsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Refunds History</h1>
          <p className="text-muted-foreground">
            Manage and process refund requests
          </p>
        </div>
        {/* <Button>New Refund</Button> */}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer name..."
              className="pl-9 w-full md:w-[300px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Date Range
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Refunds Table */}
      <Card>
        <CardHeader className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted text-muted-foreground">
                <TableHead>Date Requested</TableHead>
                <TableHead>Date Approved</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refunds.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell>{refund.dateRequested}</TableCell>
                  <TableCell>{refund.dateApproved}</TableCell>
                  <TableCell className="font-medium">
                    {refund.requestedBy}
                  </TableCell>
                  <TableCell>{refund.paymentMethod}</TableCell>
                  <TableCell>{refund.amount}</TableCell>
                  <TableCell>{getStatusBadge(refund.status)}</TableCell>
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
            <strong>1-{refunds.length}</strong> of{" "}
            <strong>{refunds.length}</strong> Records
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