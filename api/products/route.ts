import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  const supabase = createServerClient();

  try {
    const body = await request.json();
    const { name, price, categoryName, images, features } = body;

    if (!name || !price || !categoryName) {
      return NextResponse.json(
        { error: "Tên sản phẩm, giá và danh mục là bắt buộc" },
        { status: 400 }
      );
    }

    // Find category_id from categoryName
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("name", categoryName)
      .single();

    if (categoryError || !category) {
      return NextResponse.json(
        { error: "Danh mục không hợp lệ" },
        { status: 400 }
      );
    }

    const category_id = category.id;

    // Insert product
    const { data: productData, error: productError } = await supabase
      .from("products")
      .insert([{ name, price, category_id, is_active: true }])
      .select()
      .single();

    if (productError) {
      return NextResponse.json({ error: productError.message }, { status: 400 });
    }

    const productId = productData.id;

    // Insert images
    if (images && images.length > 0) {
      await supabase.from("product_images").insert(
        images.map((url: string) => ({
          product_id: productId,
          image_url: url,
        }))
      );
    }

    // Insert features
    if (features && features.length > 0) {
      await supabase.from("product_features").insert(
        features.map((feature: string) => ({
          product_id: productId,
          feature,
        }))
      );
    }

    return NextResponse.json({
      message: "Product created successfully",
      product: productData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
