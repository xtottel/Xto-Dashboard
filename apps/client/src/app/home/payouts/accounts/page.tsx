"use client";

import { MoreHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export default function PayoutAccount() {
  const accounts = [
    {
      name: "Bank",
      provider: "GCB Bank PLC",
      number: "1011100135850",
      accountName: "Xtottel Ltd",
      providerLogo: "/gcb.png",
      bg: "bg-[url('/bank.png')]",
    },
    {
      name: "Mobile Money",
      provider: "MTN Ghana",
      number: "0555539152",
      accountName: "Xtottel Ltd",
      providerLogo: "/mtn.svg",
      bg: "bg-[url('/momo.png')]",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Settlement Accounts</h1>
          <p className="text-muted-foreground">
            Add transfer and settlement accounts
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account, idx) => (
          <Card
            key={idx}
            className={`relative text-white h-60 shadow-md rounded-xl ${account.bg} bg-cover bg-center bg-no-repeat overflow-hidden`}
          >
            {/* Card Header with Provider Logo at top right */}
            <CardHeader className="flex flex-row items-start justify-between p-4">
              <CardTitle className="text-lg font-bold text-white pt-10">
                {/* {account.name} */}
              </CardTitle>
              <Image
                src={account.providerLogo}
                alt={`${account.provider} Logo`}
                width={40}
                height={40}
                className="h-8 w-auto opacity-90 rounded-sm"
              />
            </CardHeader>

            {/* Card Content - Account Details */}
            <CardContent className="pt-10">
              <div className="space-y-2">
                <div className="text-2xl font-bold tracking-wide text-black">
                  {account.number}
                </div>
                <div className="text-sm font-medium text-black/90">
                  {account.accountName}
                </div>
              </div>
            </CardContent>

            {/* Card Footer with Three Dots at bottom right */}
            <CardFooter className="flex justify-end p-4 py-3">
              <MoreHorizontal className="h-5 w-5 text-black/80 cursor-pointer hover:text-black" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}