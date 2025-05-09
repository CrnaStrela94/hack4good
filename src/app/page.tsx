'use client';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import LanguageSelector from '@/src/components/language-selector';
import AccessibilityToggle from '@/src/components/accessibility-toggle';
import { SwedenMap } from '../components/sweden-map';
import events from '@/mock/events.json';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, CalendarDays, MapPin } from 'lucide-react';

// Animated gradient background component
const AnimatedGradientBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="animate-[move_10s_ease_infinite] h-56 w-56 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-20 blur-3xl absolute -top-10 -left-10"></div>
    <div className="animate-[move_15s_ease-in-out_infinite] h-64 w-64 rounded-full bg-gradient-to-r from-yellow-500 to-pink-500 opacity-20 blur-3xl absolute top-1/2 right-20 transform -translate-y-1/2"></div>
    <div className="animate-[move_20s_ease_infinite] h-48 w-48 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-20 blur-3xl absolute -bottom-10 left-1/3 transform -translate-x-1/2"></div>
  </div>
);

// Stats component
const Stats = () => (
  <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto mt-8">
    {[
      { icon: <Users className="h-5 w-5" />, value: '5,000+', label: 'Members' },
      { icon: <CalendarDays className="h-5 w-5" />, value: '200+', label: 'Weekly Events' },
      { icon: <MapPin className="h-5 w-5" />, value: '30+', label: 'Cities' },
    ].map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.1 }}
        className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm"
      >
        {stat.icon}
        <span className="text-xl font-bold mt-1">{stat.value}</span>
        <span className="text-xs text-muted-foreground">{stat.label}</span>
      </motion.div>
    ))}
  </div>
);

// Activity pulse animation
const ActivityPulse = () => (
  <div className="absolute right-6 top-14 flex items-center">
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    </span>
    <span className="ml-2 text-xs font-medium">Active now</span>
  </div>
);

// Featured event card
const FeaturedEvent = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5 }}
    className="relative w-full max-w-sm mx-auto mt-8 rounded-xl overflow-hidden shadow-lg"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
    <img
      src="https://images.unsplash.com/photo-1561628179-b6d8c50c6266?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Featured event"
      className="w-full h-48 object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
      <div className="flex items-center mb-1">
        <span className="bg-white/20 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full">Trending</span>
      </div>
      <h3 className="font-bold">Looking for someone to experience midsummer</h3>
      <p className="text-xs opacity-80">Tomorrow at 4:00 PM • 8 going</p>
    </div>
  </motion.div>
);

export default function WelcomePage() {
  // For the typing animation effect
  const [displayedText, setDisplayedText] = useState('');
  const fullText =
    'Connect with locals and fellow newcomers through small-group events centered around holidays, culture, and shared interests.';

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
      <AnimatedGradientBackground />
      <ActivityPulse />

      <div className="fixed top-0 right-0 flex items-center gap-2 p-4 z-10">
        <LanguageSelector />
        <AccessibilityToggle />
      </div>

      <div className="flex flex-col items-center justify-start flex-1 text-center px-4 pt-16 pb-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl font-bold mt-6 md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Find Your Community
          </h1>
          <h2 className="text-2xl mt-2 font-medium">in Sweden</h2>
        </motion.div>

        <motion.p
          className="mt-6 text-muted-foreground max-w-md mx-auto min-h-[4rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {displayedText}
        </motion.p>

        <Stats />

        <FeaturedEvent />

        <div className="w-full max-w-md mt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <SwedenMap events={events} />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 space-y-4 w-full max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            asChild
            className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 border-0 shadow-lg"
          >
            <Link href="/onboarding/step-1" className="flex items-center justify-center gap-2">
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full py-6 text-lg backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20"
          >
            <Link href="/login">Login</Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
