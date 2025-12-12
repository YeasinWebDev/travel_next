"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { X, Plus, Upload } from "lucide-react";
import { IDestination } from "@/src/types/destination.types";
import { ACTIVITY_OPTIONS, INTEREST_OPTIONS } from "@/src/utils/destination.constant";
import { DestinationFormValues, destinationSchema } from "@/src/schema/destination.schema";
import { createDestination, updateDestination, uploadImages } from "@/src/services/destination/destination";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/src/components/ui/spinner";

interface DestinationModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destination?: IDestination | null;
  divisions: Array<{ value: string; label: string }>;
}

export default function DestinationModel({ open, onOpenChange, destination, divisions }: DestinationModelProps) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [activities, setActivities] = useState<string[]>([]);
  const [newActivity, setNewActivity] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const router = useRouter();

  const form = useForm<DestinationFormValues>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      price: 0,
      division: "",
      bestTimeToVisit: "",
      coordinates: undefined,
    },
  });

  // Reset form when destination changes
  useEffect(() => {
    if (destination) {
      // Edit mode
      const foundDivision = divisions.find((d) => d.value === destination.division._id);

      form.reset({
        name: destination.name,
        location: destination.location,
        description: destination.description,
        price: destination.price,
        division: foundDivision?.value || "",
        bestTimeToVisit: destination.bestTimeToVisit,
        coordinates: destination.coordinates,
      });
      setImagePreviews(destination.image || []);
      setInterests(destination.interests || []);
      setActivities(destination.activities || []);
    } else {
      // Create mode
      form.reset({
        name: "",
        location: "",
        description: "",
        price: 0,
        division: "",
        bestTimeToVisit: "",
        coordinates: undefined,
      });
      setImagePreviews([]);
      setInterests([]);
      setActivities([]);
    }
  }, [destination, form]);

  const handleSubmit = async (data: DestinationFormValues) => {
    setLoading(true);

    try {
      const payload = {
        ...data,
        activities,
        interests,
        image: [...imagePreviews],
      };

      if (destination) {
        await updateDestination(destination._id!, payload);
        toast.success("Destination update successfully!");
      } else {
        await createDestination(payload, imagePreviews);
        toast.success("Destination created successfully!");
      }

      router.refresh();
      onOpenChange(false);

      // Reset form ONLY after success
      form.reset();
      setImagePreviews([]);
      setInterests([]);
      setActivities([]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save destination");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return toast.error("No image selected");
    setLoadingImage(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/imageUpload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!data?.urls || !data?.urls.length) {
        return toast.error("Upload failed");
      }
      setImagePreviews((prev) => [...prev, ...data?.urls]);
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setLoadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    const removed = imagePreviews[index];

    // remove from preview
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    // remove from local uploaded files
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests((prev) => [...prev, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests((prev) => prev.filter((i) => i !== interest));
  };

  const addActivity = () => {
    if (newActivity.trim() && !activities.includes(newActivity.trim())) {
      setActivities((prev) => [...prev, newActivity.trim()]);
      setNewActivity("");
    }
  };

  const removeActivity = (activity: string) => {
    setActivities((prev) => prev.filter((a) => a !== activity));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full lg:!w-[70vw] xl:!w-[50vw] !max-w-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{destination ? "Edit Destination" : "Create New Destination"}</DialogTitle>
          <DialogDescription>{destination ? "Update the destination details below." : "Fill in the details to create a new destination."}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter destination name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location *</FormLabel>
                      <FormControl>
                        <Input placeholder="City, Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Division */}
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisions.map((division) => (
                            <SelectItem key={division.value} value={division.value} className="capitalize">
                              {division.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price *</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input type="number" min="0" placeholder="0" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                        </div>
                      </FormControl>
                      <FormDescription>Price per person</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Best Time to Visit */}
                <FormField
                  control={form.control}
                  name="bestTimeToVisit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Best Time to Visit *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., November to February" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="coordinates.lat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="21.4272"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coordinates.lng"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="92.0058"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter destination description" className="min-h-[120px] resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Images */}
                <div className="space-y-2">
                  <FormLabel>Images *</FormLabel>
                  <div className="grid grid-cols-3 gap-2">
                    {imagePreviews.map((url, index) => (
                      <div key={index} className="relative group">
                        <img src={url} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {loadingImage ? (
                      <div className="flex items-center justify-center h-24 rounded-md bg-gray-200 animate-pulse">
                        <Spinner className="size-14" color="black" />
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center h-24 cursor-pointer hover:border-primary transition-colors">
                        <Upload className="h-6 w-6 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">{imagePreviews.length > 0 ? "Add More" : "Upload"}</span>
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    )}
                  </div>
                  {loadingImage ? (
                    <FormDescription>Uploading...</FormDescription>
                  ) : (
                    <FormDescription>{destination ? "Upload new images to replace or add to existing ones" : "Upload at least one image for the destination"}</FormDescription>
                  )}
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <FormLabel>Interests</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                        {interest}
                        <button type="button" onClick={() => removeInterest(interest)} className="ml-1 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add interest"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                    />
                    <Button type="button" onClick={addInterest} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {INTEREST_OPTIONS.map((interest) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => {
                          if (!interests.includes(interest)) {
                            setInterests((prev) => [...prev, interest]);
                          }
                        }}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div className="space-y-2">
                  <FormLabel>Activities</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {activities.map((activity) => (
                      <Badge key={activity} variant="secondary" className="flex items-center gap-1">
                        {activity}
                        <button type="button" onClick={() => removeActivity(activity)} className="ml-1 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add activity"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addActivity())}
                    />
                    <Button type="button" onClick={addActivity} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {ACTIVITY_OPTIONS.map((activity) => (
                      <Badge
                        key={activity}
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => {
                          if (!activities.includes(activity)) {
                            setActivities((prev) => [...prev, activity]);
                          }
                        }}
                      >
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || loadingImage}>
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    {destination ? "Updating..." : "Creating..."}
                  </>
                ) : destination ? (
                  "Update Destination"
                ) : (
                  "Create Destination"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
