"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { useSidebar } from "@/src/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Calendar1, Eye, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { format } from "date-fns";
import { IBookingStatus, IPaymentStatus } from "@/src/types/booking.types";
import { useState } from "react";
import BookingDetailsModal from "./BookingDetailsModal";
import { useRouter } from "next/navigation";


interface UserBookingTableProps {
  myBookings: any;
  onViewDetails?: (bookingId: string) => void;
}

function UserBookingTable({ myBookings, onViewDetails }: UserBookingTableProps) {
  const { state } = useSidebar();
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  // Helper function to get status badge variant
  const getBookingStatusVariant = (status: IBookingStatus) => {
    switch (status) {
      case IBookingStatus.BOOKED:
        return "default";
      case IBookingStatus.CANCELLED:
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getBadgeVariantForPayment = (status: IPaymentStatus) => {
    switch (status) {
      case IPaymentStatus.SUCCESS:
        return "secondary"; 
      case IPaymentStatus.PENDING:
        return "destructive";
      case IPaymentStatus.FAILED:
        return "destructive";
      default:
        return "default";
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return format(new Date(date), "MMM dd, yyyy");
  };

  const handleViewDetails = (booking: any) => {
    // Convert booking to BookingDetails format
    const bookingDetails = {
      ...booking,
      totalAmount: booking.amount,
      checkInDate: new Date(booking.trip.startDate),
      checkOutDate: new Date(booking.trip.endDate),
      paymentMethod: "Credit Card",
      transactionId: `TXN_${booking._id.substring(0, 8).toUpperCase()}`,
      specialRequests: "Extra towels and late check-out requested",
      trip: {
        ...booking.trip,
        duration: "3 nights",
        category: "Beach Resort",
      },
      user: {
        ...booking.user,
        profileImage: booking.user.profileImage || "",
      },
    };

    setSelectedBooking(bookingDetails);
    setIsModalOpen(true);
    onViewDetails?.(booking._id);
  };

  return (
    <>
      <Card className={`mt-5 ${state === "collapsed" ? "md:w-full" : "md:w-[67%] lg:w-[87%] xl:w-full"}`}>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Trip Details</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead >Guests</TableHead>
                <TableHead >Amount</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-96 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground py-12">
                      <Calendar1 className="h-16 w-16 mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">No bookings found</p>
                      <p className="text-sm">You haven't made any bookings yet.</p>
                      <Button onClick={() => router.push("/trips")}  className="mt-4">Book a Trip</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                myBookings.map((booking: any) => (
                  <TableRow key={booking._id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border">
                          <AvatarImage src={booking.trip.image} alt={booking.trip.title} className="object-cover" />
                          <AvatarFallback className="bg-primary/10">{booking.trip.title.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="font-medium">{booking.trip.title.substring(0, 20) + "..."}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <code className="relative rounded bg-muted px-1 py-0.5 font-mono text-sm font-medium">{booking._id}</code>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center justify-center rounded-full border px-3 py-1">
                        <span className="font-medium">{booking.numberOfGuests}</span>
                        <span className="ml-1 text-xs text-muted-foreground">{booking.numberOfGuests === 1 ? "guest" : "guests"}</span>
                      </div>
                    </TableCell>
                    <TableCell >
                        <p className="font-semibold">{formatCurrency(booking.amount)}</p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{formatDate(booking.createdAt)}</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(booking.createdAt), "hh:mm a")}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getBookingStatusVariant(booking.bookingStatus)} className="capitalize">
                        {booking.bookingStatus.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariantForPayment(booking.paymentStatus)} className="capitalize">
                        {booking.paymentStatus.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
      />
    </>
  );
}

export default UserBookingTable;
