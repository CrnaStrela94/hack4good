"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ArrowLeft, CalendarIcon, MapPin, Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import StepIndicator from "@/components/step-indicator"

// Sample interests/themes
const THEMES = [
  "Language Exchange",
  "Swedish Culture",
  "Outdoor Activities",
  "Food & Cooking",
  "Sports & Fitness",
  "Arts & Crafts",
  "Music & Dance",
  "Books & Literature",
  "Technology",
  "Professional Networking",
  "Family Activities",
  "Games & Entertainment",
]

export default function CreateGroupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [title, setTitle] = useState("")
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [location, setLocation] = useState("")
  const [isOnline, setIsOnline] = useState(false)
  const [description, setDescription] = useState("")
  const [attendanceLimit, setAttendanceLimit] = useState("10")
  const [searchQuery, setSearchQuery] = useState("")

  const toggleTheme = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme)
        ? prev.filter((item) => item !== theme)
        : selectedThemes.length < 3
          ? [...prev, theme]
          : prev,
    )
  }

  const filteredThemes = searchQuery
    ? THEMES.filter((theme) => theme.toLowerCase().includes(searchQuery.toLowerCase()))
    : THEMES

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit and create the group
      router.push("/app/home")
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Create New Group</h1>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={4} />

      {currentStep === 1 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <FormLabel>Group Title</FormLabel>
              <Input placeholder="Give your group a name" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="space-y-2">
              <FormLabel>Themes (select up to 3)</FormLabel>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search themes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>

              <div className="mt-2">
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedThemes.map((theme) => (
                    <Badge key={theme} className="flex items-center gap-1">
                      {theme}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTheme(theme)} />
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {filteredThemes.map((theme) => (
                    <Badge
                      key={theme}
                      variant={selectedThemes.includes(theme) ? "default" : "outline"}
                      className="cursor-pointer justify-center"
                      onClick={() => toggleTheme(theme)}
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNextStep} disabled={!title || selectedThemes.length === 0}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormLabel>Start Time</FormLabel>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={`${hour}:00`}>
                        {`${hour}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <FormLabel>End Time</FormLabel>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={`${hour}:00`}>
                        {`${hour}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={handlePrevStep}>
              Back
            </Button>
            <Button onClick={handleNextStep} disabled={!date || !startTime}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 3 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="online-event"
                checked={isOnline}
                onCheckedChange={(checked) => setIsOnline(checked === true)}
              />
              <label
                htmlFor="online-event"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                This is an online event
              </label>
            </div>

            {!isOnline && (
              <div className="space-y-2">
                <FormLabel>Location</FormLabel>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter address or place name"
                    className="pl-9"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="h-40 bg-muted rounded-md flex items-center justify-center mt-4">
                  <span className="text-muted-foreground">Map will appear here</span>
                </div>
              </div>
            )}

            {isOnline && (
              <div className="space-y-2">
                <FormLabel>Online Meeting Link</FormLabel>
                <Input
                  placeholder="e.g., Zoom or Teams link"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">This will be shared with confirmed attendees only</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={handlePrevStep}>
              Back
            </Button>
            <Button onClick={handleNextStep} disabled={!isOnline && !location}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 4 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Describe your group and what people can expect"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Attendance Limit</FormLabel>
              <Select value={attendanceLimit} onValueChange={setAttendanceLimit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select maximum attendees" />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20, 25, 30, 50].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} people
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Preview</h3>
              <div className="rounded-md border p-4 space-y-2">
                <h4 className="font-bold">{title || "Group Title"}</h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedThemes.map((theme) => (
                    <Badge key={theme} variant="secondary" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>
                    {date ? format(date, "PPP") : "Date"} • {startTime || "Time"}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{isOnline ? "Online Event" : location || "Location"}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={handlePrevStep}>
              Back
            </Button>
            <Button onClick={handleNextStep}>Publish Group</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
