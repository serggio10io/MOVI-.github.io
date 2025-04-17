"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Navigation, Clock, Star, Car, BarChart3 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for available rides
const availableRides = [
  {
    id: "ride-1",
    passenger: {
      name: "Ana Martínez",
      rating: 4.7,
      photo: "/placeholder.svg?height=40&width=40",
    },
    from: "Calle 23, La Habana",
    to: "Varadero, Matanzas",
    distance: "140 km",
    estimatedTime: "2h 10min",
    price: "500 CUP",
    timestamp: "Hace 2 minutos",
  },
  {
    id: "ride-2",
    passenger: {
      name: "Luis Hernández",
      rating: 4.9,
      photo: "/placeholder.svg?height=40&width=40",
    },
    from: "Aeropuerto José Martí, La Habana",
    to: "Hotel Nacional, La Habana",
    distance: "20 km",
    estimatedTime: "25min",
    price: "200 CUP",
    timestamp: "Hace 5 minutos",
  },
]

// Mock data for recent rides
const recentRides = [
  {
    id: "past-ride-1",
    date: "Hoy, 10:30",
    passenger: {
      name: "Pedro Sánchez",
      rating: 4.8,
      photo: "/placeholder.svg?height=40&width=40",
    },
    from: "Calle Obispo, Habana Vieja",
    to: "Miramar, La Habana",
    distance: "15 km",
    estimatedTime: "30min",
    price: "180 CUP",
    status: "completed",
  },
  {
    id: "past-ride-2",
    date: "Ayer, 16:45",
    passenger: {
      name: "Carmen López",
      rating: 4.6,
      photo: "/placeholder.svg?height=40&width=40",
    },
    from: "Parque Central, La Habana",
    to: "Playas del Este, La Habana",
    distance: "25 km",
    estimatedTime: "40min",
    price: "250 CUP",
    status: "completed",
  },
  {
    id: "past-ride-3",
    date: "15/04/2023, 09:15",
    passenger: {
      name: "Roberto Díaz",
      rating: 4.9,
      photo: "/placeholder.svg?height=40&width=40",
    },
    from: "Marina Hemingway, La Habana",
    to: "Fábrica de Arte Cubano, La Habana",
    distance: "12 km",
    estimatedTime: "20min",
    price: "150 CUP",
    status: "completed",
  },
]

// Mock data for earnings
const earningsData = {
  today: "850 CUP",
  week: "4,250 CUP",
  month: "18,500 CUP",
  trips: {
    today: 5,
    week: 25,
    month: 110,
  },
  chart: [30, 40, 45, 50, 55, 60, 65, 60, 55, 50, 45, 40],
}

export function DriverDashboard() {
  const { user } = useAuth()
  const [isAvailable, setIsAvailable] = useState(true)
  const [activeRide, setActiveRide] = useState<any>(null)

  const handleAcceptRide = (ride: any) => {
    setActiveRide({
      ...ride,
      status: "accepted",
      startTime: new Date().toLocaleTimeString(),
    })
  }

  const handleStartRide = () => {
    setActiveRide({
      ...activeRide,
      status: "in_progress",
    })
  }

  const handleCompleteRide = () => {
    setActiveRide(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-2/3 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Bienvenido, {user?.name}</CardTitle>
                  <CardDescription>
                    {isAvailable ? "Estás disponible para recibir viajes" : "No estás disponible para recibir viajes"}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="available-mode" checked={isAvailable} onCheckedChange={setIsAvailable} />
                  <Label htmlFor="available-mode">{isAvailable ? "Disponible" : "No disponible"}</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {activeRide ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-lg">Viaje Activo</h3>
                        <p className="text-sm text-muted-foreground">
                          {activeRide.status === "accepted" ? "Dirígete a recoger al pasajero" : "En camino al destino"}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-primary/20 text-primary">
                        {activeRide.status === "accepted" ? "Por recoger" : "En progreso"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12 border-2 border-primary">
                        <AvatarImage
                          src={activeRide.passenger.photo || "/placeholder.svg"}
                          alt={activeRide.passenger.name}
                        />
                        <AvatarFallback>{activeRide.passenger.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{activeRide.passenger.name}</div>
                        <div className="flex items-center text-sm">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span>{activeRide.passenger.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="space-y-1">
                        <Label className="text-xs">Distancia</Label>
                        <div className="text-sm">{activeRide.distance}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Tiempo Est.</Label>
                        <div className="text-sm">{activeRide.estimatedTime}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Precio</Label>
                        <div className="text-sm font-medium">{activeRide.price}</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span>Progreso del viaje</span>
                        <span>{activeRide.status === "accepted" ? "Recogiendo pasajero" : "En ruta"}</span>
                      </div>
                      <Progress value={activeRide.status === "accepted" ? 30 : 70} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <div>
                          <Label className="text-xs">Origen</Label>
                          <p className="text-sm">{activeRide.from}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Navigation className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <Label className="text-xs">Destino</Label>
                          <p className="text-sm">{activeRide.to}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" onClick={() => setActiveRide(null)}>
                        Cancelar Viaje
                      </Button>
                      {activeRide.status === "accepted" ? (
                        <Button onClick={handleStartRide}>Iniciar Viaje</Button>
                      ) : (
                        <Button onClick={handleCompleteRide}>Completar Viaje</Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : isAvailable ? (
                <div className="space-y-4">
                  <h3 className="font-medium">Viajes Disponibles</h3>
                  {availableRides.length > 0 ? (
                    <div className="space-y-4">
                      {availableRides.map((ride) => (
                        <div
                          key={ride.id}
                          className="flex flex-col p-4 rounded-lg border hover:border-primary/50 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={ride.passenger.photo || "/placeholder.svg"}
                                  alt={ride.passenger.name}
                                />
                                <AvatarFallback>{ride.passenger.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{ride.passenger.name}</div>
                                <div className="flex items-center text-xs">
                                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                  <span>{ride.passenger.rating}</span>
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{ride.timestamp}</span>
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <div>
                                <Label className="text-xs">Origen</Label>
                                <p className="text-sm">{ride.from}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Navigation className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <div>
                                <Label className="text-xs">Destino</Label>
                                <p className="text-sm">{ride.to}</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mb-3">
                            <div className="space-y-1">
                              <Label className="text-xs">Distancia</Label>
                              <div className="text-sm">{ride.distance}</div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Tiempo Est.</Label>
                              <div className="text-sm">{ride.estimatedTime}</div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Precio</Label>
                              <div className="text-sm font-medium">{ride.price}</div>
                            </div>
                          </div>

                          <Button onClick={() => handleAcceptRide(ride)}>Aceptar Viaje</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Car className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-lg mb-1">No hay viajes disponibles</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        No hay solicitudes de viaje en este momento. Te notificaremos cuando haya nuevos viajes
                        disponibles.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Car className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg mb-1">Modo No Disponible</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Actualmente no estás disponible para recibir viajes. Activa el modo disponible para comenzar a
                    recibir solicitudes.
                  </p>
                  <Button className="mt-4" onClick={() => setIsAvailable(true)}>
                    Activar Disponibilidad
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Viajes Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRides.map((ride) => (
                  <div
                    key={ride.id}
                    className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{ride.date}</span>
                        <span className="font-medium">{ride.price}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                          <span className="truncate">{ride.from}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Navigation className="h-3 w-3 mt-0.5 shrink-0" />
                          <span className="truncate">{ride.to}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span>Pasajero: {ride.passenger.name}</span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {ride.passenger.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/3 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Mis Ganancias</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="today" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="today">Hoy</TabsTrigger>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                  <TabsTrigger value="month">Mes</TabsTrigger>
                </TabsList>
                <TabsContent value="today" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Ganancias</div>
                      <div className="text-2xl font-bold">{earningsData.today}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Viajes</div>
                      <div className="text-2xl font-bold">{earningsData.trips.today}</div>
                    </div>
                  </div>
                  <div className="h-[150px] w-full bg-muted/50 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Gráfico de ganancias diarias</span>
                  </div>
                </TabsContent>
                <TabsContent value="week" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Ganancias</div>
                      <div className="text-2xl font-bold">{earningsData.week}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Viajes</div>
                      <div className="text-2xl font-bold">{earningsData.trips.week}</div>
                    </div>
                  </div>
                  <div className="h-[150px] w-full bg-muted/50 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Gráfico de ganancias semanales</span>
                  </div>
                </TabsContent>
                <TabsContent value="month" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Ganancias</div>
                      <div className="text-2xl font-bold">{earningsData.month}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Viajes</div>
                      <div className="text-2xl font-bold">{earningsData.trips.month}</div>
                    </div>
                  </div>
                  <div className="h-[150px] w-full bg-muted/50 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Gráfico de ganancias mensuales</span>
                  </div>
                </TabsContent>
              </Tabs>
              <Button variant="outline" className="w-full mt-4">
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver Estadísticas Detalladas
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Mi Vehículo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Chevrolet Spark</div>
                    <div className="text-sm text-muted-foreground">Negro • 2018</div>
                    <div className="text-sm">Placa: P123456</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estado del vehículo</span>
                    <span className="text-green-500">Verificado</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Licencia de conducir</span>
                    <span className="text-green-500">Verificada</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Seguro</span>
                    <span className="text-green-500">Activo</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Car className="mr-2 h-4 w-4" />
                  Actualizar Información
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Consejos para Conductores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Mantén tu vehículo limpio</div>
                  <div className="text-sm text-muted-foreground">
                    Los pasajeros valoran la limpieza y el buen estado del vehículo.
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Sé puntual</div>
                  <div className="text-sm text-muted-foreground">
                    Llegar a tiempo mejora tu calificación y aumenta tus propinas.
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Conoce las rutas</div>
                  <div className="text-sm text-muted-foreground">
                    Familiarízate con las principales rutas y atajos de la ciudad.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
