"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Separator } from "@/src/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";
import { Calendar, CreditCard, Mail, MapPin, Phone, User, Users, X, Clock, CheckCircle, XCircle, AlertCircle, Copy, Share2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { IBookingStatus, IPaymentStatus } from "@/src/types/booking.types";

// Extended interface for booking details
interface BookingDetails {
  _id: string;
  trip: {
    _id: string;
    title: string;
    image: string;
    location: string;
    description: string;
    duration: string;
    category: string;
  };
  user: {
    name: string;
    email: string;
    phone?: string;
    profileImage?: string;
  };
  numberOfGuests: number;
  amount: number;
  taxAmount?: number;
  discountAmount?: number;
  totalAmount: number;
  paymentStatus: IPaymentStatus;
  bookingStatus: IBookingStatus;
  createdAt: Date;
  checkInDate: Date;
  checkOutDate: Date;
  specialRequests?: string;
  paymentMethod?: string;
  transactionId?: string;
}

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingDetails | null;
}

function BookingDetailsModal({ isOpen, onClose, booking }: BookingDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("details");

  // Helper functions
  const getBookingStatusIcon = (status: IBookingStatus) => {
    switch (status) {
      case IBookingStatus.BOOKED:
        return <CheckCircle className="h-4 w-4" />;
      case IBookingStatus.CANCELLED:
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPaymentStatusIcon = (status: IPaymentStatus) => {
    switch (status) {
      case IPaymentStatus.SUCCESS:
        return <CheckCircle className="h-4 w-4" />;
      case IPaymentStatus.PENDING:
        return <Clock className="h-4 w-4" />;
      case IPaymentStatus.FAILED:
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), "PPP");
  };

  const formatDateTime = (date: Date) => {
    return format(new Date(date), "PPpp");
  };

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(booking!._id);
    toast.success("Booking ID copied to clipboard!");
  };

  if (!booking) return null;

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: `Booking: ${booking.trip.title}`,
        text: `Check out my booking for ${booking.trip.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto pt-10">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
              <div>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <span>Booking Details</span>
                  <Badge variant="outline" className="font-normal">
                    {booking._id.substring(0, 8)}...
                  </Badge>
                </DialogTitle>
                <DialogDescription>Created on {formatDateTime(booking.createdAt)}</DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleCopyBookingId}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy Booking ID</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleShareBooking}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share Booking</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="guests">Guests</TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Trip Info */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Trip Information
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-20 w-20 border">
                        <AvatarImage src={booking.trip.image} alt={booking.trip.title} />
                        <AvatarFallback>{booking.trip.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{booking.trip.title}</h4>
                        <p className="text-muted-foreground mb-2">{booking.trip.location}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary">{booking.trip.category}</Badge>
                          <Badge variant="secondary">{booking.trip.duration}</Badge>
                        </div>
                        <p className="text-sm">{booking.trip.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Status */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {getBookingStatusIcon(booking.bookingStatus)}
                        <span>Booking Status</span>
                      </div>
                      <Badge variant={booking.bookingStatus === IBookingStatus.BOOKED ? "default" : "destructive"} className="capitalize">
                        {booking.bookingStatus.toLowerCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {getPaymentStatusIcon(booking.paymentStatus)}
                        <span>Payment Status</span>
                      </div>
                      <Badge
                        variant={booking.paymentStatus === IPaymentStatus.SUCCESS ? "secondary" : booking.paymentStatus === IPaymentStatus.PENDING ? "destructive" : "default"}
                        className="capitalize border-2 border-gray-200"
                      >
                        {booking.paymentStatus.toLowerCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Dates
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Check-in</span>
                      <span className="font-medium">{formatDate(booking.checkInDate)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Check-out</span>
                      <span className="font-medium">{formatDate(booking.checkOutDate)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Guest Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Number of Guests</span>
                      <span className="font-medium">{booking.numberOfGuests}</span>
                    </div>
                    {booking.specialRequests && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground mb-1">Special Requests</p>
                        <p className="font-medium">{booking.specialRequests}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatCurrency(booking.amount)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span className="font-semibold">Total Amount</span>
                      <span className="font-bold text-lg">{formatCurrency(booking.totalAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground mb-1">Payment Method</p>
                      <p className="font-medium">{booking.paymentMethod || "Credit Card"}</p>
                    </div>
                    {booking.transactionId && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-muted-foreground mb-1">Transaction ID</p>
                        <div className="flex items-center justify-between">
                          <code className="text-sm">{booking.transactionId}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(booking.transactionId!);
                              toast.success("Transaction ID copied!");
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground mb-1">Payment Date</p>
                      <p className="font-medium">{formatDateTime(booking.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Guests Tab */}
            <TabsContent value="guests">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Primary Guest
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={booking.user.profileImage} alt={booking.user.name} />
                        <AvatarFallback>
                          {booking.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-lg">{booking.user.name}</h4>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{booking.user.email}</span>
                        </div>
                        {booking.user.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{booking.user.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Additional Guests</h3>
                  <p className="text-muted-foreground">
                    {booking.numberOfGuests - 1} additional guest
                    {booking.numberOfGuests - 1 !== 1 ? "s" : ""} included
                  </p>
                  {/* You can expand this section to show details of additional guests */}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookingDetailsModal;
