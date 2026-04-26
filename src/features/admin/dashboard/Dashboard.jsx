"use client"

import { useState, useEffect } from "react"
import AdminCharts from "./DashboardCharts"
import { LowStockTable, BestSellingTable } from "./DashboardTables"
import { getStats } from "./dashboardAPI"

export default function AdminDashboard() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getStats();
        setStatistics(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Total Users", value: statistics?.totalUsers ?? "—" },
    { label: "Total Orders", value: statistics?.totalOrders ?? "—" },
    { label: "Total Revenue", value: statistics ? `$${statistics.totalRevenue}` : "—" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border rounded-xl p-5 bg-white shadow-sm">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <AdminCharts data={statistics} />

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <LowStockTable data={statistics?.lowStockVariants} />
        <BestSellingTable data={statistics?.bestSellingProducts} />
      </div>
    </div>
  )
}