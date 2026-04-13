"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const usersData = [
  { month: "Jan", users: 400 },  { month: "Feb", users: 820 },
  { month: "Mar", users: 650 },  { month: "Apr", users: 1100 },
  { month: "May", users: 900 },  { month: "Jun", users: 1400 },
  { month: "Jul", users: 1250 }, { month: "Aug", users: 1800 },
  { month: "Sep", users: 2100 }, { month: "Oct", users: 1950 },
  { month: "Nov", users: 2400 }, { month: "Dec", users: 2800 },
]

const ordersData = [
  { month: "Jan", orders: 320 }, { month: "Feb", orders: 500 },
  { month: "Mar", orders: 480 }, { month: "Apr", orders: 900 },
  { month: "May", orders: 750 }, { month: "Jun", orders: 1100 },
  { month: "Jul", orders: 980 }, { month: "Aug", orders: 1400 },
  { month: "Sep", orders: 1600 },{ month: "Oct", orders: 1500 },
  { month: "Nov", orders: 1900 },{ month: "Dec", orders: 2200 },
]

const revenueData = [
  { month: "Jan", revenue: 4000 },  { month: "Feb", revenue: 8200 },
  { month: "Mar", revenue: 6500 },  { month: "Apr", revenue: 11000 },
  { month: "May", revenue: 9000 },  { month: "Jun", revenue: 14000 },
  { month: "Jul", revenue: 12500 }, { month: "Aug", revenue: 18000 },
  { month: "Sep", revenue: 21000 }, { month: "Oct", revenue: 19500 },
  { month: "Nov", revenue: 24000 }, { month: "Dec", revenue: 28000 },
]

const usersConfig   = { users:   { label: "Users",   color: "rgb(var(--color-primary-main))" } }
const ordersConfig  = { orders:  { label: "Orders",  color: "rgb(var(--color-text-blue))"    } }
const revenueConfig = { revenue: { label: "Revenue", color: "rgb(var(--color-text-green))"   } }

const stats = [
  {
    label: "Total Users",
    value: "1.2M"
  },
  {
    label: "Total Orders",
    value: "10M"
  },
  {
    label: "Total Revenue",
    value: "$5M"
  },
]

const charts = [
  { title: "Users Over Time",   config: usersConfig,   data: usersData,   key: "users"   },
  { title: "Orders Over Time",  config: ordersConfig,  data: ordersData,  key: "orders"  },
  { title: "Revenue Over Time", config: revenueConfig, data: revenueData, key: "revenue" },
]

const products = [
  { id: 1, name: "Product A", stock: 5,  status: "Low Stock" },
  { id: 2, name: "Product B", stock: 11, status: "Low Stock" },
  { id: 3, name: "Product C", stock: 25, status: "Normal"    },
]

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-grey))] p-8">

      {/* Header */}
      <h1 className="text-3xl font-bold text-[rgb(var(--color-text-main))] mb-8">
        Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`border  rounded-xl p-5 shadow-sm bg-white`}
          >
            <p className="text-sm text-[rgb(var(--color-text-main-2))] mb-1">{stat.label}</p>
            <p className={`text-2xl font-semibold `}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {charts.map(({ title, config, data, key }) => (
          <div
            key={key}
            className="bg-white border border-[rgb(var(--color-border))] rounded-xl p-5 shadow-sm"
          >
            <h2 className="text-sm font-medium text-[rgb(var(--color-text-main-3))] mb-4">
              {title}
            </h2>
            <ChartContainer config={config} className="h-[220px] w-full">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey={key}
                  stroke={`var(--color-${key})`}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        ))}
      </div>

      {/* Low Stock Table */}
      <div className="bg-white border border-[rgb(var(--color-border))] rounded-xl shadow-sm overflow-hidden max-w-lg">
        <Table>
          <TableCaption className="mb-3 text-[rgb(var(--color-text-main-2))]">
            Low Stock Alert
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-[rgb(var(--color-grey))]">
              <TableHead className="text-[rgb(var(--color-text-main-3))]">Product_ID</TableHead>
              <TableHead className="text-[rgb(var(--color-text-main-3))]">Stock</TableHead>
              <TableHead className="text-[rgb(var(--color-text-main-3))]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="border-[rgb(var(--color-border))]"
              >
                <TableCell className="font-medium text-[rgb(var(--color-text-main))]">
                  {product.id}
                </TableCell>
                <TableCell className="text-[rgb(var(--color-text-main-2))]">
                  {product.stock}
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      product.status === "Low Stock"
                        ? "bg-[rgb(var(--color-red-soft))] text-[rgb(var(--color-text-red))]"
                        : "bg-[rgb(var(--color-green-soft))] text-[rgb(var(--color-text-green))]"
                    }`}
                  >
                    {product.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminDashboard