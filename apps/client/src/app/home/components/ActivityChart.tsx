// app/(dashboard)/components/ActivityChart.tsx
"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

// Function to get the current week's days with current day as last
const getCurrentWeekData = () => {
  const today = new Date();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  
  // Calculate dates for the past 6 days + today
  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Generate data for the last 7 days including today
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Generate realistic sales data with some randomness
    const baseSales = 1200 + (Math.random() * 1000);
    // Add a trend - sales tend to be higher later in the week
    const trendMultiplier = 1 + ((6 - i) * 0.15);
    // Add some daily randomness (±20%)
    const randomFactor = 0.8 + (Math.random() * 0.4);
    
    const sales = Math.round(baseSales * trendMultiplier * randomFactor);
    
    days.push({
      day: dayNames[date.getDay()],
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sales,
      fullDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      isToday: i === 0
    });
  }
  
  return days;
};

export function ActivityChart() {
  const data = useMemo(() => getCurrentWeekData(), []);

  // Custom tooltip to show both day and date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataItem = data.find(item => item.day === label);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
          <p className="text-gray-600 font-medium">{dataItem?.fullDate}</p>
          <p className="text-indigo-600 font-bold">
            GH₵{payload[0].value.toLocaleString()}
          </p>
          {dataItem?.isToday && (
            <p className="text-xs text-green-500 mt-1">Today</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Customized dot for today's data point
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderDot = (props: any) => {
    const { cx, cy, payload } = props;
    
    if (payload.isToday) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#6366f1" strokeWidth={3} />
          <circle cx={cx} cy={cy} r={4} fill="#6366f1" />
        </g>
      );
    }
    
    return (
      <circle cx={cx} cy={cy} r={4} fill="#fff" stroke="#6366f1" strokeWidth={2} />
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Weekly Sales Trend</CardTitle>
        <p className="text-sm text-gray-500 font-normal">
          Last 7 days ending today ({new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })})
        </p>
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
              <XAxis 
                dataKey="day" 
                stroke="#6b7280" 
              />
              <YAxis 
                stroke="#6b7280" 
                tickFormatter={(value) => `₵${value.toLocaleString()}`}
              />
              <Tooltip content={customTooltip} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorSales)"
                strokeWidth={3}
                dot={renderDot}
                activeDot={{ r: 8, stroke: "#6366f1", strokeWidth: 2, fill: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center items-center mt-4">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-indigo-100 border border-indigo-300 mr-1"></div>
            <span className="text-xs text-gray-500">Previous days</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>
            <span className="text-xs text-gray-500">Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}