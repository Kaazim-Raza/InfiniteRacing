"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ChevronRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-[#868684]/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 noise-bg opacity-5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EAEAE8] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="heading-font text-2xl font-bold mb-6 block hover:text-[#EAEAE8] transition-colors"
            >
              INFINITE RELAY
            </Link>
            <p className="text-[#868684] mb-6 leading-relaxed">
              The future of relay racing management. Where teams unite, handoffs perfect, and champions are forged
              through precision and teamwork.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-[#868684]/10 border border-[#868684]/20 rounded-lg flex items-center justify-center hover:bg-[#EAEAE8]/10 hover:border-[#EAEAE8]/40 hover:scale-110 transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-[#868684] group-hover:text-[#EAEAE8] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="heading-font text-lg font-bold mb-6 text-[#EAEAE8]">QUICK LINKS</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Relay Events", href: "/events" },
                { label: "Contact", href: "/contact" },
                { label: "Training Resources", href: "/training" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[#868684] hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Relay Categories */}
          <div>
            <h3 className="heading-font text-lg font-bold mb-6 text-[#EAEAE8]">RELAY RACING</h3>
            <ul className="space-y-3">
              {[
                { label: "Team Manager Portal", href: "/dashboard/manager" },
                { label: "Runner Dashboard", href: "/dashboard/runner" },
                { label: "Relay Championships", href: "/championships" },
                { label: "Team Leaderboards", href: "/leaderboards" },
                { label: "Handoff Training", href: "/training/handoffs" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[#868684] hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="heading-font text-lg font-bold mb-6 text-[#EAEAE8]">CONTACT</h3>
            <div className="space-y-4">
              {[
                { icon: Mail, label: "relay@infiniteleague.com" },
                { icon: Phone, label: "+1 (555) RELAY-GO" },
                { icon: MapPin, label: "Neo Tokyo Track Complex" },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-[#868684] hover:text-white transition-colors group"
                >
                  <contact.icon className="w-5 h-5 group-hover:text-[#EAEAE8] transition-colors" />
                  <span className="text-sm">{contact.label}</span>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="heading-font text-sm font-bold mb-3 text-[#EAEAE8]">RELAY UPDATES</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 bg-[#868684]/10 border border-[#868684]/20 px-3 py-2 text-sm text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
                />
                <button className="bg-[#EAEAE8] text-black px-4 py-2 hover:bg-white transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#868684]/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-[#868684] text-sm">© {currentYear} Infinite Relay League. All rights reserved.</div>
          <div className="flex space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Relay Rules"].map((link, index) => (
              <Link key={index} href="#" className="text-[#868684] hover:text-white transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
