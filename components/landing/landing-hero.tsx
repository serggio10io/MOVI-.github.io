"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { MapPin, Navigation, Clock, Shield } from "lucide-react"

export function LandingHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.03]" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Viaja por Cuba con <span className="text-primary">Movi+</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Conectamos pasajeros y conductores de forma segura y eficiente. Viaja a donde quieras, cuando quieras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/register">Comenzar Ahora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register?role=driver">Conviértete en Conductor</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Viajes en toda Cuba</h3>
                  <p className="text-sm text-muted-foreground">Cobertura nacional</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Navigation className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Rutas Optimizadas</h3>
                  <p className="text-sm text-muted-foreground">Llega más rápido</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">24/7 Disponible</h3>
                  <p className="text-sm text-muted-foreground">Cuando lo necesites</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Viajes Seguros</h3>
                  <p className="text-sm text-muted-foreground">Conductores verificados</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-1">
              <div className="bg-background rounded-xl overflow-hidden shadow-xl">
                <div className="aspect-[4/5] relative">
                  <div className="absolute inset-0 bg-map-pattern opacity-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80%] bg-card rounded-xl shadow-lg p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Solicitar Viaje</h3>
                          <span className="text-xs text-muted-foreground">Movi+</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-sm">Mi ubicación actual</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-sm">¿A dónde vas?</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-muted p-2 rounded-md text-center">
                            <span className="text-xs">Moto</span>
                          </div>
                          <div className="bg-primary/20 p-2 rounded-md text-center border border-primary">
                            <span className="text-xs font-medium">Auto</span>
                          </div>
                          <div className="bg-muted p-2 rounded-md text-center">
                            <span className="text-xs">Camioneta</span>
                          </div>
                        </div>
                        <Button className="w-full">Solicitar Ahora</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-12 w-12 bg-primary/30 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -left-8 h-16 w-16 bg-primary/20 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
