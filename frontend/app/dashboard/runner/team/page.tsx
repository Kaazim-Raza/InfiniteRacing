"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Users, Search, Phone, Mail, Calendar, MapPin } from "lucide-react"

export default function RunnerTeamPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Runner can only be in one team at a time
  const currentTeam = {
    id: 1,
    name: "Thunder Runners",
    manager: "Sarah Johnson",
    members: 10,
    status: "active",
    nextRace: "Spring Championship 30-Leg Relay",
    raceDate: "2024-03-15",
    raceLocation: "Metro Stadium",
    teamRecord: "3-1-0",
    category: "male",
    school: "Metro University",
  }

  const teammates = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "Team Captain",
      personalBest: "4:15/km",
      experience: "5 years",
      phone: "+1 (555) 123-4567",
      email: "alex.r@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=AR",
      age: 22,
      major: "Sports Science",
    },
    {
      id: 2,
      name: "Emma Thompson",
      role: "Runner",
      personalBest: "4:52/km",
      experience: "2 years",
      phone: "+1 (555) 234-5678",
      email: "emma.t@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=ET",
      age: 20,
      major: "Kinesiology",
    },
    {
      id: 3,
      name: "David Kim",
      role: "Runner",
      personalBest: "4:38/km",
      experience: "3 years",
      phone: "+1 (555) 345-6789",
      email: "david.k@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      age: 21,
      major: "Physical Education",
    },
    {
      id: 4,
      name: "Mike Johnson",
      role: "Runner",
      personalBest: "4:25/km",
      experience: "4 years",
      phone: "+1 (555) 456-7890",
      email: "mike.j@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
      age: 23,
      major: "Exercise Science",
    },
    {
      id: 5,
      name: "Chris Wilson",
      role: "Runner",
      personalBest: "4:33/km",
      experience: "3 years",
      phone: "+1 (555) 567-8901",
      email: "chris.w@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=CW",
      age: 22,
      major: "Health Sciences",
    },
    {
      id: 6,
      name: "Ryan Davis",
      role: "Runner",
      personalBest: "4:41/km",
      experience: "2 years",
      phone: "+1 (555) 678-9012",
      email: "ryan.d@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=RD",
      age: 19,
      major: "Sports Medicine",
    },
    {
      id: 7,
      name: "Jake Miller",
      role: "Runner",
      personalBest: "4:29/km",
      experience: "6 years",
      phone: "+1 (555) 789-0123",
      email: "jake.m@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JM",
      age: 24,
      major: "Athletic Training",
    },
    {
      id: 8,
      name: "Sam Brown",
      role: "Runner",
      personalBest: "4:36/km",
      experience: "4 years",
      phone: "+1 (555) 890-1234",
      email: "sam.b@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=SB",
      age: 21,
      major: "Recreation",
    },
    {
      id: 9,
      name: "Tony Garcia",
      role: "Anchor Runner",
      personalBest: "4:18/km",
      experience: "7 years",
      phone: "+1 (555) 901-2345",
      email: "tony.g@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=TG",
      age: 25,
      major: "Sports Psychology",
    },
  ]

  const filteredTeammates = teammates.filter(
    (teammate) =>
      teammate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teammate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teammate.major.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8]">My Team</h1>
          <p className="text-[#868684] mt-2">View your current team and teammates information</p>
        </div>
      </div>

      {/* Current Team Overview */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="heading-font text-xl font-bold text-[#EAEAE8]">{currentTeam.name}</h2>
            <p className="text-[#868684]">{currentTeam.school}</p>
            <p className="text-[#868684]">Managed by {currentTeam.manager}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="default">{currentTeam.status}</Badge>
            <Badge
              variant="outline"
              className={
                currentTeam.category === "male"
                  ? "text-blue-400 border-blue-400"
                  : currentTeam.category === "female"
                    ? "text-pink-400 border-pink-400"
                    : "text-purple-400 border-purple-400"
              }
            >
              {currentTeam.category}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-[#868684]">Team Members</p>
            <p className="font-medium text-white flex items-center gap-1">
              <Users className="w-4 h-4" />
              {currentTeam.members}/10
            </p>
          </div>
          <div>
            <p className="text-sm text-[#868684]">Team Record</p>
            <p className="font-medium text-white">{currentTeam.teamRecord}</p>
          </div>
          <div>
            <p className="text-sm text-[#868684]">Category</p>
            <p className="font-medium text-white capitalize">{currentTeam.category} Team</p>
          </div>
        </div>

        <div className="border-t border-[#868684]/20 pt-4">
          <p className="text-sm text-[#868684] mb-1">Next Race</p>
          <p className="font-medium text-white">{currentTeam.nextRace}</p>
          <div className="flex items-center gap-4 mt-2 text-[#868684]">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {currentTeam.raceDate}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {currentTeam.raceLocation}
            </span>
          </div>
        </div>
      </div>

      {/* Teammates Section */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="heading-font text-xl font-bold text-[#EAEAE8]">My Teammates</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#868684]" />
            <Input
              placeholder="Search teammates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 bg-[#868684]/5 border-[#868684]/20 text-[#EAEAE8] placeholder:text-[#868684]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeammates.map((teammate) => (
            <div key={teammate.id} className="bg-[#868684]/10 border border-[#868684]/20 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarImage src={teammate.avatar || "/placeholder.svg"} alt={teammate.name} />
                  <AvatarFallback>
                    {teammate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="heading-font font-bold text-[#EAEAE8]">{teammate.name}</h4>
                  <p className="text-[#868684] text-sm">{teammate.role}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[#868684]">Age</p>
                    <p className="text-[#EAEAE8] font-medium">{teammate.age}</p>
                  </div>
                  <div>
                    <p className="text-[#868684]">Experience</p>
                    <p className="text-[#EAEAE8] font-medium">{teammate.experience}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#868684]">Major</p>
                  <p className="text-[#EAEAE8] font-medium">{teammate.major}</p>
                </div>
                <div>
                  <p className="text-[#868684]">Personal Best</p>
                  <p className="text-[#EAEAE8] font-medium">{teammate.personalBest}</p>
                </div>
              </div>

              <div className="border-t border-[#868684]/20 pt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-[#868684]" />
                  <span className="text-[#868684] text-xs">{teammate.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-[#868684]" />
                  <span className="text-[#868684] text-xs">{teammate.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
