// app/(dashboard)/payment-links/components/PaymentLinkStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, DollarSign, MousePointerClick, Clock } from "lucide-react";

export function PaymentLinkStats() {
  const stats = [
    {
      title: "Total Links",
      value: "1,245",
      description: "+15% from last month",
      icon: Link,
    },
    {
      title: "Total Revenue",
      value: "$32,845",
      description: "+22% from last month",
      icon: DollarSign,
    },
    {
      title: "Click Rate",
      value: "18.2%",
      description: "+3.2% from last month",
      icon: MousePointerClick,
    },
    {
      title: "Pending Payments",
      value: "128",
      description: "+5 from yesterday",
      icon: Clock,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}