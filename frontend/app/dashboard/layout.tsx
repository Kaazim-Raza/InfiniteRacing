"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  Trophy,
  UserCheck,
  CreditCard,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Home,
  AlertCircle,
} from "lucide-react"
import { getCurrentUser, clearCurrentUser, type User } from "../lib/auth"

const navigationItems = {
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/races", label: "Race Management", icon: Calendar },
    { href: "/dashboard/admin/users", label: "User Management", icon: Users },
    { href: "/dashboard/admin/payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  ],
  manager: [
    { href: "/dashboard/manager", label: "Team Overview", icon: LayoutDashboard },
    { href: "/dashboard/manager/team", label: "Team Management", icon: Users },
    { href: "/dashboard/manager/races", label: "Race Registration", icon: Calendar },
    { href: "/dashboard/manager/payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/manager/profile", label: "Profile", icon: UserCheck },
  ],
  runner: [
    { href: "/dashboard/runner", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/runner/team", label: "My Team", icon: Users },
    { href: "/dashboard/runner/races", label: "My Races", icon: Trophy },
    { href: "/dashboard/runner/profile", label: "Profile", icon: UserCheck },
  ],
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Check authentication on mount
  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)
    } else {
      // Redirect to login if no user found
      router.push("/login")
    }
    setIsLoading(false)
  }, [router])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [userMenuOpen])

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    clearCurrentUser()
    setShowLogoutConfirm(false)
    router.push("/")
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#EAEAE8] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#868684]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Show login redirect if no user
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#868684] mb-4">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const userRole = currentUser.role as keyof typeof navigationItems
  const navItems = navigationItems[userRole] || []

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#868684]/10 border border-[#868684]/20 backdrop-blur-md rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
              <h3 className="heading-font text-lg font-bold text-[#EAEAE8]">Confirm Logout</h3>
            </div>
            <p className="text-[#868684] mb-6">
              Are you sure you want to sign out? You'll need to log in again to access your dashboard.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelLogout}
                className="flex-1 bg-[#868684]/20 border border-[#868684]/30 text-[#868684] py-2 px-4 font-medium hover:bg-[#868684]/30 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-500/20 border border-red-500/30 text-red-300 py-2 px-4 font-medium hover:bg-red-500/30 hover:text-red-200 transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#868684]/5 border-r border-[#868684]/20 backdrop-blur-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-[#868684]/20">
            <Link href="/" className="heading-font text-lg font-bold text-[#EAEAE8] hover:text-white transition-colors">
              INFINITE RELAY
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-[#868684] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-[#EAEAE8]/10 text-[#EAEAE8] border border-[#EAEAE8]/20"
                      : "text-[#868684] hover:text-white hover:bg-[#868684]/10"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <div className="ml-auto w-2 h-2 bg-[#EAEAE8] rounded-full animate-pulse" />}
                </Link>
              )
            })}

            {/* Divider */}
            <div className="my-4 border-t border-[#868684]/20" />

            {/* Back to Main Site */}
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#868684] hover:text-white hover:bg-[#868684]/10 transition-all duration-200 group"
            >
              <Home className="w-5 h-5 group-hover:scale-105 transition-transform duration-200" />
              <span className="font-medium">Back to Main Site</span>
            </Link>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-[#868684]/20">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#868684]/5 border border-[#868684]/20">
              <img
                src={currentUser.avatar || "/placeholder.svg"}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full border-2 border-[#EAEAE8]/20"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
                <p className="text-xs text-[#868684] capitalize">{currentUser.role}</p>
                {currentUser.team && <p className="text-xs text-[#EAEAE8]">{currentUser.team}</p>}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full mt-3 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg hover:bg-red-500/20 hover:text-red-200 transition-all duration-300 group"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-black/90 backdrop-blur-md border-b border-[#868684]/20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[#868684] hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="heading-font text-xl font-bold text-[#EAEAE8] capitalize">{userRole} Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-[#868684] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-2 text-[#868684] hover:text-white transition-colors"
              >
                <img
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full border border-[#868684]/20"
                />
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#868684]/10 backdrop-blur-md border border-[#868684]/20 rounded-lg shadow-xl">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-[#868684]/20">
                      <p className="text-sm font-medium text-white">{currentUser.name}</p>
                      <p className="text-xs text-[#868684]">{currentUser.email}</p>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-[#868684] hover:text-white hover:bg-[#868684]/10 transition-colors"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-[#868684] hover:text-white hover:bg-[#868684]/10 transition-colors flex items-center space-x-2"
                    >
                      <Home className="w-4 h-4" />
                      <span>Main Site</span>
                    </Link>
                    <div className="border-t border-[#868684]/20 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
