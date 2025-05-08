'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Slider } from '@/src/components/ui/slider';
import { Switch } from '@/src/components/ui/switch';
import { Label } from '@/src/components/ui/label';
import { Accessibility } from 'lucide-react';

export default function AccessibilityToggle() {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
          <Accessibility className="h-5 w-5" />
          <span className="sr-only">Accessibility options</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accessibility Preferences</DialogTitle>
          <DialogDescription>Customize your experience to suit your needs.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="font-size">Font Size: {fontSize}%</Label>
            <Slider
              id="font-size"
              min={75}
              max={200}
              step={5}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="flex-1">
              High Contrast Mode
            </Label>
            <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="screen-reader" className="flex-1">
              Screen Reader Hints
            </Label>
            <Switch id="screen-reader" checked={screenReader} onCheckedChange={setScreenReader} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
