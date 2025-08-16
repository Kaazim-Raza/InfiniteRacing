"use client"

import { useState, useEffect } from "react"
import { User, Calendar, Trophy, Target, CheckCircle, AlertCircle, Users, MapPin, Award } from "lucide-react"
import Link from "next/link"
import axios from "@/app/lib/axios"
import { getCurrentUser } from "@/app/lib/auth"

// Mock data
const runnerStats = [
  { label: "Races Completed", value: "12", change: "+3", icon: Trophy, color: "text-purple-400" },
  { label: "Current Team", value: "Lightning Bolts", change: "", icon: Users, color: "text-blue-400" },
  { label: "Upcoming Races", value: "2", change: "+1", icon: Calendar, color: "text-green-400" },
  { label: "Best Time", value: "45.2s", change: "-0.8s", icon: Target, color: "text-yellow-400" },
]

const upcomingRaces = [
  {
    id: 1,
    name: "Spring Championship",
    date: "2024-03-15",
    location: "Metro Stadium",
    position: "Leg 2",
    status: "confirmed",
    teamStatus: "ready",
  },
  {
    id: 2,
    name: "City Relay Challenge",
    date: "2024-03-22",
    location: "City Park Track",
    position: "Leg 4 (Anchor)",
    status: "pending",
    teamStatus: "incomplete",
  },
]

const recentActivity = [
  { id: 1, action: "Confirmed for Spring Championship", time: "2 hours ago", type: "success" },
  { id: 2, action: "Added to Lightning Bolts team", time: "1 day ago", type: "info" },
  { id: 3, action: "Profile updated", time: "3 days ago", type: "info" },
  { id: 4, action: "Completed Winter Series", time: "1 week ago", type: "success" },
]

const achievements = [
  { id: 1, title: "Speed Demon", desc: "Sub-11 second 100m split", icon: Target, earned: true },
  { id: 2, title: "Team Player", desc: "Completed 10 relay races", icon: Users, earned: true },
  { id: 3, title: "Anchor Master", desc: "Won 5 races as anchor runner", icon: Award, earned: false },
  { id: 4, title: "Perfect Handoff", desc: "Zero dropped batons in season", icon: CheckCircle, earned: false },
]

export default function RunnerDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [invites, setInvites] = useState<any[]>([])
  const cur = getCurrentUser()

  useEffect(() => {
    setIsLoaded(true)
  }, [])
useEffect(() => {
  setIsLoaded(true)

  // Fetch invites
  async function loadInvites() {
    try {
      const res = await axios.get(`/runner/invites/?runner_id=${cur.id}`)
      setInvites(res.data)
    } catch (err) {
      console.error("Failed to fetch invites", err)
    }
  }

  loadInvites()
}, [])
const respondInvite = async (inviteId: number, action: "accept" | "decline") => {
  try {
    const res = await axios.post(`/runner/${inviteId}/respond?action=${action}&runner_id=${cur.id}`)
    console.log(res.data)

    // Update UI (remove invite from list)
    setInvites(prev => prev.filter(invite => invite.id !== inviteId))
  } catch (err) {
    console.error("Failed to respond", err)
  }
}

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Welcome Back, Sarah!</h1>
          <p className="text-[#868684]">Track your progress and upcoming races</p>
        </div>
        <Link
          href="/dashboard/runner/profile"
          className="mt-4 sm:mt-0 bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105"
        >
          <User className="w-5 h-5" />
          <span>Update Profile</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {runnerStats.map((stat, index) => (
          <div
            key={index}
            className={`bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-500 transform hover:-translate-y-1 ${
              isLoaded ? `opacity-100 translate-y-0 delay-${index * 100}` : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              {stat.change && (
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+") || stat.change.startsWith("-")
                      ? stat.change.startsWith("+")
                        ? "text-green-400"
                        : "text-green-400"
                      : "text-[#868684]"
                  }`}
                >
                  {stat.change}
                </span>
              )}
            </div>
            <div className="heading-font text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-[#868684] text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Races */}
        <div className="lg:col-span-2">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-font text-xl font-bold text-[#EAEAE8]">Upcoming Races</h2>
              <Link
                href="/dashboard/runner/races"
                className="text-[#EAEAE8] hover:text-white transition-colors text-sm font-medium"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingRaces.map((race, index) => (
                <div
                  key={race.id}
                  className={`p-4 bg-black/20 border border-[#868684]/10 rounded-lg hover:bg-[#868684]/10 hover:border-[#EAEAE8]/20 transition-all duration-300 ${
                    isLoaded ? `opacity-100 translate-x-0 delay-${(index + 4) * 100}` : "opacity-0 translate-x-4"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">{race.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-[#868684]">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{race.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{race.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {race.teamStatus === "ready" ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                      )}
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          race.status === "confirmed"
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        }`}
                      >
                        {race.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="bg-[#EAEAE8]/10 border border-[#EAEAE8]/20 px-3 py-1 rounded-full">
                      <span className="text-[#EAEAE8] text-sm font-medium">{race.position}</span>
                    </div>
                    <div className="text-xs text-[#868684]">
                      Team: {race.teamStatus === "ready" ? "Ready to race" : "Needs more runners"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6 mb-6">
            <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-6">Recent Activity</h2>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-[#868684]/10 transition-all duration-300 ${
                    isLoaded ? `opacity-100 translate-x-0 delay-${(index + 6) * 100}` : "opacity-0 translate-x-4"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success" ? "bg-green-400" : "bg-blue-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{activity.action}</p>
                    <p className="text-[#868684] text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
            <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-6">Achievements</h2>

            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    achievement.earned
                      ? "bg-[#EAEAE8]/10 border border-[#EAEAE8]/20"
                      : "bg-[#868684]/5 border border-[#868684]/10"
                  } ${isLoaded ? `opacity-100 translate-x-0 delay-${(index + 10) * 100}` : "opacity-0 translate-x-4"}`}
                >
                  <achievement.icon className={`w-6 h-6 ${achievement.earned ? "text-[#EAEAE8]" : "text-[#868684]"}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${achievement.earned ? "text-white" : "text-[#868684]"}`}>
                      {achievement.title}
                    </p>
                    <p className="text-xs text-[#868684]">{achievement.desc}</p>
                  </div>
                  {achievement.earned && <CheckCircle className="w-5 h-5 text-green-400" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Invites */}
{invites.length > 0 && (
  <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
    <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-6">Team Invites</h2>

    <div className="space-y-4">
      {invites.map((invite, index) => (
        <div
          key={invite.id}
          className={`p-4 bg-black/20 border border-[#868684]/10 rounded-lg flex items-center justify-between transition-all duration-300 ${
            isLoaded ? `opacity-100 translate-x-0 delay-${(index + 20) * 100}` : "opacity-0 translate-x-4"
          }`}
        >
          <div>
            <p className="text-white font-medium">Invite from Manager #{invite.manager_id}</p>
            <p className="text-sm text-[#868684]">Status: {invite.status}</p>
          </div>

          {invite.status === "pending" && (
            <div className="flex space-x-2">
              <button
                onClick={() => respondInvite(invite.id, "accept")}
                className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded hover:bg-green-500/30"
              >
                Accept
              </button>
              <button
                onClick={() => respondInvite(invite.id, "decline")}
                className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded hover:bg-red-500/30"
              >
                Decline
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}


      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "My Team",
            desc: "View team roster and details",
            href: "/dashboard/runner/team",
            icon: Users,
            color: "blue",
          },
          {
            title: "Race History",
            desc: "View past race performances",
            href: "/dashboard/runner/races",
            icon: Trophy,
            color: "purple",
          },
          {
            title: "Training Log",
            desc: "Track your training progress",
            href: "/dashboard/runner/training",
            icon: Target,
            color: "green",
          },
        ].map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`group bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-500 transform hover:-translate-y-1 ${
              isLoaded ? `opacity-100 translate-y-0 delay-${(index + 14) * 100}` : "opacity-0 translate-y-4"
            }`}
          >
            <action.icon
              className={`w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300 ${
                action.color === "blue"
                  ? "text-blue-400"
                  : action.color === "purple"
                    ? "text-purple-400"
                    : "text-green-400"
              }`}
            />
            <h3 className="heading-font text-lg font-bold text-white mb-2 group-hover:text-[#EAEAE8] transition-colors">
              {action.title}
            </h3>
            <p className="text-[#868684] text-sm group-hover:text-white transition-colors">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
