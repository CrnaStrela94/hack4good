import EventCard from '@/src/components/event-card';
import { Separator } from '@/src/components/ui/separator';
import events from '@/mock/events.json';

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
