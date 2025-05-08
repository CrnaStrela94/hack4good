'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/src/components/ui/scroll-area';
import { Input } from '@/src/components/ui/input';
import { ArrowLeft, ChevronRight, Heart, MessageCircle, Share2, Users, Calendar, MapPin, Plus } from 'lucide-react';
import AppLayout from '@/src/app/layout-with-nav';

export default function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('about');
  const [newInterest, setNewInterest] = useState('');

  // Normally we would fetch this data based on the ID
  const event = {
    id: Number.parseInt(params.id),
    title: 'Swedish Fika & Language Exchange',
    image: '/placeholder.svg?height=400&width=800',
    hostName: 'Anna Lindberg',
    hostImage: '/placeholder.svg?height=100&width=100',
    date: 'Tomorrow at 4:00 PM',
    location: 'Espresso House, Drottninggatan',
    fullAddress: 'Drottninggatan 33, 111 51 Stockholm',
    description:
      "Join us for a relaxed afternoon of Swedish language practice over fika! All levels welcome - from complete beginners to advanced speakers. We'll pair up to practice conversations and enjoy some delicious cinnamon buns and coffee. The group has evolved to include cultural exchange and making new friends in Stockholm.",
    distance: '1.2 km away',
    interestMatch: 85,
    attendees: 8,
    spotsLeft: 4,
    tags: ['Language Exchange', 'Swedish Practice', 'Coffee', 'Fika'],
    members: [
      { id: 1, name: 'Anna L', image: '/placeholder.svg?height=100&width=100' },
      { id: 2, name: 'Johan S', image: '/placeholder.svg?height=100&width=100' },
      { id: 3, name: 'Maria K', image: '/placeholder.svg?height=100&width=100' },
      { id: 4, name: 'Erik N', image: '/placeholder.svg?height=100&width=100' },
      { id: 5, name: 'Sofia B', image: '/placeholder.svg?height=100&width=100' },
      { id: 6, name: 'Lars A', image: '/placeholder.svg?height=100&width=100' },
      { id: 7, name: 'Karin T', image: '/placeholder.svg?height=100&width=100' },
      { id: 8, name: 'Anders P', image: '/placeholder.svg?height=100&width=100' },
    ],
    suggestedInterests: ['Swedish Culture', 'Books', 'Board Games'],
  };

  const submitInterest = () => {
    if (newInterest) {
      // In a real app, we would send this to an API
      console.log('New interest suggested:', newInterest);
      setNewInterest('');
    }
  };

  return (
    <AppLayout>
      <div className="pb-20">
        <header className="relative">
          <div className="absolute top-4 left-4 z-10">
            <Button variant="secondary" size="icon" className="rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative h-64 w-full">
            <Image src={event.image || '/placeholder.svg'} alt={event.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {event.attendees} going
                </Badge>
                <Badge className="flex items-center gap-1">{event.spotsLeft} spots left</Badge>
                <Badge variant="outline" className="bg-background/80">
                  Wheelchair accessible
                </Badge>
                <Badge variant="outline" className="bg-background/80">
                  English spoken
                </Badge>
              </div>

              <h1 className="text-2xl font-bold text-white">{event.title}</h1>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={event.hostImage || '/placeholder.svg'} alt={event.hostName} />
                <AvatarFallback>{event.hostName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Hosted by {event.hostName}</p>
                <p className="text-xs text-muted-foreground">{event.distance}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-2 border rounded-lg p-3">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{event.date}</p>
                <p className="text-sm text-muted-foreground">Add to your calendar</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{event.location}</p>
                <p className="text-sm text-muted-foreground">{event.fullAddress}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h2 className="font-medium">About this group</h2>
                <p className="text-sm">{event.description}</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-medium">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="font-medium">This group's interests have grown to include:</h2>
                <div className="flex flex-wrap gap-2">
                  {event.suggestedInterests.map((interest) => (
                    <Badge key={interest} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t pt-4 mt-6">
                <h2 className="font-medium">Suggest an interest</h2>
                <p className="text-sm text-muted-foreground">
                  Help this group evolve by suggesting new interests or topics
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Suggest a new interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                  />
                  <Button type="button" onClick={submitInterest} disabled={!newInterest}>
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="members" className="mt-4">
              <div className="space-y-4">
                <h2 className="font-medium">Members attending ({event.members.length})</h2>

                <ScrollArea className="pb-4">
                  <div className="flex gap-4">
                    {event.members.map((member) => (
                      <div key={member.id} className="flex flex-col items-center gap-1 w-20">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={member.image || '/placeholder.svg'} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-center">{member.name}</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <div className="space-y-2">
                  <h2 className="font-medium">Invite friends</h2>
                  <p className="text-sm text-muted-foreground">
                    This event is open to new people. Invite friends to join!
                  </p>

                  <Button className="w-full">Invite Friends</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="mt-4">
              <div className="flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={event.hostImage || '/placeholder.svg'} alt={event.hostName} />
                      <AvatarFallback>{event.hostName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm font-medium">{event.hostName}</p>
                      <p className="text-sm">
                        Hello everyone! Looking forward to meeting you all tomorrow for our fika and language exchange.
                        Don't forget to bring any Swedish language questions you might have!
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2:30 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Maria" />
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm font-medium">Maria K</p>
                      <p className="text-sm">
                        I'm excited too! My first time joining this group. I'm a complete beginner in Swedish.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">3:15 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Johan" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm font-medium">Johan S</p>
                      <p className="text-sm">
                        Welcome Maria! Don't worry, we have people at all levels. I've been learning for about 6 months
                        now.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">3:22 PM</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Input placeholder="Type your message..." />
                    <Button>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                    <Button variant="outline" size="sm">
                      👋 Hello everyone!
                    </Button>
                    <Button variant="outline" size="sm">
                      🙋‍♀️ Looking forward to it!
                    </Button>
                    <Button variant="outline" size="sm">
                      ❓ What should I bring?
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="fixed bottom-20 left-4 right-4 bg-background pb-4">
            <Button className="w-full" size="lg">
              Join This Event
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
