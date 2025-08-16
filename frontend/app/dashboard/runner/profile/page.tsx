"use client"

import { useState , useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, Camera, Save, Eye, EyeOff } from "lucide-react"
import { getCurrentUser } from "@/app/lib/auth"
import axios from "../../../lib/axios"

export default function RunnerProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const cur = getCurrentUser()

  const [profileData, setProfileData] = useState(
    {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "male",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543",
    address: "123 Runner Street",
    city: "Athletic City",
    state: "CA",
    zipCode: "90210",
    bio: "Passionate relay runner with 5 years of competitive experience.",
    preferredDistance: "5k-10k",
    personalBest5k: "18:35",
    personalBest10k: "38:42",
    runningExperience: "5",
    specialization: "middle-distance",
  })

  const [notifications, setNotifications] = useState({
    raceReminders: true,
    teamMessages: true,
    trainingUpdates: false,
    paymentAlerts: true,
    systemUpdates: false,
    emailDigest: true,
    smsAlerts: false,
    pushNotifications: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "team",
    showPersonalBests: true,
    showTrainingData: false,
    showContactInfo: false,
    allowTeamInvitations: true,
    showRaceHistory: true,
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(`/manager/manager/user/${cur.id}`)
        console.log("Fetched profile data:", response.data)
       const data = {
  firstName: response.data.first_name||"",            // ✅ maps
  lastName: response.data.last_name||"",              // ✅ maps
  email: response.data.email||"",                     // ✅ maps
  phone: response.data.phone ||"",                     // ✅ maps
  dateOfBirth: response.data.dob||"",                 // ✅ maps
  gender: response.data.gender ||"male",                   // ✅ maps
  emergencyContact: response.data.emergency_contact_name||"",   // ✅ maps
  emergencyPhone: response.data.emergency_contact_phone||"",    // ✅ maps
  specialization: response.data.specialization ||"middle-distance",   // ✅ maps
  address: response.data.street||"",                  // ✅ maps
  city: response.data.city||"",                       // ✅ maps
  state: response.data.state||"",                     // ✅ maps
  zipCode: response.data.zip_code||"",                // ✅ maps
  bio: response.data.bio||"",                         // ✅ maps
  preferredDistance: response.data.preferred_distance||"",  // ✅ maps
  personalBest5k: response.data.personal_best_5k||"", // ✅ maps
  personalBest10k: response.data.personal_best_10k||"", // ✅ maps
  runningExperience: response.data.years_of_experience||"", // ✅ maps
}

        setProfileData(data)
      } catch (error) {
        // handle error (optional)
      }
    }
    fetchProfile()
  }, [])

  async function updateProfile() {
    const payload = {
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      dob: profileData.dateOfBirth,
      gender: profileData.gender,
      emergency_contact_name: profileData.emergencyContact,
      emergency_contact_phone: profileData.emergencyPhone,
      specialization: profileData.specialization,
      street: profileData.address,
      city: profileData.city,
      state: profileData.state,
      zip_code: profileData.zipCode,
      bio: profileData.bio,
      preferred_distance: profileData.preferredDistance,
      personal_best_5k: profileData.personalBest5k,
      personal_best_10k: profileData.personalBest10k,
      years_of_experience: profileData.runningExperience,
    }
    try {
      await axios.put(`/runner/profile/?runner_id=${cur.id}`, payload)
      alert("Profile updated successfully!")
      // Optionally show success message or reload data
    } catch (error) {
      // Optionally handle error
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8]">Profile Settings</h1>
          <p className="text-[#868684] mt-2">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-[#868684]/10 border border-[#868684]/20">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-cyan-400" />
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8]">Profile Photo</h3>
              </div>
              <div className="text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/placeholder.svg?height=96&width=96&text=JD" alt="Profile" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-[#868684]">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-2">Personal Information</h3>
                <p className="text-[#868684] mb-4">Update your basic profile information</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-[#EAEAE8]">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-[#EAEAE8]">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-[#EAEAE8]">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-[#EAEAE8]">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth" className="text-[#EAEAE8]">
                        Date of Birth
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender" className="text-[#EAEAE8]">
                        Gender
                      </Label>
                      <Select
                        value={profileData.gender}
                        onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
                      >
                        <SelectTrigger className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-[#EAEAE8]">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-2">Emergency Contact</h3>
                <p className="text-[#868684] mb-4">Contact information for emergencies</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContact" className="text-[#EAEAE8]">
                      Emergency Contact Name
                    </Label>
                    <Input
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                      className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone" className="text-[#EAEAE8]">
                      Emergency Contact Phone
                    </Label>
                    <Input
                      id="emergencyPhone"
                      value={profileData.emergencyPhone}
                      onChange={(e) => setProfileData({ ...profileData, emergencyPhone: e.target.value })}
                      className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-2">Address Information</h3>
                <p className="text-[#868684] mb-4">Your current address details</p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-[#EAEAE8]">
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-[#EAEAE8]">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-[#EAEAE8]">
                        State
                      </Label>
                      <Input
                        id="state"
                        value={profileData.state}
                        onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-[#EAEAE8]">
                        ZIP Code
                      </Label>
                      <Input
                        id="zipCode"
                        value={profileData.zipCode}
                        onChange={(e) => setProfileData({ ...profileData, zipCode: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-2">Running Profile</h3>
                <p className="text-[#868684] mb-4">Your running experience and preferences</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredDistance" className="text-[#EAEAE8]">
                        Preferred Distance
                      </Label>
                      <Select
                        value={profileData.preferredDistance}
                        onValueChange={(value) => setProfileData({ ...profileData, preferredDistance: value })}
                      >
                        <SelectTrigger className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sprint">Sprint (100m-400m)</SelectItem>
                          <SelectItem value="middle">Middle Distance (800m-1500m)</SelectItem>
                          <SelectItem value="5k-10k">5K-10K</SelectItem>
                          <SelectItem value="long">Long Distance (Half/Full Marathon)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="runningExperience" className="text-[#EAEAE8]">
                        Years of Experience
                      </Label>
                      <Input
                        id="runningExperience"
                        value={profileData.runningExperience}
                        onChange={(e) => setProfileData({ ...profileData, runningExperience: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="personalBest5k" className="text-[#EAEAE8]">
                        5K Personal Best
                      </Label>
                      <Input
                        id="personalBest5k"
                        placeholder="mm:ss"
                        value={profileData.personalBest5k}
                        onChange={(e) => setProfileData({ ...profileData, personalBest5k: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="personalBest10k" className="text-[#EAEAE8]">
                        10K Personal Best
                      </Label>
                      <Input
                        id="personalBest10k"
                        placeholder="mm:ss"
                        value={profileData.personalBest10k}
                        onChange={(e) => setProfileData({ ...profileData, personalBest10k: e.target.value })}
                        className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="specialization" className="text-[#EAEAE8]">
                      Specialization
                    </Label>
                    <Select
                      value={profileData.specialization}
                      onValueChange={(value) => setProfileData({ ...profileData, specialization: value })}
                    >
                      <SelectTrigger className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sprinter">Sprinter</SelectItem>
                        <SelectItem value="middle-distance">Middle Distance</SelectItem>
                        <SelectItem value="distance">Distance Runner</SelectItem>
                        <SelectItem value="all-around">All-Around</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={()=>updateProfile()} className="bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 hover:scale-105">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h3 className="heading-font text-lg font-bold text-[#EAEAE8]">Change Password</h3>
            </div>
            <p className="text-[#868684] mb-4">Update your account password</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-[#EAEAE8]">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-[#868684]" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#868684]" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-[#EAEAE8]">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-[#868684]" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#868684]" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-[#EAEAE8]">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-[#868684]" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#868684]" />
                    )}
                  </Button>
                </div>
              </div>
              <Button className="bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 hover:scale-105">
                Update Password
              </Button>
            </div>
          </div>

          <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
            <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-2">Account Security</h3>
            <p className="text-[#868684] mb-4">Additional security settings</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#EAEAE8]">Two-Factor Authentication</p>
                  <p className="text-sm text-[#868684]">Add an extra layer of security to your account</p>
                </div>
                <Button
                  variant="outline"
                  className="border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10 bg-transparent"
                >
                  Enable 2FA
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#EAEAE8]">Login Notifications</p>
                  <p className="text-sm text-[#868684]">Get notified when someone logs into your account</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#EAEAE8]">Session Management</p>
                  <p className="text-sm text-[#868684]">View and manage your active sessions</p>
                </div>
                <Button
                  variant="outline"
                  className="border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10 bg-transparent"
                >
                  Manage Sessions
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h3 className="heading-font text-lg font-bold text-[#EAEAE8]">Notification Preferences</h3>
            </div>
            <p className="text-[#868684] mb-6">Choose what notifications you want to receive</p>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-[#EAEAE8] mb-4">Race & Team Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">Race Reminders</p>
                      <p className="text-sm text-[#868684]">Get reminded about upcoming races</p>
                    </div>
                    <Switch
                      checked={notifications.raceReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, raceReminders: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">Team Messages</p>
                      <p className="text-sm text-[#868684]">Notifications for team communications</p>
                    </div>
                    <Switch
                      checked={notifications.teamMessages}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, teamMessages: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">Training Updates</p>
                      <p className="text-sm text-[#868684]">Updates about training plans and workouts</p>
                    </div>
                    <Switch
                      checked={notifications.trainingUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, trainingUpdates: checked })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-[#EAEAE8] mb-4">System Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">Payment Alerts</p>
                      <p className="text-sm text-[#868684]">Notifications about payments and billing</p>
                    </div>
                    <Switch
                      checked={notifications.paymentAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, paymentAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">System Updates</p>
                      <p className="text-sm text-[#868684]">Updates about platform features and maintenance</p>
                    </div>
                    <Switch
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-[#EAEAE8] mb-4">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">Email Digest</p>
                      <p className="text-sm text-[#868684]">Weekly summary of activities</p>
                    </div>
                    <Switch
                      checked={notifications.emailDigest}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailDigest: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">SMS Alerts</p>
                      <p className="text-sm text-[#868684]">Important notifications via text message</p>
                    </div>
                    <Switch
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">Push Notifications</p>
                      <p className="text-sm text-[#868684]">Browser notifications for real-time updates</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
            <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-2">Privacy Settings</h3>
            <p className="text-[#868684] mb-6">Control who can see your information</p>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-[#EAEAE8] mb-4">Profile Visibility</h4>
                <div>
                  <Label htmlFor="profileVisibility" className="text-[#EAEAE8]">
                    Who can see your profile?
                  </Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
                  >
                    <SelectTrigger className="bg-[#868684]/10 border-[#868684]/20 text-[#EAEAE8]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Everyone</SelectItem>
                      <SelectItem value="team">Team Members Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-[#EAEAE8] mb-4">Data Sharing</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">Show Personal Bests</p>
                      <p className="text-sm text-[#868684]">Display your personal best times on your profile</p>
                    </div>
                    <Switch
                      checked={privacy.showPersonalBests}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showPersonalBests: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">Show Training Data</p>
                      <p className="text-sm text-[#868684]">Share your training statistics with others</p>
                    </div>
                    <Switch
                      checked={privacy.showTrainingData}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showTrainingData: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">Show Contact Information</p>
                      <p className="text-sm text-[#868684]">Allow others to see your contact details</p>
                    </div>
                    <Switch
                      checked={privacy.showContactInfo}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showContactInfo: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#EAEAE8]">Show Race History</p>
                      <p className="text-sm text-[#868684]">Display your past race results</p>
                    </div>
                    <Switch
                      checked={privacy.showRaceHistory}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showRaceHistory: checked })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-[#EAEAE8] mb-4">Team Interactions</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#EAEAE8]">Allow Team Invitations</p>
                    <p className="text-sm text-[#868684]">Let team managers send you invitations</p>
                  </div>
                  <Switch
                    checked={privacy.allowTeamInvitations}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, allowTeamInvitations: checked })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
            <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-2">Data Management</h3>
            <p className="text-[#868684] mb-4">Manage your account data</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#EAEAE8]">Download Your Data</p>
                  <p className="text-sm text-[#868684]">Get a copy of all your account data</p>
                </div>
                <Button
                  variant="outline"
                  className="border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10 bg-transparent"
                >
                  Download Data
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#EAEAE8]">Delete Account</p>
                  <p className="text-sm text-[#868684]">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
