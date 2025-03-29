"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const { user, isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn || !user) {
      setLoading(false);
      return;
    }

    const createUserInDb = async () => {
      try {
        const response = await fetch('/api/create-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImageUrl: user.imageUrl,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create user in database');
        }

        const data = await response.json();
        console.log('User created in DB:', data);
        router.push('/dashboard'); // Redirect after successful user creation
      } catch (err) {
        console.error('Error creating user in DB:', err);
        setError('Failed to set up your account. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    createUserInDb();
  }, [isSignedIn, user, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-blue-500">Setting up your account...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome, {user?.firstName || 'User'}!</h1>
      <p className="text-gray-600">Your account has been set up successfully.</p>
    </div>
  );
}