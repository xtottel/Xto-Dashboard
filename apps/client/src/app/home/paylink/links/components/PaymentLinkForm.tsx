// app/(dashboard)/payment-links/components/PaymentLinkForm.tsx
"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

export function PaymentLinkForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [fixedAmount, setFixedAmount] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle form submission
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Link Name</Label>
        <Input id="name" placeholder="e.g. Website Subscription" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Amount Type</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="amount-type"
              checked={fixedAmount}
              onCheckedChange={setFixedAmount}
            />
            <Label htmlFor="amount-type">
              {fixedAmount ? "Fixed Amount" : "Customer Enters Amount"}
            </Label>
          </div>
        </div>

        {fixedAmount && (
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="flex gap-2">
              <Select defaultValue="usd">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                  <SelectItem value="ngn">NGN</SelectItem>
                </SelectContent>
              </Select>
              <Input id="amount" type="number" placeholder="0.00" required />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="What is this payment for?"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="redirect-url">Redirect After Payment (Optional)</Label>
          <Input
            id="redirect-url"
            type="url"
            placeholder="https://yourwebsite.com/thank-you"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date (Optional)</Label>
          <Input id="expiry" type="date" />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Payment Link"
          )}
        </Button>
      </div>
    </form>
  );
}