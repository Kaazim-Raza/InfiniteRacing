"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Trophy,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  DollarSign,
  Target,
} from "lucide-react"
import Link from "next/link"

// Mock data
const races = [
  {
    id: 1,
    name: "Spring Championship",
    date: "2024-03-15",
    time: "09:00",
    location: "Metro Stadium",
    type: "4x100m",
    entryFee: 50,
    status: "registered",
    registrationStatus: "confirmed",
    teamStatus: "ready",
    runnersAssigned: 4,
    maxRunners: 4,
    paymentStatus: "paid",
    registrationDate: "2024-02-15",
  },
  {
    id: 2,
    name: "City Relay Challenge",
    date: "2024-03-22",
    time: "14:00",
    location: "City Park Track",
    type: "4x400m",
    entryFee: 75,
    status: "pending",
    registrationStatus: "pending_approval",
    teamStatus: "incomplete",
    runnersAssigned: 3,
    maxRunners: 4,
    paymentStatus: "pending",
    registrationDate: "2024-03-01",
  },
  {
    id: 3,
    name: "Metro Series",
    date: "2024-04-05",
    time: "11:00",
    location: "University Track",
    type: "Mixed 4x400m",
    entryFee: 100,
    status: "available",
    registrationStatus: "not_registered",
    teamStatus: "not_assigned",
    runnersAssigned: 0,
    maxRunners: 4,
    paymentStatus: "not_required",
    registrationDate: null,
  },
  {
    id: 4,
    name: "Youth Relay Cup",
    date: "2024-04-12",
    time: "10:00",
    location: "High School Track",
    type: "4x200m",
    entryFee: 25,
    status: "registered",
    registrationStatus: "confirmed",
    teamStatus: "ready",
    runnersAssigned: 4,
    maxRunners: 4,
    paymentStatus: "paid",
    registrationDate: "2024-03-05",
  },
  {
    id: 5,
    name: "Winter Series Final",
    date: "2024-02-28",
    time: "15:30",
    location: "Indoor Arena",
    type: "4x100m",
    entryFee: 60,
    status: "completed",
    registrationStatus: "confirmed",
    teamStatus: "completed",
    runnersAssigned: 4,
    maxRunners: 4,
    paymentStatus: "paid",
    registrationDate: "2024-01-20",
    result: "2nd Place",
    time_result: "42.15s",
  },
]

const runnerAssignments = [
  { raceId: 1, leg: 1, runner: "Mike Chen", confirmed: true },
  { raceId: 1, leg: 2, runner: "Sarah Johnson", confirmed: true },
  { raceId: 1, leg: 3, runner: "Emma Davis", confirmed: true },
  { raceId: 1, leg: 4, runner: "Alex Rodriguez", confirmed: true },
]

export default function ManagerRacesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRaces, setSelectedRaces] = useState<number[]>([])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredRaces = races.filter((race) => {
    const matchesSearch =
      race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      race.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      race.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || race.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "registered":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "available":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "completed":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getTeamStatusIcon = (teamStatus: string) => {
    switch (teamStatus) {
      case "ready":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "incomplete":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
      case "not_assigned":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "completed":
        return <Trophy className="w-4 h-4 text-purple-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getPaymentStatusColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid":
        return "text-green-400"
      case "pending":
        return "text-yellow-400"
      case "not_required":
        return "text-gray-400"
      default:
        return "text-red-400"
    }
  }

  const toggleRaceSelection = (raceId: number) => {
    setSelectedRaces((prev) => (prev.includes(raceId) ? prev.filter((id) => id !== raceId) : [...prev, raceId]))
  }

  const selectAllRaces = () => {
    setSelectedRaces(filteredRaces.map((race) => race.id))
  }

  const clearSelection = () => {
    setSelectedRaces([])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Race Management</h1>
          <p className="text-[#868684]">Register for races and manage team assignments</p>
        </div>
        <Link
          href="/dashboard/manager/races/register"
          className="mt-4 sm:mt-0 bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Register for Race</span>
        </Link>
      </div>

      {/* Race Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            label: "Registered Races",
            value: races.filter((r) => r.status === "registered").length,
            icon: Calendar,
            color: "text-green-400",
          },
          {
            label: "Pending Races",
            value: races.filter((r) => r.status === "pending").length,
            icon: Clock,
            color: "text-yellow-400",
          },
          {
            label: "Completed Races",
            value: races.filter((r) => r.status === "completed").length,
            icon: Trophy,
            color: "text-purple-400",
          },
          {
            label: "Total Fees",
            value: `$${races.filter((r) => r.paymentStatus === "paid").reduce((sum, race) => sum + race.entryFee, 0)}`,
            icon: DollarSign,
            color: "text-blue-400",
          },
        ].map((stat, index) => (
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
            <div className="text-[#868684] text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#868684]" />
            <input
              type="text"
              placeholder="Search races..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-2 border-[#868684]/30 pl-10 pr-4 py-2 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-[#868684]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#868684]/10 border border-[#868684]/30 text-white px-3 py-2 focus:outline-none focus:border-[#EAEAE8] transition-colors"
              >
                <option value="all">All Races</option>
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="registered">Registered</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedRaces.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#868684]">{selectedRaces.length} selected</span>
                <button onClick={clearSelection} className="text-sm text-[#EAEAE8] hover:text-white transition-colors">
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Races Table */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#868684]/10 border-b border-[#868684]/20">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedRaces.length === filteredRaces.length && filteredRaces.length > 0}
                    onChange={selectedRaces.length === filteredRaces.length ? clearSelection : selectAllRaces}
                    className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
                  />
                </th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Race Details</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Date & Time</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Team Status</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Payment</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Status</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRaces.map((race, index) => (
                <tr
                  key={race.id}
                  className={`border-b border-[#868684]/10 hover:bg-[#868684]/5 transition-colors ${
                    isLoaded ? `opacity-100 translate-y-0 delay-${index * 50}` : "opacity-0 translate-y-4"
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRaces.includes(race.id)}
                      onChange={() => toggleRaceSelection(race.id)}
                      className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <h3 className="font-bold text-white mb-1">{race.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-[#868684]">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{race.location}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-[#EAEAE8]/10 text-[#EAEAE8] rounded text-xs">{race.type}</span>
                      </div>
                      {race.result && (
                        <div className="mt-1 text-sm">
                          <span className="text-purple-400 font-medium">{race.result}</span>
                          {race.time_result && <span className="text-[#868684] ml-2">({race.time_result})</span>}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1 text-white">
                      <Calendar className="w-4 h-4 text-[#868684]" />
                      <span>{race.date}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-[#868684] text-sm">
                      <Clock className="w-3 h-3" />
                      <span>{race.time}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2 mb-1">
                      {getTeamStatusIcon(race.teamStatus)}
                      <span className="text-white text-sm capitalize">{race.teamStatus.replace("_", " ")}</span>
                    </div>
                    <div className="text-[#868684] text-sm">
                      {race.runnersAssigned}/{race.maxRunners} runners assigned
                    </div>
                    <div className="w-full bg-[#868684]/20 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-[#EAEAE8] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(race.runnersAssigned / race.maxRunners) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1 mb-1">
                      <DollarSign className={`w-4 h-4 ${getPaymentStatusColor(race.paymentStatus)}`} />
                      <span className="text-white font-medium">${race.entryFee}</span>
                    </div>
                    <div className={`text-sm capitalize ${getPaymentStatusColor(race.paymentStatus)}`}>
                      {race.paymentStatus.replace("_", " ")}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(race.status)}`}>
                      {race.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-[#868684] hover:text-blue-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {race.status !== "completed" && (
                        <button className="p-2 text-[#868684] hover:text-green-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {race.status === "available" && (
                        <button className="p-2 text-[#868684] hover:text-purple-400 transition-colors">
                          <Target className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
