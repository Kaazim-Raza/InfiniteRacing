"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import axios from "../../../lib/axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Target,
  DollarSign,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

// Race Details Modal Component
function RaceDetailsModal({
  isOpen,
  onClose,
  race,
}: {
  isOpen: boolean
  onClose: () => void
  race: any
}) {
  if (!isOpen || !race) return null

  const registeredTeams = [
    {
      id: 1,
      name: "Thunder Runners Academy",
      category: "male",
      runnerCount: 10,
      status: "complete",
      manager: "John Smith",
      registrationDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Lightning Bolts School",
      category: "female",
      runnerCount: 8,
      status: "incomplete",
      manager: "Sarah Johnson",
      registrationDate: "2024-01-18",
    },
    {
      id: 3,
      name: "Speed Demons University",
      category: "coed",
      runnerCount: 10,
      status: "complete",
      manager: "Mike Chen",
      registrationDate: "2024-01-20",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "incomplete":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "male":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "female":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30"
      case "coed":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const totalRevenue = registeredTeams.length * race.entry_fee
  const registrationProgress = (registeredTeams.length / race.maxTeams) * 100

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-[#868684]/20 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#868684]/20">
          <div>
            <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-2">{race.name}</h2>
            <div className="flex items-center space-x-4 text-[#868684]">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {race.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {race.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {race.location}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#868684] hover:text-[#EAEAE8] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Race Overview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Race Information */}
              <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Race Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#868684] text-sm">Race Type</p>
                    <p className="text-[#EAEAE8] font-medium flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      {race.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#868684] text-sm">Entry Fee</p>
                    <p className="text-[#EAEAE8] font-medium flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />${race.entry_fee} per team
                    </p>
                  </div>
                  <div>
                    <p className="text-[#868684] text-sm">Max Teams</p>
                    <p className="text-[#EAEAE8] font-medium">{race.maxTeams} teams</p>
                  </div>
                  <div>
                    <p className="text-[#868684] text-sm">Status</p>
                    <Badge variant={race.status === "active" ? "default" : "secondary"}>{race.status}</Badge>
                  </div>
                </div>
              </div>

              {/* Race Format */}
              <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  30-Leg Relay Format
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#EAEAE8]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-[#EAEAE8]">30</span>
                    </div>
                    <p className="text-[#EAEAE8] font-medium">Total Legs</p>
                    <p className="text-[#868684] text-sm">Complete race distance</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#EAEAE8]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-[#EAEAE8]">10</span>
                    </div>
                    <p className="text-[#EAEAE8] font-medium">Runners per Team</p>
                    <p className="text-[#868684] text-sm">Required team size</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#EAEAE8]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-[#EAEAE8]">3</span>
                    </div>
                    <p className="text-[#EAEAE8] font-medium">Legs per Runner</p>
                    <p className="text-[#868684] text-sm">e.g., 1,11,21</p>
                  </div>
                </div>
              </div>

              {/* Team Categories */}
              <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Team Categories</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="text-blue-300 font-bold mb-2">Male Teams</h4>
                    <p className="text-[#868684] text-sm">All male runners (10 required)</p>
                  </div>
                  <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                    <h4 className="text-pink-300 font-bold mb-2">Female Teams</h4>
                    <p className="text-[#868684] text-sm">All female runners (10 required)</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="text-purple-300 font-bold mb-2">Coed Teams</h4>
                    <p className="text-[#868684] text-sm">Mixed gender (min 3 of each)</p>
                  </div>
                </div>
              </div>

              {/* Registered Teams */}
              <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Registered Teams</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {registeredTeams.map((team) => (
                    <div
                      key={team.id}
                      className="bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-[#EAEAE8] font-medium">{team.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(team.category)}`}
                          >
                            {team.category}
                          </span>
                          <span className="text-[#868684] text-sm">{team.runnerCount}/10 runners</span>
                          <span className="text-[#868684] text-sm">Manager: {team.manager}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(team.status)}`}
                        >
                          {team.status}
                        </span>
                        {team.status === "complete" ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Progress */}
              <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Registration Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#868684] text-sm">Teams Registered</span>
                      <span className="text-[#EAEAE8] font-bold">
                        {registeredTeams.length}/{race.maxTeams}
                      </span>
                    </div>
                    <div className="w-full bg-[#868684]/20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#EAEAE8] to-white h-2 rounded-full transition-all duration-300"
                        style={{ width: `${registrationProgress}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#868684]/20">
                    <div className="flex justify-between items-center">
                      <span className="text-[#868684]">Total Revenue</span>
                      <span className="text-yellow-400 font-bold text-lg">${totalRevenue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prize Structure */}
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Prize Structure
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">1</span>
                      </div>
                      <span className="text-[#EAEAE8] font-medium">1st Place</span>
                    </div>
                    <span className="text-yellow-400 font-bold">$1,500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">2</span>
                      </div>
                      <span className="text-[#EAEAE8] font-medium">2nd Place</span>
                    </div>
                    <span className="text-gray-300 font-bold">$900</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">3</span>
                      </div>
                      <span className="text-[#EAEAE8] font-medium">3rd Place</span>
                    </div>
                    <span className="text-orange-400 font-bold">$450</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
                <h3 className="heading-font text-lg font-bold text-[#EAEAE8] mb-4">Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-[#EAEAE8] text-black hover:bg-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Race
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Manage Teams
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Race
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminRacesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedRace, setSelectedRace] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [race, setRaces] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const races = [
    {
      id: 1,
      name: "Spring Championship 30-Leg Relay",
      date: "2024-03-15",
      time: "09:00",
      location: "Metro Stadium",
      type: "30-Leg Relay",
      status: "active",
      registrations: 8,
      maxTeams: 12,
      entryFee: 150,
      totalRevenue: 1200,
    },
    {
      id: 2,
      name: "City Marathon 30-Leg Relay",
      date: "2024-03-22",
      time: "14:00",
      location: "Downtown Circuit",
      type: "30-Leg Relay",
      status: "draft",
      registrations: 0,
      maxTeams: 10,
      entryFee: 200,
      totalRevenue: 0,
    },
    {
      id: 3,
      name: "Summer Challenge 30-Leg Relay",
      date: "2024-04-10",
      time: "08:00",
      location: "University Track",
      type: "30-Leg Relay",
      status: "completed",
      registrations: 15,
      maxTeams: 15,
      entryFee: 175,
      totalRevenue: 2625,
    },
  ]



  useEffect(() => {
    const fetchRaces = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get("/admin/races")
        
        // const data = await res.json()
      console.log(res)
        setRaces(res.data)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    fetchRaces()
  }, [])

  const filteredRaces = race.filter((race) => {
    const matchesSearch =
      race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      race.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || race.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const openRaceModal = (race: any) => {
    setSelectedRace(race)
    setIsModalOpen(true)
  }

  const closeRaceModal = () => {
    setSelectedRace(null)
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8]">Race Management</h1>
          <p className="text-[#868684] mt-2">Manage 30-leg relay races and team registrations</p>
        </div>
        <Link href="/dashboard/admin/races/create">
          <Button className="bg-[#EAEAE8] text-black px-6 py-2 font-bold hover:bg-white transition-all duration-300 hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            Create New Race
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-[#868684]/10 border border-[#868684]/20">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            All Races
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            Active
          </TabsTrigger>
          <TabsTrigger value="draft" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            Draft
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-[#EAEAE8] data-[state=active]:text-black">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
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
              <SelectTrigger className="w-full sm:w-48 bg-[#868684]/5 border-[#868684]/20 text-[#EAEAE8]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Races</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRaces.map((race) => (
              <div
                key={race.id}
                className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:border-[#EAEAE8]/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="heading-font text-lg font-bold text-[#EAEAE8]">{race.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-[#868684]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {race.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {race.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[#868684]">
                      <MapPin className="w-4 h-4" />
                      {race.location}
                    </div>
                  </div>
                  <Badge
                    variant={
                      race.status === "active" ? "default" : race.status === "completed" ? "secondary" : "outline"
                    }
                  >
                    {race.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-[#868684]">Race Type</p>
                    <p className="font-medium text-white flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {race.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#868684]">Entry Fee</p>
                    <p className="font-medium text-white">${race.entry_fee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#868684]">Teams</p>
                    <p className="font-medium text-white flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {race.registrations}/{race.maxTeams}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#868684]">Revenue</p>
                    <p className="font-medium text-white">${race.totalRevenue}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => openRaceModal(race)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1 bg-[#EAEAE8] text-black hover:bg-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRaces
              .filter((race) => race.status === "active")
              .map((race) => (
                <div
                  key={race.id}
                  className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:border-[#EAEAE8]/40 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="heading-font text-lg font-bold text-[#EAEAE8]">{race.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-[#868684]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {race.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {race.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[#868684]">
                        <MapPin className="w-4 h-4" />
                        {race.location}
                      </div>
                    </div>
                    <Badge variant="default">{race.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-[#868684]">Race Type</p>
                      <p className="font-medium text-white flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {race.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868684]">Entry Fee</p>
                      <p className="font-medium text-white">${race.entry_fee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868684]">Teams</p>
                      <p className="font-medium text-white flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {race.registrations}/{race.maxTeams}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868684]">Revenue</p>
                      <p className="font-medium text-white">${race.totalRevenue}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => openRaceModal(race)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#EAEAE8] text-black hover:bg-white">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRaces
              .filter((race) => race.status === "draft")
              .map((race) => (
                <div
                  key={race.id}
                  className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:border-[#EAEAE8]/40 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="heading-font text-lg font-bold text-[#EAEAE8]">{race.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-[#868684]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {race.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {race.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[#868684]">
                        <MapPin className="w-4 h-4" />
                        {race.location}
                      </div>
                    </div>
                    <Badge variant="outline">{race.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-[#868684]">Race Type</p>
                      <p className="font-medium text-white flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {race.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868684]">Entry Fee</p>
                      <p className="font-medium text-white">${race.entry_fee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868684]">Teams</p>
                      <p className="font-medium text-white flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {race.registrations}/{race.maxTeams}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868684]">Revenue</p>
                      <p className="font-medium text-white">${race.totalRevenue}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => openRaceModal(race)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#EAEAE8] text-black hover:bg-white">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRaces
              .filter((race) => race.status === "completed")
              .map((race) => (
                <div
                  key={race.id}
                  className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:border-[#EAEAE8]/40 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="heading-font text-lg font-bold text-[#EAEAE8]">{race.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-[#868684]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {race.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {race.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[#868684]">
                        <MapPin className="w-4 h-4" />
                        {race.location}
                      </div>
                    </div>
                    <Badge variant="secondary">{race.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-[#868684]">Race Type</p>
                      <p className="font-medium text-white flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {race.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868684]">Entry Fee</p>
                      <p className="font-medium text-white">${race.entry_fee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868684]">Teams</p>
                      <p className="font-medium text-white flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {race.registrations}/{race.maxTeams}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868684]">Revenue</p>
                      <p className="font-medium text-white">${race.totalRevenue}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => openRaceModal(race)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#868684] text-[#EAEAE8] hover:bg-[#868684]/10 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#EAEAE8] text-black hover:bg-white">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Race Details Modal */}
      <RaceDetailsModal isOpen={isModalOpen} onClose={closeRaceModal} race={selectedRace} />
    </div>
  )
}
