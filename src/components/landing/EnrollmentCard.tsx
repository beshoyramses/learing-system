import Link from "next/link";

const EnrollmentCard = ({ price, benefits }) => {
    return (
      <div className="bg-[#262630] rounded-lg p-6 sticky top-6">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Course Price:</span>
            <span className="font-bold">${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total:</span>
            <span className="font-bold">${price.toFixed(2)}</span>
          </div>
        </div>
        
        <button className="w-full bg-[#7878fc] hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 mb-4">
          <Link href={`/payment/${price}`}>Enroll Now</Link>
        </button>
        
        <p className="text-center text-xs text-gray-400 mb-6">
          30-day money-back guarantee
        </p>
        
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 mt-1 flex items-center justify-center text-xs">✓</div>
              <div className="ml-3">
                <p className="font-medium">{benefit.title}</p>
                <p className="text-xs text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default EnrollmentCard;