// app/settings/reports-logs/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Download, Filter, Search, Calendar, FileText, User, Shield, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Define types for our data
interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: "success" | "failure";
}

interface Settlement {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  reference: string;
}

export default function ReportsLogsPage() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [auditLogs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: "2023-10-15 14:30:25",
      user: "admin@sendexa.co",
      action: "Login",
      resource: "Authentication",
      ipAddress: "192.168.1.1",
      status: "success"
    },
    {
      id: "2",
      timestamp: "2023-10-15 14:35:42",
      user: "ceo@sendexa.co",
      action: "Update",
      resource: "Business Profile",
      ipAddress: "102.89.32.156",
      status: "success"
    },
    {
      id: "3",
      timestamp: "2023-10-15 15:12:18",
      user: "finance@sendexa.co",
      action: "Export",
      resource: "Settlement Report",
      ipAddress: "192.168.1.5",
      status: "success"
    },
    {
      id: "4",
      timestamp: "2023-10-16 09:45:33",
      user: "admin@sendexa.co",
      action: "Create",
      resource: "New User",
      ipAddress: "192.168.1.1",
      status: "success"
    },
    {
      id: "5",
      timestamp: "2023-10-16 11:20:15",
      user: "unknown@external.com",
      action: "Login",
      resource: "Authentication",
      ipAddress: "154.160.27.98",
      status: "failure"
    }
  ]);

  const [settlements] = useState<Settlement[]>([
    {
      id: "SET-2023-001",
      date: "2023-10-15",
      description: "October Week 2 Settlement",
      amount: 125640.75,
      status: "completed",
      reference: "BANK-REF-784512"
    },
    {
      id: "SET-2023-002",
      date: "2023-10-08",
      description: "October Week 1 Settlement",
      amount: 98750.25,
      status: "completed",
      reference: "BANK-REF-659823"
    },
    {
      id: "SET-2023-003",
      date: "2023-10-22",
      description: "October Week 3 Settlement",
      amount: 142350.00,
      status: "pending",
      reference: "PROCESSING-458712"
    },
    {
      id: "SET-2023-004",
      date: "2023-10-01",
      description: "September Final Settlement",
      amount: 205800.50,
      status: "completed",
      reference: "BANK-REF-325698"
    },
    {
      id: "SET-2023-005",
      date: "2023-09-24",
      description: "September Week 4 Settlement",
      amount: 95620.00,
      status: "completed",
      reference: "BANK-REF-987456"
    }
  ]);

  const [auditFilter, setAuditFilter] = useState("all");
  const [settlementFilter, setSettlementFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleExport = (type: string) => {
    toast.success(`${type} report is being prepared for download`);
    // In a real app, this would trigger an API call to generate the report
  };

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesStatus = auditFilter === "all" || log.status === auditFilter;
    const matchesSearch = searchQuery === "" || 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredSettlements = settlements.filter(settlement => {
    const matchesStatus = settlementFilter === "all" || settlement.status === settlementFilter;
    const matchesSearch = searchQuery === "" || 
      settlement.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      settlement.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "success":
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failure":
      case "failed":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/home/settings">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Logs</h1>
          <p className="text-muted-foreground">
            View audit logs and settlement statements
          </p>
        </div>
      </div>

      <Tabs defaultValue="audit" className="space-y-6">
        <TabsList>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Audit Logs
          </TabsTrigger>
          <TabsTrigger value="settlement" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Settlement Statement
          </TabsTrigger>
        </TabsList>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>
                Monitor all user activities and system events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      className="pl-8 w-full sm:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={auditFilter} onValueChange={setAuditFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="failure">Failure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => handleExport("Audit logs")}
                  className="w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>

              <div className="border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-5 p-4 bg-muted/50 font-medium">
                  <div>Timestamp</div>
                  <div>User</div>
                  <div>Action</div>
                  <div>Resource</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {filteredAuditLogs.length > 0 ? (
                    filteredAuditLogs.map((log) => (
                      <div key={log.id} className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {log.timestamp}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          {log.user}
                        </div>
                        <div>{log.action}</div>
                        <div>{log.resource}</div>
                        <div>
                          <Badge variant={getStatusVariant(log.status)}>
                            {log.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No audit logs found matching your criteria
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>Showing {filteredAuditLogs.length} of {auditLogs.length} logs</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settlement Statement Tab */}
        <TabsContent value="settlement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settlement Statements</CardTitle>
              <CardDescription>
                View and export your transaction settlement reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search settlements..."
                      className="pl-8 w-full sm:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={settlementFilter} onValueChange={setSettlementFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    onClick={() => handleExport("Settlement statement")}
                    className="flex-1 sm:flex-none"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleExport("Settlement statement")}
                    className="flex-1 sm:flex-none"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    CSV
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-6 p-4 bg-muted/50 font-medium">
                  <div>Date</div>
                  <div className="col-span-2">Description</div>
                  <div>Amount (GHS)</div>
                  <div>Reference</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {filteredSettlements.length > 0 ? (
                    filteredSettlements.map((settlement) => (
                      <div key={settlement.id} className="grid grid-cols-1 md:grid-cols-6 p-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {settlement.date}
                        </div>
                        <div className="col-span-2">{settlement.description}</div>
                        <div>₵{settlement.amount.toLocaleString()}</div>
                        <div className="text-muted-foreground font-mono text-xs">
                          {settlement.reference}
                        </div>
                        <div>
                          <Badge variant={getStatusVariant(settlement.status)}>
                            {settlement.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No settlement records found matching your criteria
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredSettlements.length} of {settlements.length} settlements
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="start-date" className="text-sm">Date Range:</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      className="h-8 w-[130px]"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      id="end-date"
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                      className="h-8 w-[130px]"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settlement Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Settled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₵534,161.50</div>
                <p className="text-xs text-muted-foreground">
                  From 4 completed settlements
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Settlement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₵142,350.00</div>
                <p className="text-xs text-muted-foreground">
                  1 settlement being processed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Weekly</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₵133,540.38</div>
                <p className="text-xs text-muted-foreground">
                  Last 4 weeks average
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}