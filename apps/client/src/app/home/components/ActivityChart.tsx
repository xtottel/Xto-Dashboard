// app/(dashboard)/components/ActivityChart.tsx
"use client";

import {
  // LineChart,
  // Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sales data for the week
const data = [
  { day: "Mon", sales: 1200 },
  { day: "Tue", sales: 1600 },
  { day: "Wed", sales: 900 },
  { day: "Thu", sales: 2000 },
  { day: "Fri", sales: 2400 },
  { day: "Sat", sales: 1800 },
  { day: "Sun", sales: 1300 },
];

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Sales Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderColor: "#e5e7eb" }}
                labelStyle={{ color: "#4b5563" }}
                cursor={{ stroke: "#6366f1", strokeWidth: 1, opacity: 0.2 }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorSales)"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#6366f1", strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
