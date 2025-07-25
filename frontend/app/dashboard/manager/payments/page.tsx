"use client"

import { useState, useEffect } from "react"
import {
  DollarSign,
  CreditCard,
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react"

// Mock data
const transactions = [
  {
    id: "TXN-LB-001",
    date: "2024-03-10",
    race: "Spring Championship",
    amount: 200,
    fee: 50,
    total: 250,
    status: "completed",
    method: "credit_card",
    reference: "ch_1234567890",
    dueDate: null,
  },
  {
    id: "TXN-LB-002",
    date: "2024-03-08",
    race: "City Relay Challenge",
    amount: 300,
    fee: 75,
    total: 375,
    status: "pending",
    method: "bank_transfer",
    reference: "pending_bt_001",
    dueDate: "2024-03-15",
  },
  {
    id: "TXN-LB-003",
    date: "2024-02-28",
    race: "Winter Series Final",
    amount: 240,
    fee: 60,
    total: 300,
    status: "completed",
    method: "credit_card",
    reference: "ch_0987654321",
    dueDate: null,
  },
  {
    id: "TXN-LB-004",
    date: "2024-02-15",
    race: "Youth Cup Registration",
    amount: 100,
    fee: 25,
    total: 125,
    status: "failed",
    method: "credit_card",
    reference: "ch_failed_001",
    dueDate: null,
  },
  {
    id: "TXN-LB-005",
    date: "2024-01-20",
    race: "Metro Series",
    amount: 400,
    fee: 100,
    total: 500,
    status: "refunded",
    method: "bank_transfer",
    reference: "bt_refund_001",
    dueDate: null,
  },
]

const paymentMethods = [
  {
    id: 1,
    type: "credit_card",
    last4: "4242",
    brand: "Visa",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: 2,
    type: "bank_account",
    last4: "1234",
    bank: "Chase Bank",
    accountType: "Checking",
    isDefault: false,
  },
]

export default function ManagerPaymentsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("30")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "refunded":
        return <RefreshCw className="w-4 h-4 text-blue-400" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />
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

  const totalPaid = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.total, 0)
  const totalPending = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.total, 0)
  const totalFees = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.fee, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">Payment Center</h1>
          <p className="text-[#868684]">Manage team payments and transaction history</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="bg-[#868684]/20 border border-[#868684]/30 text-[#EAEAE8] px-4 py-2 font-medium hover:bg-[#868684]/30 transition-all duration-300 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="bg-[#EAEAE8] text-black px-6 py-2 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105">
            <CreditCard className="w-4 h-4" />
            <span>Add Payment Method</span>
          </button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Paid",
            value: `$${totalPaid.toLocaleString()}`,
            icon: CheckCircle,
            color: "text-green-400",
          },
          {
            label: "Pending Payments",
            value: `$${totalPending.toLocaleString()}`,
            icon: Clock,
            color: "text-yellow-400",
          },
          {
            label: "Processing Fees",
            value: `$${totalFees.toLocaleString()}`,
            icon: CreditCard,
            color: "text-blue-400",
          },
          {
            label: "Active Methods",
            value: paymentMethods.length,
            icon: DollarSign,
            color: "text-purple-400",
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

      {/* Payment Methods */}
      <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-font text-xl font-bold text-[#EAEAE8]">Payment Methods</h2>
          <button className="text-[#EAEAE8] hover:text-white transition-colors text-sm font-medium">
            Manage Methods →
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {paymentMethods.map((method, index) => (
            <div
              key={method.id}
              className={`bg-[#868684]/10 border border-[#868684]/20 p-4 rounded-lg hover:bg-[#868684]/20 transition-all duration-300 ${
                isLoaded ? `opacity-100 translate-x-0 delay-${(index + 4) * 100}` : "opacity-0 translate-x-4"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getMethodIcon(method.type)}
                  <div>
                    <div className="text-white font-medium">
                      {method.type === "credit_card"
                        ? `${method.brand} ****${method.last4}`
                        : `${method.bank} ****${method.last4}`}
                    </div>
                    <div className="text-[#868684] text-sm">
                      {method.type === "credit_card" ? `Expires ${method.expiry}` : method.accountType}
                    </div>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="px-2 py-1 bg-[#EAEAE8]/10 text-[#EAEAE8] text-xs font-bold rounded">DEFAULT</span>
                )}
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-[#868684]/10 border border-[#868684]/30 text-white px-3 py-2 focus:outline-none focus:border-[#EAEAE8] transition-colors"
            >
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
              <option value="all">All time</option>
            </select>
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
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Race</th>
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
                      {transaction.dueDate && <div className="text-yellow-400 text-xs">Due: {transaction.dueDate}</div>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white">{transaction.race}</div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-bold text-white">${transaction.total}</div>
                      <div className="text-[#868684] text-sm">
                        ${transaction.amount} + ${transaction.fee} fee
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(transaction.method)}
                      <span className="text-white capitalize">{transaction.method.replace("_", " ")}</span>
                    </div>
                    <div className="text-[#868684] text-sm">{transaction.reference}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2 mb-1">
                      {getStatusIcon(transaction.status)}
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-[#868684] hover:text-blue-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#868684] hover:text-green-400 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      {transaction.status === "failed" && (
                        <button className="p-2 text-[#868684] hover:text-yellow-400 transition-colors">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
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
