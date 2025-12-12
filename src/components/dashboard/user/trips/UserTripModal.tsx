"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, ImageIcon, MapPin, Calendar, Users, Pencil, X, Upload, CheckCircle } from "lucide-react";
import { Button } from "../../../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import { Input } from "../../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Calendar as CalendarComponent } from "../../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/src/components/ui/dialog";
import { uploadImages } from "@/src/services/destination/destination";
import { Badge } from "../../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { ITrip } from "@/src/types/trips.types";
import { tripEditSchema, TripEditValues } from "@/src/schema/trip.schema";
import { updateTrip } from "@/src/services/trips/trips";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/src/components/ui/spinner";

interface TripEditModalProps {
  trip: ITrip ;
  visible: boolean;
  onCancel: () => void;
  destinations: Array<{ id: string; name: string }>;
}

export function UserTripModal({ trip, onCancel, visible, destinations }: TripEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const defaultValues: Partial<TripEditValues> = {
    title: trip?.title || "",
    image: trip?.image || "",
    destination: trip?.destination?._id?.toString() || "",
    startDate: trip?.startDate ? new Date(trip.startDate) : undefined,
    endDate: trip?.endDate ? new Date(trip.endDate) : undefined,
    capacity: trip?.capacity || 10,
    status: trip?.status || "active",
  };

  const form = useForm<TripEditValues>({
    resolver: zodResolver(tripEditSchema),
    defaultValues,
    mode: "onChange",
  });

  // Update form when trip changes
  useEffect(() => {
    if (trip && visible) {
      form.reset(defaultValues);
    }
  }, [trip, visible]);

  const processSubmit = async (data: TripEditValues) => {
    setLoading(true);
    const res = await updateTrip(trip._id!, data);

    if (res.success) {
      toast.success("Trip updated successfully!");
      onCancel();
      router.refresh();
    } else {
      toast.error("Error updating trip");
      console.log(res);
    }

    setLoading(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setImageUploading(true);
    if (!file) return;

    try {

        const formData = new FormData();
      formData.append("images", file)
      
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/imageUpload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data?.urls && data?.urls.length > 0) {
        form.setValue("image", data.urls[0]);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }finally{
      setImageUploading(false);
    }
  };


  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  if (!trip) return null;

  return (
    <Dialog open={visible} onOpenChange={onCancel}>
      <DialogContent className="w-full sm:max-w-[95vw] md:max-w-[700px] max-h-[90vh] overflow-hidden p-0 overflow-y-scroll">
        <div className="flex flex-col h-full">
          {/* Header - Responsive */}
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="space-y-2">
              <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">
                Edit Trip: <span className="truncate block sm:inline">{trip.title}</span>
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm sm:text-base">Update trip details and settings</DialogDescription>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 mb-10 bg-transparent">
                <TabsTrigger value="basic" className="text-sm sm:text-base data-[state=active]:bg-gray-100">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="schedule" className="text-sm sm:text-base data-[state=active]:bg-gray-100">
                  Schedule & Capacity
                </TabsTrigger>
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(processSubmit)} className="space-y-4 sm:space-y-6">
                  <TabsContent value="basic" className="space-y-4 sm:space-y-6">
                    {/* Trip Title - Responsive */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Trip Title</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input placeholder="Enter trip title" className="pl-10 h-10 sm:h-11 text-sm sm:text-base" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs sm:text-sm text-gray-500 mt-1">A descriptive title for your trip</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Image Upload - Responsive */}
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Trip Image</FormLabel>
                          <FormControl>
                            <div className="space-y-3 sm:space-y-4">
                              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <div className="relative flex-1">
                                  <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Input placeholder="Image URL" className="pl-10 h-10 sm:h-11 text-sm sm:text-base" value={field.value} onChange={field.onChange} />
                                </div>
                                <div className="relative">
                                  <Input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />

                                  {imageUploading ? <Spinner className="size-10" /> : <Button type="button" variant="outline" size="icon" onClick={handleImageClick}>
                                    <Upload className="h-4 w-4" />
                                  </Button>}
                                </div>
                              </div>

                              {/* Image Preview - Responsive */}
                              {(field.value || trip.image) && (
                                <div className="border rounded-lg overflow-hidden">
                                  <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-50 to-gray-100">
                                    <img
                                      src={field.value || trip.image}
                                      alt="Trip preview"
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                      }}
                                    />
                                  </div>
                                  <div className="p-2 sm:p-3 bg-gray-50 border-t flex items-center justify-between">
                                    <span className="text-xs sm:text-sm text-gray-500">{field.value ? "New Image" : "Current Image"}</span>
                                    {field.value && field.value !== trip.image && (
                                      <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Updated
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs sm:text-sm text-gray-500 mt-1">Upload a new image or update the URL</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Destination & Status Grid - Responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Destination */}
                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="text-sm sm:text-base">Destination</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-10 sm:h-11 w-full text-sm sm:text-base">
                                  <SelectValue placeholder="Select destination" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {destinations.map((dest) => (
                                  <SelectItem key={dest.id} value={dest.id} className="text-sm sm:text-base">
                                    {dest.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Status */}
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="text-sm sm:text-base">Trip Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-10 sm:h-11 w-full text-sm sm:text-base">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active" className="text-sm sm:text-base">
                                  Active
                                </SelectItem>
                                <SelectItem value="completed" className="text-sm sm:text-base">
                                  Completed
                                </SelectItem>
                                <SelectItem value="cancelled" className="text-sm sm:text-base">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule" className="space-y-4 sm:space-y-6">
                    {/* Dates Section - Responsive */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Start Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn("h-10 sm:h-11 pl-3 text-left font-normal justify-start text-sm sm:text-base", !field.value && "text-muted-foreground")}
                                    >
                                      {field.value ? (
                                        <div className="flex items-center gap-2 truncate">
                                          <Calendar className="h-4 w-4 flex-shrink-0" />
                                          <span className="truncate">{format(field.value, "PPP")}</span>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-2">
                                          <Calendar className="h-4 w-4 flex-shrink-0" />
                                          <span className="truncate">Pick start date</span>
                                        </div>
                                      )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-sm sm:text-base font-medium text-gray-700">End Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn("h-10 sm:h-11 pl-3 text-left font-normal justify-start text-sm sm:text-base", !field.value && "text-muted-foreground")}
                                    >
                                      {field.value ? (
                                        <div className="flex items-center gap-2 truncate">
                                          <Calendar className="h-4 w-4 flex-shrink-0" />
                                          <span className="truncate">{format(field.value, "PPP")}</span>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-2">
                                          <Calendar className="h-4 w-4 flex-shrink-0" />
                                          <span className="truncate">Pick end date</span>
                                        </div>
                                      )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date() || (form.getValues("startDate") && date <= form.getValues("startDate"))}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Capacity Section - Responsive */}
                    <div className="space-y-3 sm:space-y-4">
                      <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Capacity</FormLabel>
                      <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  type="number"
                                  className="pl-10 h-10 sm:h-11 text-sm sm:text-base"
                                  placeholder="Enter capacity"
                                  min="1"
                                  max="100"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs sm:text-sm text-gray-500 mt-1">Maximum number of participants</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  {/* Actions - Responsive */}
                  <div className="flex flex-col sm:flex-row items-center justify-end pt-4 sm:pt-6 border-t gap-3 ">
                    <Button type="button" variant="outline" onClick={() => form.reset(defaultValues)} disabled={loading} className="w-full sm:w-auto text-sm sm:text-base">
                      Reset
                    </Button>
                    <Button type="submit" disabled={loading} className="w-full sm:w-auto min-w-[120px] text-sm sm:text-base">
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span className="hidden sm:inline">Saving...</span>
                          <span className="sm:hidden">Save</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span className="hidden sm:inline">Save Changes</span>
                          <span className="sm:hidden">Save</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
