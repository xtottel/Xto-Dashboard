// app/home/settings/payout-account/page.tsx
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  Banknote,
  Building,
  Check,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AccountType = "momo" | "bank";

interface AccountDetails {
  type: AccountType;
  provider: string;
  accountName: string;
  accountNumber: string;
  bankName?: string;
}

export default function PayoutAccountPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [momoDialogOpen, setMomoDialogOpen] = useState(false);
  const [bankDialogOpen, setBankDialogOpen] = useState(false);
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [verificationDetails, setVerificationDetails] = useState({
    code: "",
  });

  const [momoAccount, setMomoAccount] = useState<AccountDetails | null>({
    type: "momo",
    provider: "MTN",
    accountName: "Collins Joe",
    accountNumber: "0551196764",
  });

  const [bankAccount, setBankAccount] = useState<AccountDetails | null>({
    type: "bank",
    provider: "GCB Bank",
    accountName: "Collins Joe",
    accountNumber: "1011100135850",
    bankName: "GCB Bank",
  });

  const [momoForm, setMomoForm] = useState({
    provider: "MTN",
    accountNumber: "0551196764",
  });

  const [bankForm, setBankForm] = useState({
    bankName: "GCB Bank",
    accountNumber: "1011100135850",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Payout preferences updated successfully");
    }, 1500);
  };

  const handleMomoUpdate = () => {
    if (!confirmationChecked) {
      toast.error("Please confirm that the details are correct");
      return;
    }

    // Show verification dialog instead of immediately updating
    setMomoDialogOpen(false);
    setVerifyDialogOpen(true);
  };

  const handleBankUpdate = () => {
    if (!confirmationChecked) {
      toast.error("Please confirm that the details are correct");
      return;
    }

    setBankAccount({
      type: "bank",
      provider: bankForm.bankName,
      accountName: "Collins Joe",
      accountNumber: bankForm.accountNumber,
      bankName: bankForm.bankName,
    });

    setBankDialogOpen(false);
    setConfirmationChecked(false);
    toast.success("Bank account updated successfully");
  };

  const handleVerification = () => {
    // Verify the code (in a real app, this would call an API)
    if (verificationDetails.code === "123456") {
      setMomoAccount({
        type: "momo",
        provider: momoForm.provider,
        accountName: "Collins Joe",
        accountNumber: momoForm.accountNumber,
      });

      setVerifyDialogOpen(false);
      setConfirmationChecked(false);
      setVerificationDetails({ code: "" });
      toast.success("Mobile Money account verified and updated successfully");
    } else {
      toast.error("Invalid verification code. Please try again.");
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
          <h1 className="text-2xl font-bold tracking-tight">Payout Accounts</h1>
          <p className="text-muted-foreground">
            Manage your payout methods and preferences
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Payout Accounts</CardTitle>
              <CardDescription>
                You can have one Mobile Money and one Bank account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mobile Money Account */}
                <div className="border rounded-lg p-6 shadow-sm flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-yellow-100">
                        <Banknote className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Mobile Money Account</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive payments directly to your mobile wallet
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        momoAccount
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }
                    >
                      {momoAccount ? "Active" : "Not Added"}
                    </Badge>
                  </div>

                  <div className="flex-grow flex flex-col justify-center">
                    {momoAccount ? (
                      <div className="text-center mb-4">
                        {/* Provider Logo */}
                        <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            {momoAccount.provider === "MTN" ? (
                              <span className="font-bold text-yellow-700">
                                MTN
                              </span>
                            ) : momoAccount.provider === "AIRTELTIGO" ? (
                              <span className="font-bold text-red-700">AT</span>
                            ) : (
                              <span className="font-bold text-blue-700">
                                TC
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Account Number (Bold) */}
                        <p className="text-2xl font-bold tracking-tight mb-2">
                          {momoAccount.accountNumber}
                        </p>

                        {/* Account Name */}
                        <p className="text-muted-foreground">
                          {momoAccount.accountName}
                        </p>

                        {/* Provider Name */}
                        <p className="text-sm text-muted-foreground mt-2">
                          {momoAccount.provider} Mobile Money
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-8 mb-4">
                        <p className="text-muted-foreground">
                          No Mobile Money account added
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setMomoDialogOpen(true)}
                        >
                          Update Details
                        </DropdownMenuItem>
                        {momoAccount && (
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              setMomoAccount(null);
                              toast.success(
                                "Mobile Money account deleted successfully"
                              );
                            }}
                          >
                            Delete Account
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Bank Account */}
                <div className="border rounded-lg p-6 shadow-sm flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Bank Account</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive payments directly to your bank account
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        bankAccount
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }
                    >
                      {bankAccount ? "Active" : "Not Added"}
                    </Badge>
                  </div>

                  <div className="flex-grow flex flex-col justify-center">
                    {bankAccount ? (
                      <div className="text-center mb-4">
                        {/* Bank Logo */}
                        <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            {bankAccount.bankName?.includes("GCB") ? (
                              <span className="font-bold text-blue-700">
                                GCB
                              </span>
                            ) : bankAccount.bankName?.includes("Eco") ? (
                              <span className="font-bold text-green-700">
                                ECO
                              </span>
                            ) : bankAccount.bankName?.includes("Absa") ? (
                              <span className="font-bold text-red-700">
                                ABS
                              </span>
                            ) : (
                              <span className="font-bold text-purple-700">
                                STB
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Account Number (Bold) */}
                        <p className="text-2xl font-bold tracking-tight mb-2">
                          {bankAccount.accountNumber}
                        </p>

                        {/* Account Name */}
                        <p className="text-muted-foreground">
                          {bankAccount.accountName}
                        </p>

                        {/* Bank Name */}
                        <p className="text-sm text-muted-foreground mt-2">
                          {bankAccount.bankName}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-8 mb-4">
                        <p className="text-muted-foreground">
                          No bank account added
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setBankDialogOpen(true)}
                        >
                          Update Details
                        </DropdownMenuItem>
                        {bankAccount && (
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              setBankAccount(null);
                              toast.success(
                                "Bank account deleted successfully"
                              );
                            }}
                          >
                            Delete Account
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payout Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultPayout">Default Payout Method</Label>
                <Select defaultValue={momoAccount ? "momo" : "bank"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select default method" />
                  </SelectTrigger>
                  <SelectContent>
                    {momoAccount && (
                      <SelectItem value="momo">
                        Mobile Money ({momoAccount.provider})
                      </SelectItem>
                    )}
                    {bankAccount && (
                      <SelectItem value="bank">
                        Bank Account ({bankAccount.bankName})
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred method to receive payments
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="minPayout">Minimum Payout Amount</Label>
                <Input
                  id="minPayout"
                  defaultValue="GHS 50.00"
                  placeholder="Enter minimum amount"
                />
                <p className="text-sm text-muted-foreground">
                  Payments will be accumulated until reaching this amount
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" asChild>
              <Link href="/home/settings">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </div>
      </form>

      {/* Mobile Money Dialog */}
      <Dialog open={momoDialogOpen} onOpenChange={setMomoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mobile Money Account Details</DialogTitle>
            <DialogDescription>
              Update your mobile money account information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select
                value={momoForm.provider}
                onValueChange={(value) =>
                  setMomoForm({ ...momoForm, provider: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MTN">MTN MoMo</SelectItem>
                  <SelectItem value="AIRTELTIGO">AT Money</SelectItem>
                  <SelectItem value="TELECEL">Telecel Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="number">Mobile Money Number</Label>
              <Input
                id="number"
                placeholder="e.g., 0551196764"
                value={momoForm.accountNumber}
                onChange={(e) =>
                  setMomoForm({ ...momoForm, accountNumber: e.target.value })
                }
              />
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                Kindly ensure that you have entered your correct mobile money
                details. Incorrect details will result in a failed transfer. You
                may incur additional charges when funds are returned to your
                Xtopay account.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirmation"
                checked={confirmationChecked}
                onCheckedChange={(checked) =>
                  setConfirmationChecked(checked as boolean)
                }
              />
              <Label htmlFor="confirmation" className="text-sm">
                I confirm that the above details are correct
              </Label>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setMomoDialogOpen(false);
                setConfirmationChecked(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleMomoUpdate}
              disabled={!confirmationChecked}
            >
              <Check className="mr-2 h-4 w-4" />
              Verify Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bank Account Dialog */}
      <Dialog open={bankDialogOpen} onOpenChange={setBankDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bank Account Details</DialogTitle>
            <DialogDescription>
              Update your bank account information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Bank Name</Label>
              <Select
                value={bankForm.bankName}
                onValueChange={(value) =>
                  setBankForm({ ...bankForm, bankName: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GCB Bank">GCB Bank</SelectItem>
                  <SelectItem value="Ecobank">Ecobank</SelectItem>
                  <SelectItem value="Absa Bank">Absa Bank</SelectItem>
                  <SelectItem value="Stanbic Bank">Stanbic Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="Enter account number"
                value={bankForm.accountNumber}
                onChange={(e) =>
                  setBankForm({ ...bankForm, accountNumber: e.target.value })
                }
              />
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                Kindly ensure that you have entered your correct bank details.
                Incorrect details will result in a failed transfer. You may
                incur additional charges when funds are returned to your Xtopay
                account.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirmation-bank"
                checked={confirmationChecked}
                onCheckedChange={(checked) =>
                  setConfirmationChecked(checked as boolean)
                }
              />
              <Label htmlFor="confirmation-bank" className="text-sm">
                I confirm that the above details are correct
              </Label>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setBankDialogOpen(false);
                setConfirmationChecked(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleBankUpdate}
              disabled={!confirmationChecked}
            >
              <Check className="mr-2 h-4 w-4" />
              Save Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verification Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Your Account</DialogTitle>
            <DialogDescription>
              We&apos;ve sent a verification code to {momoForm.accountNumber}.
              Please enter it below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                placeholder="Enter 6-digit code"
                value={verificationDetails.code}
                onChange={(e) =>
                  setVerificationDetails({
                    ...verificationDetails,
                    code: e.target.value,
                  })
                }
              />
            </div>

            <div className="text-sm text-muted-foreground">
              Didn&apos;t receive the code?{" "}
              <Button variant="link" className="p-0 h-auto">
                Resend
              </Button>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setVerifyDialogOpen(false);
                setVerificationDetails({ code: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleVerification}
              disabled={verificationDetails.code.length !== 6}
            >
              Verify & Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
