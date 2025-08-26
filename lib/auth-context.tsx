"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  role: "customer" | "admin" | "super_admin"
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
  isAdmin: () => boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@snackmart.vn",
    name: "Admin User",
    role: "super_admin",
  },
  {
    id: "2",
    email: "user@test.com",
    name: "Test User",
    role: "customer",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from localStorage
    try {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      }
    } catch (error) {
      console.error("Error parsing saved user:", error)
      localStorage.removeItem("user")
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // Mock authentication
      const foundUser = mockUsers.find((u) => u.email === email)

      if (!foundUser) {
        return { success: false, error: "Email không tồn tại" }
      }

      // Mock password check (in real app, this would be handled by backend)
      const validPasswords: { [key: string]: string } = {
        "admin@snackmart.vn": "admin123",
        "user@test.com": "123456",
      }

      if (validPasswords[email] !== password) {
        return { success: false, error: "Mật khẩu không đúng" }
      }

      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))

      // Redirect based on role
      if (foundUser.role === "admin" || foundUser.role === "super_admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: "Đã xảy ra lỗi khi đăng nhập" }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email === email)
      if (existingUser) {
        return { success: false, error: "Email đã được sử dụng" }
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: "customer",
      }

      mockUsers.push(newUser)
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))

      router.push("/")
      return { success: true }
    } catch (error) {
      return { success: false, error: "Đã xảy ra lỗi khi đăng ký" }
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  const isAdmin = () => {
    return user?.role === "admin" || user?.role === "super_admin"
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isAdmin, loading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
