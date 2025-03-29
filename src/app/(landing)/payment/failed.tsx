"use client";

import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('course_id');

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-red-500/30 text-center">
        <div className="text-red-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-white">Payment Failed</h2>
        <p className="text-gray-300 mb-6">
          We couldn {"'"} t process your payment. Please try again.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push(`/course/${courseId}/enroll`)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded transition duration-300"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}