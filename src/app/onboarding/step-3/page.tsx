'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import StepIndicator from '@/src/components/step-indicator';
import { Badge } from '@/src/components/ui/badge';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import InterestCategory from '@/src/components/interest-category';
import { Input } from '@/src/components/ui/input';
import { Search, Plus, X, Sparkles } from 'lucide-react';
import INTERESTS from '@/mock/interests.json';

export default function OnboardingStep3() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [customInterest, setCustomInterest] = useState('');
  const [aiSuggestedInterests, setAiSuggestedInterests] = useState<string[]>([]);

  // Load AI-generated interests from localStorage when the component mounts
  useEffect(() => {
    const storedInterests = localStorage.getItem('aiGeneratedInterests');
    if (storedInterests) {
      try {
        const interests = JSON.parse(storedInterests);
        setAiSuggestedInterests(interests);
        // Pre-select AI-generated interests
        setSelectedInterests(interests);
      } catch (e) {
        console.error('Error parsing stored interests:', e);
      }
    }
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };

  const addCustomInterest = () => {
    if (customInterest && !selectedInterests.includes(customInterest)) {
      setSelectedInterests((prev) => [...prev, customInterest]);
      setCustomInterest('');
    }
  };

  const handleSubmit = () => {
    // Clear the localStorage item as we've used it
    localStorage.removeItem('aiGeneratedInterests');
    router.push('/home');
  };

  // Filter interests based on search query
  const filteredInterests = searchQuery
    ? INTERESTS.map((category) => ({
        ...category,
        items: category.items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())),
      })).filter((category) => category.items.length > 0)
    : INTERESTS;

  return (
    <main className="container max-w-md mx-auto px-4 py-8">
      <StepIndicator currentStep={3} totalSteps={3} />

      <h1 className="text-2xl font-bold text-center mt-8 mb-6">Select Your Interests</h1>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* AI-suggested interests section */}
          {aiSuggestedInterests.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-medium">AI-Suggested Interests</h2>
              </div>
              <div className="flex flex-wrap gap-2 p-3 bg-primary/5 rounded-md">
                {aiSuggestedInterests.map((interest) => (
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
          )}

          {/* Selected interests */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium">Your Selected Interests</h2>
            {selectedInterests.length > 0 ? (
              <div className="flex flex-wrap gap-2 min-h-10">
                {selectedInterests.map((interest) => (
                  <Badge key={interest} className="flex items-center gap-1">
                    {interest}
                    <button onClick={() => toggleInterest(interest)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground min-h-10 flex items-center">
                Select interests below to personalize your experience
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interests"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Custom interest */}
          <div className="flex gap-2">
            <Input
              placeholder="Add your own interest"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomInterest();
                }
              }}
            />
            <Button type="button" size="icon" onClick={addCustomInterest} disabled={!customInterest}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Categories */}
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-6">
              {filteredInterests.map((category) => (
                <InterestCategory
                  key={category.category}
                  title={category.category}
                  interests={category.items}
                  selectedInterests={selectedInterests}
                  onToggle={toggleInterest}
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={handleSubmit}>Complete</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
