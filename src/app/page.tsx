import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Clock,
  BarChart2,
  Zap,
  Bell,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Target,
  Calendar,
  Flame,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 mx-3">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Tracify</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-20 lg:py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8">
                <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 mb-6 animate-fade-in border border-blue-200 dark:border-blue-800 shadow-lg backdrop-blur-sm">
                  <Zap className="mr-2 h-4 w-4 animate-pulse" />
                  <span className="relative">
                    Boost Your Productivity Today
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                  </span>
                </div>

                <div className="relative">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
                    <span className="block overflow-hidden">
                      <span className="inline-block animate-slide-up" style={{ animationDelay: "0.1s" }}>
                        Master Your Time,
                      </span>
                    </span>
                    <span className="block overflow-hidden">
                      <span
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-slide-up animate-gradient"
                        style={{ animationDelay: "0.3s" }}
                      >
                        Achieve Your Goals
                      </span>
                    </span>
                  </h1>

                  <div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full animate-float"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 -left-8 w-6 h-6 bg-purple-500/20 rounded-full animate-bounce-slow"
                    style={{ animationDelay: "1.5s" }}
                  ></div>
                  <div
                    className="absolute -bottom-2 right-1/4 w-4 h-4 bg-indigo-500/20 rounded-full animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>

                <div className="mt-6 overflow-hidden">
                  <p
                    className="text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up"
                    style={{ animationDelay: "0.6s" }}
                  >
                    The ultimate productivity companion that helps you track tasks, build habits, and visualize your
                    <span className="relative inline-block mx-1">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold animate-pulse">progress</span>
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-expand"></span>
                    </span>
                    with beautiful analytics.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl">
                  <Link href="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#demo">Watch Demo</Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-950 bg-gradient-to-br from-blue-400 to-purple-500"
                      />
                    ))}
                  </div>
                  <span>10,000+ happy users</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-1">4.9/5 rating</span>
                </div>
              </div>
            </div>

            <div className="mt-16 mx-auto max-w-5xl">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative rounded-2xl border bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 ml-2">Tracify Demo</div>
                  </div>
                  <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center animate-pulse">
                          <Clock className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          See Tracify in Action
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                          Watch how easy it is to manage tasks, track habits, and boost your productivity with our
                          intuitive dashboard.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Link href="/auth/register">Try Live Demo</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href="/dashboard">View Dashboard</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg animate-fade-in">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-700 dark:text-gray-300">Task completed!</span>
                      </div>
                    </div>

                    <div
                      className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg animate-slide-in"
                      style={{ animationDelay: "1s" }}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-700 dark:text-gray-300">7-day streak!</span>
                      </div>
                    </div>

                    <div
                      className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg animate-bounce-slow"
                      style={{ animationDelay: "2s" }}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <BarChart2 className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-700 dark:text-gray-300">Analytics updated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Everything you need to stay productive
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Powerful features designed to help you manage tasks, build habits, and achieve your goals.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: CheckCircle,
                  title: "Smart Task Management",
                  description:
                    "Organize tasks with priorities, due dates, and categories. Never miss a deadline again.",
                  color: "blue",
                },
                {
                  icon: Flame,
                  title: "Habit Tracking",
                  description: "Build lasting habits with streak tracking and daily routines that keep you motivated.",
                  color: "orange",
                },
                {
                  icon: BarChart2,
                  title: "Beautiful Analytics",
                  description: "Visualize your productivity with charts and insights that help you improve over time.",
                  color: "purple",
                },
                {
                  icon: Bell,
                  title: "Smart Reminders",
                  description: "Get notified about upcoming tasks and deadlines so you never fall behind.",
                  color: "green",
                },
                {
                  icon: Target,
                  title: "Goal Setting",
                  description: "Set and track meaningful goals with progress indicators and milestone celebrations.",
                  color: "pink",
                },
                {
                  icon: Calendar,
                  title: "Calendar Integration",
                  description: "See all your tasks and routines in a beautiful calendar view for better planning.",
                  color: "indigo",
                },
              ].map((feature, index) => (
                <div key={index} className="group relative">
                  <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm transition-all hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/20 mb-4`}
                    >
                      <feature.icon className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-700 dark:via-blue-700 dark:to-indigo-800 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-0 w-48 h-48 bg-gradient-to-br from-indigo-400/15 to-blue-400/15 rounded-full blur-2xl"></div>
            <div className="absolute bottom-1/4 right-0 w-56 h-56 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-2xl"></div>
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Trusted by thousands</h2>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Join the community of productive people who have transformed their workflow with Tracify
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-white/15 mx-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">10K+</div>
                <div className="text-blue-100">Active Users</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-white/15">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">1M+</div>
                <div className="text-blue-100">Tasks Completed</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-white/15">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">98%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-white/15">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">24/7</div>
                <div className="text-blue-100">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="ml-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
                  Built for modern productivity
                </h2>
                <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                  <p>
                    Tracify isn't just another task manager. It's a comprehensive productivity system designed to
                    help you build better habits and achieve meaningful goals.
                  </p>
                  <p>
                    With beautiful visualizations, smart reminders, and powerful analytics, you'll finally have the
                    tools you need to take control of your time and boost your productivity.
                  </p>
                </div>
                <div className="mt-8">
                  <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/auth/register">Start Your Journey</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">For Everyone</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Students, professionals, and anyone looking to be more productive
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Privacy First</h3>
                        <p className="text-gray-600 dark:text-gray-300">Your data is secure and belongs to you</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Always Improving</h3>
                        <p className="text-gray-600 dark:text-gray-300">Regular updates based on user feedback</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
                Ready to transform your productivity?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of users who have already improved their productivity with Tracify.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                  <Link href="/register">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="mx-4">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">Tracify</span>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The ultimate productivity companion for achieving your goals.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Updates
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#about"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center mx-4">
            <p className="text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} Tracify. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Privacy
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
