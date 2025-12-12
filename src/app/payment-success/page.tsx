"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { CheckCircle2, Download, Mail, Home, Clock, Shield, Users, Calendar, MapPin, CreditCard } from "lucide-react";
import Link from "next/link";
import { Booking, PaymentDetails } from "@/src/app/types/destination.types";
import { getPaymentdetails } from "../services/payment/payment";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [booking, setbooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const res = await getPaymentdetails(paymentId!);
        setPaymentDetails(res.data.payment);
        setbooking(res.data.booking);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setError("Failed to fetch payment details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentId]);



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Payment Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{error}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/">Return Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-75"></div>
              <CheckCircle2 className="relative w-24 h-24 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
          <p className="text-gray-600 text-lg">Your trip booking has been confirmed. Get ready for an amazing adventure!</p>
          {paymentDetails && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
              <Badge className="bg-green-600">Booking #{paymentDetails.booking._id.slice(-8)}</Badge>
              <span className="text-sm text-gray-600">Payment #{paymentDetails._id.slice(-8)}</span>
            </div>
          )}
        </header>

        <p className="w-full flex items-center justify-center pb-2 text-green-800">Your payment invoice has been sent to your email. please check your inbox</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Details Card */}
            <Card className="shadow-lg border-green-100">
              <CardHeader className="bg-green-50 border-b border-green-100 pt-4">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Trip Details
                </CardTitle>
                <CardDescription>Your adventure awaits!</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : paymentDetails && booking ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{booking!.trip.title}</h3>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Dates</p>
                              <p className="font-medium">
                                {formatDate(booking!.trip.startDate)} - {formatDate(booking!.trip.endDate)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Guests</p>
                              <p className="font-medium">
                                {paymentDetails.totalPeople} {paymentDetails.totalPeople === 1 ? "person" : "people"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {booking.trip.image && (
                          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                            <img src={booking.trip.image} alt={booking.trip.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Payment Breakdown */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Payment Breakdown</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Trip cost ({paymentDetails.totalPeople} guests)</span>
                          <span>{paymentDetails.amount} bdt</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </CardContent>
            </Card>

            {/* Next Steps Card */}
            {/* <Card>
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Booking Confirmed</h4>
                    <p className="text-gray-600">
                      Your booking is now confirmed. You'll receive a detailed itinerary within 24 hours.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Check Your Email</h4>
                    <p className="text-gray-600">
                      We've sent a confirmation email with your booking details and next steps.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Prepare for Your Trip</h4>
                    <p className="text-gray-600">
                      Check the trip requirements, packing list, and important information in your booking portal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Right Column - Side Cards */}
          <div className="space-y-8">
            {/* Booking Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Payment Status</span>
                    <Badge
                      className={`${
                        paymentDetails?.status === "SUCCESS"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : paymentDetails?.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }`}
                    >
                      {paymentDetails?.status || "Loading..."}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Booking Status</span>
                    <Badge
                      className={`${
                        paymentDetails?.booking.bookingStatus === "BOOKED" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"
                      }`}
                    >
                      {paymentDetails?.booking.bookingStatus || "Loading..."}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Booked On</p>
                      <p className="font-medium">{paymentDetails ? formatDate(paymentDetails.createdAt) : "Loading..."}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Payment Method</p>
                      <p className="font-medium">
                        {paymentDetails?.paymentGatewayData?.brand || "Credit Card"}
                        {paymentDetails?.paymentGatewayData?.last4 ? ` ****${paymentDetails.paymentGatewayData.last4}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            {/* <Card className="bg-gradient-to-br from-gray-50 to-white">
              <CardHeader>
                <CardTitle className="text-lg">Your Documents</CardTitle>
                <CardDescription>
                  Download your booking documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3"
                    onClick={handleDownloadInvoice}
                    disabled={isLoading}
                  >
                    <Download className="w-4 h-4" />
                    Download Invoice
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3"
                    onClick={handleEmailReceipt}
                    disabled={isLoading}
                  >
                    <Mail className="w-4 h-4" />
                    Email Receipt
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3"
                    asChild
                  >
                    <Link href={`/bookings/${paymentDetails?.booking._id}`}>
                      <Calendar className="w-4 h-4" />
                      View Booking Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card> */}

            {/* Support Card */}
            {/* <Card className="border-blue-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Need Assistance?</CardTitle>
                <CardDescription>
                  Our support team is here to help
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    For any questions about your booking, trip details, or changes:
                  </p>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">📧 bookings@travelapp.com</p>
                    <p className="font-medium">📞 +1 (800) 555-0123</p>
                    <p className="font-medium">🕒 Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">
                    Contact Support
                  </Link>
                </Button>
              </CardContent>
            </Card> */}

            {/* CTA Buttons */}
          </div>
        </div>
        <div className="flex items-center justify-center mt-5">
          <div className="w-fit space-y-3">
            <Button asChild className="w-full gap-2 h-12">
              <Link href="/">
                <Home className="w-4 h-4" />
                Go to home
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <Shield className="w-4 h-4" />
              <span>Your payment is secured with 256-bit SSL encryption</span>
            </div>
            <p className="text-xs text-gray-400">
              Payment ID: {paymentId || "Not provided"} | Booking reference: {paymentDetails?.booking._id.slice(-12) || "Loading..."} |
              {paymentDetails && ` Confirmed on ${formatDate(paymentDetails.createdAt)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
