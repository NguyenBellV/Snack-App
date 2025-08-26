import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")

    // First, get all profiles
    let profileQuery = supabase.from("profiles").select("*")

    // Apply search filter
    if (search) {
      profileQuery = profileQuery.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    const { data: profiles, error: profileError } = await profileQuery.order("created_at", { ascending: false })

    if (profileError) {
      console.error("Profile query error:", profileError)
      return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 })
    }

    // Get order statistics for each customer
    const customersWithStats = await Promise.all(
      (profiles || []).map(async (profile) => {
        try {
          // Get order count
          const { count: orderCount } = await supabase
            .from("orders")
            .select("*", { count: "exact", head: true })
            .eq("user_id", profile.id)

          // Get total spent
          const { data: orders } = await supabase
            .from("orders")
            .select("total_amount")
            .eq("user_id", profile.id)
            .eq("status", "delivered")

          const totalSpent = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0

          return {
            ...profile,
            orders: [{ count: orderCount || 0 }],
            total_spent: [{ sum: totalSpent }],
          }
        } catch (error) {
          console.error(`Error fetching stats for customer ${profile.id}:`, error)
          return {
            ...profile,
            orders: [{ count: 0 }],
            total_spent: [{ sum: 0 }],
          }
        }
      }),
    )

    // Filter by status if provided
    let filteredCustomers = customersWithStats
    if (status && status !== "all") {
      filteredCustomers = customersWithStats.filter((customer) => {
        const orderCount = customer.orders?.[0]?.count || 0
        const totalSpent = customer.total_spent?.[0]?.sum || 0

        switch (status) {
          case "vip":
            return totalSpent >= 2000000
          case "new":
            return orderCount === 0
          case "active":
            return orderCount >= 5
          case "inactive":
            return orderCount > 0 && orderCount < 5
          default:
            return true
        }
      })
    }

    return NextResponse.json({
      success: true,
      customers: filteredCustomers,
      pagination: {
        page: 1,
        limit: 50,
        total: filteredCustomers.length,
        totalPages: 1,
      },
    })
  } catch (error) {
    console.error("Error in customers API:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
