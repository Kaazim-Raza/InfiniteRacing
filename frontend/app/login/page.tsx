"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Users, AlertCircle, CheckCircle } from "lucide-react"
import { authenticateUser, setCurrentUser, getDashboardRoute } from "../lib/auth"

export default function LoginPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const user = await authenticateUser(formData.email, formData.password)

      if (user) {
        setCurrentUser(user)
        setSuccess(`Welcome back, ${user.name}! Redirecting to your dashboard...`)

        // Redirect to appropriate dashboard after short delay
        setTimeout(() => {
          const dashboardRoute = getDashboardRoute(user.role)
          router.push(dashboardRoute)
        }, 1500)
      } else {
        setError("Invalid email or password. Please check your credentials and try again.")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }

  // Quick fill demo credentials
  const fillDemoCredentials = (email: string, password: string) => {
    setFormData((prev) => ({
      ...prev,
      email,
      password,
    }))
  }

  return (
    <div className="min-h-screen pt-32 pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 noise-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#868684]/5 to-black" />

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#EAEAE8] rounded-full animate-pulse opacity-60" />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[#EAEAE8] rounded-full animate-pulse opacity-50" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div
          className={`bg-[#868684]/5 border border-[#868684]/20 backdrop-blur-sm p-8 transition-all duration-1000 ${
            isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#EAEAE8]/10 border border-[#EAEAE8]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#EAEAE8]" />
            </div>
            <h1 className="heading-font text-2xl font-bold mb-2">WELCOME BACK TO THE RELAY</h1>
            <p className="text-[#868684]">Enter your credentials to access your relay dashboard</p>
          </div>

          {/* Demo Credentials Quick Fill */}
          <div className="mb-6 p-4 bg-[#868684]/10 border border-[#868684]/20 rounded-lg">
            <p className="text-[#EAEAE8] text-sm font-medium mb-3">Quick Demo Login:</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials("admin@infiniterelay.com", "AdminRelay2024!")}
                className="w-full text-left px-3 py-2 text-xs bg-red-500/10 border border-red-500/20 text-red-300 rounded hover:bg-red-500/20 transition-colors"
              >
                👑 Admin Dashboard
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("manager@lightningbolts.com", "ManagerRelay2024!")}
                className="w-full text-left px-3 py-2 text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded hover:bg-blue-500/20 transition-colors"
              >
                👥 Team Manager
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("runner@lightningbolts.com", "RunnerRelay2024!")}
                className="w-full text-left px-3 py-2 text-xs bg-green-500/10 border border-green-500/20 text-green-300 rounded hover:bg-green-500/20 transition-colors"
              >
                🏃 Relay Runner
              </button>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-green-300 text-sm">{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Mail className="w-5 h-5 text-[#868684]" />
              </div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-transparent border-2 border-[#868684]/30 pl-12 pr-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 ${
                  focusedField === "email" ? "border-[#EAEAE8] scale-105" : ""
                }`}
                placeholder="Email address"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Lock className="w-5 h-5 text-[#868684]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full bg-transparent border-2 border-[#868684]/30 pl-12 pr-12 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 ${
                  focusedField === "password" ? "border-[#EAEAE8] scale-105" : ""
                }`}
                placeholder="Password"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#868684] hover:text-[#EAEAE8] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
                />
                <span className="text-sm text-[#868684]">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-[#EAEAE8] hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !!success}
              className={`w-full bg-[#EAEAE8] text-black py-3 font-bold hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                isSubmitting || success ? "opacity-75 cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>SIGNING IN...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>REDIRECTING...</span>
                </>
              ) : (
                <>
                  <span>SIGN IN</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-[#868684]/20"></div>
            <span className="px-4 text-[#868684] text-sm">OR</span>
            <div className="flex-1 h-px bg-[#868684]/20"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-[#868684] mb-4">New to relay racing?</p>
            <div className="space-y-2">
              <Link
                href="/signup/manager"
                className="block w-full border-2 border-[#868684]/30 text-[#868684] py-2 hover:border-[#EAEAE8] hover:text-[#EAEAE8] transition-all duration-300 text-sm font-medium"
              >
                REGISTER AS TEAM MANAGER
              </Link>
              <Link
                href="/signup/runner"
                className="block w-full border-2 border-[#868684]/30 text-[#868684] py-2 hover:border-[#EAEAE8] hover:text-[#EAEAE8] transition-all duration-300 text-sm font-medium"
              >
                REGISTER AS RELAY RUNNER
              </Link>
            </div>
          </div>

          {/* Demo Link */}
          <div className="mt-6 pt-6 border-t border-[#868684]/20 text-center">
            <Link
              href="/demo-credentials"
              className="text-[#EAEAE8] hover:text-white transition-colors text-sm font-medium"
            >
              View All Demo Credentials →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
