'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Check, ChevronLeft } from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that works best for your community experience
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Free Tier */}
        <Card className="relative overflow-hidden border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>Perfect for community participation</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">€0</span>
              <span className="text-muted-foreground ml-2">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Join unlimited public events</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Basic profile customization</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Standard community features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Community discovery tools</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Standard support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Tier */}
        <Card className="relative overflow-hidden border-2 border-primary">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
            Popular
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Premium</CardTitle>
            <CardDescription>For the dedicated community member</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">€15</span>
              <span className="text-muted-foreground ml-2">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>All Free tier features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Access to private, exclusive events</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Host unlimited public events</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Add entry FEE on event</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Priority access to popular events</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Ad-free experience</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Advanced profile customization</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Priority customer support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button size="lg" variant="default" className="w-full">
              Upgrade Now
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div>
            <h3 className="text-lg font-semibold">Can I switch between plans?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade to Premium or downgrade to Free at any time. Changes will be effective at the start
              of your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">What are private events?</h3>
            <p className="text-muted-foreground">
              Private events are exclusive gatherings only accessible to Premium members. These often include special
              activities, smaller groups, and unique experiences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Is there a limit to how many events I can join?</h3>
            <p className="text-muted-foreground">
              No, both Free and Premium plans allow you to join unlimited public events. Premium members also get access
              to exclusive private events.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">What does priority access mean?</h3>
            <p className="text-muted-foreground">
              Premium members get early access to registration for popular events that may have limited capacity,
              increasing your chances of securing a spot.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          For larger organizations or special requirements, we offer tailored solutions.
        </p>
        <Button variant="outline" size="lg">
          Contact Us
        </Button>
      </div>
    </div>
  );
}
