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
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Total Revenue",
      value: "GH₵ 32,845",
      description: "+22% from last month",
      icon: DollarSign,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Click Rate",
      value: "18.2%",
      description: "+3.2% from last month",
      icon: MousePointerClick,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Pending Payments",
      value: "128", 
      description: "+5 from yesterday",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className={`${stat.color} shadow-sm `}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
