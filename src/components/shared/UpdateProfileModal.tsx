"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { X, Loader2, Camera } from "lucide-react";
import { toast } from "react-hot-toast";
import { IUser } from "@/src/types/trips.types";
import { uploadImages } from "@/src/services/destination/destination";
import { updateUser } from "@/src/services/auth/user";

interface UpdateProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser;
  reload?: boolean;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
}

const travelInterestsOptions = [
  "Adventure",
  "Beach",
  "Cultural",
  "Historical",
  "Nature",
  "Wildlife",
  "Food & Wine",
  "Shopping",
  "Luxury",
  "Budget",
  "Family",
  "Solo",
  "Couples",
  "Business",
  "Festivals",
  "Photography",
  "Hiking",
  "Skiing",
  "Cruises",
  "Road Trips",
];

export default function UpdateProfileModal({ open, onOpenChange, user, reload, setReload }: UpdateProfileModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    location: "",
    travelInterests: [] as string[],
    status: "active" as "active" | "inactive",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profileImage: user.profileImage || "",
        location: user.location || "",
        travelInterests: user.travelInterests || [],
        status: user.status || "active",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.travelInterests.includes(newInterest.trim())) {
      setFormData((prev) => ({
        ...prev,
        travelInterests: [...prev.travelInterests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      travelInterests: prev.travelInterests.filter((i) => i !== interest),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newInterest.trim()) {
      e.preventDefault();
      handleAddInterest();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();

    // Add image files
    formData.append("images", file);

    // Upload images if any
    const res = await uploadImages(formData);
    const newUploadedImages = res || [];
    console.log(res);

    setFormData((prev) => ({
      ...prev,
      profileImage: newUploadedImages[0],
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateUser(user.email, formData);

      if (response.success) {
        toast.success("Profile updated successfully!");
        setReload && setReload(!reload);
        onOpenChange(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
      console.error("Update profile error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>Update your personal information and preferences</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={formData.profileImage} alt={formData.name} />
                <AvatarFallback className="text-2xl bg-primary/10">{formData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-4 w-4" />
                <input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isLoading} />
              </label>
            </div>
            <p className="text-sm text-muted-foreground">Click the camera icon to upload a new profile image</p>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="Enter your full name" disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="Enter your email" disabled />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter your location"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Account Status</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "inactive") => handleInputChange("status", value)} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-400" />
                      Inactive
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Travel Interests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Travel Interests</h3>
              <span className="text-sm text-muted-foreground">{formData.travelInterests.length} selected</span>
            </div>

            {/* Interest Input */}
            <div className="flex gap-2">
              <Input value={newInterest} onChange={(e) => setNewInterest(e.target.value)} onKeyPress={handleKeyPress} placeholder="Add a travel interest" disabled={isLoading} />
              <Button type="button" variant="outline" onClick={handleAddInterest} disabled={!newInterest.trim() || isLoading}>
                Add
              </Button>
            </div>

            {/* Selected Interests */}
            <div className="space-y-2">
              <Label>Selected Interests</Label>
              <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-md">
                {formData.travelInterests.length > 0 ? (
                  formData.travelInterests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                      {interest}
                      <button type="button" onClick={() => handleRemoveInterest(interest)} className="ml-1 hover:text-destructive" disabled={isLoading}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No interests added yet</p>
                )}
              </div>
            </div>

            {/* Quick Select Interests */}
            <div className="space-y-2">
              <Label>Quick Select</Label>
              <div className="flex flex-wrap gap-2">
                {travelInterestsOptions
                  .filter((interest) => !formData.travelInterests.includes(interest))
                  .slice(0, 8)
                  .map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary transition-colors"
                      onClick={() => {
                        if (!formData.travelInterests.includes(interest)) {
                          setFormData((prev) => ({
                            ...prev,
                            travelInterests: [...prev.travelInterests, interest],
                          }));
                        }
                      }}
                    >
                      + {interest}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading} className="min-w-[120px]">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
