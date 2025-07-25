"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    // Reset form or show success message
    alert("Message sent successfully!")
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`heading-font text-4xl md:text-6xl font-black mb-6 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            GET IN <span className="text-[#EAEAE8]">TOUCH</span>
          </h1>
          <p
            className={`text-lg md:text-xl text-[#868684] max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Ready to join the future of racing? Contact us and let's accelerate together.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    required
                    className={`w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 ${
                      focusedField === "firstName" ? "border-[#EAEAE8] scale-105" : ""
                    }`}
                    placeholder="First Name"
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <label
                    htmlFor="firstName"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === "firstName"
                        ? "-top-2 text-xs text-[#EAEAE8] bg-black px-2"
                        : "top-3 text-[#868684]"
                    }`}
                  >
                    First Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    required
                    className={`w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 ${
                      focusedField === "lastName" ? "border-[#EAEAE8] scale-105" : ""
                    }`}
                    placeholder="Last Name"
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <label
                    htmlFor="lastName"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === "lastName"
                        ? "-top-2 text-xs text-[#EAEAE8] bg-black px-2"
                        : "top-3 text-[#868684]"
                    }`}
                  >
                    Last Name
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  className={`w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 ${
                    focusedField === "email" ? "border-[#EAEAE8] scale-105" : ""
                  }`}
                  placeholder="Email"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === "email" ? "-top-2 text-xs text-[#EAEAE8] bg-black px-2" : "top-3 text-[#868684]"
                  }`}
                >
                  Email Address
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  rows={6}
                  required
                  className={`w-full bg-transparent border-2 border-[#868684]/30 px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#EAEAE8] transition-all duration-300 resize-none ${
                    focusedField === "message" ? "border-[#EAEAE8] scale-105" : ""
                  }`}
                  placeholder="Message"
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === "message" ? "-top-2 text-xs text-[#EAEAE8] bg-black px-2" : "top-3 text-[#868684]"
                  }`}
                >
                  Your Message
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-white text-black py-4 font-bold text-lg hover:bg-[#EAEAE8] transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-700 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div>
              <h2 className="heading-font text-2xl font-bold mb-6">CONTACT INFO</h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "contact@infiniteracing.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: MapPin, label: "Location", value: "Neo Tokyo, Cyber District" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 bg-[#868684]/10 border border-[#868684]/20 rounded-lg flex items-center justify-center group-hover:bg-[#EAEAE8]/10 group-hover:border-[#EAEAE8]/40 transition-all duration-300">
                      <contact.icon className="w-6 h-6 text-[#EAEAE8]" />
                    </div>
                    <div>
                      <div className="text-[#868684] text-sm">{contact.label}</div>
                      <div className="text-white font-medium">{contact.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#868684]/5 border border-[#868684]/20 p-8 hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-500">
              <h3 className="heading-font text-xl font-bold mb-4">SUPPORT HOURS</h3>
              <div className="space-y-2 text-[#868684]">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
