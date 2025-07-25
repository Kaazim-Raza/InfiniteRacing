"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Building, ArrowRight, Users } from "lucide-react"

export default function ManagerSignupPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    teamName: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    console.log("Relay team manager registration:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div className="min-h-screen pt-32 pb-16 py-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 noise-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#868684]/5 to-black" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
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
            <h1 className="heading-font text-2xl font-bold mb-2">BECOME A RELAY TEAM MANAGER</h1>
            <p className="text-[#868684]">Create your account and start building your championship relay team</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <User className="w-5 h-5 text-[#868684]" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-2 border-[#868684]/30 pl-12 pr-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 ${
                    focusedField === "firstName" ? "border-[#EAEAE8] scale-105" : ""
                  }`}
                  placeholder="First name"
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 ${
                    focusedField === "lastName" ? "border-[#EAEAE8] scale-105" : ""
                  }`}
                  placeholder="Last name"
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

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

            {/* Team Name Field */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Building className="w-5 h-5 text-[#868684]" />
              </div>
              <input
                type="text"
                name="teamName"
                required
                value={formData.teamName}
                onChange={handleInputChange}
                className={`w-full bg-transparent border-2 border-[#868684]/30 pl-12 pr-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 ${
                  focusedField === "teamName" ? "border-[#EAEAE8] scale-105" : ""
                }`}
                placeholder="Relay team name"
                onFocus={() => setFocusedField("teamName")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Password Fields */}
            <div className="space-y-4">
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

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <Lock className="w-5 h-5 text-[#868684]" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-2 border-[#868684]/30 pl-12 pr-12 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 ${
                    focusedField === "confirmPassword" ? "border-[#EAEAE8] scale-105" : ""
                  }`}
                  placeholder="Confirm password"
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#868684] hover:text-[#EAEAE8] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                required
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 mt-1 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
              />
              <label className="text-sm text-[#868684] leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-[#EAEAE8] hover:text-white transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#EAEAE8] hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#EAEAE8] text-black py-3 font-bold hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>CREATING TEAM...</span>
                </>
              ) : (
                <>
                  <span>CREATE TEAM MANAGER ACCOUNT</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-[#868684] mb-4">Already have an account?</p>
            <Link href="/login" className="text-[#EAEAE8] hover:text-white transition-colors font-medium">
              Sign in here
            </Link>
          </div>

          {/* Runner Registration Link */}
          <div className="mt-6 pt-6 border-t border-[#868684]/20 text-center">
            <p className="text-[#868684] mb-2">Want to be a relay runner instead?</p>
            <Link href="/signup/runner" className="text-[#EAEAE8] hover:text-white transition-colors text-sm">
              Register as Relay Runner →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
