"use client"

import { useState, useEffect } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  CreditCard,
  Calendar,
  Users,
} from "lucide-react"

// Mock data
const transactions = [
  {
    id: "TXN-001",
    date: "2024-03-10",
    team: "Lightning Bolts",
    race: "Spring Championship",
    amount: 200,
    fee: 50,
    status: "completed",
    method: "credit_card",
    reference: "ch_1234567890",
  },
  {
    id: "TXN-002",
    date: "2024-03-09",
    team: "Speed Demons",
    race: "City Relay Challenge",
    amount: 300,
    fee: 75,
    status: "completed",
    method: "bank_transfer",
    reference: "bt_0987654321",
  },
  {
    id: "TXN-003",
    date: "2024-03-08",
    team: "Thunder Runners",
    race: "Metro Series",
    amount: 150,
    fee: 25,
    status: "pending",
    method: "credit_card",
    reference: "ch_1122334455",
  },
  {
    id: "TXN-004",
    date: "2024-03-07",
    team: "Fast Track",
    race: "Youth Cup",
    amount: 100,
    fee: 25,
    status: "failed",
    method: "credit_card",
    reference: "ch_5566778899",
  },
  {
    id: "TXN-005",
    date: "2024-03-06",
    team: "Relay Masters",
    race: "Championship Series",
    amount: 400,
    fee: 100,
    status: "refunded",
    method: "bank_transfer",
    reference: "bt_9988776655",
  },
]

const monthlyRevenue = [
  { month: "Jan", revenue: 12500, transactions: 45 },
  { month: "Feb", revenue: 18200, transactions: 62 },
  { month: "Mar", revenue: 15800, transactions: 53 },
]

export default function AdminPaymentsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("30")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.race.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "refunded":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="w-4 h-4" />
      case "bank_transfer":
        return <DollarSign className="w-4 h-4" />
      default:
        return <DollarSign className="w-4 h-4" />
    }
  }

  const totalRevenue = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)
  const totalFees = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.fee, 0)
  const pendingAmount = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Payment Management</h1>
          <p className="text-[#868684]">Monitor transactions, revenue, and financial reports</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="bg-[#868684]/20 border border-[#868684]/30 text-[#EAEAE8] px-4 py-2 font-medium hover:bg-[#868684]/30 transition-all duration-300 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="bg-[#EAEAE8] text-black px-6 py-2 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            change: "+12.5%",
            icon: DollarSign,
            color: "text-green-400",
            trend: "up",
          },
          {
            label: "Processing Fees",
            value: `$${totalFees.toLocaleString()}`,
            change: "+8.2%",
            icon: CreditCard,
            color: "text-blue-400",
            trend: "up",
          },
          {
            label: "Pending Payments",
            value: `$${pendingAmount.toLocaleString()}`,
            change: "-5.1%",
            icon: Calendar,
            color: "text-yellow-400",
            trend: "down",
          },
          {
            label: "Active Teams",
            value: new Set(transactions.map((t) => t.team)).size,
            change: "+15.3%",
            icon: Users,
            color: "text-purple-400",
            trend: "up",
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
              <div
                className={`flex items-center space-x-1 text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}
              >
                {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="heading-font text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-[#868684] text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-font text-xl font-bold text-[#EAEAE8]">Monthly Revenue</h2>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-[#868684]/10 border border-[#868684]/30 text-white px-3 py-2 focus:outline-none focus:border-[#EAEAE8] transition-colors"
          >
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {monthlyRevenue.map((month, index) => (
            <div
              key={month.month}
              className={`bg-[#868684]/10 border border-[#868684]/20 p-4 rounded-lg transition-all duration-500 ${
                isLoaded ? `opacity-100 translate-y-0 delay-${(index + 4) * 100}` : "opacity-0 translate-y-4"
              }`}
            >
              <div className="text-[#868684] text-sm mb-1">{month.month} 2024</div>
              <div className="heading-font text-xl font-bold text-white mb-2">${month.revenue.toLocaleString()}</div>
              <div className="text-[#EAEAE8] text-sm">{month.transactions} transactions</div>
              <div className="w-full bg-[#868684]/20 rounded-full h-2 mt-3">
                <div
                  className="bg-[#EAEAE8] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(month.revenue / Math.max(...monthlyRevenue.map((m) => m.revenue))) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#868684]" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-2 border-[#868684]/30 pl-10 pr-4 py-2 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-[#868684]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#868684]/10 border border-[#868684]/30 text-white px-3 py-2 focus:outline-none focus:border-[#EAEAE8] transition-colors"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#868684]/10 border-b border-[#868684]/20">
              <tr>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Transaction</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Team & Race</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Amount</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Method</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Status</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`border-b border-[#868684]/10 hover:bg-[#868684]/5 transition-colors ${
                    isLoaded ? `opacity-100 translate-y-0 delay-${index * 50}` : "opacity-0 translate-y-4"
                  }`}
                >
                  <td className="p-4">
                    <div>
                      <h3 className="font-bold text-white mb-1">{transaction.id}</h3>
                      <div className="text-[#868684] text-sm">{transaction.date}</div>
                      <div className="text-[#868684] text-xs">{transaction.reference}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">{transaction.team}</div>
                      <div className="text-[#868684] text-sm">{transaction.race}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-bold text-white">${transaction.amount}</div>
                      <div className="text-[#868684] text-sm">Fee: ${transaction.fee}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(transaction.method)}
                      <span className="text-white capitalize">{transaction.method.replace("_", " ")}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(transaction.status)}`}
                    >
                      {transaction.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-[#868684] hover:text-blue-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#868684] hover:text-green-400 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
