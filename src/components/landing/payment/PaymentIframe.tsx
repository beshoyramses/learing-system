"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentIframeProps {
  iframeUrl: string;
  className?: string;
  orderId: string;
}

export default function PaymentIframe({ iframeUrl, className, orderId }: PaymentIframeProps) {
  const router = useRouter();
  const [paymentVerified, setPaymentVerified] = useState(false);

  // Polling function to check payment status
  useEffect(() => {
    if (!orderId || !iframeUrl) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/payments/verify?order_id=${orderId}`);
        const data = await response.json();
        
        if (data.success) {
          setPaymentVerified(true);
          clearInterval(pollInterval);
          router.push(`/payment/success?order_id=${orderId}`);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(pollInterval);
  }, [orderId, router, iframeUrl]);

  // Backup listener for message events (if Paymob sends postMessage)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.payment_success && event.data.order_id === orderId) {
        router.push(`/payment/success?order_id=${orderId}`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [orderId, router]);

  if (!iframeUrl) {
    return (
      <div className={`${className} text-white bg-gray-750 border-l-4 border-yellow-500 p-4`}>
        <p>Preparing payment gateway...</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <iframe
        src={iframeUrl}
        width="100%"
        height="650"
        title="Secure Payment Gateway"
        className="border-0"
        allow="payment *"
        loading="eager"
      />
      {paymentVerified && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          Payment verified! Redirecting...
        </div>
      )}
    </div>
  );
}