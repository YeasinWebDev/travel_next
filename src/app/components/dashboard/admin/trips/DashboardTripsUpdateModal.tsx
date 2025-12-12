"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { Badge } from "../../../ui/badge";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateTripStatus } from "@/src/app/services/trips/trips";
// import { updateTripStatus } from "@/src/services/trip/trip"; // You'll need to create this service

interface UpdateTripStatusProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: {
    _id: string;
    title: string;
    currentStatus: string;
  } | null;
}

const statusOptions = [
  {
    value: "active",
    label: "Active",
    description: "Trip is currently ongoing or upcoming",
    badgeVariant: "default" as const,
    badgeClass: "bg-green-50 text-green-700 border-green-200 capitalize",
  },
  {
    value: "completed",
    label: "Completed",
    description: "Trip has finished successfully",
    badgeVariant: "secondary" as const,
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200 capitalize",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    description: "Trip has been cancelled",
    badgeVariant: "destructive" as const,
    badgeClass: "bg-red-50 text-red-700 border-red-200 capitalize",
  },
];

export default function DashboardTripsUpdateModal({ open, onOpenChange, trip }: UpdateTripStatusProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>(trip?.currentStatus || "active");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter()

  // Reset form when trip changes
  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setSelectedStatus(trip?.currentStatus || "active");
    }
  };

  const handleStatusUpdate = async () => {
    if (!trip || !selectedStatus) return;

    // Don't update if status is same
    if (selectedStatus === trip.currentStatus) {
      toast.error("Status is already set to this value");
      return;
    }

    setIsUpdating(true);
    try {
      const res = await updateTripStatus(trip._id!, selectedStatus);

      if (res.success) {
        toast.success("Trip status updated successfully");
        router.refresh()
        onOpenChange(false);
      } else {
        toast.error("Error updating trip status");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  if (!trip) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full md:max-w-[425px] p-3 md:p-5">
        <DialogHeader>
          <DialogTitle>Update Trip Status</DialogTitle>
          <DialogDescription>Update the status of "{trip.title}"</DialogDescription>
        </DialogHeader>

        <div className="py-2 md:py-4">
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Current Status</div>
            <div className="flex items-center gap-2">
              <Badge
                variant={statusOptions.find((s) => s.value === trip.currentStatus)?.badgeVariant || "outline"}
                className={statusOptions.find((s) => s.value === trip.currentStatus)?.badgeClass}
              >
                {trip.currentStatus}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Select New Status</Label>
            <RadioGroup value={selectedStatus} onValueChange={setSelectedStatus} className="space-y-3">
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                    selectedStatus === option.value ? "border-primary bg-primary/5" : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedStatus(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={option.value} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      <Badge variant={option.badgeVariant} className={`text-xs ${option.badgeClass}`}>
                        {option.value}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isUpdating}>
            Cancel
          </Button>
          <Button onClick={handleStatusUpdate} disabled={isUpdating || selectedStatus === trip.currentStatus} className="min-w-[100px]">
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Status"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
