"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Failed</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We couldn&apos;t process your payment. Please check your payment details and try again.</p>
        </div>

        <div className="w-full flex items-center justify-center">
          <Button asChild variant="outline" className="w-fit">
            <Link href="/" className="flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-5">Need help? Contact our support team at support@example.com</p>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-gray-500">
            This transaction is secured by Stripe. Your payment information is encrypted and never stored on our servers.
            <br />
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            {" • "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>
            {" • "}
            <Link href="/refund" className="text-blue-600 hover:underline">
              Refund Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
