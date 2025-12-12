"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../ui/dropdown-menu";

import { format } from "date-fns";
import {Trash2, Eye, Calendar, Users, MapPin, CheckCircle, XCircle, Clock, TrendingUp, AlertCircle, MoreHorizontal, Pencil } from "lucide-react";
import { ITrip } from "@/src/app/types/trips.types";
import toast from "react-hot-toast";
import { useSidebar } from "@/src/app/components/ui/sidebar";
import { useRouter } from "next/navigation";
import ConfirmDelete from "../../ConfirmDelete";
import { UserTripModal } from "./UserTripModal";
import { deleteTrip } from "@/src/app/services/trips/trips";

interface TripTableProps {
  trips: ITrip[];
  destinations: Array<{ id: string; name: string }>;
}

export function TripTable({ trips,  destinations}: TripTableProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetTrip, setTargetTrip] = useState<ITrip | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [EditModalOpen, setEditModalOpen] = useState(false);
  const { state } = useSidebar();
  const router = useRouter();

  // Format date for display
  const formatDate = (date: Date | string) => {
    try {
      return format(new Date(date), "MMM dd, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Calculate duration in days
  const getDuration = (startDate: Date | string, endDate: Date | string) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    } catch (error) {
      return 0;
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!targetTrip) return;

    setIsDeleting(true);
    try {
      const response = await deleteTrip(targetTrip._id!);
      if (response.success) {
        toast.success("Trip deleted successfully!");
        
        router.refresh();
      } else {
        toast.error("An error occurred while deleting the trip");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the trip");
      console.error("Delete trip error:", error);
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
      setTargetTrip(null);
    }
  };

  // Get status badge configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          variant: "default" as const,
          icon: Clock,
          className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50",
        };
      case "completed":
        return {
          variant: "secondary" as const,
          icon: CheckCircle,
          className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
        };
      case "cancelled":
        return {
          variant: "destructive" as const,
          icon: XCircle,
          className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50",
        };
      default:
        return {
          variant: "outline" as const,
          icon: AlertCircle,
          className: "",
        };
    }
  };

  // Get availability badge
  const getAvailabilityBadge = (trip: ITrip) => {
    const participantCount = trip.participants?.length || 0;
    const isFull = participantCount >= trip.capacity;

    return {
      isFull,
      variant: isFull ? ("destructive" as const) : ("success" as const),
      text: isFull ? "Full" : "Available",
      icon: isFull ? XCircle : CheckCircle,
      participantText: `${participantCount}/${trip.capacity}`,
      percentage: Math.round((participantCount / trip.capacity) * 100),
    };
  };

  const handleDeleteClick = (trip: ITrip) => {
    setTargetTrip(trip);
    setConfirmOpen(true);
  };

  const handleEditClick = (trip: ITrip) => {
    setTargetTrip(trip);
    setEditModalOpen(true);
  };

  const handleViewClick = (trip: ITrip) => {
    router.push(`/trips/${trip._id}`);
  };

  return (
    <div className={`rounded-md border mt-5 ${state === "collapsed" ? "md:w-full" : "md:w-[67%] lg:w-[87%] xl:w-full"}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-gray-500 py-8">
                  <MapPin className="h-12 w-12 mb-2" />
                  <p className="text-lg font-medium">No trips found.</p>
                  <p className="text-sm">Create your first trip to get started.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            trips.map((trip) => {
              const availability = getAvailabilityBadge(trip);
              const statusConfig = getStatusConfig(trip.status || "active");
              const StatusIcon = statusConfig.icon;
              const AvailabilityIcon = availability.icon;

              return (
                <TableRow key={trip._id} className="hover:bg-gray-50/50">
                  {/* Image */}
                  <TableCell>
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={trip.image} alt={trip.title} className="object-cover" />
                      <AvatarFallback className="bg-primary/10">{trip.title.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TableCell>

                  {/* Title */}
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="line-clamp-1">{trip.title.substring(0, 20) + "..."}</span>
                      <span className="text-xs text-muted-foreground">ID: {trip._id!.substring(0, 8)}...</span>
                    </div>
                  </TableCell>

                  {/* Destination */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{trip.destination?.name || "Unknown"}</span>
                    </div>
                  </TableCell>

                  {/* Dates */}
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {formatDate(trip.startDate)}
                      </div>
                      <div className="text-xs text-muted-foreground">Duration: {getDuration(trip.startDate, trip.endDate)} days</div>
                    </div>
                  </TableCell>

                  {/* Capacity */}
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        {availability.participantText}
                      </div>
                      {/* Progress bar */}
                      <div className="mt-1 w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${availability.percentage}%` }} />
                      </div>
                    </div>
                  </TableCell>

                  {/* Availability */}
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <AvailabilityIcon className="h-3 w-3" />
                      {availability.text}
                    </Badge>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge variant={statusConfig.variant} className={`flex items-center gap-1 ${statusConfig.className}`}>
                      <StatusIcon className="h-3 w-3" />
                      {trip.status || "active"}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewClick(trip)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(trip)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(trip)} disabled={isDeleting}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

        <ConfirmDelete
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Trip?"
        description={`Are you sure you want to delete "${targetTrip?.title}"? This action cannot be undone.`}
      />

      <UserTripModal trip={targetTrip!} visible={EditModalOpen} onCancel={() => setEditModalOpen(false)} destinations={destinations}/>
    </div>
  );
}
