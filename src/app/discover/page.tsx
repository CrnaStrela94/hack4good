'use client';

import { useState } from 'react';
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

export default function DiscoverPage() {
  const [sortBy, setSortBy] = useState('relevance');
  const [distance, setDistance] = useState(15);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Language Exchange',
    'Hiking',
    'Swedish Traditions',
  ]);

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

  return (
    <div className="pb-20">
      <header className="px-4 pt-6 pb-3 border-b sticky top-0 bg-background z-10 space-y-4">
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

          <Button variant="outline" size="icon" className="shrink-0">
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

      <EventFeed />
    </div>
  );
}
