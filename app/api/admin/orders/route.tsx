import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")

    let query = supabase.from("orders").select(`
        id,
        order_number,
        shipping_name,
        shipping_phone,
        shipping_address,
        shipping_city,
        total_amount,
        status,
        payment_status,
        created_at,
        items:order_items(count)
      `)

    // Apply search filter
    if (search) {
      query = query.or(
        `order_number.ilike.%${search}%,shipping_name.ilike.%${search}%,shipping_phone.ilike.%${search}%`,
      )
    }

    // Apply status filter
    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data: orders, error } = await query.order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      orders: orders || [],
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient()
    const { orderId, status, paymentStatus } = await request.json()

    const updateData: any = { status }
    if (paymentStatus) {
      updateData.payment_status = paymentStatus
    }

    const { error } = await supabase.from("orders").update(updateData).eq("id", orderId)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 })
  }
}
