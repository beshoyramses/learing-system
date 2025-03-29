"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import PaymentSuccess from '@/components/landing/payment/PaymentSuccess';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('course_id');
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Verify payment with your backend
        const response = await axios.get(`/api/payments/verify`, {
          params: { payment_id: paymentId }
        });

        if (response.data.success) {
          // Payment verified - you might want to save this to your database
          console.log('Payment verified successfully');
        } else {
          throw new Error('Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        router.push(`/payment/failed?course_id=${courseId}`);
      }
    };

    if (paymentId) {
      verifyPayment();
    }
  }, [paymentId, courseId, router]);

  return (
    <PaymentSuccess 
      courseId={courseId}
      onRedirect={() => router.push(`/course/${courseId}`)}
    />
  );
}