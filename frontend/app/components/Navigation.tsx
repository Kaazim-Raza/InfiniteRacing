"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, UserPlus } from "lucide-react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-black/95 backdrop-blur-md border-b border-[#868684]/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="heading-font text-xl font-bold hover:text-[#EAEAE8] transition-colors">
            INFINITE RELAY
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-[#EAEAE8] ${
                  pathname === item.href ? "text-white" : "text-[#868684]"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white animate-pulse" />
                )}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-[#868684]/20">
              <Link
                href="/login"
                className="flex items-center space-x-2 text-[#868684] hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <Link
                href="/signup/manager"
                className="flex items-center space-x-2 bg-[#EAEAE8] text-black px-4 py-2 text-sm font-bold hover:bg-white transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#868684] hover:text-white transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div
                className={`w-full h-0.5 bg-current transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <div className={`w-full h-0.5 bg-current transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <div
                className={`w-full h-0.5 bg-current transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-[#868684]/20 transition-all duration-300 overflow-hidden z-50 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-[#EAEAE8] ${
                  pathname === item.href ? "text-white bg-[#868684]/10" : "text-[#868684]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Auth Links */}
            <div className="pt-4 mt-4 border-t border-[#868684]/20 space-y-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 text-[#868684] hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <Link
                href="/signup/manager"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 bg-[#EAEAE8] text-black px-3 py-2 text-sm font-bold hover:bg-white transition-colors mx-3"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
