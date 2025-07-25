"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Mail, LinkIcon, Users, AlertCircle, Copy, Send } from "lucide-react"
import Link from "next/link"

// Mock data for pending invitations
const pendingInvitations = [
  {
    id: 1,
    email: "john.doe@email.com",
    invitedDate: "2024-01-15",
    status: "pending",
    inviteLink: "https://infiniteracing.com/invite/abc123",
  },
  {
    id: 2,
    email: "jane.smith@email.com",
    invitedDate: "2024-01-10",
    status: "pending",
    inviteLink: "https://infiniteracing.com/invite/def456",
  },
]

export default function InviteRunnerPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [inviteMethod, setInviteMethod] = useState<"email" | "link">("email")
  const [emailList, setEmailList] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [linkExpiry, setLinkExpiry] = useState("7")
  const [isGeneratingLink, setIsGeneratingLink] = useState(false)
  const [isSendingEmails, setIsSendingEmails] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleEmailInvite = async () => {
    setIsSendingEmails(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSendingEmails(false)
    setEmailList("")
    setCustomMessage("")
    console.log("Email invitations sent")
  }

  const handleGenerateLink = async () => {
    setIsGeneratingLink(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setGeneratedLink(`https://infiniteracing.com/invite/${Math.random().toString(36).substr(2, 9)}`)
    setIsGeneratingLink(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    console.log("Copied to clipboard:", text)
  }

  const resendInvitation = (invitationId: number) => {
    console.log("Resending invitation:", invitationId)
  }

  const cancelInvitation = (invitationId: number) => {
    console.log("Canceling invitation:", invitationId)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/manager/team" className="p-2 text-[#868684] hover:text-[#EAEAE8] transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Invite Runners</h1>
          <p className="text-[#868684]">Add new runners to your team roster</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Invitation Methods */}
        <div className="lg:col-span-2">
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
            {/* Method Selection */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setInviteMethod("email")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  inviteMethod === "email"
                    ? "bg-[#EAEAE8] text-black"
                    : "bg-[#868684]/20 text-[#EAEAE8] hover:bg-[#868684]/30"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email Invitation</span>
              </button>
              <button
                onClick={() => setInviteMethod("link")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  inviteMethod === "link"
                    ? "bg-[#EAEAE8] text-black"
                    : "bg-[#868684]/20 text-[#EAEAE8] hover:bg-[#868684]/30"
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                <span>Invite Link</span>
              </button>
            </div>

            {/* Email Invitation Form */}
            {inviteMethod === "email" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[#EAEAE8] font-medium mb-2">Email Addresses</label>
                  <textarea
                    value={emailList}
                    onChange={(e) => setEmailList(e.target.value)}
                    placeholder="Enter email addresses separated by commas or new lines&#10;example@email.com, another@email.com"
                    className="w-full bg-[#868684]/10 border border-[#868684]/30 text-white placeholder-[#868684] p-4 rounded-lg focus:outline-none focus:border-[#EAEAE8] transition-colors resize-none"
                    rows={4}
                  />
                  <p className="text-[#868684] text-sm mt-2">
                    You can enter multiple email addresses separated by commas or new lines
                  </p>
                </div>

                <div>
                  <label className="block text-[#EAEAE8] font-medium mb-2">Custom Message (Optional)</label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Add a personal message to your invitation..."
                    className="w-full bg-[#868684]/10 border border-[#868684]/30 text-white placeholder-[#868684] p-4 rounded-lg focus:outline-none focus:border-[#EAEAE8] transition-colors resize-none"
                    rows={3}
                  />
                </div>

                <button
                  onClick={handleEmailInvite}
                  disabled={!emailList.trim() || isSendingEmails}
                  className={`w-full py-3 font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    emailList.trim() && !isSendingEmails
                      ? "bg-[#EAEAE8] text-black hover:bg-white hover:scale-105"
                      : "bg-[#868684]/20 text-[#868684] cursor-not-allowed"
                  }`}
                >
                  {isSendingEmails ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Sending Invitations...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Email Invitations</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Invite Link Generation */}
            {inviteMethod === "link" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[#EAEAE8] font-medium mb-2">Link Expiry</label>
                  <select
                    value={linkExpiry}
                    onChange={(e) => setLinkExpiry(e.target.value)}
                    className="w-full bg-[#868684]/10 border border-[#868684]/30 text-white p-3 rounded-lg focus:outline-none focus:border-[#EAEAE8] transition-colors"
                  >
                    <option value="1">1 day</option>
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="0">Never expires</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateLink}
                  disabled={isGeneratingLink}
                  className={`w-full py-3 font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    !isGeneratingLink
                      ? "bg-[#EAEAE8] text-black hover:bg-white hover:scale-105"
                      : "bg-[#868684]/20 text-[#868684] cursor-not-allowed"
                  }`}
                >
                  {isGeneratingLink ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Generating Link...</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4" />
                      <span>Generate Invite Link</span>
                    </>
                  )}
                </button>

                {generatedLink && (
                  <div className="bg-[#868684]/10 border border-[#868684]/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#EAEAE8] font-medium">Generated Invite Link:</span>
                      <button
                        onClick={() => copyToClipboard(generatedLink)}
                        className="text-[#EAEAE8] hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-[#868684]/20 p-3 rounded border border-[#868684]/30">
                      <code className="text-[#EAEAE8] text-sm break-all">{generatedLink}</code>
                    </div>
                    <p className="text-[#868684] text-sm mt-2">
                      {linkExpiry === "0" ? "This link never expires" : `This link expires in ${linkExpiry} day(s)`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Invitation Guidelines */}
        <div>
          <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
            <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Invitation Guidelines</span>
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-[#EAEAE8] font-medium mb-2">Email Invitations</h3>
                <ul className="space-y-1 text-[#868684] text-sm">
                  <li>• Personalized invitations sent directly</li>
                  <li>• Include team information and next steps</li>
                  <li>• Track invitation status and responses</li>
                  <li>• Automatic reminders for pending invites</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[#EAEAE8] font-medium mb-2">Invite Links</h3>
                <ul className="space-y-1 text-[#868684] text-sm">
                  <li>• Share via social media or messaging</li>
                  <li>• Set custom expiry dates</li>
                  <li>• Track link usage and registrations</li>
                  <li>• Perfect for group recruitment</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#868684]/20">
                <h3 className="text-[#EAEAE8] font-medium mb-2">What Happens Next?</h3>
                <ul className="space-y-1 text-[#868684] text-sm">
                  <li>• Runners receive invitation with team details</li>
                  <li>• They create account and join your roster</li>
                  <li>• You can assign them to race teams</li>
                  <li>• Track their performance and availability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
          <h2 className="heading-font text-xl font-bold text-[#EAEAE8] mb-6">Pending Invitations</h2>
          <div className="space-y-4">
            {pendingInvitations.map((invitation, index) => (
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
                    <div className="text-[#868684] text-sm">Invited on {invitation.invitedDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(invitation.inviteLink)}
                    className="text-[#868684] hover:text-[#EAEAE8] transition-colors p-2"
                    title="Copy invite link"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => resendInvitation(invitation.id)}
                    className="text-[#EAEAE8] hover:text-white text-sm font-medium transition-colors px-3 py-1 bg-[#868684]/20 hover:bg-[#868684]/30 rounded"
                  >
                    Resend
                  </button>
                  <button
                    onClick={() => cancelInvitation(invitation.id)}
                    className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors px-3 py-1 bg-red-500/10 hover:bg-red-500/20 rounded"
                  >
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
