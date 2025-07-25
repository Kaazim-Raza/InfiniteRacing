"use client"

import { useState, useEffect } from "react"
import { Settings, Save, Bell, Shield, Database, Users, AlertTriangle } from "lucide-react"

export default function AdminSettingsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Infinite Racing League",
    siteDescription: "The ultimate platform for relay racing management",
    contactEmail: "admin@infiniterelay.com",
    timezone: "UTC-5",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,

    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,

    // Race Settings
    defaultRaceCapacity: 64,
    registrationDeadline: 7,
    refundPolicy: 48,
    autoApproval: false,

    // Payment Settings
    processingFee: 2.5,
    currency: "USD",
    paymentMethods: ["credit_card", "bank_transfer"],
    autoRefunds: true,
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // Handle save logic here
  }

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "races", label: "Race Settings", icon: Users },
    { id: "payments", label: "Payments", icon: Database },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">System Settings</h1>
          <p className="text-[#868684]">Configure platform settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="mt-4 sm:mt-0 bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    activeTab === tab.id
                      ? "bg-[#EAEAE8]/10 text-[#EAEAE8] border border-[#EAEAE8]/20"
                      : "text-[#868684] hover:text-white hover:bg-[#868684]/10"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-8">
            {/* General Settings */}
            {activeTab === "general" && (
              <div
                className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
              >
                <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">General Settings</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => handleSettingChange("siteName", e.target.value)}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Site Description</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                    rows={3}
                    className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange("timezone", e.target.value)}
                    className="w-full bg-[#868684]/10 border-2 border-[#868684]/30 px-4 py-3 text-white focus:outline-none focus:border-[#EAEAE8] transition-colors"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">UTC</option>
                  </select>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div
                className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
              >
                <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Notification Settings</h2>

                <div className="space-y-4">
                  {[
                    {
                      key: "emailNotifications",
                      label: "Email Notifications",
                      desc: "Receive notifications via email",
                    },
                    { key: "smsNotifications", label: "SMS Notifications", desc: "Receive notifications via SMS" },
                    {
                      key: "pushNotifications",
                      label: "Push Notifications",
                      desc: "Receive browser push notifications",
                    },
                    { key: "weeklyReports", label: "Weekly Reports", desc: "Receive weekly summary reports" },
                  ].map((setting) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between p-4 bg-[#868684]/10 border border-[#868684]/20 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-white">{setting.label}</h3>
                        <p className="text-sm text-[#868684]">{setting.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[setting.key as keyof typeof settings] as boolean}
                          onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#868684]/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EAEAE8]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div
                className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
              >
                <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Security Settings</h2>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-yellow-300 mb-1">Security Notice</h3>
                      <p className="text-yellow-200/80 text-sm">
                        Changes to security settings will affect all users. Please review carefully before saving.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Password Expiry (days)</label>
                    <input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => handleSettingChange("passwordExpiry", Number.parseInt(e.target.value))}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.loginAttempts}
                      onChange={(e) => handleSettingChange("loginAttempts", Number.parseInt(e.target.value))}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#868684]/10 border border-[#868684]/20 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                    <p className="text-sm text-[#868684]">Require 2FA for all admin accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSettingChange("twoFactorAuth", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#868684]/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EAEAE8]"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Race Settings */}
            {activeTab === "races" && (
              <div
                className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
              >
                <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Race Settings</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Default Race Capacity</label>
                    <input
                      type="number"
                      value={settings.defaultRaceCapacity}
                      onChange={(e) => handleSettingChange("defaultRaceCapacity", Number.parseInt(e.target.value))}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">
                      Registration Deadline (days before race)
                    </label>
                    <input
                      type="number"
                      value={settings.registrationDeadline}
                      onChange={(e) => handleSettingChange("registrationDeadline", Number.parseInt(e.target.value))}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">
                      Refund Policy (hours before race)
                    </label>
                    <input
                      type="number"
                      value={settings.refundPolicy}
                      onChange={(e) => handleSettingChange("refundPolicy", Number.parseInt(e.target.value))}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#868684]/10 border border-[#868684]/20 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Auto-Approve Registrations</h3>
                    <p className="text-sm text-[#868684]">
                      Automatically approve team registrations without manual review
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoApproval}
                      onChange={(e) => handleSettingChange("autoApproval", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#868684]/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EAEAE8]"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === "payments" && (
              <div
                className={`space-y-6 transition-all duration-500 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
              >
                <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Payment Settings</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Processing Fee (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={settings.processingFee}
                      onChange={(e) => handleSettingChange("processingFee", Number.parseFloat(e.target.value))}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange("currency", e.target.value)}
                      className="w-full bg-[#868684]/10 border-2 border-[#868684]/30 px-4 py-3 text-white focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#EAEAE8] mb-4">Accepted Payment Methods</label>
                  <div className="space-y-3">
                    {[
                      { key: "credit_card", label: "Credit/Debit Cards", desc: "Visa, Mastercard, American Express" },
                      { key: "bank_transfer", label: "Bank Transfer", desc: "Direct bank transfers and ACH" },
                      { key: "paypal", label: "PayPal", desc: "PayPal payments" },
                      { key: "crypto", label: "Cryptocurrency", desc: "Bitcoin, Ethereum" },
                    ].map((method) => (
                      <div
                        key={method.key}
                        className="flex items-center justify-between p-4 bg-[#868684]/10 border border-[#868684]/20 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium text-white">{method.label}</h3>
                          <p className="text-sm text-[#868684]">{method.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.paymentMethods.includes(method.key)}
                          onChange={(e) => {
                            const methods = e.target.checked
                              ? [...settings.paymentMethods, method.key]
                              : settings.paymentMethods.filter((m) => m !== method.key)
                            handleSettingChange("paymentMethods", methods)
                          }}
                          className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#868684]/10 border border-[#868684]/20 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">Automatic Refunds</h3>
                    <p className="text-sm text-[#868684]">Process refunds automatically when conditions are met</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoRefunds}
                      onChange={(e) => handleSettingChange("autoRefunds", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#868684]/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EAEAE8]"></div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
