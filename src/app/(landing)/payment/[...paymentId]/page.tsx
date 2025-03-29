"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import PaymentLoading from "@/components/landing/payment/PaymentLoading";
import PaymentError from "@/components/landing/payment/PaymentError";
import PaymentSummary from "@/components/landing/payment/PaymentSummary";
import PaymentIframe from "@/components/landing/payment/PaymentIframe";
import { debugLog } from "@/lib/paymentUtils";

interface Course {
  title: string;
  price: number;
  description: string;
}

const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentToken, setPaymentToken] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [course] = useState<Course>({
    title: "Speed Checkout",
    price: 99.99,
    description: "Learn checkout optimization",
  });

  useEffect(() => {
    const initializePayment = async () => {
      try {
        setLoading(true);
        setError("");

        // Validate environment variables
        if (!process.env.NEXT_PUBLIC_PAYMOB_API_KEY) {
          throw new Error("Paymob API key is missing");
        }

        // 1. Authentication Request
        const authToken = await authenticateWithPaymob();

        // 2. Order Registration
        const orderId = await registerOrder(authToken, course.price);

        // 3. Payment Key Generation
        const paymentToken = await generatePaymentKey(
          authToken,
          orderId,
          course.price
        );

        // 4. Build iframe URL
        const iframeId = process.env.NEXT_PUBLIC_PAYMOB_IFRAME_ID;
        if (!iframeId) throw new Error("Iframe ID missing");

        setIframeUrl(
          `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentToken}`
        );
        setPaymentToken(paymentToken);
        setLoading(false);
      } catch (err) {
        handlePaymentError(err);
      }
    };

    initializePayment();
  }, []);

  const authenticateWithPaymob = async (): Promise<string> => {
    const authResponse = await axios.post(
      "https://accept.paymob.com/api/auth/tokens",
      { api_key: process.env.NEXT_PUBLIC_PAYMOB_API_KEY },
      { headers: { "Content-Type": "application/json" } }
    );
    debugLog("Authentication", authResponse.data);

    const authToken = authResponse.data.token;
    if (!authToken) throw new Error("Authentication failed");
    return authToken;
  };

  const registerOrder = async (
    authToken: string,
    price: number
  ): Promise<number> => {
    const orderData = {
      auth_token: authToken,
      delivery_needed: "false",
      amount_cents: Math.round(price * 100),
      currency: "EGP",
      items: [],
    };

    const orderResponse = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      orderData,
      { headers: { "Content-Type": "application/json" } }
    );
    debugLog("Order Registration", orderResponse.data);

    const orderId = orderResponse.data.id;
    if (!orderId) throw new Error("Order creation failed");
    return orderId;
  };

  const generatePaymentKey = async (
    authToken: string,
    orderId: number,
    price: number
  ): Promise<string> => {
    const paymentKeyData = {
      auth_token: authToken,
      amount_cents: Math.round(price * 100),
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        first_name: "Customer",
        last_name: "Name",
        email: "customer@example.com",
        phone_number: "+201000000000",
        country: "EG",
        city: "Cairo",
        street: "123 Main St",
        apartment: "NA",
        floor: "NA",
        postal_code: "NA",
        building: "NA",
        shipping_method: "NA",
        state: "NA",
      },
      currency: "EGP",
      return_url: `asdasdadada`,
      integration_id: process.env.NEXT_PUBLIC_PAYMOB_INTEGRATION_ID,
    };

    const paymentKeyResponse = await axios.post(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      paymentKeyData,
      { headers: { "Content-Type": "application/json" } }
    );
    debugLog("Payment Key", paymentKeyResponse.data);

    const paymentToken = paymentKeyResponse.data.token;
    if (!paymentToken) throw new Error("Payment token generation failed");
    return paymentToken;
  };

  const handlePaymentError = (err: unknown) => {
    console.error("Payment initialization error:", err);

    let errorMessage = "Payment processing failed";
    if (axios.isAxiosError(err)) {
      errorMessage =
        err.response?.data?.message ||
        `HTTP ${err.response?.status}: ${err.response?.statusText}` ||
        err.message;
      console.error("Response data:", err.response?.data);
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    setError(errorMessage);
    setLoading(false);
  };

  if (loading) return <PaymentLoading />;
  if (error) return <PaymentError error={error} />;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Head>
        <title>Secure Payment | {course.title}</title>
      </Head>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">
              Complete Your Payment
            </h1>
            <p className="text-gray-400 mt-2">
              You {"'"} re enrolling in:{" "}
              <strong className="text-blue-400">{course.title}</strong>
            </p>
          </div>

          <div className="p-6">
            <PaymentSummary
              title={course.title}
              price={course.price}
              className="mb-6 p-4 bg-gray-750 rounded-lg border border-gray-700"
            />

            <div>
              <h2 className="text-lg font-semibold mb-3 text-white">
                Secure Payment
              </h2>
              <PaymentIframe
                iframeUrl={iframeUrl}
                className="border border-gray-700 rounded-lg overflow-hidden"
                orderId={"COURSETEST123"} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
