"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { createReview, deleteReview, updateReview } from "../../services/review/review";
import { useRouter } from "next/navigation";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  destinationId?: string;
  defaultValues?: {
    rating: number;
    comment: string;
    _id: string;
  };
  reload?: boolean;
  setReload?: (value: boolean) => void;
}

export default function ReviewModal({ open, onClose, defaultValues, destinationId, reload, setReload }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (defaultValues) {
      setRating(defaultValues.rating);
      setComment(defaultValues.comment);
    } else {
      setRating(0);
      setComment("");
    }
  }, [defaultValues]);

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) return;
    try {
      if (defaultValues) {
        await updateReview(defaultValues._id, { rating, comment, destination: destinationId });
        toast.success("Review updated successfully!");
      } else {
        const reviewPayload = {
          rating,
          comment,
          destination: destinationId,
        };

        await createReview(reviewPayload);
        toast.success("Review submitted successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error submitting review");
    } finally {
      onClose();
      router.refresh();
      if (setReload) {
        setReload(!reload);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{defaultValues === undefined ? "Add Review" : "Edit Review"}</DialogTitle>
        </DialogHeader>

        {/* Rating */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Rating</p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button key={value} type="button" onClick={() => setRating(value)}>
                <Star size={22} className={value <= rating ? "text-yellow-500" : "text-gray-300"} fill={value <= rating ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2 mt-4">
          <p className="text-sm font-medium">Comment</p>
          <Textarea placeholder="Share your experience..." value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="resize-none" />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{defaultValues === undefined ? "Submit Review" : "Update Review"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
