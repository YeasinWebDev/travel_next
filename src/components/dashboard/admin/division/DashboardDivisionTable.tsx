"use client";

import { Button } from "@/src/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { useSidebar } from "@/src/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { IDivision } from "@/src/types/division.types";
import { LocateFixed, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import ConfirmDelete from "../../ConfirmDelete";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteDivision } from "@/src/services/division/division";
import { DivisionModal } from "./DashboardDivisionModal";

function DashboardDivisionTable({ divisions }: { divisions: IDivision[] }) {
  const { state } = useSidebar();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<IDivision | null>(null);
  const router = useRouter();

  const handleDeleteConfirm = async () => {
    if (!target) return;

    const res = await deleteDivision(target._id!);

    if (res.success) {
      toast.success("Division deleted successfully");
      router.refresh();
    } else {
      toast.error("Error deleting division");
    }

    setConfirmOpen(false);
  };
  return (
    <div className={`rounded-md border mt-5 ${state === "collapsed" ? "md:w-full" : " md:w-[70%] lg:w-full"}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>DivisionId</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {divisions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <LocateFixed className="h-12 w-12 mb-2" />
                  <p>No divisions found.</p>
                  <p className="text-sm">Add your first division to get started.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            divisions.map((division) => (
              <TableRow key={division._id}>
                <TableCell className="font-medium">{division._id}</TableCell>
                <TableCell className="font-medium">
                  <div className="w-12 h-12 rounded-full border overflow-hidden">
                    <Image src={division.image} alt="Division Image" width={56} height={56} className="w-full h-full object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{division.name}</TableCell>
                <TableCell className="font-medium block xl:hidden">{division.description.substring(0, 40) + "..."}</TableCell>
                <TableCell className="font-medium hidden xl:inline-block pt-5">{division.description}</TableCell>
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
                      <DropdownMenuItem onClick={() => { 
                        setIsOpen(true);
                        setTarget(division);
                      }}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => {
                          setTarget(division); 
                          setConfirmOpen(true); 
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
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

      <ConfirmDelete
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Division?"
        description="Are you sure you want to delete this division? This action cannot be undone."
      />

      <DivisionModal isOpen={isOpen} onClose={() => {setIsOpen(false), setTarget(null)}} initialData={target}/>
    </div>
  );
}

export default DashboardDivisionTable;
