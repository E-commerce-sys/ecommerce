"use client"

import AdminCharts from "./DashboardCharts"
import {LowStockTable,BestSellingTable} from "./DashboardTables"

import { Button } from "@/components/ui/button"

const stats = [
  { label: "Total Users", value: "1.2M" },
  { label: "Total Orders", value: "10M" },
  { label: "Total Revenue", value: "$5M" },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-8">


            <div className="flex justify-between">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>
</div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border rounded-xl p-5 bg-white">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <AdminCharts />

      {/* Tables */}<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
  <LowStockTable/>
      <BestSellingTable/>
</div>
      </div>

  )
}