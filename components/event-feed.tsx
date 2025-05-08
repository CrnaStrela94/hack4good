import EventCard from "@/components/event-card"
import { Separator } from "@/components/ui/separator"

const events = [
  {
    id: 1,
    title: "Swedish Fika & Language Exchange",
    image: "/placeholder.svg?height=400&width=800",
    hostName: "Anna Lindberg",
    hostImage: "/placeholder.svg?height=100&width=100",
    date: "Tomorrow at 4:00 PM",
    location: "Espresso House, Drottninggatan",
    distance: "1.2 km away",
    interestMatch: 85,
    attendees: 8,
    spotsLeft: 4,
    tags: ["Language Exchange", "Swedish Practice", "Coffee"],
  },
  {
    id: 2,
    title: "Weekend Hiking in Söderåsen",
    image: "/placeholder.svg?height=400&width=800",
    hostName: "Johan Andersson",
    hostImage: "/placeholder.svg?height=100&width=100",
    date: "Saturday at 10:00 AM",
    location: "Söderåsen National Park",
    distance: "12 km away",
    interestMatch: 92,
    attendees: 12,
    spotsLeft: 3,
    tags: ["Hiking", "Outdoors", "Nature Photography"],
  },
  {
    id: 3,
    title: "Swedish Midsummer Traditions Workshop",
    image: "/placeholder.svg?height=400&width=800",
    hostName: "Karin Svensson",
    hostImage: "/placeholder.svg?height=100&width=100",
    date: "June 20 at 1:00 PM",
    location: "Folkets Park",
    distance: "3.5 km away",
    interestMatch: 78,
    attendees: 15,
    spotsLeft: 10,
    tags: ["Swedish Traditions", "Midsummer", "Workshop"],
  },
]

export default function EventFeed() {
  return (
    <div className="space-y-6 py-4 px-4">
      {events.map((event, index) => (
        <div key={event.id}>
          <EventCard event={event} />
          {index < events.length - 1 && <Separator className="mt-6" />}
        </div>
      ))}
    </div>
  )
}
