const PaymentLoading = () => {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Setting up your secure payment...</p>
        </div>
      </div>
    );
  };
  
  export default PaymentLoading;