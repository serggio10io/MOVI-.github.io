"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, CreditCard, Star, Bell, Shield, MessageSquare, Smartphone, Zap, Car } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Solicitud de Viajes",
    description: "Interfaz intuitiva para ingresar origen y destino con opciones de vehículo y precios transparentes.",
  },
  {
    icon: Car,
    title: "Sistema de Conductores",
    description:
      "Plataforma para conductores con aceptación de viajes, geolocalización en tiempo real e historial de ganancias.",
  },
  {
    icon: CreditCard,
    title: "Pagos Flexibles",
    description: "Múltiples opciones de pago incluyendo pasarelas internacionales, soluciones locales y efectivo.",
  },
  {
    icon: Star,
    title: "Reseñas y Reputación",
    description: "Sistema de puntuación para conductores y pasajeros con comentarios públicos y privados.",
  },
  {
    icon: Bell,
    title: "Notificaciones en Tiempo Real",
    description: "Alertas para conductores y pasajeros con chat integrado para comunicación directa.",
  },
  {
    icon: Shield,
    title: "Seguridad y Privacidad",
    description: "Encriptación de datos, cumplimiento de GDPR y botón de emergencia con alerta a autoridades.",
  },
  {
    icon: Zap,
    title: "IA Avanzada",
    description: "Optimización de rutas, precios dinámicos y recomendaciones personalizadas.",
  },
  {
    icon: Smartphone,
    title: "Modo Offline",
    description: "Diseño adaptable a móvil con modo de bajo consumo de datos para limitaciones de internet.",
  },
  {
    icon: MessageSquare,
    title: "Soporte con Chatbot",
    description: "Asistente virtual para resolver dudas y proporcionar ayuda inmediata.",
  },
]

export function LandingFeatures() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Características Principales</h2>
          <p className="text-muted-foreground">
            Movi+ ofrece una experiencia completa para pasajeros y conductores con tecnología de vanguardia adaptada al
            mercado cubano.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
