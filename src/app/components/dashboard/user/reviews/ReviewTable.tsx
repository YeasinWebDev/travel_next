"use client";

import { IReview } from "@/src/app/types/review.types";
import { useSidebar } from "../../../ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";
import { MoreHorizontal, Pencil, Trash2, UserStar, Star, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { useState } from "react";
import { Badge } from "../../../ui/badge";
import ReviewModal from "../../../destination/ReviewModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteReview } from "@/src/app/services/review/review";

function ReviewTable({ reviews }: { reviews: IReview[] }) {
  const { state } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [review, setReview] = useState<IReview>();
  const router = useRouter();

  const handleEditClick = (review: IReview) => {
    setIsOpen(true);
    setReview(review);
  };
  const handleDeleteClick = async (review: IReview) => {
    try {
      await deleteReview(review._id!);
      toast.success("Review deleted successfully!");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting review");
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-100 text-green-800 hover:bg-green-100";
    if (rating >= 3) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    return "bg-red-100 text-red-800 hover:bg-red-100";
  };

  return (
    <>
      <div className={`rounded-lg border mt-5 bg-white shadow-sm ${state === "collapsed" ? "md:w-full" : "md:w-[67%] lg:w-[100%] xl:w-full"}`}>
        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-56 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400 py-12">
                      <div className="relative mb-6">
                        <UserStar className="h-20 w-20 text-gray-300" />
                        <Star className="absolute -top-2 -right-2 h-10 w-10 text-yellow-300 animate-pulse" />
                      </div>
                      <p className="text-xl font-medium text-gray-500 mb-2">No reviews found</p>
                      <p className="text-sm text-gray-400 max-w-md text-center">No reviews have been added yet</p>
                      {searchTerm && (
                        <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                          Clear Search
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                reviews.map((review) => (
                  <TableRow key={review._id} className="hover:bg-blue-50/30 transition-colors group">
                    <TableCell>
                      <div className="w-14 h-14 overflow-hidden rounded-full border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow">
                        <Image
                          src={review?.destination?.image[0] || "/placeholder-image.jpg"}
                          quality={50}
                          alt={review?.destination?.title || "Destination"}
                          width={100}
                          height={500}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-gray-800 truncate max-w-[150px]">{review?.destination?.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate max-w-[200px]">{review?.destination?.location || "Location not specified"}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-gray-700 mb-2 truncate max-w-[180px]">{review?.comment}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge className={`font-medium ${getRatingColor(review?.rating || 0)}`}>
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {review?.rating}
                        </Badge>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < (review?.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {review?.createdAt && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-2" />
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      )}
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditClick(review)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(review)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ReviewModal open={isOpen} onClose={() => setIsOpen(false)} defaultValues={review} />
    </>
  );
}

export default ReviewTable;
