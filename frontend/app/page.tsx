"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ChevronRight, Zap, Users, Trophy, Calendar, Target, Timer } from "lucide-react"

// Custom hook for animated counters
function useCountUp(end: number, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!shouldStart || hasStarted) return

    setHasStarted(true)
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (end - startValue) * easeOutQuart

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, shouldStart, hasStarted])

  return count
}

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)
  const [whyUsVisible, setWhyUsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const whyUsRef = useRef<HTMLDivElement>(null)

  const events = [
    { title: "Cyber Sprint Relay Championship", date: "March 15, 2024", status: "Registration Open", teams: 64 },
    { title: "Quantum Relay Masters", date: "March 22, 2024", status: "Coming Soon", teams: 32 },
    { title: "Digital Relay Grand Prix", date: "April 5, 2024", status: "Early Bird", teams: 128 },
  ]

  const statsData = [
    { end: 2500, label: "Active Relay Runners", icon: Users, suffix: "+" },
    { end: 625, label: "Relay Teams", icon: Trophy, suffix: "+" },
    { end: 150, label: "Relay Events", icon: Calendar, suffix: "+" },
    { end: 98.5, label: "Handoff Success Rate", icon: Zap, suffix: "%", decimal: true },
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [events.length])

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.1 }, // Lower threshold for better triggering
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Intersection Observer for Why Us section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWhyUsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (whyUsRef.current) {
      observer.observe(whyUsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 noise-bg opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#868684]/5 to-black" />

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1
            className={`heading-font text-4xl md:text-6xl lg:text-8xl font-black mb-6 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <span className="glitch-effect" data-text="INFINITE">
              INFINITE
            </span>
            <br />
            <span className="text-[#EAEAE8]">RELAY LEAGUE</span>
          </h1>

          <p
            className={`text-lg md:text-xl text-[#868684] mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            The ultimate platform for relay racing management. Build your team, coordinate handoffs, and dominate the
            track in the most advanced relay racing league ever created.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/signup/manager"
              className="group bg-white text-black px-8 py-4 font-bold text-lg hover:bg-[#EAEAE8] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
            >
              REGISTER AS TEAM MANAGER
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/signup/runner"
              className="group border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
            >
              REGISTER AS RELAY RUNNER
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#EAEAE8] rounded-full animate-pulse opacity-40 animation-delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-50 animation-delay-2000" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-font text-3xl md:text-5xl font-bold text-center mb-16">
            BUILT FOR <span className="text-[#EAEAE8]">RELAY CHAMPIONS</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Team Coordination",
                desc: "Advanced tools for managing relay teams, scheduling handoff practice, and optimizing runner positions",
              },
              {
                icon: Timer,
                title: "Split Time Analysis",
                desc: "Real-time tracking of individual leg times, handoff efficiency, and overall relay performance",
              },
              {
                icon: Target,
                title: "Handoff Mastery",
                desc: "Specialized training modules and analytics to perfect the critical relay handoff technique",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-[#868684]/5 border border-[#868684]/20 p-8 hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-500 transform hover:-translate-y-2"
              >
                <feature.icon className="w-12 h-12 text-[#EAEAE8] mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                <h3 className="heading-font text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-[#868684] group-hover:text-white transition-colors duration-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relay Stats Section */}
      <section ref={statsRef} className="py-20 px-4 bg-[#868684]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-font text-3xl md:text-5xl font-bold text-center mb-16">
            RELAY <span className="text-[#EAEAE8]">PERFORMANCE</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {statsData.map((stat, index) => {
              const count = useCountUp(stat.end, 2000 + index * 300, statsVisible)

              let displayValue
              if (stat.decimal) {
                displayValue = count.toFixed(1)
              } else {
                displayValue = Math.floor(count).toLocaleString()
              }

              return (
                <div key={index} className="group">
                  <div className="w-16 h-16 bg-[#EAEAE8]/10 border border-[#EAEAE8]/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#EAEAE8]/20 group-hover:border-[#EAEAE8]/40 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-[#EAEAE8]" />
                  </div>
                  <div className="heading-font text-3xl md:text-4xl font-black text-[#EAEAE8] mb-2 group-hover:scale-110 transition-transform duration-300">
                    {displayValue}
                    {stat.suffix}
                  </div>
                  <div className="text-[#868684] text-sm font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Relay With Us Section */}
      <section ref={whyUsRef} className="relative py-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#868684]/10 to-black" />
        <div className="absolute inset-0 noise-bg opacity-5" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-center min-h-[600px]">
            {/* Point 01 - Top Left */}
            <div
              className={`lg:col-span-2 transition-all duration-1000 ${
                whyUsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="mb-8">
                <div className="flex items-baseline mb-4">
                  <span className="heading-font text-6xl md:text-7xl font-black text-white mr-4">01.</span>
                  <h3 className="heading-font text-2xl md:text-3xl font-bold text-[#EAEAE8]">Be Precise</h3>
                </div>
                <p className="text-[#868684] leading-relaxed">
                  Master the art of relay handoffs with our precision training modules. Every millisecond counts in the
                  exchange zone, and we'll help you perfect your technique for flawless baton transfers.
                </p>
              </div>
            </div>

            {/* Central Image and Text */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center relative">
              {/* Large Background Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="heading-font text-6xl md:text-8xl lg:text-9xl font-black text-white/10 leading-none text-center transform -rotate-12">
                  WHY
                  <br />
                  RELAY
                  <br />
                  WITH
                  <br />
                  US?
                </div>
              </div>

              {/* Runner Image */}
              <div
                className={`relative z-10 transition-all duration-1000 delay-500 ${
                  whyUsVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt="Relay runner in action"
                  className="w-64 h-80 md:w-80 md:h-96 object-cover rounded-lg shadow-2xl"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#EAEAE8]/20 rounded-lg blur-xl -z-10 scale-110" />
              </div>
            </div>

            {/* Point 02 - Bottom Left */}
            <div
              className={`lg:col-span-2 lg:row-start-2 transition-all duration-1000 delay-200 ${
                whyUsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="mb-8">
                <div className="flex items-baseline mb-4">
                  <span className="heading-font text-6xl md:text-7xl font-black text-white mr-4">02.</span>
                  <h3 className="heading-font text-2xl md:text-3xl font-bold text-[#EAEAE8]">Be United</h3>
                </div>
                <p className="text-[#868684] leading-relaxed">
                  Join a community of elite relay teams and runners. Connect with teammates, share strategies, and build
                  the chemistry that transforms four individual runners into one unstoppable relay machine.
                </p>
              </div>
            </div>

            {/* Point 03 - Top Right */}
            <div
              className={`lg:col-span-2 lg:col-start-4 lg:row-start-1 transition-all duration-1000 delay-400 ${
                whyUsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="mb-8 text-right">
                <div className="flex items-baseline justify-end mb-4">
                  <h3 className="heading-font text-2xl md:text-3xl font-bold text-[#EAEAE8] mr-4">Be Dominant</h3>
                  <span className="heading-font text-6xl md:text-7xl font-black text-white">03.</span>
                </div>
                <p className="text-[#868684] leading-relaxed">
                  Leverage advanced analytics and performance tracking to dominate the competition. Our platform
                  provides real-time insights into split times, handoff efficiency, and team coordination metrics.
                </p>
              </div>
            </div>

            {/* Point 04 - Bottom Right */}
            <div
              className={`lg:col-span-2 lg:col-start-4 lg:row-start-2 transition-all duration-1000 delay-600 ${
                whyUsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="mb-8 text-right">
                <div className="flex items-baseline justify-end mb-4">
                  <h3 className="heading-font text-2xl md:text-3xl font-bold text-[#EAEAE8] mr-4">Be Lightning</h3>
                  <span className="heading-font text-6xl md:text-7xl font-black text-white">04.</span>
                </div>
                <p className="text-[#868684] leading-relaxed">
                  Experience the thrill of relay racing at its fastest. Our training programs and race strategies are
                  designed to shave precious seconds off your team's time and propel you to victory.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-[#EAEAE8]/10 rounded-full" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-[#EAEAE8]/10 rounded-full" />
      </section>

      {/* Featured Challenges Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=400&width=1200"
            alt="Relay track background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 noise-bg opacity-5" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Large Quote-like Numbers */}
          <div className="absolute -top-8 left-4 md:left-8 text-[#EAEAE8]/20 text-8xl md:text-9xl heading-font font-black select-none pointer-events-none">
            99
          </div>

          <div className="pt-16">
            <h2 className="heading-font text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
              HERE ARE SOME OF OUR RECENT
              <br />
              <span className="text-[#EAEAE8]">RELAY CHALLENGES.</span>
              <br />
              PLEASE FEEL FREE TO
              <br />
              <span className="text-[#EAEAE8]">LOOK THEM UP.</span>
            </h2>

            {/* Challenge Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 mt-16">
              {[
                {
                  title: "4x100m Speed Demon",
                  description: "Sub-40 second relay challenge",
                  difficulty: "ELITE",
                  participants: "24 Teams",
                },
                {
                  title: "Perfect Handoff Challenge",
                  description: "Zero drop relay mastery",
                  difficulty: "ADVANCED",
                  participants: "48 Teams",
                },
                {
                  title: "Mixed Relay Madness",
                  description: "4x400m coordination test",
                  difficulty: "PROFESSIONAL",
                  participants: "16 Teams",
                },
              ].map((challenge, index) => (
                <div
                  key={index}
                  className="bg-[#868684]/10 border border-[#868684]/30 backdrop-blur-sm p-6 hover:bg-[#EAEAE8]/10 hover:border-[#EAEAE8]/50 transition-all duration-500 transform hover:-translate-y-2 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        challenge.difficulty === "ELITE"
                          ? "bg-red-500/20 text-red-300 border border-red-500/30"
                          : challenge.difficulty === "ADVANCED"
                            ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                            : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {challenge.difficulty}
                    </span>
                    <Target className="w-5 h-5 text-[#EAEAE8] group-hover:rotate-12 transition-transform duration-300" />
                  </div>

                  <h3 className="heading-font text-lg font-bold text-white mb-2 group-hover:text-[#EAEAE8] transition-colors">
                    {challenge.title}
                  </h3>
                  <p className="text-[#868684] text-sm mb-3 group-hover:text-white transition-colors">
                    {challenge.description}
                  </p>
                  <div className="flex items-center text-[#868684] text-xs">
                    <Users className="w-4 h-4 mr-1" />
                    {challenge.participants}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                href="/events"
                className="group relative bg-transparent border-2 border-[#EAEAE8] text-[#EAEAE8] px-8 py-4 font-bold text-lg hover:bg-[#EAEAE8] hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2 overflow-hidden"
              >
                {/* Button background animation */}
                <div className="absolute inset-0 bg-[#EAEAE8] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  JOIN THE CHALLENGE!
                </span>
                <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:text-black transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-[#EAEAE8]/20 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-[#EAEAE8]/40 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#EAEAE8]/60" />
          </div>
        </div>
      </section>

      {/* Event Teaser Carousel */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-font text-3xl md:text-5xl font-bold text-center mb-16">
            UPCOMING <span className="text-[#EAEAE8]">RELAY EVENTS</span>
          </h2>

          <div className="relative overflow-hidden rounded-lg bg-black/50 border border-[#868684]/20">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {events.map((event, index) => (
                <div key={index} className="w-full flex-shrink-0 p-12 text-center">
                  <div className="w-20 h-20 bg-[#EAEAE8]/10 border border-[#EAEAE8]/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-[#EAEAE8]" />
                  </div>
                  <h3 className="heading-font text-2xl md:text-3xl font-bold mb-4">{event.title}</h3>
                  <p className="text-[#868684] text-lg mb-2">{event.date}</p>
                  <p className="text-[#868684] text-sm mb-4">{event.teams} Teams Expected</p>
                  <span className="inline-block bg-[#EAEAE8] text-black px-6 py-2 text-sm font-bold">
                    {event.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-2 pb-6">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-white" : "bg-[#868684]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
