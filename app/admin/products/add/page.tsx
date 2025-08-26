"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([""])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    category: "",
    brand: "",
    origin: "",
    weight: "",
    expiryMonths: "",
    price: "",
    originalPrice: "",
    stock: "",
    featured: false,
    isActive: true,
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Simulate image upload - in real app, upload to storage
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addFeature = () => {
    setFeatures([...features, ""])
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        short_description: formData.shortDescription,
        category_id: formData.category,
        brand: formData.brand,
        origin: formData.origin,
        weight: formData.weight ? Number(formData.weight) : null,
        expiry_months: formData.expiryMonths ? Number(formData.expiryMonths) : null,
        price: Number(formData.price),
        original_price: formData.originalPrice ? Number(formData.originalPrice) : null,
        stock: formData.stock ? Number(formData.stock) : 0,
        featured: formData.featured,
        is_active: formData.isActive,
        images: images,
        features: features
      })
    });

    let data;
    try {
      data = await res.json();
    } catch {
    data = null;
    }

    if (!res.ok) {
      throw new Error(data?.error || "Failed to add product");
    }

    console.log("Product added:", data);
    alert("Sản phẩm đã được thêm thành công!");

    // Reset form
    setFormData({
      name: "",
      description: "",
      shortDescription: "",
      category: "",
      brand: "",
      origin: "",
      weight: "",
      expiryMonths: "",
      price: "",
      originalPrice: "",
      stock: "",
      featured: false,
      isActive: true,
    });
    setImages([]);
    setFeatures([""]);

  } catch (err) {
    console.error("Error adding product:", err);
    alert("Lỗi khi thêm sản phẩm!");
  }
};


  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/products">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Thêm sản phẩm mới</h1>
          <p className="text-gray-600">Nhập thông tin chi tiết sản phẩm</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Tên sản phẩm *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập tên sản phẩm"
                  required
                />
              </div>

              <div>
                <Label htmlFor="shortDescription">Mô tả ngắn</Label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Mô tả ngắn gọn về sản phẩm"
                />
              </div>

              <div>
                <Label htmlFor="description">Mô tả chi tiết</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả chi tiết về sản phẩm"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Danh mục *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banh-keo">Bánh kẹo</SelectItem>
                      <SelectItem value="nuoc-ngot">Nước ngọt</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                      <SelectItem value="banh-quy">Bánh quy</SelectItem>
                      <SelectItem value="keo-cao-su">Kẹo cao su</SelectItem>
                      <SelectItem value="chocolate">Chocolate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="brand">Thương hiệu</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Tên thương hiệu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="origin">Xuất xứ</Label>
                  <Input
                    id="origin"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="Quốc gia sản xuất"
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Khối lượng</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="VD: 137g, 330ml"
                  />
                </div>

                <div>
                  <Label htmlFor="expiryMonths">Hạn sử dụng (tháng)</Label>
                  <Input
                    id="expiryMonths"
                    type="number"
                    value={formData.expiryMonths}
                    onChange={(e) => setFormData({ ...formData, expiryMonths: e.target.value })}
                    placeholder="12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500">Thêm ảnh</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Features */}
          <Card>
            <CardHeader>
              <CardTitle>Đặc điểm nổi bật</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Nhập đặc điểm sản phẩm"
                    />
                    {features.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeFeature(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addFeature}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm đặc điểm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Giá bán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="price">Giá bán *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="25000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="originalPrice">Giá gốc</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="30000"
                />
              </div>

              {formData.originalPrice && formData.price && (
                <div className="text-sm text-gray-600">
                  Giảm giá:{" "}
                  {Math.round(
                    ((Number(formData.originalPrice) - Number(formData.price)) / Number(formData.originalPrice)) * 100,
                  )}
                  %
                </div>
              )}
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Kho hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="stock">Số lượng tồn kho *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="100"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Sản phẩm nổi bật</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Kích hoạt</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button type="submit" className="w-full">
              Lưu sản phẩm
            </Button>
            <Button type="button" variant="outline" className="w-full bg-transparent">
              Lưu nháp
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
