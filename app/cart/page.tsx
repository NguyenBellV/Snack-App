"use client"

import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import Header from "@/components/header"

export default function CartPage() {
  const { state: cartState, updateQuantity, removeFromCart } = useCart()
  const [promoCode, setPromoCode] = useState("")

  const subtotal = cartState.total
  const shipping = subtotal > 200000 ? 0 : 30000 // Free shipping over 200k
  const discount = 0 // TODO: Implement promo code logic
  const total = subtotal + shipping - discount

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingCart className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h2>
          <p className="text-gray-600 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tiếp tục mua sắm
          </Link>
          <h1 className="text-2xl font-bold">Giỏ hàng ({cartState.itemCount} sản phẩm)</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Sản phẩm đã chọn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartState.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        {!item.inStock && <p className="text-red-500 text-sm">Hết hàng</p>}
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-red-600 font-bold">{item.price.toLocaleString("vi-VN")}đ</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-gray-400 line-through text-sm">
                              {item.originalPrice.toLocaleString("vi-VN")}đ
                            </span>
                          )}
                        </div>
                        {item.category && <p className="text-sm text-gray-500 mt-1">Danh mục: {item.category}</p>}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={!item.inStock || item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={!item.inStock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-red-600">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {index < cartState.items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Thông tin đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Tạm tính ({cartState.itemCount} sản phẩm)</span>
                  <span>{subtotal.toLocaleString("vi-VN")}đ</span>
                </div>

                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString("vi-VN")}đ`}
                  </span>
                </div>

                {shipping > 0 && subtotal < 200000 && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                    Mua thêm {(200000 - subtotal).toLocaleString("vi-VN")}đ để được miễn phí vận chuyển
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{discount.toLocaleString("vi-VN")}đ</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng</span>
                  <span className="text-red-600">{total.toLocaleString("vi-VN")}đ</span>
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Nhập mã giảm giá"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" className="w-full bg-transparent">
                    Áp dụng mã giảm giá
                  </Button>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Tiến hành thanh toán
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>🚚 Miễn phí vận chuyển cho đơn hàng từ 200.000đ</p>
                  <p>📞 Hỗ trợ: 1900-1234</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
