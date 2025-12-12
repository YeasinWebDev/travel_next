"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Textarea } from "../../../ui/textarea";
import { ImageIcon, Loader2 } from "lucide-react";
import { IDivision } from "@/src/app/types/division.types";
import toast from "react-hot-toast";
import { Spinner } from "@/src/app/components/ui/spinner";
import { useRouter } from "next/navigation";
import { createDivision, updateDivision } from "@/src/app/services/division/division";

interface DivisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IDivision | null;
  title?: string;
  description?: string;
}

export function DivisionModal({ isOpen, onClose, initialData, title = "Create Division", description = "Add a new division to your organization" }: DivisionModalProps) {
  const [formData, setFormData] = useState<Omit<IDivision, "id">>({
    name: "",
    image: "",
    description: "",
  });
  const [errors, setErrors] = useState<Partial<IDivision>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        image: initialData.image,
        description: initialData.description,
      });
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setFormData({
      name: "",
      image: "",
      description: "",
    });
    setImagePreview("");
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<IDivision> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = "Please enter a valid URL";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name as keyof IDivision]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Update image preview
    if (name === "image" && isValidUrl(value)) {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      if(initialData){
        let ans =await updateDivision(initialData._id!,formData);
        if(!ans.success) {
          return toast.error("Failed to save division");
        }
        toast.success("Division updated successfully!");
        router.refresh();
        resetForm(); 
        onClose();
      }else{
        let ans =await createDivision(formData);
        if(!ans.success) {
          return toast.error("Failed to save division");
        }
        toast.success("Division created successfully!");
        router.refresh();
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error("Failed to save division:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("images", file);
      // Upload images if any
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/imageUpload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!data.urls) {
        handleClose();
        return toast.error("An error occurred while uploading images");
      }
      const newUploadedImages = data.urls || [];

      setFormData((prev) => ({
        ...prev,
        image: newUploadedImages[0],
      }));

      setImagePreview(newUploadedImages[0]);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while uploading images");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Image Preview */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                {uploading ? (
                  <Spinner className="size-14" />
                ) : imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" onError={() => setImagePreview("")} />
                ) : (
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <p className="text-xs text-gray-500 text-center">Image preview will appear here</p>
            </div>

            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Division Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter division name"
                className={errors.name ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Image URL Field */}
            <div className="grid gap-2">
              <Label htmlFor="image">
                Image <span className="text-red-500">*</span>
              </Label>
              <Input id="image" name="image" type="file" onChange={handleImageUpload} className={errors.image ? "border-red-500" : ""} disabled={isLoading} />
              {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
            </div>

            {/* Description Field */}
            <div className="grid gap-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter division description"
                className={`min-h-[100px] resize-none ${errors.description ? "border-red-500" : ""}`}
                disabled={isLoading}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || uploading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : initialData ? (
                "Update Division"
              ) : (
                "Create Division"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
