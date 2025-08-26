import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock data for admin dashboard
    const stats = {
      totalRevenue: 125000000,
      totalOrders: 1234,
      totalCustomers: 567,
      totalProducts: 89,
      recentOrders: [
        {
          id: "ORD001",
          customer: "Nguyễn Văn A",
          total: 250000,
          status: "completed",
          date: "2024-01-15",
        },
        {
          id: "ORD002",
          customer: "Trần Thị B",
          total: 180000,
          status: "pending",
          date: "2024-01-15",
        },
        {
          id: "ORD003",
          customer: "Lê Văn C",
          total: 320000,
          status: "processing",
          date: "2024-01-14",
        },
        {
          id: "ORD004",
          customer: "Phạm Thị D",
          total: 150000,
          status: "completed",
          date: "2024-01-14",
        },
        {
          id: "ORD005",
          customer: "Hoàng Văn E",
          total: 420000,
          status: "completed",
          date: "2024-01-13",
        },
      ],
      topProducts: [
        {
          id: 1,
          name: "Bánh quy Oreo",
          sold: 156,
          revenue: 3900000,
        },
        {
          id: 2,
          name: "Snack Lay's",
          sold: 134,
          revenue: 2680000,
        },
        {
          id: 3,
          name: "Kẹo Haribo",
          sold: 98,
          revenue: 3430000,
        },
        {
          id: 4,
          name: "Chocolate KitKat",
          sold: 87,
          revenue: 1305000,
        },
      ],
      salesChart: [
        { month: "Jan", sales: 12000000 },
        { month: "Feb", sales: 15000000 },
        { month: "Mar", sales: 18000000 },
        { month: "Apr", sales: 22000000 },
        { month: "May", sales: 25000000 },
        { month: "Jun", sales: 28000000 },
      ],
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 })
  }
}
