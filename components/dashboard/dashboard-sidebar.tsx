"use client"

import { useAuth } from "@/components/auth-provider"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  Home,
  Map,
  Clock,
  CreditCard,
  Settings,
  User,
  Star,
  BarChart,
  Car,
  Users,
  MessageSquare,
  HelpCircle,
  LogOut,
} from "lucide-react"

export function DashboardSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  // Common menu items for all users
  const commonMenuItems = [
    {
      title: "Inicio",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Perfil",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  // Menu items specific to passengers
  const passengerMenuItems = [
    {
      title: "Solicitar Viaje",
      href: "/dashboard/request-ride",
      icon: Map,
    },
    {
      title: "Historial de Viajes",
      href: "/dashboard/ride-history",
      icon: Clock,
    },
    {
      title: "Métodos de Pago",
      href: "/dashboard/payment-methods",
      icon: CreditCard,
    },
    {
      title: "Conductores Favoritos",
      href: "/dashboard/favorite-drivers",
      icon: Star,
    },
  ]

  // Menu items specific to drivers
  const driverMenuItems = [
    {
      title: "Viajes Disponibles",
      href: "/dashboard/available-rides",
      icon: Map,
    },
    {
      title: "Mis Viajes",
      href: "/dashboard/my-rides",
      icon: Car,
    },
    {
      title: "Ganancias",
      href: "/dashboard/earnings",
      icon: CreditCard,
    },
    {
      title: "Estadísticas",
      href: "/dashboard/statistics",
      icon: BarChart,
    },
  ]

  // Menu items specific to admins
  const adminMenuItems = [
    {
      title: "Panel de Control",
      href: "/dashboard/admin",
      icon: BarChart,
    },
    {
      title: "Usuarios",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Conductores",
      href: "/dashboard/admin/drivers",
      icon: Car,
    },
    {
      title: "Viajes",
      href: "/dashboard/admin/rides",
      icon: Map,
    },
    {
      title: "Pagos",
      href: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      title: "Reportes",
      href: "/dashboard/admin/reports",
      icon: BarChart,
    },
  ]

  // Determine which menu items to show based on user role
  let roleSpecificMenuItems = []
  if (user?.role === "passenger") {
    roleSpecificMenuItems = passengerMenuItems
  } else if (user?.role === "driver") {
    roleSpecificMenuItems = driverMenuItems
  } else if (user?.role === "admin") {
    roleSpecificMenuItems = adminMenuItems
  }

  // Support menu items for all users
  const supportMenuItems = [
    {
      title: "Ayuda",
      href: "/dashboard/help",
      icon: HelpCircle,
    },
    {
      title: "Chat de Soporte",
      href: "/dashboard/support-chat",
      icon: MessageSquare,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center p-2">
          <span className="text-xl font-bold text-primary">Movi+</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {roleSpecificMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="my-2 px-2">
          <div className="h-px w-full bg-border" />
        </div>

        <SidebarMenu>
          {commonMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="my-2 px-2">
          <div className="h-px w-full bg-border" />
        </div>

        <SidebarMenu>
          {supportMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} tooltip="Cerrar Sesión">
              <LogOut />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
