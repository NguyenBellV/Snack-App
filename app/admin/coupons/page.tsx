"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Trash2, Copy, MoreHorizontal, Calendar, Percent, DollarSign, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Coupon {
  id: number
  code: string
  name: string
  description: string
  discount_type: string
  discount_value: number
  min_order_amount: number
  max_discount_amount: number
  usage_limit: number
  used_count: number
  is_active: boolean
  starts_at: string
  expires_at: string
  created_at: string
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    name: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    usageLimit: "",
    expiresAt: "",
  })

  useEffect(() => {
    fetchCoupons()
  }, [searchTerm])

  const fetchCoupons = async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)

      const response = await fetch(`/api/admin/coupons?${params}`)
      const data = await response.json()

      if (response.ok) {
        setCoupons(data.coupons || [])
      }
    } catch (error) {
      console.error("Error fetching coupons:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCoupon = async () => {
    try {
      const response = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoupon),
      })

      if (response.ok) {
        setIsAddDialogOpen(false)
        setNewCoupon({
          code: "",
          name: "",
          description: "",
          discountType: "percentage",
          discountValue: "",
          minOrderAmount: "",
          maxDiscountAmount: "",
          usageLimit: "",
          expiresAt: "",
        })
        fetchCoupons() // Refresh the list
      }
    } catch (error) {
      console.error("Error creating coupon:", error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Quản lý mã giảm giá</h1>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  const totalCoupons = coupons.length
  const activeCoupons = coupons.filter((c) => c.is_active).length
  const totalUsage = coupons.reduce((sum, c) => sum + c.used_count, 0)
  const expiringSoon = coupons.filter((c) => {
    const expiryDate = new Date(c.expires_at)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý mã giảm giá</h1>
          <p className="text-gray-600">Tạo và quản lý các mã giảm giá cho khách hàng</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tạo mã giảm giá
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo mã giảm giá mới</DialogTitle>
              <DialogDescription>Nhập thông tin để tạo mã giảm giá cho khách hàng</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">Mã giảm giá *</Label>
                <Input
                  id="code"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="WELCOME10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Tên mã giảm giá *</Label>
                <Input
                  id="name"
                  value={newCoupon.name}
                  onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
                  placeholder="Chào mừng khách hàng mới"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  placeholder="Mô tả chi tiết về mã giảm giá"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountType">Loại giảm giá</Label>
                <Select
                  value={newCoupon.discountType}
                  onValueChange={(value) => setNewCoupon({ ...newCoupon, discountType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Phần trăm (%)</SelectItem>
                    <SelectItem value="fixed">Số tiền cố định (đ)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountValue">
                  Giá trị giảm {newCoupon.discountType === "percentage" ? "(%)" : "(đ)"}
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  value={newCoupon.discountValue}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                  placeholder={newCoupon.discountType === "percentage" ? "10" : "50000"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minOrderAmount">Đơn hàng tối thiểu (đ)</Label>
                <Input
                  id="minOrderAmount"
                  type="number"
                  value={newCoupon.minOrderAmount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minOrderAmount: e.target.value })}
                  placeholder="100000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxDiscountAmount">Giảm tối đa (đ)</Label>
                <Input
                  id="maxDiscountAmount"
                  type="number"
                  value={newCoupon.maxDiscountAmount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscountAmount: e.target.value })}
                  placeholder="50000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usageLimit">Giới hạn sử dụng</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={newCoupon.usageLimit}
                  onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
                  placeholder="1000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiresAt">Ngày hết hạn</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={newCoupon.expiresAt}
                  onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddCoupon}>Tạo mã giảm giá</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng mã giảm giá</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCoupons}</div>
            <p className="text-xs text-muted-foreground">Đã tạo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCoupons}</div>
            <p className="text-xs text-muted-foreground">Có thể sử dụng</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt sử dụng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage}</div>
            <p className="text-xs text-muted-foreground">Tổng lượt dùng</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sắp hết hạn</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{expiringSoon}</div>
            <p className="text-xs text-muted-foreground">Trong 7 ngày</p>
          </CardContent>
        </Card>
      </div>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách mã giảm giá</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm mã giảm giá..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã giảm giá</TableHead>
                  <TableHead>Tên & Mô tả</TableHead>
                  <TableHead>Giá trị</TableHead>
                  <TableHead>Điều kiện</TableHead>
                  <TableHead>Sử dụng</TableHead>
                  <TableHead>Hết hạn</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{coupon.code}</code>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(coupon.code)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{coupon.name}</div>
                        <div className="text-sm text-gray-500">{coupon.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {coupon.discount_type === "percentage"
                          ? `${coupon.discount_value}%`
                          : `${coupon.discount_value.toLocaleString("vi-VN")}đ`}
                      </div>
                      {coupon.max_discount_amount && (
                        <div className="text-sm text-gray-500">
                          Tối đa: {coupon.max_discount_amount.toLocaleString("vi-VN")}đ
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">Đơn tối thiểu: {coupon.min_order_amount.toLocaleString("vi-VN")}đ</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>
                          {coupon.used_count}/{coupon.usage_limit}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{
                              width: `${Math.min((coupon.used_count / coupon.usage_limit) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(coupon.expires_at).toLocaleDateString("vi-VN")}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={coupon.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {coupon.is_active ? "Hoạt động" : "Tạm dừng"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Sao chép mã
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {coupons.length === 0 && <div className="text-center py-8 text-gray-500">Không tìm thấy mã giảm giá nào</div>}
        </CardContent>
      </Card>
    </div>
  )
}
