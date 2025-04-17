"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Navigation, Clock, CreditCard, Star, Car, LocateFixed } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for recent rides
const recentRides = [
  {
    id: "ride-1",
    date: "Hoy, 14:30",
    from: "Calle 23, La Habana",
    to: "Varadero, Matanzas",
    price: "500 CUP",
    status: "completed",
    driver: {
      name: "Carlos Rodríguez",
      rating: 4.8,
      car: "Toyota Corolla (Azul)",
      plate: "P123456",
    },
  },
  {
    id: "ride-2",
    date: "Ayer, 09:15",
    from: "Aeropuerto José Martí, La Habana",
    to: "Hotel Nacional, La Habana",
    price: "200 CUP",
    status: "completed",
    driver: {
      name: "María González",
      rating: 4.9,
      car: "Hyundai Accent (Blanco)",
      plate: "P789012",
    },
  },
  {
    id: "ride-3",
    date: "15/04/2023, 18:45",
    from: "Universidad de La Habana",
    to: "Malecón, La Habana",
    price: "150 CUP",
    status: "completed",
    driver: {
      name: "Juan Pérez",
      rating: 4.7,
      car: "Kia Rio (Rojo)",
      plate: "P345678",
    },
  },
]

// Mock data for favorite locations
const favoriteLocations = [
  {
    id: "loc-1",
    name: "Casa",
    address: "Calle 23 #1234, Vedado, La Habana",
    type: "home",
  },
  {
    id: "loc-2",
    name: "Trabajo",
    address: "Calle Obispo #123, Habana Vieja, La Habana",
    type: "work",
  },
  {
    id: "loc-3",
    name: "Gimnasio",
    address: "Calle Línea #456, Vedado, La Habana",
    type: "gym",
  },
]

export function PassengerDashboard() {
  const { user } = useAuth()
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [vehicleType, setVehicleType] = useState("auto")
  const [isRequestingRide, setIsRequestingRide] = useState(false)
  const [activeRide, setActiveRide] = useState<any>(null)

  const handleRequestRide = () => {
    if (!origin || !destination) return

    setIsRequestingRide(true)

    // Simulate finding a driver
    setTimeout(() => {
      setIsRequestingRide(false)
      setActiveRide({
        id: "active-ride-1",
        status: "accepted",
        estimatedArrival: "5 minutos",
        from: origin,
        to: destination,
        price: "350 CUP",
        driver: {
          name: "Roberto Fernández",
          rating: 4.9,
          car: "Chevrolet Spark (Negro)",
          plate: "P567890",
          phone: "+53 5555 1234",
          photo: "/placeholder.svg?height=50&width=50",
        },
      })
    }, 3000)
  }

  const handleCancelRide = () => {
    setActiveRide(null)
    setOrigin("")
    setDestination("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-2/3 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Bienvenido, {user?.name}</CardTitle>
              <CardDescription>¿A dónde quieres ir hoy?</CardDescription>
            </CardHeader>
            <CardContent>
              {!activeRide ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origen</Label>
                    <div className="flex gap-2">
                      <Input
                        id="origin"
                        placeholder="Tu ubicación actual"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                      />
                      <Button variant="outline" size="icon" title="Usar ubicación actual">
                        <LocateFixed className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destino</Label>
                    <Input
                      id="destination"
                      placeholder="¿A dónde vas?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de Vehículo</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={vehicleType === "moto" ? "default" : "outline"}
                        className="flex flex-col gap-1 h-auto py-2"
                        onClick={() => setVehicleType("moto")}
                      >
                        <span className="text-xs">Moto</span>
                        <span className="text-xs font-normal">150 CUP</span>
                      </Button>
                      <Button
                        variant={vehicleType === "auto" ? "default" : "outline"}
                        className="flex flex-col gap-1 h-auto py-2"
                        onClick={() => setVehicleType("auto")}
                      >
                        <span className="text-xs">Auto</span>
                        <span className="text-xs font-normal">350 CUP</span>
                      </Button>
                      <Button
                        variant={vehicleType === "camioneta" ? "default" : "outline"}
                        className="flex flex-col gap-1 h-auto py-2"
                        onClick={() => setVehicleType("camioneta")}
                      >
                        <span className="text-xs">Camioneta</span>
                        <span className="text-xs font-normal">500 CUP</span>
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleRequestRide}
                    disabled={!origin || !destination || isRequestingRide}
                  >
                    {isRequestingRide ? "Buscando conductor..." : "Solicitar Viaje"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-lg">Viaje en Progreso</h3>
                        <p className="text-sm text-muted-foreground">
                          {activeRide.status === "accepted"
                            ? `Tu conductor llegará en ${activeRide.estimatedArrival}`
                            : "En camino a tu destino"}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-primary/20 text-primary">
                        {activeRide.status === "accepted" ? "Conductor asignado" : "En progreso"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12 border-2 border-primary">
                        <AvatarImage src={activeRide.driver.photo || "/placeholder.svg"} alt={activeRide.driver.name} />
                        <AvatarFallback>{activeRide.driver.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{activeRide.driver.name}</div>
                        <div className="flex items-center text-sm">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span>{activeRide.driver.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="space-y-1">
                        <Label className="text-xs">Vehículo</Label>
                        <div className="text-sm flex items-center gap-1">
                          <Car className="h-3 w-3" />
                          {activeRide.driver.car}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Placa</Label>
                        <div className="text-sm">{activeRide.driver.plate}</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span>Progreso del viaje</span>
                        <span>{activeRide.status === "accepted" ? "Conductor en camino" : "En ruta"}</span>
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
                      <Button variant="outline" onClick={handleCancelRide}>
                        Cancelar Viaje
                      </Button>
                      <Button>Contactar Conductor</Button>
                    </div>
                  </div>
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
                        <span>Conductor: {ride.driver.name}</span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {ride.driver.rating}
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
              <CardTitle>Métodos de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg border bg-card">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Efectivo</div>
                      <div className="text-xs text-muted-foreground">Método predeterminado</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    Activo
                  </Badge>
                </div>

                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Añadir Método de Pago
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Ubicaciones Favoritas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {favoriteLocations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-start gap-2 p-2 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setDestination(location.address)}
                  >
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{location.address}</div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  Añadir Ubicación
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Promociones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-lg border bg-primary/5 p-3">
                  <div className="font-medium text-primary">20% de descuento</div>
                  <div className="text-sm">En tu próximo viaje a Varadero</div>
                  <div className="text-xs text-muted-foreground mt-1">Válido hasta: 30/05/2023</div>
                </div>
                <div className="rounded-lg border bg-muted p-3">
                  <div className="font-medium">Viaje gratis</div>
                  <div className="text-sm">Invita a un amigo y obtén un viaje gratis</div>
                  <div className="text-xs text-muted-foreground mt-1">Código: AMIGO2023</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
