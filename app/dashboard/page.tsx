"use client"

import { useAuth } from "@/components/auth-provider"
import { PassengerDashboard } from "@/components/dashboard/passenger-dashboard"
import { DriverDashboard } from "@/components/dashboard/driver-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  // Render different dashboard based on user role
  if (user.role === "passenger") {
    return <PassengerDashboard />
  }

  if (user.role === "driver") {
    return <DriverDashboard />
  }

  if (user.role === "admin") {
    return <AdminDashboard />
  }

  return null
}
