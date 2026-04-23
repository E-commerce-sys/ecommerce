"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const usersData = [
  { month: "Jan", users: 400 }, { month: "Feb", users: 820 },
  { month: "Mar", users: 650 }, { month: "Apr", users: 1100 },
  { month: "May", users: 900 }, { month: "Jun", users: 1400 },
  { month: "Jul", users: 1250 }, { month: "Aug", users: 1800 },
  { month: "Sep", users: 2100 }, { month: "Oct", users: 1950 },
  { month: "Nov", users: 2400 }, { month: "Dec", users: 2800 },
]

const ordersData = [
  { month: "Jan", orders: 320 }, { month: "Feb", orders: 500 },
  { month: "Mar", orders: 480 }, { month: "Apr", orders: 900 },
  { month: "May", orders: 750 }, { month: "Jun", orders: 1100 },
  { month: "Jul", orders: 980 }, { month: "Aug", orders: 1400 },
  { month: "Sep", orders: 1600 }, { month: "Oct", orders: 1500 },
  { month: "Nov", orders: 1900 }, { month: "Dec", orders: 2200 },
]

const revenueData = [
  { month: "Jan", revenue: 4000 }, { month: "Feb", revenue: 8200 },
  { month: "Mar", revenue: 6500 }, { month: "Apr", revenue: 11000 },
  { month: "May", revenue: 9000 }, { month: "Jun", revenue: 14000 },
  { month: "Jul", revenue: 12500 }, { month: "Aug", revenue: 18000 },
  { month: "Sep", revenue: 21000 }, { month: "Oct", revenue: 19500 },
  { month: "Nov", revenue: 24000 }, { month: "Dec", revenue: 28000 },
]

const charts = [
  {
    title: "Users Over Time",
    data: usersData,
    key: "users",
    color: "rgb(var(--color-primary-main))",
  },
  {
    title: "Orders Over Time",
    data: ordersData,
    key: "orders",
    color: "rgb(var(--color-text-blue))",
  },
  {
    title: "Revenue Over Time",
    data: revenueData,
    key: "revenue",
    color: "rgb(var(--color-text-green))",
  },
]

export default function AdminCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      {charts.map((chart) => (
        <div
          key={chart.key}
          className="bg-white border border-[rgb(var(--color-border))] rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          {/* Title */}
          <h2 className="text-sm font-semibold text-[rgb(var(--color-text-main-2))] mb-5">
            {chart.title}
          </h2>

          {/* Chart */}
          <ChartContainer className="h-[240px] w-full" config={{}}>
            <LineChart
              data={chart.data}
              margin={{ top: 10, right: 10, left: 5, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgb(var(--color-border))"
              />

              <XAxis
              className="text-[10px] bg-rgb(var(--color-text-main-3))"
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
              className="text-[10px] bg-rgb(var(--color-text-main-3))"
                tickLine={false}
                axisLine={false}
                width={40}
              />

              <ChartTooltip content={<ChartTooltipContent />} />

              <Line
                type="monotone"
                dataKey={chart.key}
                stroke={chart.color}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      ))}
    </div>
  )
}