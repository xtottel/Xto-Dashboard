
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Copy,
  Plus,
  Eye,
  EyeOff,
  Key,
  MoreVertical,
  ChevronLeft,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";


type ApiKey = {
  id: string;
  name: string;
  key: string;
  lastUsed: string;
  created: string;
  status: "test" | "live";
};

const initialApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API",
    key: "sk_live_1234567890abcdef",
    lastUsed: "2023-06-15 09:30:45",
    created: "2023-05-10",
    status: "live",
  },
  {
    id: "2",
    name: "Development API",
    key: "sk_test_9876543210fedcba",
    lastUsed: "2023-06-10 14:22:18",
    created: "2023-04-15",
    status: "test",
  },
];

const getStatusBadge = (status: ApiKey["status"]) => {
  return (
    <Badge variant="status" status={status}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
 

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied. The API key has been copied to your clipboard.");
  };

  const handleCreate = () => {
    if (newKeyName.trim()) {
      // Generate a new API key
      const newKey: ApiKey = {
        id: Date.now().toString(),
        name: newKeyName,
        key: `sk_${newKeyName.toLowerCase().includes('prod') ? 'live' : 'test'}_${Math.random().toString(36).substring(2, 18)}`,
        lastUsed: "Never",
        created: new Date().toISOString().split('T')[0],
        status: newKeyName.toLowerCase().includes('prod') ? "live" : "test"
      };

      setApiKeys([...apiKeys, newKey]);
      
      toast.success(`API key created. New key "${newKeyName}" has been generated.`);
      
      setIsCreating(false);
      setNewKeyName("");
    }
  };

  const handleDelete = (id: string) => {
    setIsDeleting(true);
    setKeyToDelete(id);
  };

  const confirmDelete = () => {
    if (keyToDelete) {
      setApiKeys(apiKeys.filter(key => key.id !== keyToDelete));
      
      toast.success(
        <div>
          <strong>API key deleted</strong>
          <div>The API key has been permanently removed.</div>
        </div>,
        { className: "bg-destructive text-destructive-foreground" }
      );
    }
    
    setIsDeleting(false);
    setKeyToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setKeyToDelete(null);
  };

  const handleRegenerate = (id: string) => {
    setApiKeys(apiKeys.map(key => {
      if (key.id === id) {
        return {
          ...key,
          key: `sk_${key.status}_${Math.random().toString(36).substring(2, 18)}`,
          lastUsed: "Never"
        };
      }
      return key;
    }));
    
    toast(
      <div>
        <strong>API key regenerated</strong>
        <div>The API key has been successfully regenerated.</div>
      </div>
    );
  };

  return (
    <div className="space-y-6"> 
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/home/settings">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">API Keys</h1>
            <p className="text-muted-foreground">
              Manage your API access credentials
            </p>
          </div>
        </div>

        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Generate a new secret key for API access. This key will have full access to your account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Key Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Production Server"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Give your key a descriptive name to identify its purpose.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!newKeyName.trim()}>
                Generate Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <Key className="h-8 w-8" />
                      <p>No API keys found</p>
                      <p className="text-sm">Create your first API key to get started</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        {key.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                          {showKey === key.id ? key.key : "••••••••••••••••"}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            setShowKey(showKey === key.id ? null : key.id)
                          }
                        >
                          {showKey === key.id ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleCopy(key.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(key.status)}</TableCell>
                    <TableCell>{key.created}</TableCell>
                    <TableCell>{key.lastUsed}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleCopy(key.key)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Key
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRegenerate(key.id)}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Regenerate Key
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDelete(key.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Key
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this API key? This action cannot be undone and any applications using this key will stop working.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}