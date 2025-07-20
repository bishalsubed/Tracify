"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [registerStatus, setRegisterStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setRegisterStatus("loading")

    try {
      const success = await registerUser(name, email, password)

      if (success) {
        setRegisterStatus("success")
        toast({
          title: "Registration successful",
          description: "Your account has been created. Redirecting to login...",
        })

        // Short delay before redirect for better UX
        setTimeout(() => {
          router.push("/auth/login")
        }, 1500)
      } else {
        setRegisterStatus("error")
        toast({
          title: "Registration failed",
          description: "Email might already be in use",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      setRegisterStatus("error")
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const getButtonContent = () => {
    switch (registerStatus) {
      case "loading":
        return (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
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
        return "Register"
    }
  }

  const getButtonVariant = () => {
    switch (registerStatus) {
      case "success":
        return "success" as const
      case "error":
        return "destructive" as const
      default:
        return "default" as const
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
          disabled={isLoading}
        />
      </div>
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
        <Label htmlFor="password">Password</Label>
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
      <Button
        type="submit"
        className="w-full transition-all duration-300"
        disabled={isLoading}
        variant={getButtonVariant()}
      >
        {getButtonContent()}
      </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary underline-offset-4 hover:underline">
          Login
        </Link>
      </div>
    </form>
  )
}
