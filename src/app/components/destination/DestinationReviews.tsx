"use client";

import Image from "next/image";
import { IReview } from "../../types/review.types";
import { Button } from "../ui/button";
import { Edit, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { deleteReview } from "../../services/review/review";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function DestinationReviews({
  reviewList,
  currentUser,
  destinationId,
  reload,
  setReload,
}: {
  reviewList: IReview[];
  currentUser: string;
  destinationId: string;
  reload: boolean;
  setReload: (value: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState<{ rating: number; comment: string; _id: string } | undefined>();
  const router = useRouter();

  const handleEdit = (review: IReview) => {
    setIsOpen(true);
    setDefaultValues({
      _id: review._id,
      rating: review.rating,
      comment: review.comment,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id);
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting review");
    } finally {
      router.refresh();
      setReload(!reload);
    }
  };

  return (
    <div className="my-6 bg-gray-50 rounded-xl border p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">All Reviews</h1>
        <Button size="sm" onClick={() => setIsOpen(true)}>
          Add Review
        </Button>
      </div>

      {/* Review List */}
      <div className="space-y-4 max-h-[22rem] overflow-y-auto pr-2 pb-5">
        {reviewList.map((item) => (
          <div key={item._id} className="bg-white rounded-lg p-4 shadow-sm border">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border">
                <Image src={item.user.profileImage} alt={item.user.name} width={48} height={48} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <h2 className="font-medium text-sm">{item.user.name}</h2>
                <p className="text-xs text-gray-500">{item.user.email}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md text-yellow-600 text-sm font-medium">
                <Star size={14} fill="currentColor" />
                {item.rating}
              </div>
            </div>

            {/* Comment */}
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">{item.comment}</p>

            {/* Date */}
            <div className="flex items-center justify-between">
              <p className="mt-2 text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
              {currentUser === item.user._id && (
                <div className="flex items-center justify-center gap-3">
                  <button className="cursor-pointer" onClick={() => handleEdit(item)}>
                    <Edit color="blue" size={18} />
                  </button>
                  <button className="cursor-pointer" onClick={() => handleDelete(item._id)}>
                    <Trash2 color="red" size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {reviewList.length === 0 && <p className="text-center text-sm text-gray-400 py-6">No reviews yet. Be the first to review!</p>}
      </div>

      <ReviewModal
        open={isOpen}
        onClose={() => {
          setIsOpen(false), setDefaultValues(undefined);
        }}
        defaultValues={defaultValues}
        destinationId={destinationId}
        reload={reload}
        setReload={setReload}
      />
    </div>
  );
}

export default DestinationReviews;
