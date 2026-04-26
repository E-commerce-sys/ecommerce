"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function AdminCharts({ data }) {
  const charts = [
    {
      title: "Users Over Time",
      data: data?.usersOverTime || [],
      key: "users",
      color: "rgb(var(--color-primary-main))",
    },
    {
      title: "Orders Over Time",
      data: data?.ordersOverTime || [],
      key: "orders",
      color: "rgb(var(--color-text-blue))",
    },
    {
      title: "Revenue Over Time",
      data: data?.revenueOverTime || [],
      key: "revenue",
      color: "rgb(var(--color-text-green))",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      {charts.map((chart) => (
        <div
          key={chart.key}
          className="bg-white border border-[rgb(var(--color-border))] rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-sm font-semibold text-[rgb(var(--color-text-main-2))] mb-5">
            {chart.title}
          </h2>

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
                className="text-[10px]"
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                className="text-[10px]"
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