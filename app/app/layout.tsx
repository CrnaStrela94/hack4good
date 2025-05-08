import type { ReactNode } from "react"
import AppNavigation from "@/components/app-navigation"

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
      <AppNavigation />
    </div>
  )
}
