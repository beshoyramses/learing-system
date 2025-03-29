interface PaymentSummaryProps {
    title: string;
    price: number;
    className?: string;
  }
  
  const PaymentSummary = ({ title, price, className }: PaymentSummaryProps) => {
    return (
      <div className={className}>
        <h2 className="text-lg font-semibold mb-3 text-white">Order Summary</h2>
        <div className="space-y-2 text-gray-300">
          <div className="flex justify-between">
            <span>Course:</span>
            <span className="text-white">{title}</span>
          </div>
          <div className="flex justify-between">
            <span>Price:</span>
            <span className="text-white">${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t border-gray-700 pt-2 mt-2 text-white">
            <span>Total:</span>
            <span>${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default PaymentSummary;