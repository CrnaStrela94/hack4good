import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import LanguageSelector from '@/src/components/language-selector';
import AccessibilityToggle from '@/src/components/accessibility-toggle';
import { SwedenMap } from '../components/sweden-map';
import events from '@/mock/events.json';

export default function WelcomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="fixed top-0 right-0 flex items-center gap-2 p-4 z-10">
        <LanguageSelector />
        <AccessibilityToggle />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4 pt-16 pb-8">
        <h1 className="text-3xl font-bold mt-6 md:text-4xl lg:text-5xl">Find Your Community in Sweden</h1>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">
          Connect with locals and fellow newcomers through small-group events centered around holidays, culture, and
          shared interests.
        </p>

        <div className="w-full max-w-4xl mt-8 mb-8">
          <SwedenMap events={events} />
        </div>

        <Button asChild className="mt-4 px-8 py-6 text-lg">
          <Link href="/onboarding/step-1">Get Started</Link>
        </Button>
      </div>
    </main>
  );
}
