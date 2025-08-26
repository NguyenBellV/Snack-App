import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  const supabase = createServerClient()
  const body = await request.json()

  const { userId, cartId, shippingInfo, paymentMethod, notes } = body

  // Get cart items
  const { data: cartItems } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:products(*)
    `)
    .eq("cart_id", cartId)

  if (!cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = subtotal >= 200000 ? 0 : 30000 // Free shipping over 200k
  const totalAmount = subtotal + shippingFee

  // Generate order number
  const orderNumber = `ORD${Date.now()}`

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      order_number: orderNumber,
      subtotal,
      shipping_fee: shippingFee,
      total_amount: totalAmount,
      shipping_name: shippingInfo.name,
      shipping_phone: shippingInfo.phone,
      shipping_address: shippingInfo.address,
      shipping_city: shippingInfo.city,
      shipping_district: shippingInfo.district,
      shipping_ward: shippingInfo.ward,
      payment_method: paymentMethod,
      notes,
    })
    .select()
    .single()

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 })
  }

  // Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product.name,
    product_image: item.product.images?.[0]?.image_url,
    quantity: item.quantity,
    price: item.price,
    total: item.price * item.quantity,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 })
  }

  // Update product sold count and stock
  for (const item of cartItems) {
    await supabase
      .from("products")
      .update({
        sold_count: item.product.sold_count + item.quantity,
        stock_quantity: item.product.stock_quantity - item.quantity,
      })
      .eq("id", item.product_id)
  }

  // Clear cart
  await supabase.from("cart_items").delete().eq("cart_id", cartId)

  return NextResponse.json({ order })
}

export async function GET(request: NextRequest) {
  const supabase = createServerClient()
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 })
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ orders })
}
