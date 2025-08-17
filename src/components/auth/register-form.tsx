"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Lock, EyeIcon, EyeOff } from "lucide-react"
import axios from "axios"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [registerStatus, setRegisterStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setRegisterStatus("loading")
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Use the same password in confirm section",
        variant: "destructive",
      });
      return;
    }
    const {confirmPassword, ...newObj} = formData
    try {
      const response = await axios.post("/api/auth/register", { ...newObj })

      if (response) {
        setRegisterStatus("success")
        toast({
          title: "Registration successful",
          description: "Your account has been created. Redirecting to login...",
        })
        router.replace(`/login`)
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
      <div className="space-y-6">
        <Label htmlFor="name">Full Name</Label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <User className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="block w-full px-3 py-2 pl-10 rounded-md shadow-sm
				placeholder-gray-400 focus:outline-none sm:text-sm focus-visible:ring-0 border-1 border-white focus:border-gray-600"
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="block w-full px-3 py-2 pl-10 rounded-md shadow-sm
				placeholder-gray-400 focus:outline-none sm:text-sm focus-visible:ring-0 border-1 border-white focus:border-gray-600"
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
          <Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="block w-full px-3 py-2 pl-10 rounded-md shadow-sm
				placeholder-gray-400 focus:outline-none sm:text-sm focus-visible:ring-0 border-1 border-white focus:border-gray-600"
            disabled={isLoading}
            placeholder="*********"
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={togglePassword}>
            {isPasswordVisible ? <EyeIcon className="size-4" /> : <EyeOff className="size-4" />}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Confirm Password</Label>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
          <Input
            id="password"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="block w-full px-3 py-2 pl-10 rounded-md shadow-sm
				placeholder-gray-400 focus:outline-none sm:text-sm focus-visible:ring-0 border-1 border-white focus:border-gray-600"
            disabled={isLoading}
            placeholder="*********"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent cursor-pointer
							rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
							focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-50"
        disabled={isLoading}
        variant={getButtonVariant()}
      >
        Register
      </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary decoration-blue-500 underline-offset-4 hover:underline">
          Login
        </Link>
      </div>
    </form>
  )
}
