interface PaymentErrorProps {
    error: string;
  }
  
  const PaymentError = ({ error }: PaymentErrorProps) => {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-700">
          <div className="text-red-400 mb-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2 text-center text-white">Payment Error</h2>
          <div className="bg-gray-750 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-gray-700 text-gray-200 py-2 px-4 rounded hover:bg-gray-600 transition"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PaymentError;