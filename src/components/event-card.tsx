import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/src/components/ui/card';
import { Heart, MessageCircle, Share2, Users } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  image: string;
  hostName: string;
  hostImage: string;
  date: string;
  location: string;
  distance: string;
  interestMatch: number;
  attendees: number;
  spotsLeft: number;
  tags: string[];
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-0 pt-0 pb-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image src={event.image || '/placeholder.svg'} alt={event.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between items-end">
              <h3 className="font-bold text-lg text-white">{event.title}</h3>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {event.spotsLeft} spots left
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={event.hostImage || '/placeholder.svg'} alt={event.hostName} />
              <AvatarFallback>{event.hostName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{event.hostName}</p>
              <p className="text-xs text-muted-foreground">{event.date}</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Badge variant="outline" className="text-xs">
              {event.distance}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center mt-2">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Interest match</p>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${event.interestMatch}%` }} />
            </div>
          </div>
          <p className="ml-2 text-sm font-medium">{event.interestMatch}%</p>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 flex justify-between border-t">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Like</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Comment</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
        <Button size="sm" asChild>
          <Link href={`/app/event/${event.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
