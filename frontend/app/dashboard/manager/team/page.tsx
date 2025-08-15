"use client"

import { useState, useEffect } from "react"
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  Trophy,
  Target,
  AlertCircle,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"
import axios from "../../../lib/axios"
import { getCurrentUser } from "../../../lib/auth"

// Mock data for team roster
const teamRoster = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Team Captain",
    bestTime: "10.85s",
    specialty: "100m Sprint",
    joinDate: "2023-01-15",
    status: "active",
    gender: "female",
    age: 24,
    location: "New York, NY",
    racesCompleted: 15,
    personalBests: {
      "100m": "10.85s",
      "200m": "22.30s",
      "400m": "52.15s",
    },
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1 (555) 234-5678",
    position: "Lead Runner",
    bestTime: "9.95s",
    specialty: "100m Sprint",
    joinDate: "2023-02-20",
    status: "active",
    gender: "male",
    age: 26,
    location: "Los Angeles, CA",
    racesCompleted: 22,
    personalBests: {
      "100m": "9.95s",
      "200m": "20.45s",
      "400m": "48.90s",
    },
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (555) 345-6789",
    position: "Distance Specialist",
    bestTime: "11.20s",
    specialty: "400m",
    joinDate: "2023-03-10",
    status: "active",
    gender: "female",
    age: 23,
    location: "Chicago, IL",
    racesCompleted: 18,
    personalBests: {
      "100m": "11.20s",
      "200m": "23.15s",
      "400m": "50.80s",
    },
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    position: "Sprint Specialist",
    bestTime: "10.45s",
    specialty: "200m",
    joinDate: "2023-01-25",
    status: "active",
    gender: "male",
    age: 25,
    location: "Miami, FL",
    racesCompleted: 20,
    personalBests: {
      "100m": "10.45s",
      "200m": "21.20s",
      "400m": "49.75s",
    },
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 567-8901",
    position: "Reserve Runner",
    bestTime: "10.75s",
    specialty: "100m Sprint",
    joinDate: "2023-04-05",
    status: "active",
    gender: "male",
    age: 22,
    location: "Houston, TX",
    racesCompleted: 12,
    personalBests: {
      "100m": "10.75s",
      "200m": "22.10s",
      "400m": "51.30s",
    },
  },
  {
    id: 6,
    name: "Lisa Park",
    email: "lisa.park@email.com",
    phone: "+1 (555) 678-9012",
    position: "Sprint Specialist",
    bestTime: "11.05s",
    specialty: "200m",
    joinDate: "2023-02-15",
    status: "active",
    gender: "female",
    age: 27,
    location: "Seattle, WA",
    racesCompleted: 25,
    personalBests: {
      "100m": "11.05s",
      "200m": "22.85s",
      "400m": "52.40s",
    },
  },
  {
    id: 7,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 789-0123",
    position: "Distance Runner",
    bestTime: "48.30s",
    specialty: "400m",
    joinDate: "2023-03-20",
    status: "active",
    gender: "male",
    age: 28,
    location: "San Francisco, CA",
    racesCompleted: 19,
    personalBests: {
      "100m": "11.85s",
      "200m": "24.20s",
      "400m": "48.30s",
    },
  },
  {
    id: 8,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 890-1234",
    position: "Versatile Runner",
    bestTime: "10.95s",
    specialty: "100m Sprint",
    joinDate: "2023-01-30",
    status: "active",
    gender: "female",
    age: 24,
    location: "Phoenix, AZ",
    racesCompleted: 16,
    personalBests: {
      "100m": "10.95s",
      "200m": "22.75s",
      "400m": "51.85s",
    },
  },
]

const pendingInvitations = [
  {
    id: 1,
    email: "john.doe@email.com",
    invitedDate: "2024-01-15",
    status: "pending",
  },
  {
    id: 2,
    email: "jane.smith@email.com",
    invitedDate: "2024-01-10",
    status: "pending",
  },
]

export default function TeamManagementPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])
  const currentUser = getCurrentUser()
  const [teamRoster, setTeamRoster] = useState([])
//  const [pendingInvites, setPendingInvitations] = useState([])
  const [pendingInvites, setPendingInvitations] = useState<{ id: number, name: string, email: string }[]>([])


  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredRoster = teamRoster.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    const matchesGender = genderFilter === "all" || member.gender === genderFilter
    return matchesSearch && matchesStatus && matchesGender
  })


  // useEffect(() => {
  //   const fetchTeamRoster = async () => {
  //     try {
  //       const response = await axios.get(`/manager/manager/pool?manager_id=${currentUser?.id}`)
  //       if (!response.ok) throw new Error("Failed to fetch team roster")
       
  //       // Replace teamRoster with fetched data if needed
  //       // setTeamRoster(data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchTeamRoster()
  // }, [])
  useEffect(() => {
  const fetchTeamRoster = async () => {
    try {
      const { data } = await axios.get(`/manager/manager/pool?manager_id=${currentUser?.id}`)

      const transformedData = data.map(member => ({
        id: member.id,
        name: `${member.first_name} ${member.last_name}`,
        email: member.email,
        phone: member.phone,
        gender: member.gender,
        age: new Date().getFullYear() - new Date(member.dob).getFullYear(),
        position: member.role, // or something else if "role" isn't the position
        specialty: member.specialization || member.preferred_distance,
        bestTime: member.personal_best_10k || member.personal_best_5k,
        racesCompleted: member.years_of_experience || 0,
        location: `${member.city}, ${member.state}`,
        status: "active" // or however you determine active/inactive/pending
      }))

      setTeamRoster(transformedData)
    } catch (error) {
      console.error(error)
    }
  }
  fetchTeamRoster()
}, [])
const cancelInvite = async (inviteId: number) => {
  try {
    await axios.delete(`/manager/invite/${inviteId}?manager_id=${currentUser.id}`)
    setPendingInvitations((prev) => prev.filter((invite) => invite.id !== inviteId))
  } catch (error) {
    console.error("Failed to cancel invite:", error)
  }
}


useEffect(() => {
  const fetchPendingInvites = async () => {
    try {
      const response = await axios.get(`/manager/manager/invited_runners?manager_id=${currentUser?.id}`)
      setPendingInvitations(response.data) // store the array directly
    } catch (error) {
      console.error(error)
    }
  }
  fetchPendingInvites()
}, [])
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "inactive":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
  }

  const selectAllMembers = () => {
    setSelectedMembers(filteredRoster.map((member) => member.id))
  }

  const clearSelection = () => {
    setSelectedMembers([])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Team Management</h1>
          <p className="text-[#868684]">Manage your complete team rosters</p>
        </div>
        <Link
          href="/dashboard/manager/team/invite"
          className="mt-4 sm:mt-0 bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Invite Runner</span>
        </Link>
      </div>

      {/* Team Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Members",
            value: teamRoster.length,
            icon: Users,
            color: "text-blue-400",
          },
          {
            label: "Male Runners",
            value: teamRoster.filter((m) => m.gender === "male").length,
            icon: Target,
            color: "text-green-400",
          },
          {
            label: "Female Runners",
            value: teamRoster.filter((m) => m.gender === "female").length,
            icon: Target,
            color: "text-pink-400",
          },
          {
            label: "Pending Invites",
            value: pendingInvitations.length,
            icon: Mail,
            color: "text-yellow-400",
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
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-2 border-[#868684]/30 pl-10 pr-4 py-2 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-[#868684]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#868684]/10 border border-[#868684]/30 text-white px-3 py-2 focus:outline-none focus:border-[#EAEAE8] transition-colors"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="bg-[#868684]/10 border border-[#868684]/30 text-white px-3 py-2 focus:outline-none focus:border-[#EAEAE8] transition-colors"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Bulk Actions */}
            {selectedMembers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#868684]">{selectedMembers.length} selected</span>
                <button onClick={clearSelection} className="text-sm text-[#EAEAE8] hover:text-white transition-colors">
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Team Roster Table */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#868684]/10 border-b border-[#868684]/20">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedMembers.length === filteredRoster.length && filteredRoster.length > 0}
                    onChange={selectedMembers.length === filteredRoster.length ? clearSelection : selectAllMembers}
                    className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
                  />
                </th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Runner Details</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Contact</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Performance</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Status</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoster.map((member, index) => (
                <tr
                  key={member.id}
                  className={`border-b border-[#868684]/10 hover:bg-[#868684]/5 transition-colors ${
                    isLoaded ? `opacity-100 translate-y-0 delay-${index * 50}` : "opacity-0 translate-y-4"
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => toggleMemberSelection(member.id)}
                      className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <h3 className="font-bold text-white mb-1">{member.name}</h3>
                      <div className="text-sm text-[#868684] mb-1">{member.position}</div>
                      <div className="flex items-center space-x-4 text-xs text-[#868684]">
                        <span className="capitalize">{member.gender}</span>
                        <span>{member.age} years</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{member.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-[#EAEAE8]">
                        <Mail className="w-3 h-3 text-[#868684]" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-[#868684]">
                        <Phone className="w-3 h-3" />
                        <span>{member.phone_number}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-[#EAEAE8] font-medium mb-1">{member.specialty}</div>
                      <div className="text-sm text-[#868684] mb-2">Best: {member.bestTime}</div>
                      <div className="flex items-center space-x-2 text-xs text-[#868684]">
                        <Trophy className="w-3 h-3" />
                        <span>{member.racesCompleted} races</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(member.status)}`}
                    >
                      {member.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-[#868684] hover:text-blue-400 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#868684] hover:text-[#EAEAE8] transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Invitations */}
      {pendingInvites.length > 0 && (
        <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
          <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-4">Pending Invitations</h2>
          <div className="space-y-3">
            {pendingInvites.map((invitation, index) => (
              <div
                key={invitation.id}
                className={`flex items-center justify-between bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-4 ${
                  isLoaded ? `opacity-100 translate-x-0 delay-${index * 100}` : "opacity-0 translate-x-4"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-[#EAEAE8] font-medium">{invitation.email}</div>
                    {/* <div className="text-[#868684] text-sm">Invited on {invitation.invitedDate}</div> */}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <button className="text-[#EAEAE8] hover:text-white text-sm font-medium transition-colors">
                    Resend
                  </button> */}
                  <button onClick={()=>cancelInvite(invitation.id)} className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
