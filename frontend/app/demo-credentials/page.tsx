"use client"

import { useState, useEffect } from "react"
import { Copy, Check, User, Users, Shield, Mail, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

const demoAccounts = [
  {
    role: "Admin",
    description: "Full system access - manage races, users, and payments",
    email: "admin@infiniterelay.com",
    password: "AdminRelay2024!",
    icon: Shield,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    features: [
      "Create and manage races",
      "User role management",
      "Payment oversight",
      "System analytics",
      "Compliance monitoring",
    ],
  },
  {
    role: "Team Manager",
    description: "Manage relay teams and race registrations",
    email: "manager@lightningbolts.com",
    password: "ManagerRelay2024!",
    icon: Users,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    features: [
      "Team roster management",
      "Race registration",
      "Runner assignments",
      "Payment processing",
      "Team analytics",
    ],
  },
  {
    role: "Relay Runner",
    description: "Track personal performance and team participation",
    email: "runner@lightningbolts.com",
    password: "RunnerRelay2024!",
    icon: User,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    features: [
      "Personal dashboard",
      "Race confirmations",
      "Team communication",
      "Performance tracking",
      "Achievement system",
    ],
  },
]

export default function DemoCredentialsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className={`heading-font text-4xl md:text-6xl font-black mb-6 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            DEMO <span className="text-[#EAEAE8]">CREDENTIALS</span>
          </h1>
          <p
            className={`text-lg md:text-xl text-[#868684] max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Test drive the Infinite Racing League platform with these demo accounts. Each role provides different access
            levels and features.
          </p>

          {/* Quick Login Button */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 bg-[#EAEAE8] text-black px-8 py-4 font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span>GO TO LOGIN PAGE</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Accounts Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {demoAccounts.map((account, index) => (
              <div
                key={account.role}
                className={`${account.bgColor} border ${account.borderColor} rounded-lg p-8 hover:scale-105 transition-all duration-500 ${
                  isLoaded ? `opacity-100 translate-y-0 delay-${(index + 1) * 200}` : "opacity-0 translate-y-8"
                }`}
              >
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`w-12 h-12 ${account.bgColor} border ${account.borderColor} rounded-lg flex items-center justify-center`}
                  >
                    <account.icon className={`w-6 h-6 ${account.color}`} />
                  </div>
                  <div>
                    <h3 className="heading-font text-xl font-bold text-white">{account.role}</h3>
                    <p className="text-[#868684] text-sm">{account.description}</p>
                  </div>
                </div>

                {/* Credentials */}
                <div className="space-y-4 mb-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={account.email}
                        readOnly
                        className="w-full bg-black/20 border border-[#868684]/30 px-4 py-3 pr-12 text-white text-sm font-mono rounded-lg focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                      <button
                        onClick={() => copyToClipboard(account.email, `${account.role}-email`)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#868684] hover:text-[#EAEAE8] transition-colors"
                      >
                        {copiedField === `${account.role}-email` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2 flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={account.password}
                        readOnly
                        className="w-full bg-black/20 border border-[#868684]/30 px-4 py-3 pr-12 text-white text-sm font-mono rounded-lg focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                      <button
                        onClick={() => copyToClipboard(account.password, `${account.role}-password`)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#868684] hover:text-[#EAEAE8] transition-colors"
                      >
                        {copiedField === `${account.role}-password` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-[#EAEAE8] mb-3">Dashboard Features:</h4>
                  <ul className="space-y-2">
                    {account.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-[#868684]">
                        <div className={`w-1.5 h-1.5 ${account.color.replace("text-", "bg-")} rounded-full mr-3`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Login Button */}
                <Link
                  href="/login"
                  className={`w-full ${account.bgColor} border ${account.borderColor} ${account.color} py-3 px-4 font-bold text-center hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2 rounded-lg`}
                >
                  <span>LOGIN AS {account.role.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-16 px-4 bg-[#868684]/5 border-t border-[#868684]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-font text-2xl md:text-3xl font-bold text-[#EAEAE8] mb-8 text-center">
            HOW TO TEST THE DASHBOARDS
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#EAEAE8]/10 border border-[#EAEAE8]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#EAEAE8] font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Copy Credentials</h3>
                  <p className="text-[#868684] text-sm">
                    Click the copy buttons next to any email/password combination above to copy them to your clipboard.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#EAEAE8]/10 border border-[#EAEAE8]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#EAEAE8] font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Navigate to Login</h3>
                  <p className="text-[#868684] text-sm">
                    Go to the login page and paste the credentials, or click the "LOGIN AS" buttons above for quick
                    access.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#EAEAE8]/10 border border-[#EAEAE8]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#EAEAE8] font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Explore Dashboards</h3>
                  <p className="text-[#868684] text-sm">
                    Each role provides different features and access levels. Test the navigation, forms, and interactive
                    elements.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#EAEAE8]/10 border border-[#EAEAE8]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#EAEAE8] font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Switch Roles</h3>
                  <p className="text-[#868684] text-sm">
                    Log out and try different accounts to see how the interface changes based on user permissions and
                    role.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-12 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-400 text-xs">⚠</span>
              </div>
              <div>
                <h3 className="font-bold text-yellow-300 mb-2">Demo Environment Notice</h3>
                <p className="text-yellow-200/80 text-sm">
                  These are demonstration credentials for testing purposes only. In a production environment, all
                  passwords would be securely hashed and stored, and multi-factor authentication would be implemented
                  for enhanced security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
