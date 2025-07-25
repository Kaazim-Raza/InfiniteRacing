"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { Orbitron } from "next/font/google"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import "./globals.css"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

const orbitron = Orbitron({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Check if current route is a dashboard route
  const isDashboardRoute = pathname.startsWith("/dashboard")

  // Scroll to top when route changes (only for non-dashboard routes)
  useEffect(() => {
    if (!isDashboardRoute) {
      window.scrollTo(0, 0)
    }
  }, [pathname, isDashboardRoute])

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden ${orbitron.variable}`}>
        {/* Only show Navigation for non-dashboard routes */}
        {!isDashboardRoute && <Navigation />}

        <main className={isDashboardRoute ? "" : ""}>{children}</main>

        {/* Only show Footer for non-dashboard routes */}
        {!isDashboardRoute && <Footer />}
      </body>
    </html>
  )
}
