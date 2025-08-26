import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase.from("products").select("*")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const supabase = createServerClient()
  const body = await req.json()

  const { data, error } = await supabase.from("products").insert([
    {
      name: body.name,
      price: body.price,
      category: body.category,
      image: body.image,
      rating: body.rating ?? 0,
      reviewCount: body.reviewCount ?? 0,
    },
  ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}
