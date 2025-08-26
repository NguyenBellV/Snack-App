import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")

    let query = supabase.from("coupons").select("*")

    // Apply search filter
    if (search) {
      query = query.or(`code.ilike.%${search}%,name.ilike.%${search}%`)
    }

    const { data: coupons, error } = await query.order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      coupons: coupons || [],
    })
  } catch (error) {
    console.error("Error fetching coupons:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch coupons" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      code,
      name,
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      usageLimit,
      expiresAt,
    } = await request.json()

    const { data, error } = await supabase
      .from("coupons")
      .insert({
        code: code.toUpperCase(),
        name,
        description,
        discount_type: discountType,
        discount_value: Number.parseFloat(discountValue),
        min_order_amount: Number.parseFloat(minOrderAmount) || 0,
        max_discount_amount: Number.parseFloat(maxDiscountAmount) || null,
        usage_limit: Number.parseInt(usageLimit) || null,
        used_count: 0,
        is_active: true,
        starts_at: new Date().toISOString(),
        expires_at: new Date(expiresAt).toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      coupon: data,
      message: "Coupon created successfully",
    })
  } catch (error) {
    console.error("Error creating coupon:", error)
    return NextResponse.json({ success: false, error: "Failed to create coupon" }, { status: 500 })
  }
}
