"use client"

import { useState, useEffect } from "react"
import { Users, Calendar, Trophy, DollarSign, AlertCircle, CheckCircle, Plus } from "lucide-react"
import Link from "next/link"
import axios from "../../lib/axios"

// Mock data

const recentRaces = [
  { id: 1, name: "Spring Championship", date: "2024-03-15", teams: 32, status: "upcoming", compliance: "valid" },
  { id: 2, name: "City Relay Challenge", date: "2024-03-08", teams: 24, status: "ongoing", compliance: "warning" },
  { id: 3, name: "Winter Series Final", date: "2024-02-28", teams: 48, status: "completed", compliance: "valid" },
]

const recentActivity = [
  { id: 1, action: "New team registered", team: "Lightning Bolts", time: "2 hours ago", type: "success" },
  { id: 2, action: "Payment received", team: "Thunder Runners", time: "4 hours ago", type: "success" },
  { id: 3, action: "Compliance issue", team: "Speed Demons", time: "6 hours ago", type: "warning" },
  { id: 4, action: "Race completed", race: "City Challenge", time: "1 day ago", type: "info" },
]

export default function AdminDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [races, setRaces] = useState([])
  const[dashboard, setDashboardStats] = useState([])
//   const dashboardStats = [
//   { label: "Total Races", value: "24", change: "+12%", icon: Calendar, color: "text-blue-400" },
//   { label: "Active Teams", value: "156", change: "+8%", icon: Users, color: "text-green-400" },
//   { label: "Total Runners", value: "624", change: "+15%", icon: Trophy, color: "text-purple-400" },
//   { label: "Revenue", value: "$12,450", change: "+22%", icon: DollarSign, color: "text-yellow-400" },
// ]


  useEffect(() => {
    async function fetchRaces() {
      try {
        const res = await axios.get("/admin/races")
        // const data = await res.json()
        // Set status based on date
        const now = new Date()
        const processed = res.data.map((race: any) => {
          const raceDate = new Date(race.date)
          let status: "upcoming" | "ongoing" | "completed"
          if (raceDate > now) status = "upcoming"
          else if (raceDate.toDateString() === now.toDateString()) status = "ongoing"
          else status = "completed"
          return { ...race, status }
        })
        console.log("Races",processed)
        setRaces(processed)
       const statsRes = await axios.get("/admin/dashboard/stats")
        const apiData = statsRes.data // { runners_count, races_count }

        const updatedStats = [
          { label: "Total Races", value: apiData.races_count?.toString() ?? "0", change: "+12%", icon: Calendar, color: "text-blue-400" },
          { label: "Active Teams", value: "156", change: "+8%", icon: Users, color: "text-green-400" },
          { label: "Total Runners", value: apiData.runners_count?.toString() ?? "0", change: "+15%", icon: Trophy, color: "text-purple-400" },
          { label: "Revenue", value: "$12,450", change: "+22%", icon: DollarSign, color: "text-yellow-400" },
        ]

        setDashboardStats(updatedStats)
        setIsLoaded(true)

      } catch (e) {
        setRaces([])
        console.log("Error fetchings")
      }
    }
    fetchRaces()
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Admin Dashboard</h1>
          <p className="text-[#868684]">Manage races, teams, and system operations</p>
        </div>
        <Link
          href="/dashboard/admin/races/create"
          className="mt-4 sm:mt-0 bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Create Race</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboard.map((stat, index) => (
          <div
            key={index}
            className={`bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-500 transform hover:-translate-y-1 ${
              isLoaded ? `opacity-100 translate-y-0 delay-${index * 100}` : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <div className="heading-font text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-[#868684] text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Races */}
        <div className="lg:col-span-2">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-font text-xl font-bold text-[#EAEAE8]">Recent Races</h2>
              <Link
                href="/dashboard/admin/races"
                className="text-[#EAEAE8] hover:text-white transition-colors text-sm font-medium"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {races.map((race, index) => (
                <div
                  key={race.id}
                  className={`flex items-center justify-between p-4 bg-black/20 border border-[#868684]/10 rounded-lg hover:bg-[#868684]/10 hover:border-[#EAEAE8]/20 transition-all duration-300 ${
                    isLoaded ? `opacity-100 translate-x-0 delay-${(index + 4) * 100}` : "opacity-0 translate-x-4"
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{race.name}</h3>
                    <p className="text-[#868684] text-sm">
                      {race.date} • {race.teams} teams
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Compliance Status */}
                    <div className="flex items-center space-x-1">
                      {race.compliance === "valid" ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>

                    {/* Race Status */}
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        race.status === "upcoming"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : race.status === "ongoing"
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                      }`}
                    >
                      {race.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
            <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-6">Recent Activity</h2>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-[#868684]/10 transition-all duration-300 ${
                    isLoaded ? `opacity-100 translate-x-0 delay-${(index + 7) * 100}` : "opacity-0 translate-x-4"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success"
                        ? "bg-green-400"
                        : activity.type === "warning"
                          ? "bg-yellow-400"
                          : "bg-blue-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{activity.action}</p>
                    {activity.team && <p className="text-[#EAEAE8] text-sm">{activity.team}</p>}
                    {activity.race && <p className="text-[#EAEAE8] text-sm">{activity.race}</p>}
                    <p className="text-[#868684] text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Create New Race",
            desc: "Set up a new relay race event",
            href: "/dashboard/admin/races/create",
            icon: Calendar,
          },
          { title: "Manage Users", desc: "Add or modify user roles", href: "/dashboard/admin/users", icon: Users },
          {
            title: "Payment Overview",
            desc: "View financial reports",
            href: "/dashboard/admin/payments",
            icon: DollarSign,
          },
        ].map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`group bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-500 transform hover:-translate-y-1 ${
              isLoaded ? `opacity-100 translate-y-0 delay-${(index + 10) * 100}` : "opacity-0 translate-y-4"
            }`}
          >
            <action.icon className="w-8 h-8 text-[#EAEAE8] mb-4 group-hover:scale-110 transition-transform duration-300" />
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
