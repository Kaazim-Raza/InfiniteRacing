"use client"

import { useState, useEffect } from "react"
import { Calendar, Trophy, Users, DollarSign, TrendingUp, Target, CheckCircle, Plus } from "lucide-react"
import Link from "next/link"
import axios from "../../lib/axios"
import { getCurrentUser } from "../../lib/auth"



// Mock data


const upcomingRaces = [
  {
    id: 1,
    name: "Spring Championship",
    date: "2024-03-15",
    location: "Metro Stadium",
    type: "30-Leg Relay",
    status: "registered",
    teamsRegistered: 2,
  },
  {
    id: 2,
    name: "City Marathon Relay",
    date: "2024-03-22",
    location: "Downtown Circuit",
    type: "30-Leg Relay",
    status: "available",
    teamsRegistered: 0,
  },
  {
    id: 3,
    name: "Regional Championships",
    date: "2024-04-05",
    location: "State Track Complex",
    type: "30-Leg Relay",
    status: "pending",
    teamsRegistered: 1,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "registration",
    message: "Registered Male Team for Spring Championship",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-400",
  },
  {
    id: 2,
    type: "invitation",
    message: "Invited Sarah Johnson to join team",
    time: "1 day ago",
    icon: Users,
    color: "text-blue-400",
  },
  {
    id: 3,
    type: "payment",
    message: "Payment confirmed for City Marathon Relay",
    time: "2 days ago",
    icon: DollarSign,
    color: "text-yellow-400",
  },
  {
    id: 4,
    type: "update",
    message: "Updated team roster - 3 new members",
    time: "3 days ago",
    icon: TrendingUp,
    color: "text-purple-400",
  },
]

const teamPerformance = [
  { month: "Jan", races: 2, podiums: 1 },
  { month: "Feb", races: 3, podiums: 2 },
  { month: "Mar", races: 4, podiums: 1 },
  { month: "Apr", races: 3, podiums: 3 },
]

export default function ManagerDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [DashboardStats, setDashboardStats] = useState([])
  const currentUser = getCurrentUser()

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        console.log("Fetching dashboard stats for manager:", currentUser)
        
        const response = await axios.get(`/manager/dashboard/?manager_id=${currentUser?.id}`)
        const stats = [
  {
    label: "Total Team Members",
    value: response.data.total_runners,
    icon: Users,
    color: "text-blue-400",
    change: "+3 this month",
  },
  {
    label: "Male Runners",
    value: response.data.male_runners,
    icon: Calendar,
    color: "text-green-400",
    change: "+2 pending",
  },
  {
    label: "Female Runners",
    value: response.data.female_runners,
    icon: Trophy,
    color: "text-purple-400",
    change: "3 podium finishes",
  },
  {
    label: "Pending Invites",
    value: response.data.pending_invites,
    icon: DollarSign,
    color: "text-yellow-400",
    change: "$750 this quarter",
  },
]
        setDashboardStats(stats)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      }
    }
    fetchDashboardStats()
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "registered":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "available":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Manager Dashboard</h1>
          <p className="text-[#868684]">Manage your relay teams and race registrations</p>
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <Link
            href="/dashboard/manager/team/invite"
            className="bg-[#868684]/20 border border-[#868684]/30 text-[#EAEAE8] px-4 py-2 font-medium hover:bg-[#868684]/30 transition-all duration-300 flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Invite Runners</span>
          </Link>
          <Link
            href="/dashboard/manager/races/register"
            className="bg-[#EAEAE8] text-black px-6 py-2 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Register for Race</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DashboardStats.map((stat, index) => (
          <div
            key={index}
            className={`bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:bg-[#868684]/10 transition-all duration-300 ${
              isLoaded ? `opacity-100 translate-y-0 delay-${index * 100}` : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="heading-font text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-[#868684] text-sm mb-2">{stat.label}</div>
            <div className="text-[#EAEAE8] text-xs">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Races */}
        <div className="lg:col-span-2">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-font text-xl font-bold text-[#EAEAE8]">Upcoming Races</h2>
              <Link
                href="/dashboard/manager/races"
                className="text-[#EAEAE8] hover:text-white text-sm transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingRaces.map((race, index) => (
                <div
                  key={race.id}
                  className={`bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-4 hover:bg-[#868684]/20 transition-all duration-300 ${
                    isLoaded ? `opacity-100 translate-x-0 delay-${index * 100}` : "opacity-0 translate-x-4"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-[#EAEAE8] mb-1">{race.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-[#868684]">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{race.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{race.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(race.status)}`}>
                      {race.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-[#868684]">
                      <span className="text-[#EAEAE8] font-medium">{race.type}</span> • {race.teamsRegistered} teams
                      registered
                    </div>
                    {race.status === "available" && (
                      <Link
                        href="/dashboard/manager/races/register"
                        className="text-[#EAEAE8] hover:text-white text-sm font-medium transition-colors"
                      >
                        Register →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
            <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-6">Recent Activity</h2>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start space-x-3 ${
                    isLoaded ? `opacity-100 translate-x-0 delay-${index * 100}` : "opacity-0 translate-x-4"
                  }`}
                >
                  <activity.icon className={`w-5 h-5 ${activity.color} mt-0.5`} />
                  <div className="flex-1">
                    <p className="text-[#EAEAE8] text-sm">{activity.message}</p>
                    <p className="text-[#868684] text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Performance Chart */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
        <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-6">Team Performance</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {teamPerformance.map((month, index) => (
            <div
              key={month.month}
              className={`text-center ${
                isLoaded ? `opacity-100 translate-y-0 delay-${index * 100}` : "opacity-0 translate-y-4"
              }`}
            >
              <div className="text-[#868684] text-sm mb-2">{month.month}</div>
              <div className="text-2xl font-bold text-[#EAEAE8] mb-1">{month.races}</div>
              <div className="text-[#868684] text-xs mb-2">Races</div>
              <div className="flex items-center justify-center space-x-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-medium">{month.podiums}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/manager/team"
          className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6 hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-300 group"
        >
          <Users className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-2">Manage Team</h3>
          <p className="text-[#868684] text-sm">View and manage your team roster</p>
        </Link>

        <Link
          href="/dashboard/manager/races"
          className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6 hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-300 group"
        >
          <Calendar className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-2">Race Management</h3>
          <p className="text-[#868684] text-sm">Register and manage race entries</p>
        </Link>

        <Link
          href="/dashboard/manager/payments"
          className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6 hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-300 group"
        >
          <DollarSign className="w-8 h-8 text-yellow-400 mb-4" />
          <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-2">Payments</h3>
          <p className="text-[#868684] text-sm">Track payments and expenses</p>
        </Link>
      </div>
    </div>
  )
}
