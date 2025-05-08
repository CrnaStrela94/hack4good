import StoryList from '@/src/components/story-list';
import EventFeed from '@/src/components/event-feed';
import AppLayout from '@/src/app/layout-with-nav';

export default function HomePage() {
  return (
    <AppLayout>
      <div className="pb-20">
        <header className="px-4 pt-6 pb-3 border-b sticky top-0 bg-background z-10">
          <h1 className="text-2xl font-bold">Explore</h1>
        </header>

        <StoryList />
        <EventFeed />
      </div>
    </AppLayout>
  );
}
