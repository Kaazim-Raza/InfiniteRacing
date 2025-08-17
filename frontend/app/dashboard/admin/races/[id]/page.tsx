"use client"

import type React from "react"
// import api from "../../../lib/axios"
import api from "../../../../lib/axios";
import { useState, useEffect } from "react"
import { Calendar, Users, Clock, Save, Eye, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
// import { useRouter } from "next/router";
import { useParams , useRouter } from "next/navigation";

interface RaceFormData {
  name: string
  description: string
  date: string
  time: string
  location: string
  maxTeams: string
  registrationDeadline: string
  entryFee: string
  allowMale: boolean
  allowFemale: boolean
  allowCoed: boolean
  maxRunnersPerTeam: string
  minMaleRunners: string
  minFemaleRunners: string
  highSchoolOnly: boolean
}

export default function CreateRacePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const params = useParams();
  const raceId = params?.id && params.id !== "create" ? params.id : null
  const router = useRouter();
  const [formData, setFormData] = useState<RaceFormData>({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxTeams: "",
    registrationDeadline: "",
    entryFee: "",
    allowMale: true,
    allowFemale: true,
    allowCoed: true,
    maxRunnersPerTeam: "4",
    minMaleRunners: "0",
    minFemaleRunners: "0",
    highSchoolOnly: false,
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  // const router = useRouter();

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const steps = [
    { id: 1, title: "Event Details", icon: Calendar },
    { id: 2, title: "Team Rules", icon: Users },
    { id: 3, title: "Registration", icon: Clock },
    { id: 4, title: "Review", icon: Eye },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  useEffect(() => {
    // Assume you get the raceId from the URL params (e.g., using next/router or next/navigation)
    // For example, if using next/navigation:
    // import { useParams } from "next/navigation";
    // const params = useParams();
    // const raceId = params?.id;

    // Replace this with your actual way of getting the raceId
    // const url = window.location.pathname;
    // const match = url.match(/\/races\/edit\/(\d+)/);
    // const raceId = match ? match[1] : null;

    if (raceId) {
      api.get(`/admin/races/${raceId}/`)
        .then((res) => {
          const data = res.data;
          setFormData({
            name: data.name || "",
            description: data.description || "",
            date: data.date ? data.date.slice(0, 10) : "",
            time: data.time || "",
            location: data.location || "",
            maxTeams: data.max_teams ? String(data.max_teams) : "",
            registrationDeadline: data.registration_deadline
              ? new Date(data.registration_deadline).toISOString().slice(0, 16)
              : "",
            entryFee: data.entry_fee ? String(data.entry_fee) : "",
            allowMale: data.team_type === "male" || data.team_type === "coed",
            allowFemale: data.team_type === "female" || data.team_type === "coed",
            allowCoed: data.team_type === "coed",
            maxRunnersPerTeam: data.max_runners ? String(data.max_runners) : "4",
            minMaleRunners: data.coed_min_male ? String(data.coed_min_male) : "0",
            minFemaleRunners: data.coed_min_female ? String(data.coed_min_female) : "0",
            highSchoolOnly: !!data.high_school_only,
          });
        })
        .catch((err) => {
          console.error("Failed to fetch race data", err);
        });
    }
  }, []);

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.name) errors.name = "Race name is required"
        if (!formData.date) errors.date = "Date is required"
        if (!formData.time) errors.time = "Time is required"
        if (!formData.location) errors.location = "Location is required"
        break
      case 2:
        if (!formData.maxRunnersPerTeam) errors.maxRunnersPerTeam = "Max runners per team is required"
        if (!formData.allowMale && !formData.allowFemale && !formData.allowCoed) {
          errors.teamTypes = "At least one team type must be allowed"
        }
        break
      case 3:
        if (!formData.registrationDeadline) errors.registrationDeadline = "Registration deadline is required"
        if (!formData.maxTeams) errors.maxTeams = "Maximum teams is required"
        break
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  // const handleSubmit = () => {
  //   if (validateStep(3)) {
  //     console.log("Creating race:", formData)
  //     // Handle race creation
  //   }
  // }

    const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
    name: formData.name,
    description: formData.description,
    date: formData.date, // assuming it's in YYYY-MM-DD
    time: formData.time, // assuming it's in HH:MM
    location: formData.location,
    high_school_only: formData.highSchoolOnly,

    team_type: formData.allowCoed
      ? "coed"
      : formData.allowMale
      ? "male"
      : "female",

    coed_min_male: parseInt(formData.minMaleRunners),
    coed_min_female: parseInt(formData.minFemaleRunners),
    max_runners: parseInt(formData.maxRunnersPerTeam),

    registration_deadline: new Date(formData.registrationDeadline).toISOString(),
    entry_fee: parseFloat(formData.entryFee),
};
if (raceId){
  const res = await api.put(`/admin/races/${raceId} `,payload);
  // if (res.status === 200) {
    alert("Update Successful")
    router.push("/dashboard/admin/races")
}else {
      await api.post("/admin/races/", payload);
      alert("Race created successfully!");
       router.push("/dashboard/admin/races")
    }
      // router.push("/races");
    } catch (err: any) {
      console.error(err);
      alert("Failed to create race");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/admin/races" className="p-2 text-[#868684] hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="heading-font text-3xl font-bold text-[#EAEAE8]">Create New Race</h1>
            <p className="text-[#868684]">Set up a new relay race event</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.id ? "bg-[#EAEAE8] border-[#EAEAE8] text-black" : "border-[#868684] text-[#868684]"
              }`}
            >
              {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
            </div>
            <div className="ml-3 hidden sm:block">
              <p className={`text-sm font-medium ${currentStep >= step.id ? "text-[#EAEAE8]" : "text-[#868684]"}`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-4 transition-colors duration-300 ${
                  currentStep > step.id ? "bg-[#EAEAE8]" : "bg-[#868684]/30"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-8">
        {/* Step 1: Event Details */}
        {currentStep === 1 && (
          <div
            className={`space-y-6 transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Event Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Race Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-2 px-4 py-3 text-white placeholder-[#868684] focus:outline-none transition-all duration-300 ${
                    validationErrors.name
                      ? "border-red-500 focus:border-red-400"
                      : "border-[#868684]/30 focus:border-[#EAEAE8]"
                  }`}
                  placeholder="Enter race name"
                />
                {validationErrors.name && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-2 px-4 py-3 text-white placeholder-[#868684] focus:outline-none transition-all duration-300 ${
                    validationErrors.location
                      ? "border-red-500 focus:border-red-400"
                      : "border-[#868684]/30 focus:border-[#EAEAE8]"
                  }`}
                  placeholder="Enter race location"
                />
                {validationErrors.location && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.location}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-2 px-4 py-3 text-white focus:outline-none transition-all duration-300 ${
                    validationErrors.date
                      ? "border-red-500 focus:border-red-400"
                      : "border-[#868684]/30 focus:border-[#EAEAE8]"
                  }`}
                />
                {validationErrors.date && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-2 px-4 py-3 text-white focus:outline-none transition-all duration-300 ${
                    validationErrors.time
                      ? "border-red-500 focus:border-red-400"
                      : "border-[#868684]/30 focus:border-[#EAEAE8]"
                  }`}
                />
                {validationErrors.time && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.time}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 resize-none"
                placeholder="Enter race description (optional)"
              />
            </div>
          </div>
        )}

        {/* Step 2: Team Rules */}
        {currentStep === 2 && (
          <div
            className={`space-y-6 transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Team Rules</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Max Runners Per Team *</label>
                <input
                  type="number"
                  name="maxRunnersPerTeam"
                  value={formData.maxRunnersPerTeam}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className={`w-full bg-transparent border-2 px-4 py-3 text-white placeholder-[#868684] focus:outline-none transition-all duration-300 ${
                    validationErrors.maxRunnersPerTeam
                      ? "border-red-500 focus:border-red-400"
                      : "border-[#868684]/30 focus:border-[#EAEAE8]"
                  }`}
                  placeholder="4"
                />
                {validationErrors.maxRunnersPerTeam && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.maxRunnersPerTeam}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4 pt-8">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="highSchoolOnly"
                    checked={formData.highSchoolOnly}
                    onChange={handleInputChange}
                    className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
                  />
                  <span className="text-[#EAEAE8] font-medium">High School Only</span>
                </label>
              </div>
            </div>

            {/* Team Type Toggles */}
            <div>
              <label className="block text-sm font-medium text-[#EAEAE8] mb-4">Allowed Team Types *</label>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { key: "allowMale", label: "Male Teams", color: "blue" },
                  { key: "allowFemale", label: "Female Teams", color: "pink" },
                  { key: "allowCoed", label: "Coed Teams", color: "purple" },
                ].map((teamType) => (
                  <label
                    key={teamType.key}
                    className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      (formData[teamType.key as keyof RaceFormData] as boolean)
                        ? `border-[#EAEAE8] bg-[#EAEAE8]/10`
                        : "border-[#868684]/30 hover:border-[#868684]/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name={teamType.key}
                      checked={formData[teamType.key as keyof RaceFormData] as boolean}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span
                      className={`font-medium transition-colors ${
                        (formData[teamType.key as keyof RaceFormData] as boolean) ? "text-[#EAEAE8]" : "text-[#868684]"
                      }`}
                    >
                      {teamType.label}
                    </span>
                    {(formData[teamType.key as keyof RaceFormData] as boolean) && (
                      <CheckCircle className="w-5 h-5 text-[#EAEAE8] ml-2" />
                    )}
                  </label>
                ))}
              </div>
              {validationErrors.teamTypes && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.teamTypes}
                </p>
              )}
            </div>

            {/* Gender Requirements for Coed */}
            {formData.allowCoed && (
              <div className="bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#EAEAE8] mb-4">Coed Team Requirements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Minimum Male Runners</label>
                    <input
                      type="number"
                      name="minMaleRunners"
                      value={formData.minMaleRunners}
                      onChange={handleInputChange}
                      min="0"
                      max={formData.maxRunnersPerTeam}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-all duration-300"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Minimum Female Runners</label>
                    <input
                      type="number"
                      name="minFemaleRunners"
                      value={formData.minFemaleRunners}
                      onChange={handleInputChange}
                      min="0"
                      max={formData.maxRunnersPerTeam}
                      className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-all duration-300"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Registration */}
        {currentStep === 3 && (
          <div
            className={`space-y-6 transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Registration Settings</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Registration Deadline *</label>
                <input
                  type="datetime-local"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-2 px-4 py-3 text-white focus:outline-none transition-all duration-300 ${
                    validationErrors.registrationDeadline
                      ? "border-red-500 focus:border-red-400"
                      : "border-[#868684]/30 focus:border-[#EAEAE8]"
                  }`}
                />
                {validationErrors.registrationDeadline && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.registrationDeadline}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Maximum Teams *</label>
                <input
                  type="number"
                  name="maxTeams"
                  value={formData.maxTeams}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full bg-transparent border-2 px-4 py-3 text-white placeholder-[#868684] focus:outline-none transition-all duration-300 ${
                    validationErrors.maxTeams
                      ? "border-red-500 focus:border-red-400"
                      : "border-[#868684]/30 focus:border-[#EAEAE8]"
                  }`}
                  placeholder="Enter maximum number of teams"
                />
                {validationErrors.maxTeams && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {validationErrors.maxTeams}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#EAEAE8] mb-2">Entry Fee (USD)</label>
                <input
                  type="number"
                  name="entryFee"
                  value={formData.entryFee}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-all duration-300"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div
            className={`space-y-6 transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <h2 className="heading-font text-2xl font-bold text-[#EAEAE8] mb-6">Review & Create</h2>

            <div className="bg-[#868684]/10 border border-[#868684]/20 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#EAEAE8] mb-4">Race Summary</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-[#868684] mb-1">Race Name</p>
                  <p className="text-white font-medium">{formData.name || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-[#868684] mb-1">Location</p>
                  <p className="text-white font-medium">{formData.location || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-[#868684] mb-1">Date & Time</p>
                  <p className="text-white font-medium">
                    {formData.date && formData.time ? `${formData.date} at ${formData.time}` : "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-[#868684] mb-1">Max Teams</p>
                  <p className="text-white font-medium">{formData.maxTeams || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-[#868684] mb-1">Runners Per Team</p>
                  <p className="text-white font-medium">{formData.maxRunnersPerTeam}</p>
                </div>
                <div>
                  <p className="text-[#868684] mb-1">Entry Fee</p>
                  <p className="text-white font-medium">{formData.entryFee ? `$${formData.entryFee}` : "Free"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 font-bold transition-all duration-300 ${
            currentStep === 1 ? "text-[#868684] cursor-not-allowed" : "text-[#EAEAE8] hover:text-white"
          }`}
        >
          Previous
        </button>

        <div className="flex items-center space-x-4">
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="bg-[#EAEAE8] text-black px-8 py-3 font-bold hover:bg-white transition-all duration-300 hover:scale-105"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-8 py-3 font-bold hover:bg-green-400 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />

                <span>{raceId ? "Update Race" : "Create Race"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
