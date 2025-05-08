import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/src/components/ui/scroll-area';

const stories = [
  {
    id: 1,
    name: 'Anna',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
    active: true,
  },
  {
    id: 2,
    name: 'Johan',
    image:
      'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww',
    active: true,
  },
  {
    id: 3,
    name: 'Maria',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww',
    active: false,
  },
  {
    id: 4,
    name: 'Erik',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww',
    active: false,
  },
  {
    id: 5,
    name: 'Sofia',
    image:
      'https://plus.unsplash.com/premium_photo-1670884441012-c5cf195c062a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww',
    active: true,
  },
  {
    id: 6,
    name: 'Lars',
    image:
      'https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fHww',
    active: false,
  },
];

export default function StoryList() {
  return (
    <div className="py-4 border-b">
      <ScrollArea>
        <div className="flex px-4 gap-4">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-1 w-20">
              <div
                className={`p-0.5 rounded-full ${
                  story.active ? 'bg-gradient-to-tr from-yellow-400 to-blue-500' : 'bg-muted'
                }`}
              >
                <Avatar className="w-16 h-16 border-2 border-background">
                  <AvatarImage src={story.image || '/placeholder.svg'} alt={story.name} />
                  <AvatarFallback>{story.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs truncate w-full text-center">{story.name}</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
