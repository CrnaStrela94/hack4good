'use client';

import type React from 'react';

import StepIndicator from '@/src/components/step-indicator';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Camera, Sparkles, Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { generateInterestsFromBio } from '@/src/lib/ai-api';

const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-free', 'Lactose-free'];
const MOBILITY_OPTIONS = ['Accessible transit', 'Wheelchair access', 'No stairs', 'Near public transit'];
const FAMILY_OPTIONS = ['Family-friendly', 'Kid activities', 'Adult only', 'Teen friendly'];
const PET_OPTIONS = ['Pet-friendly', 'Dog-friendly', 'Cat-friendly', 'No pets'];

export default function OnboardingStep2() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [nameError, setNameError] = useState('');
  const [bioError, setBioError] = useState('');
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [isGeneratingInterests, setIsGeneratingInterests] = useState(false);
  const [generatedInterests, setGeneratedInterests] = useState<string[]>([]);

  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedMobility, setSelectedMobility] = useState<string[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<string[]>([]);
  const [selectedPet, setSelectedPet] = useState<string[]>([]);

  const validateName = (value: string) => {
    if (!value) {
      setNameError('Name is required');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateBio = (value: string) => {
    if (value.length > 150) {
      setBioError(`Bio is too long (${value.length}/150)`);
      return false;
    }
    setBioError('');
    return true;
  };
  const validateAge = (value: string) => {
    if (!value) {
      setNameError('Age is required');
      return false;
    }
    setNameError('');
    return true;
  };

  const toggleOption = (option: string, category: 'dietary' | 'mobility' | 'family' | 'pet') => {
    switch (category) {
      case 'dietary':
        setSelectedDietary((prev) =>
          prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
        break;
      case 'mobility':
        setSelectedMobility((prev) =>
          prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
        break;
      case 'family':
        setSelectedFamily((prev) =>
          prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
        break;
      case 'pet':
        setSelectedPet((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
        break;
    }
  };

  const handleGenerateInterests = async () => {
    if (!bio || bio.trim().length < 10) {
      setBioError('Please enter a longer bio for better interest suggestions');
      return;
    }

    setIsGeneratingInterests(true);
    try {
      const interests = await generateInterestsFromBio(bio);
      setGeneratedInterests(interests);

      // Store in localStorage for step-3
      localStorage.setItem('aiGeneratedInterests', JSON.stringify(interests));
    } catch (error) {
      console.error('Failed to generate interests:', error);
    } finally {
      setIsGeneratingInterests(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateName(name) && validateBio(bio)) {
      // Save any generated interests to localStorage before navigating
      if (generatedInterests.length > 0) {
        localStorage.setItem('aiGeneratedInterests', JSON.stringify(generatedInterests));
      }
      router.push('/onboarding/step-3');
    }
  };

  const isValid = () => {
    return name !== '' && !nameError && !bioError;
  };

  return (
    <main className="container max-w-md mx-auto px-4 py-8">
      <StepIndicator currentStep={2} totalSteps={3} />

      <h1 className="text-2xl font-bold text-center mt-8 mb-6">Create Your Profile</h1>

      <Card>
        <CardContent className="pt-6 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div className="flex justify-center">
              <div className="relative w-32 h-32 bg-muted rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
                {photoUrl ? (
                  <>
                    <img src={photoUrl || '/placeholder.svg'} alt="Profile" className="w-full h-full object-cover" />
                    <button
                      className="absolute top-1 right-1 bg-background text-foreground rounded-full p-1"
                      onClick={() => setPhotoUrl('')}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-xs text-muted-foreground text-center">Upload Photo</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-center">
              <Button type="button" variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" /> Upload
              </Button>
              <Button type="button" variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" /> Camera
              </Button>
            </div>

            {/* Personal Details */}
            <div className="space-y-2">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value) validateName(e.target.value);
                }}
                onBlur={(e) => validateName(e.target.value)}
              />
              {nameError && <p className="text-sm text-destructive">{nameError}</p>}
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  if (e.target.value) validateAge(e.target.value);
                }}
                onBlur={(e) => validateAge(e.target.value)}
              />
              {ageError && <p className="text-sm text-destructive">{ageError}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a short bio (max 150 characters)"
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                      validateBio(e.target.value);
                    }}
                    onBlur={(e) => validateBio(e.target.value)}
                    className="resize-none"
                    rows={3}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateInterests}
                  disabled={!bio || bio.length < 10 || isGeneratingInterests}
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  {isGeneratingInterests ? 'Analyzing...' : 'Suggest Interests'}
                </Button>
              </div>
              <div className="flex justify-between text-xs">
                {bioError ? (
                  <p className="text-destructive">{bioError}</p>
                ) : (
                  <p className="text-muted-foreground">{bio.length}/150</p>
                )}
              </div>

              {/* Display generated interests */}
              {generatedInterests.length > 0 && (
                <div className="mt-4 p-3 bg-muted/50 rounded-md">
                  <p className="text-xs font-medium mb-2">Suggested interests based on your bio:</p>
                  <div className="flex flex-wrap gap-2">
                    {generatedInterests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">These will be pre-selected in the next step</p>
                </div>
              )}
            </div>

            {/* Tag Categories */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Dietary Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedDietary.includes(option) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleOption(option, 'dietary')}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Mobility & Accessibility</h3>
                <div className="flex flex-wrap gap-2">
                  {MOBILITY_OPTIONS.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedMobility.includes(option) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleOption(option, 'mobility')}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Family Status</h3>
                <div className="flex flex-wrap gap-2">
                  {FAMILY_OPTIONS.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedFamily.includes(option) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleOption(option, 'family')}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Pet Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {PET_OPTIONS.map((option) => (
                    <Badge
                      key={option}
                      variant={selectedPet.includes(option) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleOption(option, 'pet')}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid()}>
            Next
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
