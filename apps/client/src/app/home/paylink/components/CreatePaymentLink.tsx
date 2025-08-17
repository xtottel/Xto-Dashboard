// app/(dashboard)/payment-links/components/CreatePaymentLink.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { PaymentLinkForm } from "./PaymentLinkForm";

export function CreatePaymentLink() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Payment Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create New Payment Link</DialogTitle>
          <DialogDescription>
            Generate a shareable link to collect payments from customers.
          </DialogDescription>
        </DialogHeader>
        <PaymentLinkForm />
      </DialogContent>
    </Dialog>
  );
}