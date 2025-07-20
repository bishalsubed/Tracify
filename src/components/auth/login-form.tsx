"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { loginUser } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("demo@example.com") // Pre-fill for demo
  const [password, setPassword] = useState("password123") // Pre-fill for demo
  const [rememberMe, setRememberMe] = useState(true)
  const [loginStatus, setLoginStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const router = useRouter()
  const { toast } = useToast()

  // Reset status after showing success/error
  useEffect(() => {
    if (loginStatus === "success" || loginStatus === "error") {
      const timer = setTimeout(() => {
        setLoginStatus("idle")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [loginStatus])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginStatus("loading")

    try {
      console.log("Attempting login with:", email)
      const success = await loginUser(email, password)

      if (success) {
        console.log("Login successful")
        setLoginStatus("success")

        toast({
          title: "Login successful",
          description: "Redirecting to dashboard...",
        })

        // Short delay before redirect for better UX
        setTimeout(() => {
          // Force a hard navigation to ensure fresh state
          window.location.href = "/dashboard"
        }, 1000)
      } else {
        console.log("Login failed")
        setLoginStatus("error")

        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Login error:", error)
      setLoginStatus("error")

      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const getButtonContent = () => {
    switch (loginStatus) {
      case "loading":
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
          </>
        )
      case "success":
        return (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" /> Success!
          </>
        )
      case "error":
        return (
          <>
            <AlertCircle className="mr-2 h-4 w-4" /> Try Again
          </>
        )
      default:
        return "Login"
    }
  }

  const getButtonVariant = () => {
    switch (loginStatus) {
      case "success":
        return "success" as const
      case "error":
        return "destructive" as const
      default:
        return "default" as const
    }
  }

  return (
    <div className="space-y-4 mt-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 animate-fade-in">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Demo Account</h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Use the pre-filled credentials below to try the demo:
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
          Email: demo@example.com
          <br />
          Password: password123
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-sm text-primary underline-offset-4 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(!!checked)}
            disabled={isLoading}
          />
          <Label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>
        <Button
          type="submit"
          className="w-full transition-all duration-300"
          disabled={isLoading}
          variant={getButtonVariant()}
        >
          {getButtonContent()}
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}
