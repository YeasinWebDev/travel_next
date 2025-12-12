"use client";

import { IDestination } from "@/src/app/types/destination.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { Badge } from "../../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Button } from "../../../ui/button";
import { Eye, Pencil, Trash2, Star, MapPin, MoreHorizontal } from "lucide-react";
import { useSidebar } from "@/src/app/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { deleteDestination } from "@/src/services/destination/destination";
import toast from "react-hot-toast";
import DestinationModel from "./DestinationModel";
import { useState } from "react";
import ConfirmDelete from "../../ConfirmDelete";

interface DashboardDestinationTableProps {
  allDestinations: IDestination[];
  divisions: Array<{ value: string; label: string }>;
  onView?: (destination: IDestination) => void;
  onEdit?: (destination: IDestination) => void;
  onDelete?: (destination: IDestination) => void;
}

function DashboardDestinationTable({ allDestinations, divisions }: DashboardDestinationTableProps) {
  const { state } = useSidebar();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [destinationData, setDestinationData] = useState<IDestination | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<IDestination | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const askDelete = (des: IDestination) => {
    setDeleteTarget(des);
    setConfirmOpen(true);
  };

  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to extract division name
  const getDivisionName = (division: any) => {
    if (!division) return "N/A";
    if (typeof division === "object" && division !== null && "name" in division) {
      return (division as { name: string }).name;
    }
    return division.toString();
  };

  const handleEditClick = (des: IDestination) => {
    setDestinationData(des);
    setIsOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setLoadingDelete(true);
    const res = await deleteDestination(deleteTarget._id!);

    if (res.success) {
      toast.success("Destination deleted successfully");
      router.refresh();
    } else {
      toast.error("Error deleting destination");
    }

    setLoadingDelete(false);
    setConfirmOpen(false);
  };

  return (
    <div className={`rounded-md border mt-5 ${state === "collapsed" ? "md:w-full" : " md:w-[70%] lg:w-full"}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Division</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allDestinations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <MapPin className="h-12 w-12 mb-2" />
                  <p>No destinations found.</p>
                  <p className="text-sm">Add your first destination to get started.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            allDestinations.map((destination) => (
              <TableRow key={destination._id} className="hover:bg-muted/50">
                <TableCell>
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={destination.image[0]} alt={destination.name} className="object-cover" />
                    <AvatarFallback className="bg-primary/10">{getInitials(destination.name)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{destination.name}</span>
                      {destination.isFeatured && (
                        <Badge variant="outline" className="gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{destination.description.substring(0, 30)}...</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{destination.location.substring(0, 12)}...</span>
                  </div>
                  {destination.coordinates && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {destination.coordinates.lat.toFixed(4)}, {destination.coordinates.lng.toFixed(4)}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal capitalize">
                    {getDivisionName(destination.division)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{formatPrice(destination.price)}</span>
                    <p className="text-xs text-muted-foreground">per person</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={destination.status === "active" ? "default" : "secondary"}
                      className={
                        destination.status === "active"
                          ? "bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200"
                          : "bg-red-500/10 text-red-700 hover:bg-red-500/20 border-red-200"
                      }
                    >
                      {destination.status.charAt(0).toUpperCase() + destination.status.slice(1)}
                    </Badge>
                  </div>
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
                      <DropdownMenuItem onClick={() => handleEditClick(destination)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => askDelete(destination)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => router.push(`/destinations/${destination._id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                {/* <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onView?.(destination)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onEdit?.(destination)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onDelete?.(destination)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <DestinationModel open={isOpen} onOpenChange={setIsOpen} divisions={divisions} destination={destinationData} />

      <ConfirmDelete
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Destination?"
        description="Are you sure you want to delete this destination? This action cannot be undone."
      />
    </div>
  );
}

export default DashboardDestinationTable;
