import EventCard from '@/src/components/event-card';
import { Separator } from '@/src/components/ui/separator';

const events = [
  {
    id: 1,
    title: 'Swedish Fika & Language Exchange',
    image:
      'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVsbGFyfGVufDB8fDB8fHww',
    hostName: 'Anna Lindberg',
    hostImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
    date: 'Tomorrow at 4:00 PM',
    location: 'Espresso House, Drottninggatan',
    distance: '1.2 km away',
    interestMatch: 85,
    attendees: 8,
    spotsLeft: 4,
    tags: ['Language Exchange', 'Swedish Practice', 'Coffee'],
  },
  {
    id: 2,
    title: 'Weekend Hiking in Söderåsen',
    image:
      'https://images.unsplash.com/photo-1723023322463-f355990a2800?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SGlraW5nJTIwaW4lMjBTJUMzJUI2ZGVyJUMzJUE1c2VufGVufDB8fDB8fHww',
    hostName: 'Johan Andersson',
    hostImage:
      'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww',
    date: 'Saturday at 10:00 AM',
    location: 'Söderåsen National Park',
    distance: '12 km away',
    interestMatch: 92,
    attendees: 12,
    spotsLeft: 3,
    tags: ['Hiking', 'Outdoors', 'Nature Photography'],
  },
  {
    id: 3,
    title: 'Swedish Midsummer Traditions Workshop',
    image:
      'https://images.unsplash.com/photo-1561628206-dc4c1afa7435?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3dlZGlzaCUyME1pZHN1bW1lcnxlbnwwfHwwfHx8MA%3D%3D',
    hostName: 'Karin Svensson',
    hostImage:
      'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    date: 'June 20 at 1:00 PM',
    location: 'Folkets Park',
    distance: '3.5 km away',
    interestMatch: 78,
    attendees: 15,
    spotsLeft: 10,
    tags: ['Swedish Traditions', 'Midsummer', 'Workshop'],
  },
  {
    id: 4,
    title: 'International Food Festival',
    image:
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMGZlc3RpdmFsfGVufDB8fDB8fHww',
    hostName: 'Maria Eriksson',
    hostImage:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww',
    date: 'Sunday at 12:00 PM',
    location: 'Central Market Square',
    distance: '2.3 km away',
    interestMatch: 88,
    attendees: 30,
    spotsLeft: 20,
    tags: ['Food & Drink', 'Cultural Exchange', 'International'],
  },
  {
    id: 5,
    title: "Beginner's Swedish Literature Club",
    image:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGl0ZXJhdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
    hostName: 'Erik Johansson',
    hostImage:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    date: 'Monday at 6:30 PM',
    location: 'City Library',
    distance: '1.8 km away',
    interestMatch: 72,
    attendees: 7,
    spotsLeft: 5,
    tags: ['Literature', 'Swedish Culture', 'Book Club'],
  },
  {
    id: 6,
    title: 'Tech Meetup: AI in Healthcare',
    image:
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaCUyMG1lZXR1cHxlbnwwfHwwfHx8MA%3D%3D',
    hostName: 'Anders Nilsson',
    hostImage:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    date: 'Wednesday at 7:00 PM',
    location: 'Tech Hub Stockholm',
    distance: '4.5 km away',
    interestMatch: 65,
    attendees: 25,
    spotsLeft: 15,
    tags: ['Technology', 'Networking', 'AI'],
  },
  {
    id: 7,
    title: 'Winter Swimming Introduction',
    image:
      'https://images.unsplash.com/photo-1543055484-ac8fe612bf31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ludGVyJTIwc3dpbW1pbmd8ZW58MHx8MHx8fDA%3D',
    hostName: 'Sofia Berg',
    hostImage:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    date: 'Saturday at 8:00 AM',
    location: 'Hellasgården',
    distance: '6.2 km away',
    interestMatch: 70,
    attendees: 10,
    spotsLeft: 5,
    tags: ['Winter Sports', 'Wellness', 'Outdoors'],
  },
  {
    id: 8,
    title: 'Traditional Swedish Cooking Class',
    image:
      'https://images.unsplash.com/photo-1625147541750-dfecb0a624a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWtlYSUyMG1lYXQlMjBiYWxsc3xlbnwwfHwwfHx8MA%3D%3D',
    hostName: 'Lars Gustafsson',
    hostImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    date: 'Friday at 5:30 PM',
    location: 'Community Kitchen',
    distance: '3.1 km away',
    interestMatch: 82,
    attendees: 8,
    spotsLeft: 4,
    tags: ['Cooking', 'Swedish Traditions', 'Food & Drink'],
  },
];

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
  );
}
