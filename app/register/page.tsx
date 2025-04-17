"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Facebook, Mail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { register, loading } = useAuth()

  const defaultRole = searchParams.get("role") || "passenger"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"admin" | "driver" | "passenger">(defaultRole as "admin" | "driver" | "passenger")
  const [error, setError] = useState("")

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      await register(name, email, password, role)
      router.push("/dashboard")
    } catch (err) {
      setError("Error al registrar. Por favor, inténtalo de nuevo.")
    }
  }

  const handlePhoneRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // In a real app, this would send a verification code
      // For demo purposes, we'll just use the email register
      await register(name, `${phone}@example.com`, "password", role)
      router.push("/dashboard")
    } catch (err) {
      setError("Error al registrar con teléfono. Por favor, inténtalo de nuevo.")
    }
  }

  const handleSocialRegister = async (provider: string) => {
    setError("")

    try {
      // In a real app, this would redirect to OAuth flow
      // For demo purposes, we'll just use the email register
      await register(`Usuario ${provider}`, `${provider}@example.com`, "password", role)
      router.push("/dashboard")
    } catch (err) {
      setError(`Error al registrar con ${provider}. Por favor, inténtalo de nuevo.`)
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-primary">Movi+</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Crear Cuenta</CardTitle>
            <CardDescription className="text-center">Elige un método para registrarte en Movi+</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Tipo de Cuenta</Label>
              <Select value={role} onValueChange={(value) => setRole(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passenger">Pasajero</SelectItem>
                  <SelectItem value="driver">Conductor</SelectItem>
                </SelectContent>
              </Select>
              {role === "driver" && (
                <p className="text-xs text-muted-foreground">
                  Como conductor, necesitarás verificar tu identidad y licencia de conducir.
                </p>
              )}
            </div>

            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Teléfono</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form onSubmit={handleEmailRegister} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="text-sm text-destructive">{error}</div>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="phone">
                <form onSubmit={handlePhoneRegister} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-phone">Nombre Completo</Label>
                    <Input
                      id="name-phone"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+53 5555 5555"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="text-sm text-destructive">{error}</div>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Enviando código..." : "Enviar Código de Verificación"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">O continúa con</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => handleSocialRegister("facebook")} disabled={loading}>
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" onClick={() => handleSocialRegister("google")} disabled={loading}>
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Iniciar Sesión
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              Al registrarte, aceptas nuestros{" "}
              <Link href="/terms" className="hover:underline">
                Términos de Servicio
              </Link>{" "}
              y{" "}
              <Link href="/privacy" className="hover:underline">
                Política de Privacidad
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
