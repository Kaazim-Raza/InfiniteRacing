// Demo authentication system
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "runner"
  team?: string
  avatar?: string
}

// Demo user database
const demoUsers: Record<string, User> = {
  "admin@infiniterelay.com": {
    id: "1",
    name: "Alex Rodriguez",
    email: "admin@infiniterelay.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "manager@lightningbolts.com": {
    id: "2",
    name: "Sarah Johnson",
    email: "manager@lightningbolts.com",
    role: "manager",
    team: "Lightning Bolts",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "runner@lightningbolts.com": {
    id: "3",
    name: "Mike Chen",
    email: "runner@lightningbolts.com",
    role: "runner",
    team: "Lightning Bolts",
    avatar: "/placeholder.svg?height=40&width=40",
  },
}

// Demo passwords
const demoPasswords: Record<string, string> = {
  "admin@infiniterelay.com": "AdminRelay2024!",
  "manager@lightningbolts.com": "ManagerRelay2024!",
  "runner@lightningbolts.com": "RunnerRelay2024!",
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = demoUsers[email]
  const validPassword = demoPasswords[email]

  if (user && validPassword === password) {
    return user
  }

  return null
}

export function getDashboardRoute(role: string): string {
  switch (role) {
    case "admin":
      return "/dashboard/admin"
    case "manager":
      return "/dashboard/manager"
    case "runner":
      return "/dashboard/runner"
    default:
      return "/dashboard"
  }
}

// Simple session management for demo
export function setCurrentUser(user: User) {
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("currentUser")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export function clearCurrentUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}
