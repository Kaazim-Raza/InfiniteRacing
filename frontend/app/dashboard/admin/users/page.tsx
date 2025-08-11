// "use client"

// import { useState, useEffect } from "react"
// import {
//   Users,
//   Search,
//   Filter,
//   Plus,
//   Eye,
//   Edit,
//   Trash2,
//   Shield,
//   UserCheck,
//   Zap,
//   Mail,
//   MoreVertical,
// } from "lucide-react"
// // import axios from "@/lib/axios"
// import axios from "../../../lib/axios"

// type User = {
//   id: number
//   first_name: string
//   last_name: string
//   email: string
//   role: string
//   team?: string
//   status?: string
//   joinDate?: string
//   lastLogin?: string
//   races?: number
//   avatar?: string
// }

// type UserStats = {
//   total_users: number
//   admin: number
//   manager: number
//   vice_manager: number
//   runner: number
// }
// type Stats = {
//   total_users: number
//   admin: number
//   team_manager: number
//   vice_manager: number
//   runner: number
// }


// // Mock data
// // const users = [
// //   {
// //     id: 1,
// //     name: "Sarah Johnson",
// //     email: "sarah@lightningbolts.com",
// //     role: "manager",
// //     team: "Lightning Bolts",
// //     status: "active",
// //     joinDate: "2024-01-15",
// //     lastLogin: "2024-03-10",
// //     races: 5,
// //     avatar: "/placeholder.svg?height=40&width=40",
// //   },
// //   {
// //     id: 2,
// //     name: "Mike Chen",
// //     email: "mike@speedsters.com",
// //     role: "runner",
// //     team: "Speed Demons",
// //     status: "active",
// //     joinDate: "2024-02-01",
// //     lastLogin: "2024-03-09",
// //     races: 12,
// //     avatar: "/placeholder.svg?height=40&width=40",
// //   },
// //   {
// //     id: 3,
// //     name: "Alex Rodriguez",
// //     email: "alex@infiniterelay.com",
// //     role: "admin",
// //     team: null,
// //     status: "active",
// //     joinDate: "2023-12-01",
// //     lastLogin: "2024-03-11",
// //     races: 0,
// //     avatar: "/placeholder.svg?height=40&width=40",
// //   },
// //   {
// //     id: 4,
// //     name: "Emma Davis",
// //     email: "emma@thunderrunners.com",
// //     role: "manager",
// //     team: "Thunder Runners",
// //     status: "pending",
// //     joinDate: "2024-03-05",
// //     lastLogin: "Never",
// //     races: 0,
// //     avatar: "/placeholder.svg?height=40&width=40",
// //   },
// //   {
// //     id: 5,
// //     name: "James Wilson",
// //     email: "james@fasttrack.com",
// //     role: "runner",
// //     team: "Fast Track",
// //     status: "suspended",
// //     joinDate: "2024-01-20",
// //     lastLogin: "2024-02-28",
// //     races: 3,
// //     avatar: "/placeholder.svg?height=40&width=40",
// //   },
// // ]

// export default function AdminUsersPage() {
//   const [isLoaded, setIsLoaded] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [roleFilter, setRoleFilter] = useState("all")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [selectedUsers, setSelectedUsers] = useState<number[]>([])
//   const [users, setUsers] = useState<User[]>([])
//   const [stats, setStats] = useState<UserStats | null>(null)

//   useEffect(() => {
//     setIsLoaded(true)
//   }, [])

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (user.team && user.team.toLowerCase().includes(searchTerm.toLowerCase()))
//     const matchesRole = roleFilter === "all" || user.role === roleFilter
//     const matchesStatus = statusFilter === "all" || user.status === statusFilter
//     return matchesSearch && matchesRole && matchesStatus
//   })
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("/admin/users/")
//         setUsers(response.data)
//       } catch (error) {
//         console.error("Error fetching users:", error)
//       }
//     }

//     const fetchStats = async () => {
//       try {
//         const response = await axios.get("/admin/users/stats/")
//         setStats(response.data)
//       } catch (error) {
//         console.error("Error fetching user stats:", error)
//       }
//     }

//     fetchUsers()
//     fetchStats()
//   }, [])

//   const getRoleIcon = (role: string) => {
//     switch (role) {
//       case "admin":
//         return <Shield className="w-4 h-4 text-red-400" />
//       case "manager":
//         return <Users className="w-4 h-4 text-blue-400" />
//       case "runner":
//         return <Zap className="w-4 h-4 text-green-400" />
//       default:
//         return <UserCheck className="w-4 h-4 text-gray-400" />
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "bg-green-500/20 text-green-300 border-green-500/30"
//       case "pending":
//         return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
//       case "suspended":
//         return "bg-red-500/20 text-red-300 border-red-500/30"
//       default:
//         return "bg-gray-500/20 text-gray-300 border-gray-500/30"
//     }
//   }

//   const toggleUserSelection = (userId: number) => {
//     setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
//   }

//   const selectAllUsers = () => {
//     setSelectedUsers(filteredUsers.map((user) => user.id))
//   }

//   const clearSelection = () => {
//     setSelectedUsers([])
//   }

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">User Management</h1>
//           <p className="text-[#868684]">Manage user accounts, roles, and permissions</p>
//         </div>
//         <button className="mt-4 sm:mt-0 bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105">
//           <Plus className="w-5 h-5" />
//           <span>Add User</span>
//         </button>
//       </div>
//     {stats && (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//     {[
//       { label: "Total Users", value: stats.total_users, icon: Users, color: "text-blue-400" },
//       { label: "Admins", value: stats.admin, icon: Shield, color: "text-red-400" },
//       { label: "Team Managers", value: stats.team_manager, icon: Users, color: "text-green-400" },
//       { label: "Vice Managers", value: stats.vice_manager, icon: Users, color: "text-yellow-400" },
//       { label: "Runners", value: stats.runner, icon: Users, color: "text-purple-400" },
//     ].map(({ label, value, icon: Icon, color }) => (
//       <Card key={label} className="flex items-center space-x-4 p-4">
//         <div className={`p-2 rounded-full ${color} bg-opacity-10`}>
//           <Icon className={`w-6 h-6 ${color}`} />
//         </div>
//         <div>
//           <div className="text-sm text-muted-foreground">{label}</div>
//           <div className="text-xl font-bold">{value}</div>
//         </div>
//       </Card>
//     ))}
//   </div>
// )}

    
//       <div className="grid md:grid-cols-4 gap-6">
//         {[
//           // { label: "Total Users", value: users.length, icon: Users, color: "text-blue-400" },
//           // {
//           //   label: "Active Users",
//           //   value: users.filter((u) => u.status === "active").length,
//           //   icon: UserCheck,
//           //   color: "text-green-400",
//           // },
//           // {
//           //   label: "Team Managers",
//           //   value: users.filter((u) => u.role === "manager").length,
//           //   icon: Shield,
//           //   color: "text-purple-400",
//           // },
//           // {
//           //   label: "Relay Runners",
//           //   value: users.filter((u) => u.role === "runner").length,
//           //   icon: Zap,
//           //   color: "text-yellow-400",
//           // },

//         ].map((stat, index) => (
//           <div
//             key={index}
//             className={`bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:bg-[#868684]/10 transition-all duration-300 ${
//               isLoaded ? `opacity-100 translate-y-0 delay-${index * 100}` : "opacity-0 translate-y-4"
//             }`}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <stat.icon className={`w-8 h-8 ${stat.color}`} />
//             </div>
//             <div className="heading-font text-2xl font-bold text-white mb-1">{stat.value}</div>
//             <div className="text-[#868684] text-sm">{stat.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg p-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
//           {/* Search */}
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#868684]" />
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full bg-transparent border-2 border-[#868684]/30 pl-10 pr-4 py-2 text-white placeholder-[#868684] focus:outline-none focus:border-[#EAEAE8] transition-colors"
//             />
//           </div>

//           {/* Filters */}
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <Filter className="w-5 h-5 text-[#868684]" />
//               <select
//                 value={roleFilter}
//                 onChange={(e) => setRoleFilter(e.target.value)}
//                 className="bg-[#868684]/10 border border-[#868684]/30 text-white px-3 py-2 focus:outline-none focus:border-[#EAEAE8] transition-colors"
//               >
//                 <option value="all">All Roles</option>
//                 <option value="admin">Admin</option>
//                 <option value="manager">Manager</option>
//                 <option value="runner">Runner</option>
//               </select>
//             </div>

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="bg-[#868684]/10 border border-[#868684]/30 text-white px-3 py-2 focus:outline-none focus:border-[#EAEAE8] transition-colors"
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="pending">Pending</option>
//               <option value="suspended">Suspended</option>
//             </select>

//             {/* Bulk Actions */}
//             {selectedUsers.length > 0 && (
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm text-[#868684]">{selectedUsers.length} selected</span>
//                 <button onClick={clearSelection} className="text-sm text-[#EAEAE8] hover:text-white transition-colors">
//                   Clear
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#868684]/10 border-b border-[#868684]/20">
//               <tr>
//                 <th className="text-left p-4">
//                   <input
//                     type="checkbox"
//                     checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
//                     onChange={selectedUsers.length === filteredUsers.length ? clearSelection : selectAllUsers}
//                     className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
//                   />
//                 </th>
//                 <th className="text-left p-4 text-[#EAEAE8] font-bold">User</th>
//                 <th className="text-left p-4 text-[#EAEAE8] font-bold">Role & Team</th>
//                 <th className="text-left p-4 text-[#EAEAE8] font-bold">Activity</th>
//                 <th className="text-left p-4 text-[#EAEAE8] font-bold">Status</th>
//                 <th className="text-left p-4 text-[#EAEAE8] font-bold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((user, index) => (
//                 <tr
//                   key={user.id}
//                   className={`border-b border-[#868684]/10 hover:bg-[#868684]/5 transition-colors ${
//                     isLoaded ? `opacity-100 translate-y-0 delay-${index * 50}` : "opacity-0 translate-y-4"
//                   }`}
//                 >
//                   <td className="p-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedUsers.includes(user.id)}
//                       onChange={() => toggleUserSelection(user.id)}
//                       className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
//                     />
//                   </td>
//                   <td className="p-4">
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={user.avatar || "/placeholder.svg"}
//                         alt={user.name}
//                         className="w-10 h-10 rounded-full border-2 border-[#868684]/20"
//                       />
//                       <div>
//                         <h3 className="font-bold text-white">{user.first_name} {user.last_name}</h3>
//                         <div className="flex items-center space-x-1 text-[#868684] text-sm">
//                           <Mail className="w-3 h-3" />
//                           <span>{user.email}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <div className="flex items-center space-x-2 mb-1">
//                       {getRoleIcon(user.role)}
//                       <span className="text-white font-medium capitalize">{user.role}</span>
//                     </div>
//                     {user.team && <div className="text-[#868684] text-sm">{user.team}</div>}
//                   </td>
//                   <td className="p-4">
//                     <div className="text-white text-sm">Joined: {user.joinDate}</div>
//                     <div className="text-[#868684] text-sm">Last login: {user.lastLogin}</div>
//                     <div className="text-[#EAEAE8] text-sm">{user.races} races</div>
//                   </td>
//                   <td className="p-4">
//                     <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(user.status)}`}>
//                       {/* {user.status.toUpperCase()} */}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     <div className="flex items-center space-x-2">
//                       <button className="p-2 text-[#868684] hover:text-blue-400 transition-colors">
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 text-[#868684] hover:text-green-400 transition-colors">
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 text-[#868684] hover:text-red-400 transition-colors">
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 text-[#868684] hover:text-white transition-colors">
//                         <MoreVertical className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Shield,
  UserCheck,
  Zap,
  Mail,
  MoreVertical,
} from "lucide-react"
import axios from "../../../lib/axios"
import { useRouter } from "next/navigation"

type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  team?: string
  status?: string
  joinDate?: string
  lastLogin?: string
  races?: number
  avatar?: string
}

type UserStats = {
  total_users: number
  admin: number
  manager: number
  vice_manager: number
  runner: number
}

export default function AdminUsersPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/users/")
        setUsers(response.data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    const fetchStats = async () => {
      try {
        const response = await axios.get("/admin/users/stats/")
        setStats(response.data)
      } catch (error) {
        console.error("Error fetching user stats:", error)
      }
    }

    fetchUsers()
    fetchStats()
  }, [])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([])

  const confirmDeleteUsers = (userIds: number[]) => {
    setPendingDeleteIds(userIds)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirmed = async () => {
    try {
      if (pendingDeleteIds.length === 1) {
        await axios.delete(`/admin/users/${pendingDeleteIds[0]}`)
      } else if (pendingDeleteIds.length > 1) {
        await Promise.all(pendingDeleteIds.map(id => axios.delete(`/admin/users/${id}`)))
      }
      const response = await axios.get("/admin/users/")
      setUsers(response.data)
      clearSelection()
    } catch (error) {
      console.error("Error deleting users:", error)
    } finally {
      setShowDeleteModal(false)
      setPendingDeleteIds([])
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setPendingDeleteIds([])
  }

  useEffect(() => {
    // Optionally, you could listen for changes in selectedUsers and auto-delete, but usually deletion is triggered by a button.
    // Example: If you want to delete when selectedUsers changes and is not empty:
    // if (selectedUsers.length > 0) {
    //   deleteUsers(selectedUsers)
    // }
  }, [selectedUsers])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.team && user.team.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4 text-red-400" />
      case "manager":
        return <Users className="w-4 h-4 text-blue-400" />
      case "vice_manager":
        return <Users className="w-4 h-4 text-yellow-400" />
      case "runner":
        return <Zap className="w-4 h-4 text-green-400" />
      default:
        return <UserCheck className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "suspended":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const selectAllUsers = () => {
    setSelectedUsers(filteredUsers.map((user) => user.id))
  }

  const clearSelection = () => {
    setSelectedUsers([])
  }

  return (

    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-font text-3xl font-bold text-[#EAEAE8] mb-2">User Management</h1>
          <p className="text-[#868684]">Manage user accounts, roles, and permissions</p>
        </div>
        <button  onClick={() => router.push("/dashboard/admin/users/addUser")} className="mt-4 sm:mt-0 bg-[#EAEAE8] text-black px-6 py-3 font-bold hover:bg-white transition-all duration-300 flex items-center space-x-2 hover:scale-105">
          <Plus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* ✅ ADDED: User Stats Boxes */}
      {stats && (
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Total Users", value: stats.total_users, icon: Users, color: "text-blue-400" },
            { label: "Admins", value: stats.admin, icon: Shield, color: "text-red-400" },
            { label: "Team Managers", value: stats.manager, icon: Users, color: "text-green-400" },
            { label: "Vice Managers", value: stats.vice_manager, icon: Users, color: "text-yellow-400" },
            { label: "Runners", value: stats.runner, icon: Zap, color: "text-purple-400" },
          ].map(({ label, value, icon: Icon, color }, index) => (
            <div
              key={label}
              className={`bg-[#868684]/5 border border-[#868684]/20 p-6 rounded-lg hover:bg-[#868684]/10 transition-all duration-300 ${
                isLoaded ? `opacity-100 translate-y-0 delay-${index * 100}` : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${color}`} />
              </div>
              <div className="heading-font text-2xl font-bold text-white mb-1">{value}</div>
              <div className="text-[#868684] text-sm">{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ... rest of the code unchanged for table, filters, search, etc. */}
       <div className="bg-[#868684]/5 border border-[#868684]/20 rounded-lg overflow-hidden">
   <div className="overflow-x-auto">
           <table className="w-full">
             <thead className="bg-[#868684]/10 border-b border-[#868684]/20">
               <tr>
                <th className="text-left p-4">
                   <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={selectedUsers.length === filteredUsers.length ? clearSelection : selectAllUsers}
                    className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
                  />
                </th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">User</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Role & Team</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Activity</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Status</th>
                <th className="text-left p-4 text-[#EAEAE8] font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-[#868684]/10 hover:bg-[#868684]/5 transition-colors ${
                    isLoaded ? `opacity-100 translate-y-0 delay-${index * 50}` : "opacity-0 translate-y-4"
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="w-4 h-4 bg-transparent border-2 border-[#868684]/30 rounded focus:ring-[#EAEAE8] focus:ring-2 text-[#EAEAE8]"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-[#868684]/20"
                      />
                      <div>
                        <h3 className="font-bold text-white">{user.first_name} {user.last_name}</h3>
                        <div className="flex items-center space-x-1 text-[#868684] text-sm">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2 mb-1">
                      {getRoleIcon(user.role)}
                      <span className="text-white font-medium capitalize">{user.role}</span>
                    </div>
                    {user.team && <div className="text-[#868684] text-sm">{user.team}</div>}
                  </td>
                  <td className="p-4">
                    <div className="text-white text-sm">Joined: {user.joinDate}</div>
                    <div className="text-[#868684] text-sm">Last login: {user.lastLogin}</div>
                    <div className="text-[#EAEAE8] text-sm">{user.races} races</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(user.status)}`}>
                      {/* {user.status.toUpperCase()} */}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-[#868684] hover:text-blue-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                      onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
                      className="p-2 text-[#868684] hover:text-green-400 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                        <button
                        className="p-2 text-[#868684] hover:text-red-400 transition-colors"
                        onClick={() => confirmDeleteUsers([user.id])}
                        title="Delete user"
                        >
                        <Trash2 className="w-4 h-4" />
                        </button>
                      <button className="p-2 text-[#868684] hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete {pendingDeleteIds.length} user(s)?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
          
    </div>
  )
}
