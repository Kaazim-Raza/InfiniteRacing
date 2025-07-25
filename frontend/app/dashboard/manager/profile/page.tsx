"use client"

import { useState, useEffect } from "react"
import { User, Save, Camera, Mail, Phone, MapPin, Calendar, Shield, Bell, Eye, EyeOff } from "lucide-react"

export default function ManagerProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@lightningbolts.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Runner's Lane",
    city: "Metro City",
    state: "CA",
    zipCode: "90210",
    emergencyContact: "Mike Johnson",
    emergencyPhone: "+1 (555) 987-6543",

    // Team Information
    teamName: "Lightning Bolts",
    teamRole: "Team Manager",
    coachingExperience: "5 years",
    specialization: "Sprint Relays",
    bio: "Experienced relay coach with a passion for developing young athletes and building championship teams.",

    // Notification Preferences
    emailNotifications: true,
    smsNotifications: false,
    raceReminders: true,
    teamUpdates: true,
    paymentAlerts: true,

    // Privacy Settings
    profileVisibility: "team",
    showContactInfo: true,
    showPerformanceStats: true,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleProfileChange = (key: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handlePasswordChange = (key: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData)
    // Handle save logic here
  }

  const handleChangePassword = () => {
    console.log("Changing password:", passwordData)
    // Handle password change logic here
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Profile Settings</h1>
          <p className="text-[#868684]">Manage your account information and preferences</p>
        </div>
        <button
          onClick={handleSaveProfile}
          className="mt-4 sm:mt-0 bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Profile Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-4">
            {/* Profile Picture */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-[#868684]/20 mx-auto"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#EAEAE8] text-black rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-white mt-3">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-[#868684] text-sm">{profileData.teamRole}</p>
              <p className="text-[#EAEAE8] text-sm">{profileData.teamName}</p>
            </div>

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

        {/* Profile Content */}
        <div className="lg:col-span-3">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-8">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div
                className={`space-y-8 transition-all duration-500 ${
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
              >
                <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Personal Information</h2>

                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileChange("firstName", e.target.value)}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileChange("lastName", e.target.value)}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#868684]" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange("email", e.target.value)}
                        className="w-full bg-transparent border-2 border-[#868684]/30 pl-12 pr-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#868684]" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange("phone", e.target.value)}
                        className="w-full bg-transparent border-2 border-[#868684]/30 pl-12 pr-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#868684]" />
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleProfileChange("dateOfBirth", e.target.value)}
                        className="w-full bg-transparent border-2 border-[#868684]/30 pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Address Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Street Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#868684]" />
                        <input
                          type="text"
                          value={profileData.address}
                          onChange={(e) => handleProfileChange("address", e.target.value)}
                          className="w-full bg-transparent border-2 border-[#868684]/30 pl-12 pr-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">City</label>
                      <input
                        type="text"
                        value={profileData.city}
                        onChange={(e) => handleProfileChange("city", e.target.value)}
                        className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">State</label>
                      <input
                        type="text"
                        value={profileData.state}
                        onChange={(e) => handleProfileChange("state", e.target.value)}
                        className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={profileData.zipCode}
                        onChange={(e) => handleProfileChange("zipCode", e.target.value)}
                        className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Emergency Contact</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Contact Name</label>
                      <input
                        type="text"
                        value={profileData.emergencyContact}
                        onChange={(e) => handleProfileChange("emergencyContact", e.target.value)}
                        className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        value={profileData.emergencyPhone}
                        onChange={(e) => handleProfileChange("emergencyPhone", e.target.value)}
                        className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Team Information */}
                <div>
                  <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Team Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Team Name</label>
                      <input
                        type="text"
                        value={profileData.teamName}
                        onChange={(e) => handleProfileChange("teamName", e.target.value)}
                        className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Coaching Experience</label>
                      <input
                        type="text"
                        value={profileData.coachingExperience}
                        onChange={(e) => handleProfileChange("coachingExperience", e.target.value)}
                        className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Specialization</label>
                      <select
                        value={profileData.specialization}
                        onChange={(e) => handleProfileChange("specialization", e.target.value)}
                        className="w-full bg-[#868684]/10 border-2 border-[#868684]/30 px-4 py-3 text-white focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      >
                        <option value="Sprint Relays">Sprint Relays</option>
                        <option value="Distance Relays">Distance Relays</option>
                        <option value="Mixed Relays">Mixed Relays</option>
                        <option value="All Events">All Events</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleProfileChange("bio", e.target.value)}
                      rows={4}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors resize-none"
                      placeholder="Tell us about your coaching philosophy and experience..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div
                className={`space-y-8 transition-all duration-500 ${
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
              >
                <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Security Settings</h2>

                {/* Change Password */}
                <div className="bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-6">
                  <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                          className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 pr-12 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#868684] hover:text-[#EAEAE8] transition-colors"
                        >
                          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                          className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 pr-12 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#868684] hover:text-[#EAEAE8] transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                          className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 pr-12 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                          placeholder="Confirm new password"
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

                    <button
                      onClick={handleChangePassword}
                      className="bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-6">
                  <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Profile Visibility</label>
                      <select
                        value={profileData.profileVisibility}
                        onChange={(e) => handleProfileChange("profileVisibility", e.target.value)}
                        className="w-full bg-[#868684]/10 border-2 border-[#868684]/30 px-4 py-3 text-white focus:outline-none focus:border-[#EAEAE8] transition-colors"
                      >
                        <option value="public">Public - Visible to everyone</option>
                        <option value="team">Team Only - Visible to team members</option>
                        <option value="private">Private - Only visible to you</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          key: "showContactInfo",
                          label: "Show Contact Information",
                          desc: "Allow others to see your email and phone",
                        },
                        {
                          key: "showPerformanceStats",
                          label: "Show Performance Stats",
                          desc: "Display your team's race statistics",
                        },
                      ].map((setting) => (
                        <div
                          key={setting.key}
                          className="flex items-center justify-between p-4 bg-[#868684]/5 border border-[#868684]/10 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-white">{setting.label}</h4>
                            <p className="text-sm text-[#868684]">{setting.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={profileData[setting.key as keyof typeof profileData] as boolean}
                              onChange={(e) => handleProfileChange(setting.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#868684]/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EAEAE8]"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div
                className={`space-y-8 transition-all duration-500 ${
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
              >
                <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  {[
                    {
                      key: "emailNotifications",
                      label: "Email Notifications",
                      desc: "Receive notifications via email",
                    },
                    {
                      key: "smsNotifications",
                      label: "SMS Notifications",
                      desc: "Receive notifications via text message",
                    },
                    {
                      key: "raceReminders",
                      label: "Race Reminders",
                      desc: "Get reminders about upcoming races",
                    },
                    {
                      key: "teamUpdates",
                      label: "Team Updates",
                      desc: "Notifications about team member changes",
                    },
                    {
                      key: "paymentAlerts",
                      label: "Payment Alerts",
                      desc: "Alerts for payment confirmations and failures",
                    },
                  ].map((setting) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between p-6 bg-[#868684]/10 border border-[#868684]/20 rounded-lg hover:bg-[#868684]/20 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium text-white mb-1">{setting.label}</h3>
                        <p className="text-sm text-[#868684]">{setting.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData[setting.key as keyof typeof profileData] as boolean}
                          onChange={(e) => handleProfileChange(setting.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#868684]/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EAEAE8]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
