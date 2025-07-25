"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Trophy, Clock, Search, Filter, Target, DollarSign } from "lucide-react"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")

  const events = [
    {
      id: 1,
      name: "Spring Championship 30-Leg Relay",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "Metro Stadium",
      city: "New York",
      type: "30-Leg Relay",
      status: "open",
      registrations: 8,
      maxTeams: 12,
      entryFee: 150,
      prizePool: 2850,
      description: "Join us for the premier spring relay championship featuring 30-leg team races.",
      categories: ["Male", "Female", "Coed"],
      requirements: "10 runners per team, 3 legs per runner",
    },
    {
      id: 2,
      name: "City Marathon 30-Leg Relay",
      date: "2024-03-22",
      time: "2:00 PM",
      location: "Downtown Circuit",
      city: "Los Angeles",
      type: "30-Leg Relay",
      status: "open",
      registrations: 5,
      maxTeams: 10,
      entryFee: 200,
      prizePool: 3500,
      description: "Experience the thrill of urban racing through the heart of the city.",
      categories: ["Male", "Female", "Coed"],
      requirements: "10 runners per team, 3 legs per runner",
    },
    {
      id: 3,
      name: "Summer Challenge 30-Leg Relay",
      date: "2024-04-10",
      time: "8:00 AM",
      location: "University Track",
      city: "Chicago",
      type: "30-Leg Relay",
      status: "full",
      registrations: 15,
      maxTeams: 15,
      entryFee: 175,
      prizePool: 4200,
      description: "The ultimate summer challenge for dedicated relay teams.",
      categories: ["Male", "Female", "Coed"],
      requirements: "10 runners per team, 3 legs per runner",
    },
    {
      id: 4,
      name: "Autumn Classic 30-Leg Relay",
      date: "2024-04-25",
      time: "10:00 AM",
      location: "Riverside Park",
      city: "Seattle",
      type: "30-Leg Relay",
      status: "coming-soon",
      registrations: 0,
      maxTeams: 20,
      entryFee: 180,
      prizePool: 5000,
      description: "Fall season opener with scenic routes and competitive racing.",
      categories: ["Male", "Female", "Coed"],
      requirements: "10 runners per team, 3 legs per runner",
    },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    const matchesLocation = filterLocation === "all" || event.city === filterLocation
    return matchesSearch && matchesStatus && matchesLocation
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "full":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "coming-soon":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Registration Open"
      case "full":
        return "Registration Full"
      case "coming-soon":
        return "Coming Soon"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="heading-font text-4xl md:text-6xl font-bold text-[#EAEAE8] mb-4">Race Events</h1>
          <p className="text-[#868684] text-lg max-w-2xl mx-auto">
            Discover upcoming 30-leg relay races and view event details. Registration is managed by your team manager.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#868684]" />
            <Input
              placeholder="Search events..."
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
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="open">Registration Open</SelectItem>
              <SelectItem value="full">Registration Full</SelectItem>
              <SelectItem value="coming-soon">Coming Soon</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="w-full md:w-48 bg-[#868684]/5 border-[#868684]/20 text-[#EAEAE8]">
              <MapPin className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="Los Angeles">Los Angeles</SelectItem>
              <SelectItem value="Chicago">Chicago</SelectItem>
              <SelectItem value="Seattle">Seattle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:border-[#EAEAE8]/40 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="heading-font text-xl font-bold text-[#EAEAE8] mb-2">{event.name}</h3>
                  <div className="flex items-center gap-4 text-[#868684]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[#868684]">
                    <MapPin className="w-4 h-4" />
                    {event.location}, {event.city}
                  </div>
                </div>
                <Badge className={`${getStatusColor(event.status)} border`}>{getStatusText(event.status)}</Badge>
              </div>

              <p className="text-[#868684] mb-4">{event.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-[#868684]">Race Type</p>
                  <p className="font-medium text-white flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {event.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#868684]">Entry Fee</p>
                  <p className="font-medium text-white flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />${event.entryFee} per team
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#868684]">Teams</p>
                  <p className="font-medium text-white flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.registrations}/{event.maxTeams}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#868684]">Prize Pool</p>
                  <p className="font-medium text-white flex items-center gap-1">
                    <Trophy className="w-4 h-4" />${event.prizePool}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-[#868684] mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {event.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className={
                        category === "Male"
                          ? "text-blue-400 border-blue-400"
                          : category === "Female"
                            ? "text-pink-400 border-pink-400"
                            : "text-purple-400 border-purple-400"
                      }
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-3 mb-4">
                <p className="text-sm text-[#868684] mb-1">Requirements</p>
                <p className="text-[#EAEAE8] text-sm">{event.requirements}</p>
              </div>

              <div className="text-center">
                <p className="text-[#868684] text-sm">Registration is managed by your team manager</p>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#868684] text-lg">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
