"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StepIndicator from "@/components/step-indicator"
import { Facebook, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingStep1() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [activeTab, setActiveTab] = useState("email")

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const validatePhone = (value: string) => {
    if (!value) {
      setPhoneError("Phone number is required")
      return false
    }
    if (!/^\+?[0-9]{10,15}$/.test(value.replace(/\s/g, ""))) {
      setPhoneError("Please enter a valid phone number")
      return false
    }
    setPhoneError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeTab === "email" && validateEmail(email)) {
      router.push("/onboarding/step-2")
    } else if (activeTab === "phone" && validatePhone(phone)) {
      router.push("/onboarding/step-2")
    }
  }

  const isValid = () => {
    if (activeTab === "email") return email !== "" && !emailError
    if (activeTab === "phone") return phone !== "" && !phoneError
    return false
  }

  return (
    <main className="container max-w-md mx-auto px-4 py-8">
      <StepIndicator currentStep={1} totalSteps={3} />

      <h1 className="text-2xl font-bold text-center mt-8 mb-6">Create Your Account</h1>

      <Card>
        <CardHeader className="flex justify-center">
          <div className="flex gap-4">
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Login with Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Login with Google</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <span className="relative bg-background px-3 text-sm text-muted-foreground">Or continue with</span>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (e.target.value) validateEmail(e.target.value)
                    }}
                    onBlur={(e) => validateEmail(e.target.value)}
                  />
                  {emailError && <p className="text-sm text-destructive">{emailError}</p>}
                </div>
              </TabsContent>

              <TabsContent value="phone" className="mt-4">
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="+46 XX XXX XXXX"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      if (e.target.value) validatePhone(e.target.value)
                    }}
                    onBlur={(e) => validatePhone(e.target.value)}
                  />
                  {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" disabled>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid()}>
            Next
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
