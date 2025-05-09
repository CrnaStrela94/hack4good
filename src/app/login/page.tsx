'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/src/components/ui/card';
import { Facebook, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateEmail(email) && validatePassword(password)) {
      // Since this is a fake login, we'll just redirect to the home page
      router.push('/home');
    }
  };

  const isValid = () => {
    return email !== '' && password !== '' && !emailError && !passwordError;
  };

  return (
    <main className="container max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mt-8 mb-6">Log In</h1>

      <Card>
        <CardHeader className="flex justify-center">
          <div className="flex gap-4">
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Login with Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Login with Google</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <span className="relative bg-background px-3 text-sm text-muted-foreground">Or continue with</span>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value) validateEmail(e.target.value);
                }}
                onBlur={(e) => validateEmail(e.target.value)}
              />
              {emailError && <p className="text-sm text-destructive">{emailError}</p>}
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value) validatePassword(e.target.value);
                }}
                onBlur={(e) => validatePassword(e.target.value)}
              />
              {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
            </div>

            <div className="text-right">
              <Link href="#" className="text-sm text-primary">
                Forgot password?
              </Link>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleSubmit} disabled={!isValid()}>
            Log In
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/onboarding/step-1" className="text-primary">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
