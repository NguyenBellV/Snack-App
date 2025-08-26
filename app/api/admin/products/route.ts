import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const status = searchParams.get("status")

    let query = supabase.from("products").select(`
        id,
        name,
        price,
        original_price,
        stock_quantity,
        sold_count,
        is_active,
        featured,
        category:categories(name),
        images:product_images(image_url, is_primary)
      `)

    // Apply search filter
    if (search) {
      query = query.ilike("name", `%${search}%`)
    }

    // Apply category filter
    if (category && category !== "all") {
      query = query.eq("category_id", Number.parseInt(category))
    }

    // Apply status filter
    if (status && status !== "all") {
      switch (status) {
        case "active":
          query = query.eq("is_active", true).gt("stock_quantity", 0)
          break
        case "inactive":
          query = query.eq("is_active", false)
          break
        case "out_of_stock":
          query = query.eq("stock_quantity", 0)
          break
      }
    }

    const { data: products, error } = await query.order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      products: products || [],
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await req.json()

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: body.name,
          price: body.price,
          original_price: body.original_price,
          stock_quantity: body.stock_quantity,
          is_active: body.is_active,
          featured: body.featured,
          category_id: body.category_id,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, product: data?.[0] }, { status: 201 })
  } catch (err: any) {
    console.error("Error creating product:", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}