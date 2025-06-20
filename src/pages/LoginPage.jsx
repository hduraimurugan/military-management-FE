import React from "react"
import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Lock, Mail, Shield, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { toast } from "sonner"

export const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [lastSubmit, setLastSubmit] = useState(0)

  const navigate = useNavigate();
  const { login } = useAuth();

  // Throttling: prevent multiple submissions within 2 seconds
  const THROTTLE_DELAY = 2000

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault()
      // Throttling check
      const now = Date.now()
      if (now - lastSubmit < THROTTLE_DELAY) {
        return
      }
      setLastSubmit(now)
      setLoading(true)
      setError("")
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`, {
          email,
          password
        }, { withCredentials: true })

        login(res.data.user)
        toast('Login successful', 'success')
        navigate('/')
      } catch (err) {
        const msg = err?.response?.data?.message || 'Login failed'
        toast(msg, 'error')
      } finally {
        setLoading(false)
      }
    },
    [email, password, lastSubmit],
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/90 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/20 to-secondary/90 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-secondary/40 backdrop-blur-xl">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Badge variant="secondary" className="text-xs px-2 py-1 bg-green-100 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Secure
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Military Asset & Inventory
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Secure access to military asset management system
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-950/50">
                <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="officer@military.gov"
                    className="pl-10 h-12 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </Label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="pl-10 pr-10 h-12 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-10 w-10 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !email || !password}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Sign In Securely
                  </>
                )}
              </Button>
            </form>


          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-6">
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Need assistance?{" "}
                <Link
                  href="/support"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Contact IT Support
                </Link>
              </p>
            </div>

            {/* <div className="text-center">
              <p className="text-xs text-slate-400 dark:text-slate-500">Protected by military-grade encryption</p>
            </div> */}
          </CardFooter>
        </Card>

        {/* Security notice */}
        {/* <div className="mt-6 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            This system is for authorized personnel only. All activities are monitored and logged.
          </p>
        </div> */}
      </div>
    </div>
  )
}
