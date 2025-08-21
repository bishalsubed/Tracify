"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "Clock",
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: "CheckSquare",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: "BarChart2",
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: "Calendar",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "Settings",
  },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="text-xl font-bold">TimeTrackr</span>
          </Link>
        </div>
        <nav className="grid gap-2 px-2 py-4 text-sm">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn("justify-start", pathname === item.href && "bg-primary text-primary-foreground")}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
