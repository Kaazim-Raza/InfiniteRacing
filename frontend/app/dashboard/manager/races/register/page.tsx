"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Trophy,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Target,
  Users,
  Plus,
  X,
  Search,
} from "lucide-react"
import Link from "next/link"

// Mock data for available races
const availableRaces = [
  {
    id: 1,
    name: "Spring Championship 30-Leg Relay",
    date: "2024-03-15",
    time: "09:00",
    location: "Metro Stadium",
    type: "30-Leg Relay",
    entryFee: 150,
    maxTeams: 3,
    description: "Annual spring championship featuring 30-leg relay races with 10 runners per team.",
    requirements: ["10 runners per team", "Valid medical certificates", "Team registration fee"],
    prizes: ["1st Place: $1,500", "2nd Place: $900", "3rd Place: $450"],
    allowedTeamTypes: ["male", "female", "coed"],
    legs: 30,
    runnersPerTeam: 10,
  },
  {
    id: 2,
    name: "City Marathon 30-Leg Relay",
    date: "2024-03-22",
    time: "14:00",
    location: "Downtown Circuit",
    type: "30-Leg Relay",
    entryFee: 200,
    maxTeams: 3,
    description: "Challenging 30-leg relay race through the heart of the city with varying distances.",
    requirements: ["10 runners per team", "Age limit: 16-35", "Insurance coverage"],
    prizes: ["1st Place: $2,000", "2nd Place: $1,200", "3rd Place: $600"],
    allowedTeamTypes: ["male", "female", "coed"],
    legs: 30,
    runnersPerTeam: 10,
  },
]

// Mock data for team roster
const teamRoster = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Team Captain",
    bestTime: "10.85s",
    specialty: "100m Sprint",
    available: true,
    gender: "female",
    age: 24,
    experience: "5 years",
  },
  {
    id: 2,
    name: "Mike Chen",
    position: "Lead Runner",
    bestTime: "9.95s",
    specialty: "100m Sprint",
    available: true,
    gender: "male",
    age: 26,
    experience: "7 years",
  },
  {
    id: 3,
    name: "Emma Davis",
    position: "Distance Specialist",
    bestTime: "11.20s",
    specialty: "400m",
    available: true,
    gender: "female",
    age: 22,
    experience: "3 years",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    position: "Sprint Specialist",
    bestTime: "10.45s",
    specialty: "200m",
    available: true,
    gender: "male",
    age: 28,
    experience: "6 years",
  },
  {
    id: 5,
    name: "James Wilson",
    position: "Reserve Runner",
    bestTime: "10.75s",
    specialty: "100m Sprint",
    available: true,
    gender: "male",
    age: 25,
    experience: "4 years",
  },
  {
    id: 6,
    name: "Lisa Park",
    position: "Sprint Specialist",
    bestTime: "11.05s",
    specialty: "200m",
    available: true,
    gender: "female",
    age: 23,
    experience: "3 years",
  },
  {
    id: 7,
    name: "David Kim",
    position: "Distance Runner",
    bestTime: "48.30s",
    specialty: "400m",
    available: true,
    gender: "male",
    age: 29,
    experience: "8 years",
  },
  {
    id: 8,
    name: "Maria Garcia",
    position: "Versatile Runner",
    bestTime: "10.95s",
    specialty: "100m Sprint",
    available: true,
    gender: "female",
    age: 27,
    experience: "5 years",
  },
  {
    id: 9,
    name: "Robert Taylor",
    position: "Middle Distance",
    bestTime: "1:52.30",
    specialty: "800m",
    available: true,
    gender: "male",
    age: 30,
    experience: "9 years",
  },
  {
    id: 10,
    name: "Jennifer Lee",
    position: "Sprint Specialist",
    bestTime: "11.15s",
    specialty: "100m Sprint",
    available: true,
    gender: "female",
    age: 21,
    experience: "2 years",
  },
  {
    id: 11,
    name: "Carlos Martinez",
    position: "Distance Runner",
    bestTime: "3:45.20",
    specialty: "1500m",
    available: true,
    gender: "male",
    age: 31,
    experience: "10 years",
  },
  {
    id: 12,
    name: "Amanda White",
    position: "Versatile Runner",
    bestTime: "24.85s",
    specialty: "200m",
    available: true,
    gender: "female",
    age: 26,
    experience: "6 years",
  },
  {
    id: 13,
    name: "Kevin Brown",
    position: "Sprint Specialist",
    bestTime: "10.20s",
    specialty: "100m Sprint",
    available: true,
    gender: "male",
    age: 24,
    experience: "4 years",
  },
  {
    id: 14,
    name: "Rachel Green",
    position: "Distance Runner",
    bestTime: "2:15.45",
    specialty: "800m",
    available: true,
    gender: "female",
    age: 25,
    experience: "5 years",
  },
  {
    id: 15,
    name: "Tom Anderson",
    position: "Versatile Runner",
    bestTime: "22.30s",
    specialty: "200m",
    available: true,
    gender: "male",
    age: 27,
    experience: "7 years",
  },
]

const teamTypes = [
  {
    id: "male",
    name: "Male Team",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    description: "All male runners (10 required)",
  },
  {
    id: "female",
    name: "Female Team",
    color: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    description: "All female runners (10 required)",
  },
  {
    id: "coed",
    name: "Coed Team",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    description: "Mixed gender team (min 3 of each gender)",
  },
]

// Runner Selection Modal Component
function RunnerSelectionModal({
  isOpen,
  onClose,
  teamTypeId,
  teamAssignments,
  onSelectRunner,
}: {
  isOpen: boolean
  onClose: () => void
  teamTypeId: string
  teamAssignments: Record<string, { runnerId: number; legs: number[] }[]>
  onSelectRunner: (runnerId: number) => void
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGender, setSelectedGender] = useState<string>("all")

  if (!isOpen) return null

  // Get already assigned runners across all teams
  const assignedRunners = Object.values(teamAssignments)
    .flat()
    .map((assignment) => assignment.runnerId)

  // Filter available runners
  let availableRunners = teamRoster.filter((runner) => !assignedRunners.includes(runner.id))

  // Apply gender filter for specific team types
  if (teamTypeId === "male") {
    availableRunners = availableRunners.filter((runner) => runner.gender === "male")
  } else if (teamTypeId === "female") {
    availableRunners = availableRunners.filter((runner) => runner.gender === "female")
  }

  // Apply search filter
  if (searchTerm) {
    availableRunners = availableRunners.filter(
      (runner) =>
        runner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        runner.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        runner.position.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Apply gender filter for coed teams
  if (teamTypeId === "coed" && selectedGender !== "all") {
    availableRunners = availableRunners.filter((runner) => runner.gender === selectedGender)
  }

  const teamType = teamTypes.find((t) => t.id === teamTypeId)

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-[#868684]/20 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#868684]/20">
          <div>
            <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-2">Select Runner</h2>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${teamType?.color}`}>
                {teamType?.name}
              </span>
              <span className="text-[#868684] text-sm">{teamAssignments[teamTypeId].length}/10 runners selected</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#868684] hover:text-[#EAEAE8] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-[#868684]/20">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#868684]" />
              <input
                type="text"
                placeholder="Search runners by name, specialty, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#868684]/10 border border-[#868684]/20 rounded-lg text-[#EAEAE8] placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8]/40"
              />
            </div>

            {/* Gender Filter for Coed Teams */}
            {teamTypeId === "coed" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedGender("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedGender === "all"
                      ? "bg-[#EAEAE8] text-black"
                      : "bg-[#868684]/20 text-[#868684] hover:text-[#EAEAE8]"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedGender("male")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedGender === "male"
                      ? "bg-blue-500 text-white"
                      : "bg-[#868684]/20 text-[#868684] hover:text-[#EAEAE8]"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setSelectedGender("female")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedGender === "female"
                      ? "bg-pink-500 text-white"
                      : "bg-[#868684]/20 text-[#868684] hover:text-[#EAEAE8]"
                  }`}
                >
                  Female
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Runners List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {availableRunners.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-[#868684] mx-auto mb-4" />
              <p className="text-[#868684] text-lg">No available runners found</p>
              <p className="text-[#868684] text-sm mt-2">
                {searchTerm ? "Try adjusting your search criteria" : "All eligible runners are already assigned"}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableRunners.map((runner) => (
                <div
                  key={runner.id}
                  className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-4 hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    onSelectRunner(runner.id)
                    onClose()
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#EAEAE8] mb-1 group-hover:text-white transition-colors">
                        {runner.name}
                      </h3>
                      <p className="text-[#868684] text-sm mb-2">{runner.position}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            runner.gender === "male"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              : "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                          }`}
                        >
                          {runner.gender}
                        </span>
                        <span className="text-[#868684] text-xs">Age {runner.age}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#EAEAE8] font-bold text-sm">{runner.bestTime}</div>
                      <div className="text-[#868684] text-xs">{runner.specialty}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-[#868684] text-xs">Experience: {runner.experience}</div>
                    <button className="bg-[#EAEAE8]/20 hover:bg-[#EAEAE8] text-[#EAEAE8] hover:text-black px-3 py-1 text-xs font-medium rounded transition-all duration-300 group-hover:scale-105">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#868684]/20 bg-[#868684]/5">
          <div className="flex items-center justify-between">
            <div className="text-[#868684] text-sm">
              {availableRunners.length} runners available • {teamAssignments[teamTypeId].length}/10 selected
            </div>
            <button
              onClick={onClose}
              className="bg-[#868684]/20 border border-[#868684]/30 text-[#EAEAE8] px-6 py-2 font-medium hover:bg-[#868684]/30 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RaceRegistrationPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedRace, setSelectedRace] = useState<number | null>(null)
  const [selectedTeamTypes, setSelectedTeamTypes] = useState<string[]>([])
  const [teamAssignments, setTeamAssignments] = useState<Record<string, { runnerId: number; legs: number[] }[]>>({
    male: [],
    female: [],
    coed: [],
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [runnerSelectionModal, setRunnerSelectionModal] = useState<{
    isOpen: boolean
    teamTypeId: string
  }>({
    isOpen: false,
    teamTypeId: "",
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const race = availableRaces.find((r) => r.id === selectedRace)

  const toggleTeamType = (teamTypeId: string) => {
    setSelectedTeamTypes((prev) =>
      prev.includes(teamTypeId) ? prev.filter((id) => id !== teamTypeId) : [...prev, teamTypeId],
    )
  }

  const assignRunnerToTeam = (runnerId: number, teamTypeId: string) => {
    setTeamAssignments((prev) => {
      const newAssignments = { ...prev }

      // Remove runner from all teams first
      Object.keys(newAssignments).forEach((teamId) => {
        newAssignments[teamId] = newAssignments[teamId].filter((assignment) => assignment.runnerId !== runnerId)
      })

      // Add runner to selected team with empty legs array
      if (newAssignments[teamTypeId].length < 10) {
        newAssignments[teamTypeId] = [...newAssignments[teamTypeId], { runnerId, legs: [] }]
      }

      return newAssignments
    })
  }

  const removeRunnerFromTeam = (runnerId: number, teamTypeId: string) => {
    setTeamAssignments((prev) => ({
      ...prev,
      [teamTypeId]: prev[teamTypeId].filter((assignment) => assignment.runnerId !== runnerId),
    }))
  }

  const updateRunnerLegs = (runnerId: number, teamTypeId: string, legs: number[]) => {
    setTeamAssignments((prev) => ({
      ...prev,
      [teamTypeId]: prev[teamTypeId].map((assignment) =>
        assignment.runnerId === runnerId ? { ...assignment, legs } : assignment,
      ),
    }))
  }

  const getTotalCost = () => {
    return race ? selectedTeamTypes.length * race.entryFee : 0
  }

  const validateTeamComposition = (teamTypeId: string) => {
    const team = teamAssignments[teamTypeId]
    if (team.length !== 10) return { valid: false, message: `Need 10 runners (${team.length}/10)` }

    // Check if all legs are assigned
    const assignedLegs = team.flatMap((assignment) => assignment.legs)
    const allLegs = Array.from({ length: 30 }, (_, i) => i + 1)
    const missingLegs = allLegs.filter((leg) => !assignedLegs.includes(leg))

    if (missingLegs.length > 0) {
      return {
        valid: false,
        message: `Missing leg assignments: ${missingLegs.slice(0, 5).join(", ")}${missingLegs.length > 5 ? "..." : ""}`,
      }
    }

    if (teamTypeId === "coed") {
      const maleCount = team.filter(
        (assignment) => teamRoster.find((r) => r.id === assignment.runnerId)?.gender === "male",
      ).length
      const femaleCount = team.filter(
        (assignment) => teamRoster.find((r) => r.id === assignment.runnerId)?.gender === "female",
      ).length
      if (maleCount < 3) return { valid: false, message: "Need at least 3 male runners" }
      if (femaleCount < 3) return { valid: false, message: "Need at least 3 female runners" }
    }

    return { valid: true, message: "Team complete" }
  }

  const canProceedToPayment = () => {
    return selectedTeamTypes.every((teamTypeId) => validateTeamComposition(teamTypeId).valid)
  }

  const handleRegistration = () => {
    console.log("Registering for race:", {
      raceId: selectedRace,
      teamTypes: selectedTeamTypes,
      assignments: teamAssignments,
      totalCost: getTotalCost(),
    })
  }

  const generateLegOptions = (currentLegs: number[], runnerId: number, teamTypeId: string) => {
    // Get all assigned legs for this team except for current runner
    const otherAssignedLegs = teamAssignments[teamTypeId]
      .filter((assignment) => assignment.runnerId !== runnerId)
      .flatMap((assignment) => assignment.legs)

    // Generate available legs (1-30)
    const allLegs = Array.from({ length: 30 }, (_, i) => i + 1)
    const availableLegs = allLegs.filter((leg) => !otherAssignedLegs.includes(leg))

    return availableLegs
  }

  const openRunnerSelection = (teamTypeId: string) => {
    setRunnerSelectionModal({ isOpen: true, teamTypeId })
  }

  const closeRunnerSelection = () => {
    setRunnerSelectionModal({ isOpen: false, teamTypeId: "" })
  }

  if (currentStep === 1) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/manager/races" className="p-2 text-[#868684] hover:text-[#EAEAE8] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Race Registration</h1>
            <p className="text-[#868684]">Select a 30-leg relay race to register your teams</p>
          </div>
        </div>

        {/* Available Races */}
        <div className="grid gap-6">
          {availableRaces.map((race, index) => (
            <div
              key={race.id}
              className={`bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6 hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-300 cursor-pointer ${
                selectedRace === race.id ? "border-[#EAEAE8] bg-[#868684]/10" : ""
              } ${isLoaded ? `opacity-100 translate-y-0 delay-${index * 100}` : "opacity-0 translate-y-4"}`}
              onClick={() => setSelectedRace(race.id)}
            >
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Race Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="heading-font text-xl font-bold text-[#EAEAE8] mb-2">{race.name}</h3>
                      <p className="text-[#868684] mb-4">{race.description}</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-[#EAEAE8]">
                          <Calendar className="w-4 h-4 text-[#868684]" />
                          <span>{race.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[#EAEAE8]">
                          <Clock className="w-4 h-4 text-[#868684]" />
                          <span>{race.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[#EAEAE8]">
                          <MapPin className="w-4 h-4 text-[#868684]" />
                          <span>{race.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[#EAEAE8]">
                          <Target className="w-4 h-4 text-[#868684]" />
                          <span>
                            {race.legs} legs • {race.runnersPerTeam} runners per team
                          </span>
                        </div>
                      </div>

                      {/* Race Format */}
                      <div className="mb-4 p-4 bg-[#868684]/10 border border-[#868684]/20 rounded-lg">
                        <h4 className="text-[#EAEAE8] font-bold mb-2 flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>Race Format</span>
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-[#868684]">
                          <div>• {race.legs} total legs</div>
                          <div>• {race.runnersPerTeam} runners per team</div>
                          <div>• Each runner runs 3 legs</div>
                          <div>• Legs assigned: 1,11,21 or 2,12,22 etc.</div>
                        </div>
                      </div>

                      {/* Allowed Team Types */}
                      <div className="mb-4">
                        <h4 className="text-[#EAEAE8] font-bold mb-2">Allowed Team Types:</h4>
                        <div className="flex flex-wrap gap-2">
                          {race.allowedTeamTypes.map((type) => {
                            const teamType = teamTypes.find((t) => t.id === type)
                            return (
                              <span
                                key={type}
                                className={`px-3 py-1 text-xs font-medium rounded-full border ${teamType?.color}`}
                              >
                                {teamType?.name}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                        <DollarSign className="w-5 h-5" />
                        <span className="heading-font text-2xl font-bold">{race.entryFee}</span>
                        <span className="text-[#868684] text-sm">per team</span>
                      </div>
                      <div className="text-[#868684] text-sm">Max {race.maxTeams} teams</div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="text-[#EAEAE8] font-bold mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {race.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-[#868684] text-sm">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Prizes */}
                <div className="bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-4">
                  <h4 className="text-[#EAEAE8] font-bold mb-3 flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>Prizes</span>
                  </h4>
                  <div className="space-y-2">
                    {race.prizes.map((prize, idx) => (
                      <div key={idx} className="text-[#868684] text-sm">
                        {prize}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedRace === race.id && (
                <div className="mt-6 pt-6 border-t border-[#868684]/20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentStep(2)
                    }}
                    className="bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                  >
                    <span>Continue Registration</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button onClick={() => setCurrentStep(1)} className="p-2 text-[#868684] hover:text-[#EAEAE8] transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Team Configuration</h1>
          <p className="text-[#868684]">Create teams and assign legs for {race?.name}</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#EAEAE8] text-black rounded-full flex items-center justify-center font-bold">
            ✓
          </div>
          <span className="text-[#EAEAE8] font-medium">Select Race</span>
        </div>
        <div className="w-12 h-0.5 bg-[#EAEAE8]" />
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#EAEAE8] text-black rounded-full flex items-center justify-center font-bold">
            2
          </div>
          <span className="text-[#EAEAE8] font-medium">Team Configuration</span>
        </div>
        <div className="w-12 h-0.5 bg-[#868684]/30" />
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#868684]/30 text-[#868684] rounded-full flex items-center justify-center font-bold">
            3
          </div>
          <span className="text-[#868684]">Payment</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Team Type Selection */}
        <div className="lg:col-span-1">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
            <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-4">Select Team Types</h2>
            <div className="space-y-3">
              {teamTypes
                .filter((teamType) => race?.allowedTeamTypes.includes(teamType.id))
                .map((teamType) => (
                  <label key={teamType.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTeamTypes.includes(teamType.id)}
                      onChange={() => toggleTeamType(teamType.id)}
                      className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8] mt-1"
                    />
                    <div>
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${teamType.color} block mb-1`}
                      >
                        {teamType.name}
                      </span>
                      <span className="text-[#868684] text-xs">{teamType.description}</span>
                    </div>
                  </label>
                ))}
            </div>

            {/* Cost Summary */}
            <div className="mt-6 pt-6 border-t border-[#868684]/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#868684]">Teams Selected:</span>
                <span className="text-[#EAEAE8] font-bold">{selectedTeamTypes.length}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#868684]">Cost per Team:</span>
                <span className="text-[#EAEAE8] font-bold">${race?.entryFee}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-[#EAEAE8] font-bold">Total Cost:</span>
                <span className="text-yellow-400 font-bold">${getTotalCost()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Configuration */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {selectedTeamTypes.map((teamTypeId) => {
              const teamType = teamTypes.find((t) => t.id === teamTypeId)
              const teamAssignment = teamAssignments[teamTypeId]
              const validation = validateTeamComposition(teamTypeId)

              return (
                <div key={teamTypeId} className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="heading-font text-xl font-bold text-[#EAEAE8] flex items-center space-x-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${teamType?.color}`}>
                        {teamType?.name}
                      </span>
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#868684] text-sm">{teamAssignment.length}/10 runners</span>
                      {validation.valid ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                  </div>

                  {!validation.valid && (
                    <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <p className="text-yellow-400 text-sm">{validation.message}</p>
                    </div>
                  )}

                  {/* Add Runner Button */}
                  {teamAssignment.length < 10 && (
                    <div className="mb-6">
                      <button
                        onClick={() => openRunnerSelection(teamTypeId)}
                        className="bg-[#EAEAE8]/20 hover:bg-[#EAEAE8]/30 border border-[#EAEAE8]/30 hover:border-[#EAEAE8]/50 text-[#EAEAE8] px-4 py-2 font-medium transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Runner from Complete Roster</span>
                      </button>
                    </div>
                  )}

                  {/* Assigned Runners */}
                  <div className="space-y-4 mb-6">
                    {teamAssignment.map((assignment, index) => {
                      const runner = teamRoster.find((r) => r.id === assignment.runnerId)
                      const availableLegs = generateLegOptions(assignment.legs, assignment.runnerId, teamTypeId)

                      return (
                        <div
                          key={assignment.runnerId}
                          className="bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-bold text-[#EAEAE8]">{runner?.name}</div>
                              <div className="text-[#868684] text-sm">
                                {runner?.specialty} • {runner?.bestTime} • {runner?.gender}
                              </div>
                            </div>
                            <button
                              onClick={() => removeRunnerFromTeam(assignment.runnerId, teamTypeId)}
                              className="text-red-400 hover:text-red-300 text-sm transition-colors"
                            >
                              Remove
                            </button>
                          </div>

                          {/* Leg Assignment */}
                          <div>
                            <div className="text-[#EAEAE8] text-sm font-medium mb-2">
                              Assigned Legs ({assignment.legs.length}/3):
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {assignment.legs.map((leg) => (
                                <span
                                  key={leg}
                                  className="px-2 py-1 bg-[#EAEAE8]/20 text-[#EAEAE8] text-xs rounded border border-[#EAEAE8]/30"
                                >
                                  Leg {leg}
                                </span>
                              ))}
                            </div>

                            {assignment.legs.length < 3 && (
                              <div>
                                <div className="text-[#868684] text-xs mb-2">Available legs:</div>
                                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                                  {availableLegs.map((leg) => (
                                    <button
                                      key={leg}
                                      onClick={() => {
                                        const newLegs = [...assignment.legs, leg].sort((a, b) => a - b)
                                        updateRunnerLegs(assignment.runnerId, teamTypeId, newLegs)
                                      }}
                                      className="px-2 py-1 bg-[#868684]/20 hover:bg-[#868684]/30 text-[#868684] hover:text-[#EAEAE8] text-xs rounded transition-colors"
                                    >
                                      {leg}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          {selectedTeamTypes.length > 0 && (
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-[#868684]/20 border border-[#868684]/30 text-[#EAEAE8] px-6 py-3 font-medium hover:bg-[#868684]/30 transition-all duration-300"
              >
                Back to Race Selection
              </button>
              <button
                onClick={handleRegistration}
                disabled={!canProceedToPayment()}
                className={`px-8 py-3 font-bold transition-all duration-300 flex items-center space-x-2 ${
                  canProceedToPayment()
                    ? "bg-[#EAEAE8] text-black hover:bg-white hover:scale-105"
                    : "bg-[#868684]/20 text-[#868684] cursor-not-allowed"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Proceed to Payment (${getTotalCost()})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Runner Selection Modal */}
      <RunnerSelectionModal
        isOpen={runnerSelectionModal.isOpen}
        onClose={closeRunnerSelection}
        teamTypeId={runnerSelectionModal.teamTypeId}
        teamAssignments={teamAssignments}
        onSelectRunner={(runnerId) => assignRunnerToTeam(runnerId, runnerSelectionModal.teamTypeId)}
      />
    </div>
  )
}
