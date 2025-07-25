"use client"

import { useEffect, useRef } from "react"
import { Users, Timer, Target, Trophy, Zap, Clock } from "lucide-react"
import { useState } from "react"

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

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const [statsVisible, setStatsVisible] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => (prev.includes(index) ? prev : [...prev, index]))
          }
        },
        { threshold: 0.3 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const timelineItems = [
    {
      icon: Users,
      title: "The Relay Vision",
      content:
        "Born from the passion for relay racing, Infinite Relay League revolutionizes how teams coordinate, train, and compete in relay events.",
      direction: "left",
    },
    {
      icon: Timer,
      title: "Precision Timing",
      content:
        "Every millisecond matters in relay racing. Our platform provides split-second timing analysis and handoff optimization tools.",
      direction: "right",
    },
    {
      icon: Target,
      title: "Perfect Handoffs",
      content:
        "The handoff zone is where races are won or lost. We provide specialized training and analysis for flawless baton exchanges.",
      direction: "left",
    },
    {
      icon: Trophy,
      title: "Championship Legacy",
      content:
        "Building champions through teamwork, strategy, and relentless pursuit of relay excellence across all distances and formats.",
      direction: "right",
    },
  ]

  const statsData = [
    { end: 2500, label: "Relay Runners Trained", suffix: "+" },
    { end: 625, label: "Relay Teams Formed", suffix: "+" },
    { end: 98.5, label: "Successful Handoffs", suffix: "%", decimal: true },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#868684]/5 to-black" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="heading-font text-4xl md:text-6xl font-black mb-6">
            ABOUT THE <span className="text-[#EAEAE8]">RELAY LEAGUE</span>
          </h1>
          <p className="text-lg md:text-xl text-[#868684] max-w-3xl mx-auto">
            We're not just building a platform. We're crafting the future of relay racing where teamwork, precision, and
            speed converge to create champions.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-[#EAEAE8] via-[#868684] to-[#EAEAE8]" />

            {timelineItems.map((item, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                className={`relative flex items-center mb-16 ${
                  item.direction === "left" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`w-5/12 ${
                    visibleSections.includes(index)
                      ? `opacity-100 ${item.direction === "left" ? "translate-x-0" : "translate-x-0"}`
                      : `opacity-0 ${item.direction === "left" ? "-translate-x-12" : "translate-x-12"}`
                  } transition-all duration-1000 delay-${index * 200}`}
                >
                  <div className="bg-[#868684]/5 border border-[#868684]/20 p-8 hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-500">
                    <h3 className="heading-font text-2xl font-bold mb-4 flex items-center">
                      <item.icon className="w-8 h-8 mr-4 text-[#EAEAE8]" />
                      {item.title}
                    </h3>
                    <p className="text-[#868684]">{item.content}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#EAEAE8] rounded-full border-4 border-black z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Relay With Us Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#868684]/10 to-black" />
        <div className="absolute inset-0 noise-bg opacity-5" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-center min-h-[600px]">
            {/* Point 01 - Top Left */}
            <div className="lg:col-span-2 opacity-100 translate-x-0 transition-all duration-1000">
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
              <div className="relative z-10 opacity-100 scale-100 transition-all duration-1000">
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
            <div className="lg:col-span-2 lg:row-start-2 opacity-100 translate-x-0 transition-all duration-1000">
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
            <div className="lg:col-span-2 lg:col-start-4 lg:row-start-1 opacity-100 translate-x-0 transition-all duration-1000">
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
            <div className="lg:col-span-2 lg:col-start-4 lg:row-start-2 opacity-100 translate-x-0 transition-all duration-1000">
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

      {/* Relay Fundamentals Section */}
      <section className="py-20 px-4 bg-[#868684]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-font text-3xl md:text-5xl font-bold text-center mb-16">
            RELAY <span className="text-[#EAEAE8]">FUNDAMENTALS</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Team Dynamics",
                desc: "Four runners, one goal. Understanding team chemistry and runner positioning for optimal performance.",
              },
              {
                icon: Clock,
                title: "Exchange Zones",
                desc: "Mastering the 20-meter handoff zone where races are won through precision and timing.",
              },
              {
                icon: Zap,
                title: "Baton Technique",
                desc: "The art of seamless baton transfer - from grip to release, every detail matters.",
              },
              {
                icon: Target,
                title: "Leg Strategy",
                desc: "Strategic runner placement based on strengths: speed, endurance, and curve running ability.",
              },
              {
                icon: Timer,
                title: "Split Analysis",
                desc: "Breaking down individual leg times and cumulative performance for continuous improvement.",
              },
              {
                icon: Trophy,
                title: "Race Tactics",
                desc: "Advanced strategies for different relay formats: 4x100m, 4x400m, and mixed relays.",
              },
            ].map((fundamental, index) => (
              <div
                key={index}
                className="bg-black/30 border border-[#868684]/20 p-6 hover:bg-[#868684]/10 hover:border-[#EAEAE8]/40 transition-all duration-500 transform hover:-translate-y-2"
              >
                <fundamental.icon className="w-10 h-10 text-[#EAEAE8] mb-4" />
                <h3 className="heading-font text-lg font-bold mb-3">{fundamental.title}</h3>
                <p className="text-[#868684] text-sm">{fundamental.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section ref={statsRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-font text-3xl md:text-5xl font-bold text-center mb-16">
            OUR <span className="text-[#EAEAE8]">IMPACT</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
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
                  <div className="heading-font text-4xl md:text-6xl font-black text-[#EAEAE8] mb-2 group-hover:scale-110 transition-transform duration-300">
                    {displayValue}
                    {stat.suffix}
                  </div>
                  <div className="text-[#868684] text-lg font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
