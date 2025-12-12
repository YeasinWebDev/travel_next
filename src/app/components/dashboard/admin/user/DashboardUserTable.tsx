"use client";

import { IUser } from "@/src/app/types/trips.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";
import { Button } from "../../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "../../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { useState } from "react";
import { format } from "date-fns";
import DashboardUserEditModal from "./DashboardUserEditModal";
import { useSidebar } from "@/src/app/components/ui/sidebar";
import toast from "react-hot-toast";
import { deleteUser, updateUserStatus } from "@/src/services/auth/user";
import { useRouter } from "next/navigation";

interface DashboardUserTableProps {
  users: { data: IUser[] };
}

function DashboardUserTable({ users }: DashboardUserTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<string>("active");
  const { state } = useSidebar();
  const router = useRouter();

  const handleDeleteClick = (user: IUser) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    setIsDeleting(true);
    try {
      const res = await deleteUser(selectedUser.email);
      if (res.success) {
        toast.success("User deleted successfully");
        router.refresh();
      } else {
        toast.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleEditClick = (user: IUser) => {
    setSelectedUser(user);
    setStatus(user.status || "active");
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;

    setIsEditing(true);
    try {
      let ans = await updateUserStatus(selectedUser.email, status);

      if (ans.success) {
        toast.success("Status updated successfully");
        router.refresh();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error("Error updating user:", error);
    } finally {
      setIsEditing(false);
      setEditDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`${state === "collapsed" ? "w-full" : "md:w-[calc(100%-240px)] lg:w-full"} mt-5 border rounded-md`}>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Interests</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users?.data?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImage} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">{user.email}</div>
                  </TableCell>
                  <TableCell>{user.location ? <div className="flex items-center gap-2">{user.location}</div> : <span className="text-muted-foreground">Not set</span>}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.travelInterests?.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {(!user.travelInterests || user.travelInterests.length === 0) && <span className="text-muted-foreground text-sm">None</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "outline"} className={user.role === "admin" ? "bg-green-500 hover:bg-green-600 capitalize" : " capitalize"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "default" : "secondary"}
                      className={user.status === "active" ? "bg-green-500 hover:bg-green-600 capitalize" : "bg-gray-500 hover:bg-gray-600 text-white capitalize"}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">{formatDate(user.createdAt!)}</div>
                  </TableCell>
                  <TableCell className="text-right">
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
                        <DropdownMenuItem onClick={() => handleEditClick(user)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit user
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteClick(user)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete user
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>Are you sure you want to delete user "{selectedUser?.name}"? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <Avatar>
              <AvatarImage src={selectedUser?.profileImage} alt={selectedUser?.name} />
              <AvatarFallback>{selectedUser && getInitials(selectedUser.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{selectedUser?.name}</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.role}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Status Modal */}
      <DashboardUserEditModal
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        selectedUser={selectedUser}
        status={status}
        getInitials={getInitials}
        setStatus={setStatus}
        isEditing={isEditing}
        handleSaveEdit={handleSaveEdit}
      />
    </div>
  );
}

export default DashboardUserTable;
