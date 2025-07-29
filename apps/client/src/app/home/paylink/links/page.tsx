// app/(dashboard)/payment-links/page.tsx
import { PaymentLinkStats } from "./components/PaymentLinkStats";
import { PaymentLinkList } from "./components/PaymentLinkList";
import { CreatePaymentLink } from "./components/CreatePaymentLink";

export default function PaymentLinksPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payment Links</h1>
        <CreatePaymentLink />
      </div>
      <PaymentLinkStats />
      <PaymentLinkList />
    </div>
  );
}