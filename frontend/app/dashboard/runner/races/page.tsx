"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Target, Search, Filter, Bell } from "lucide-react"

export default function RunnerRacesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Only races registered by manager - no registration capability for runners
  const registeredRaces = [
    {
      id: 1,
      name: "Spring Championship 30-Leg Relay",
      date: "2024-03-15",
      location: "Metro Stadium",
      distance: "30-Leg Relay",
      teamName: "Thunder Runners",
      teamCategory: "male",
      myLegs: [1, 11, 21],
      status: "confirmed",
      paymentStatus: "paid",
      manager: "John Smith",
    },
    {
      id: 2,
      name: "City Marathon 30-Leg Relay",
      date: "2024-03-22",
      location: "Downtown Circuit",
      distance: "30-Leg Relay",
      teamName: "Speed Demons",
      teamCategory: "coed",
      myLegs: [3, 13, 23],
      status: "pending",
      paymentStatus: "pending",
      manager: "Sarah Johnson",
    },
  ]

  const notifications = [
    {
      id: 1,
      type: "registration",
      message: "You have been registered for Spring Championship 30-Leg Relay by John Smith",
      date: "2024-01-15",
      read: false,
    },
    {
      id: 2,
      type: "leg_assignment",
      message: "Your legs have been assigned for City Marathon 30-Leg Relay",
      date: "2024-01-10",
      read: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8]">My Races</h1>
          <p className="text-[#868684] mt-2">View your race registrations and notifications</p>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
        <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Recent Notifications
        </h2>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                !notification.read ? "bg-cyan-500/10 border-cyan-500/30" : "bg-[#868684]/10 border-[#868684]/20"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[#EAEAE8] font-medium">{notification.message}</p>
                  <p className="text-[#868684] text-sm mt-1">{notification.date}</p>
                </div>
                {!notification.read && <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500">New</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#868684]" />
          <Input
            placeholder="Search races..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#868684]/5 border-[#868684]/20 text-[#EAEAE8] placeholder:text-[#868684]"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-48 bg-[#868684]/5 border-[#868684]/20 text-[#EAEAE8]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Races</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Registered Races */}
      <div className="space-y-4">
        <h2 className="heading-font text-xl font-bold text-[#EAEAE8]">My Registered Races</h2>
        {registeredRaces.map((race) => (
          <div key={race.id} className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8]">{race.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-[#868684]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {race.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {race.location}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant={race.status === "confirmed" ? "default" : "secondary"}>{race.status}</Badge>
                <Badge variant={race.paymentStatus === "paid" ? "default" : "destructive"}>{race.paymentStatus}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-[#868684]">Race Type</p>
                <p className="font-medium text-white flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {race.distance}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#868684]">Team</p>
                <p className="font-medium text-white">{race.teamName}</p>
              </div>
              <div>
                <p className="text-sm text-[#868684]">Category</p>
                <Badge
                  variant="outline"
                  className={
                    race.teamCategory === "male"
                      ? "text-blue-400 border-blue-400"
                      : race.teamCategory === "female"
                        ? "text-pink-400 border-pink-400"
                        : "text-purple-400 border-purple-400"
                  }
                >
                  {race.teamCategory}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-[#868684]">Manager</p>
                <p className="font-medium text-white">{race.manager}</p>
              </div>
            </div>

            <div className="bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-4">
              <h4 className="text-[#EAEAE8] font-bold mb-2">My Assigned Legs</h4>
              <div className="flex flex-wrap gap-2">
                {race.myLegs.map((leg) => (
                  <span
                    key={leg}
                    className="px-3 py-1 bg-[#EAEAE8]/20 text-[#EAEAE8] text-sm rounded border border-[#EAEAE8]/30"
                  >
                    Leg {leg}
                  </span>
                ))}
              </div>
              <p className="text-[#868684] text-sm mt-2">
                You will run legs {race.myLegs.join(", ")} in this 30-leg relay race
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
