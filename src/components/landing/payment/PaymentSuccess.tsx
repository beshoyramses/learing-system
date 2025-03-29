import { useEffect } from 'react';

interface PaymentSuccessProps {
  courseId: string | null;
  onRedirect: () => void;
}

export default function PaymentSuccess({ courseId, onRedirect }: PaymentSuccessProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRedirect();
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer);
  }, [onRedirect]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-green-500/30 text-center">
        <div className="text-green-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-white">Payment Successful!</h2>
        <p className="text-gray-300 mb-6">
          Thank you for your purchase. You're now enrolled in the course.
        </p>
        <div className="mb-6">
          <div className="animate-pulse text-sm text-gray-400">
            Redirecting to course in 5 seconds...
          </div>
        </div>
        <button
          onClick={onRedirect}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-300"
        >
          Go to Course Now
        </button>
      </div>
    </div>
  );
}