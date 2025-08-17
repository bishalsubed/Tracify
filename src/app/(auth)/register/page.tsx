import { RegisterForm } from "@/components/auth/register-form"
import { Clock, CheckSquare, BarChart2, Calendar } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
      <div className="container flex min-h-screen flex-col md:flex-row md:items-center md:justify-between px-4 py-8">
        <div className="mb-8 md:mb-0 md:w-1/2 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-2 shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Tracify
            </span>
          </Link>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Join Tracify</h1>
            <p className="text-xl text-muted-foreground">Start tracking your time and building better habits today.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                <CheckSquare className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Task Management</h3>
                <p className="text-sm text-muted-foreground">Create and track your daily tasks</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                <BarChart2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Analytics</h3>
                <p className="text-sm text-muted-foreground">Visualize your productivity trends</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Daily Routines</h3>
                <p className="text-sm text-muted-foreground">Build consistent habits</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Streak Tracking</h3>
                <p className="text-sm text-muted-foreground">Stay motivated with streaks</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-5/12 lg:w-4/12">
          <div className="rounded-xl border bg-card p-6 shadow-lg backdrop-blur-sm">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Create an account</h2>
              <p className="text-muted-foreground">Enter your information to get started</p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
