import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const supabase = createServerClient()
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const sessionId = searchParams.get("sessionId")

  if (!userId && !sessionId) {
    return NextResponse.json({ error: "User ID or Session ID required" }, { status: 400 })
  }

  let query = supabase.from("carts").select(`
      *,
      items:cart_items(
        *,
        product:products(*)
      )
    `)

  if (userId) {
    query = query.eq("user_id", userId)
  } else {
    query = query.eq("session_id", sessionId)
  }

  const { data: carts, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const cart = carts?.[0] || null
  return NextResponse.json({ cart })
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient()
  const body = await request.json()
  const { userId, sessionId, productId, quantity } = body

  if (!userId && !sessionId) {
    return NextResponse.json({ error: "User ID or Session ID required" }, { status: 400 })
  }

  // Get or create cart
  let { data: cart } = await supabase
    .from("carts")
    .select("*")
    .eq(userId ? "user_id" : "session_id", userId || sessionId)
    .single()

  if (!cart) {
    const { data: newCart, error: cartError } = await supabase
      .from("carts")
      .insert({
        user_id: userId,
        session_id: sessionId,
      })
      .select()
      .single()

    if (cartError) {
      return NextResponse.json({ error: cartError.message }, { status: 500 })
    }
    cart = newCart
  }

  // Get product price
  const { data: product } = await supabase.from("products").select("price").eq("id", productId).single()

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  // Add or update cart item
  const { data: cartItem, error } = await supabase
    .from("cart_items")
    .upsert({
      cart_id: cart.id,
      product_id: productId,
      quantity,
      price: product.price,
    })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ cartItem })
}
