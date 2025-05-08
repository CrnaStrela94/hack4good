"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Calendar, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Home",
    icon: Home,
    href: "/app/home",
  },
  {
    label: "Discover",
    icon: Search,
    href: "/app/discover",
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/app/calendar",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/app/notifications",
  },
  {
    label: "Profile",
    icon: User,
    href: "/app/profile",
  },
]

export default function AppNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background z-10">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 text-xs",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className={cn("h-6 w-6 mb-1", isActive ? "text-primary" : "text-muted-foreground")} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
