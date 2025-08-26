"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import ProductCard from "@/components/product-card"
import { Product } from "@/types/products"
import { Button } from "@/components/ui/button"


export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*")
      if (error) console.error(error)
      else setProducts(data || [])
    }
    fetchProducts()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">Chưa có sản phẩm nào</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product ={p} />
          ))}
        </div>
      )}

      {/* Test thêm sản phẩm */}
      <Button
        className="mt-6"
        onClick={async () => {
          await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: "Bánh thử nghiệm",
              price: 15000,
              category: "Snack",
              image: "/placeholder.svg",
              rating: 4,
              reviewCount: 12,
            }),
          })
          // refresh list
          const { data } = await supabase.from("products").select("*")
          setProducts(data || [])
        }}
      >
        + Thêm sản phẩm mẫu
      </Button>
    </div>
  )
}
