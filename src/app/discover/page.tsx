'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import EventFeed from '@/src/components/event-feed';
import { Filter, MapPin, Search, Sliders } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet';
import { Label } from '@/src/components/ui/label';
import { Badge } from '@/src/components/ui/badge';
import { Slider } from '@/src/components/ui/slider';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import AppLayout from '@/src/app/layout-with-nav';
import { SwedenMap } from '@/src/components/sweden-map';
import { useIsMobile } from '@/hooks/use-mobile';
import EVENTS from '@/mock/events.json';

export default function DiscoverPage() {
  const [sortBy, setSortBy] = useState('relevance');
  const [distance, setDistance] = useState(15);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const isMobile = useIsMobile();

  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Language Exchange',
    'Hiking',
    'Swedish Traditions',
  ]);

  const [filteredEvents, setFilteredEvents] = useState(EVENTS);

  const [split, setSplit] = useState(50); // percent height for map on mobile
  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (selectedInterests.length > 0) {
      setFilteredEvents(EVENTS.filter((event) => event.tags.some((tag) => selectedInterests.includes(tag))));
    } else {
      setFilteredEvents(EVENTS);
    }
  }, [selectedInterests]);

  const interests = [
    'Language Exchange',
    'Hiking',
    'Swedish Traditions',
    'Food & Drink',
    'Sports',
    'Music',
    'Technology',
    'Art',
    'Photography',
    'Board Games',
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };

  const handleMapToggle = () => setShowMap((v) => !v);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    draggingRef.current = true;
    setIsDragging(true);
    document.body.style.userSelect = 'none';
  };

  const handleDragEnd = () => {
    draggingRef.current = false;
    setIsDragging(false);
    document.body.style.userSelect = '';
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!draggingRef.current) return;
    let clientY = 0;
    if ('touches' in e) {
      clientY = e.touches[0].clientY;
    } else {
      clientY = e.clientY;
    }
    const container = document.getElementById('map-list-container');
    if (container) {
      const rect = container.getBoundingClientRect();
      let percent = ((clientY - rect.top) / rect.height) * 100;
      percent = Math.max(20, Math.min(80, percent)); // clamp between 20% and 80%
      setSplit(percent);
    }
  };

  useEffect(() => {
    const onMove = (e: any) => handleDrag(e);
    const onUp = () => handleDragEnd();
    if (isDragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging]);

  const ListView = (
    <div className="flex-1 overflow-auto">
      <EventFeed />
    </div>
  );

  const MapView = (
    <div className="flex-1 min-h-[300px]">
      <SwedenMap events={filteredEvents} filterTags={selectedInterests} />
    </div>
  );

  return (
    <AppLayout>
      <div className="pb-20">
        <header className="px-4 pt-6 pb-3 border-b sticky top-0 bg-background bg-white z-10 space-y-4">
          <h1 className="text-2xl font-bold">Discover</h1>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events, interests, hosts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button
              variant={showMap ? 'default' : 'outline'}
              size="icon"
              className="shrink-0"
              onClick={handleMapToggle}
              aria-pressed={showMap}
            >
              <MapPin className="h-4 w-4" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Customize what events you see</SheetDescription>
                </SheetHeader>

                <ScrollArea className="h-[calc(100vh-8rem)] mt-4 pr-4">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Distance</h3>
                      <div className="space-y-2">
                        <Slider
                          value={[distance]}
                          min={1}
                          max={50}
                          step={1}
                          onValueChange={(val) => setDistance(val[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 km</span>
                          <span>{distance} km</span>
                          <span>50 km</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">Interests</h3>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Clear
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                          <Badge
                            key={interest}
                            variant={selectedInterests.includes(interest) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => toggleInterest(interest)}
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Date Range</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor="from-date">From</Label>
                          <Input type="date" id="from-date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="to-date">To</Label>
                          <Input type="date" id="to-date" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Accessibility</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Wheelchair accessible', 'Near public transit', 'No stairs', 'Family-friendly'].map(
                          (option) => (
                            <Badge key={option} variant="outline" className="cursor-pointer">
                              {option}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Language</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Swedish', 'English', 'Arabic', 'Spanish', 'Persian'].map((language) => (
                          <Badge key={language} variant="outline" className="cursor-pointer">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full">Apply Filters</Button>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center justify-between">
            <Tabs defaultValue="relevance" value={sortBy} onValueChange={setSortBy}>
              <TabsList>
                <TabsTrigger value="relevance">Relevance</TabsTrigger>
                <TabsTrigger value="closest">Closest</TabsTrigger>
                <TabsTrigger value="soonest">Soonest</TabsTrigger>
              </TabsList>
            </Tabs>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Sliders className="h-4 w-4" />
                  <span>Sort</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-64">
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-medium">Sort events by</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant={sortBy === 'relevance' ? 'default' : 'outline'}
                      className="justify-start"
                      onClick={() => setSortBy('relevance')}
                    >
                      Relevance
                    </Button>
                    <Button
                      variant={sortBy === 'closest' ? 'default' : 'outline'}
                      className="justify-start"
                      onClick={() => setSortBy('closest')}
                    >
                      Distance (Closest first)
                    </Button>
                    <Button
                      variant={sortBy === 'soonest' ? 'default' : 'outline'}
                      className="justify-start"
                      onClick={() => setSortBy('soonest')}
                    >
                      Date (Soonest first)
                    </Button>
                    <Button
                      variant={sortBy === 'popular' ? 'default' : 'outline'}
                      className="justify-start"
                      onClick={() => setSortBy('popular')}
                    >
                      Popularity
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {showMap ? (
          <div
            id="map-list-container"
            className={
              isMobile ? 'flex flex-col h-[calc(100dvh-8rem)] relative' : 'flex flex-row h-[calc(100dvh-8rem)]'
            }
          >
            {isMobile ? (
              <>
                <div className="w-full" style={{ height: `${split}%`, minHeight: '20%', maxHeight: '80%' }}>
                  {MapView}
                </div>
                {/* Stylish, bigger, smoother draggable divider */}
                <div
                  className={`w-full h-8 flex items-center justify-center z-20 cursor-row-resize transition-colors duration-200 ${
                    isDragging ? 'bg-gray-300' : 'bg-gray-100'
                  }`}
                  style={{ touchAction: 'none' }}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                >
                  <div
                    className={`w-16 h-3 rounded-full bg-gray-400 shadow-md transition-all duration-200 ${
                      isDragging ? 'bg-gray-500 scale-110' : 'hover:bg-gray-500'
                    }`}
                    style={{
                      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                      transition: 'background 0.2s, transform 0.2s',
                    }}
                  />
                </div>
                <div
                  className="w-full overflow-auto bg-white relative z-10"
                  style={{ height: `${100 - split}%`, minHeight: '20%', maxHeight: '80%' }}
                >
                  {ListView}
                </div>
              </>
            ) : (
              <>
                <div className="w-1/2 h-full">{MapView}</div>
                <div className="w-1/2 h-full overflow-auto bg-white relative z-10">{ListView}</div>
              </>
            )}
          </div>
        ) : (
          <EventFeed />
        )}
      </div>
    </AppLayout>
  );
}
