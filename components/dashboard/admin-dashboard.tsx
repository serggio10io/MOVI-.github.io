"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Car,
  MapPin,
  CreditCard,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for dashboard stats
const dashboardStats = {
  users: {
    total: 1250,
    growth: 12.5,
    passengers: 1050,
    drivers: 200,
  },
  rides: {
    total: 3450,
    growth: 8.2,
    completed: 3200,
    cancelled: 250,
  },
  revenue: {
    total: "45,600 CUP",
    growth: 15.3,
    thisMonth: "12,500 CUP",
    lastMonth: "10,800 CUP",
  },
  drivers: {
    active: 180,
    inactive: 20,
    pending: 15,
    topRated: 45,
  },
}

// Mock data for recent users
const recentUsers = [
  {
    id: "user-1",
    name: "María González",
    email: "maria@example.com",
    role: "passenger",
    joined: "Hace 2 horas",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-2",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    role: "driver",
    joined: "Hace 5 horas",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-3",
    name: "Ana Martínez",
    email: "ana@example.com",
    role: "passenger",
    joined: "Hace 1 día",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-4",
    name: "Luis Hernández",
    email: "luis@example.com",
    role: "driver",
    joined: "Hace 2 días",
    photo: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for recent rides
const recentRides = [
  {
    id: "ride-1",
    passenger: "María González",
    driver: "Carlos Rodríguez",
    from: "Calle 23, La Habana",
    to: "Varadero, Matanzas",
    price: "500 CUP",
    status: "completed",
    date: "Hoy, 14:30",
  },
  {
    id: "ride-2",
    passenger: "Ana Martínez",
    driver: "Luis Hernández",
    from: "Aeropuerto José Martí, La Habana",
    to: "Hotel Nacional, La Habana",
    price: "200 CUP",
    status: "completed",
    date: "Hoy, 10:15",
  },
  {
    id: "ride-3",
    passenger: "Pedro Sánchez",
    driver: "Roberto Fernández",
    from: "Universidad de La Habana",
    to: "Malecón, La Habana",
    price: "150 CUP",
    status: "cancelled",
    date: "Ayer, 18:45",
  },
  {
    id: "ride-4",
    passenger: "Carmen López",
    driver: "Juan Pérez",
    from: "Parque Central, La Habana",
    to: "Playas del Este, La Habana",
    price: "250 CUP",
    status: "completed",
    date: "Ayer, 12:30",
  },
]

// Mock data for pending verifications
const pendingVerifications = [
  {
    id: "verification-1",
    name: "Roberto Fernández",
    type: "driver_license",
    submitted: "Hace 1 día",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "verification-2",
    name: "Ana Martínez",
    type: "identity",
    submitted: "Hace 2 días",
    photo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "verification-3",
    name: "Luis Hernández",
    type: "vehicle",
    submitted: "Hace 3 días",
    photo: "/placeholder.svg?height=40&width=40",
  },
]

export function AdminDashboard() {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Panel de Administración</h2>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración de Movi+. Aquí puedes gestionar usuarios, viajes, pagos y más.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.users.total}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.users.growth > 0 ? (
                <span className="text-green-500 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />+{dashboardStats.users.growth}% desde el mes pasado
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  {dashboardStats.users.growth}% desde el mes pasado
                </span>
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Viajes</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.rides.total}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.rides.growth > 0 ? (
                <span className="text-green-500 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />+{dashboardStats.rides.growth}% desde el mes pasado
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  {dashboardStats.rides.growth}% desde el mes pasado
                </span>
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.revenue.total}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.revenue.growth > 0 ? (
                <span className="text-green-500 flex items-center">
                  <TrendingUp className="mr-1 h-3 w-3" />+{dashboardStats.revenue.growth}% desde el mes pasado
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  {dashboardStats.revenue.growth}% desde el mes pasado
                </span>
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conductores Activos</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.drivers.active}</div>
            <p className="text-xs text-muted-foreground">
              De un total de {dashboardStats.drivers.active + dashboardStats.drivers.inactive} conductores
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Usuarios</CardTitle>
            <CardDescription>Distribución de usuarios por tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Pasajeros</span>
                  <span className="font-medium">{dashboardStats.users.passengers}</span>
                </div>
                <Progress
                  value={(dashboardStats.users.passengers / dashboardStats.users.total) * 100}
                  className="h-2"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Conductores</span>
                  <span className="font-medium">{dashboardStats.users.drivers}</span>
                </div>
                <Progress value={(dashboardStats.users.drivers / dashboardStats.users.total) * 100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Conductores Pendientes</span>
                  <span className="font-medium">{dashboardStats.drivers.pending}</span>
                </div>
                <Progress value={(dashboardStats.drivers.pending / dashboardStats.users.total) * 100} className="h-2" />
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Ver Todos los Usuarios
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Viajes</CardTitle>
            <CardDescription>Distribución de viajes por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Viajes Completados</span>
                  <span className="font-medium">{dashboardStats.rides.completed}</span>
                </div>
                <Progress value={(dashboardStats.rides.completed / dashboardStats.rides.total) * 100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Viajes Cancelados</span>
                  <span className="font-medium">{dashboardStats.rides.cancelled}</span>
                </div>
                <Progress value={(dashboardStats.rides.cancelled / dashboardStats.rides.total) * 100} className="h-2" />
              </div>
            </div>
            <div className="mt-6">
              <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="day">Día</TabsTrigger>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                  <TabsTrigger value="month">Mes</TabsTrigger>
                </TabsList>
                <TabsContent value="day" className="space-y-4">
                  <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center mt-4">
                    <span className="text-sm text-muted-foreground">Gráfico de viajes diarios</span>
                  </div>
                </TabsContent>
                <TabsContent value="week" className="space-y-4">
                  <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center mt-4">
                    <span className="text-sm text-muted-foreground">Gráfico de viajes semanales</span>
                  </div>
                </TabsContent>
                <TabsContent value="month" className="space-y-4">
                  <div className="h-[200px] w-full bg-muted/50 rounded-lg flex items-center justify-center mt-4">
                    <span className="text-sm text-muted-foreground">Gráfico de viajes mensuales</span>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Verificaciones Pendientes</CardTitle>
            <CardDescription>Documentos pendientes de verificación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVerifications.map((verification) => (
                <div key={verification.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={verification.photo || "/placeholder.svg"} alt={verification.name} />
                    <AvatarFallback>{verification.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{verification.name}</div>
                    <div className="text-xs text-muted-foreground">{verification.submitted}</div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs">
                        {verification.type === "driver_license" && "Licencia de Conducir"}
                        {verification.type === "identity" && "Documento de Identidad"}
                        {verification.type === "vehicle" && "Documentos del Vehículo"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Clock className="mr-2 h-4 w-4" />
                Ver Todas las Verificaciones
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Viajes Recientes</CardTitle>
            <CardDescription>Últimos viajes realizados en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRides.map((ride) => (
                <div key={ride.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{ride.date}</span>
                      <span className="font-medium">{ride.price}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>Pasajero:</span>
                        <span className="font-medium">{ride.passenger}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Conductor:</span>
                        <span className="font-medium">{ride.driver}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-start gap-1">
                        <span>De:</span>
                        <span>{ride.from}</span>
                      </div>
                      <div className="flex items-start gap-1">
                        <span>A:</span>
                        <span>{ride.to}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={ride.status === "completed" ? "default" : "destructive"} className="ml-auto">
                    {ride.status === "completed" ? "Completado" : "Cancelado"}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Ver Todos los Viajes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
