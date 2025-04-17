"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Smartphone, MapPin, Car, ThumbsUp } from "lucide-react"

const steps = [
  {
    icon: Smartphone,
    title: "Regístrate",
    description: "Crea tu cuenta en minutos con tu teléfono o redes sociales.",
    color: "bg-blue-500/10",
    textColor: "text-blue-500",
  },
  {
    icon: MapPin,
    title: "Solicita un viaje",
    description: "Ingresa tu origen y destino, elige el tipo de vehículo.",
    color: "bg-green-500/10",
    textColor: "text-green-500",
  },
  {
    icon: Car,
    title: "Conductor asignado",
    description: "Un conductor cercano aceptará tu viaje y llegará a tu ubicación.",
    color: "bg-amber-500/10",
    textColor: "text-amber-500",
  },
  {
    icon: ThumbsUp,
    title: "Disfruta y califica",
    description: "Viaja seguro y califica tu experiencia al finalizar.",
    color: "bg-primary/10",
    textColor: "text-primary",
  },
]

export function LandingHowItWorks() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo Funciona?</h2>
          <p className="text-muted-foreground">
            Movi+ hace que viajar por Cuba sea simple, seguro y conveniente en solo unos pasos.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Timeline connector */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="md:w-1/2 text-center md:text-left">
                  <div
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${step.color} ${step.textColor} mb-4`}
                  >
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground max-w-md mx-auto md:mx-0">{step.description}</p>
                </div>
                <div className="md:w-1/2 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary hidden md:block" />

                  <div className={`bg-muted rounded-xl p-6 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                    <div className="aspect-video bg-card rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-sm text-muted-foreground">Ilustración del Paso {index + 1}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <Button size="lg" asChild>
            <Link href="/register">Comenzar Ahora</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
