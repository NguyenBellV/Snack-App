import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Lấy danh sách sản phẩm
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const status = searchParams.get("status");

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
    `);

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    if (category && category !== "all") {
      query = query.eq("category_id", Number.parseInt(category));
    }

    if (status && status !== "all") {
      switch (status) {
        case "active":
          query = query.eq("is_active", true).gt("stock_quantity", 0);
          break;
        case "inactive":
          query = query.eq("is_active", false);
          break;
        case "out_of_stock":
          query = query.eq("stock_quantity", 0);
          break;
      }
    }

    const { data: products, error } = await query.order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

// Thêm sản phẩm mới
export async function POST(req: Request) {
  try {
    const { name, price, category_id, image_url } = await req.json();

    const { data, error } = await supabase.from("products").insert([
      { name, price, category_id, image_url }
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
