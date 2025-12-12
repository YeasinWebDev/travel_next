import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Badge } from '../../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Label } from '../../../ui/label';

function DashboardUserEditModal({editDialogOpen,setEditDialogOpen,selectedUser ,getInitials,status,setStatus ,isEditing ,handleSaveEdit}:any) {
  return (
     <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="w-full md:w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit User Status</DialogTitle>
            <DialogDescription>
              Update the status for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Avatar>
                <AvatarImage src={selectedUser?.profileImage} alt={selectedUser?.name} />
                <AvatarFallback>
                  {selectedUser && getInitials(selectedUser.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedUser?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
                <p className="text-sm text-muted-foreground">
                  Current Status: 
                  <Badge 
                    variant={selectedUser?.status === 'active' ? 'default' : 'secondary'} 
                    className={`ml-2 ${
                      selectedUser?.status === 'active' 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-gray-500 hover:bg-gray-600'
                    } capitalize`}
                  >
                    {selectedUser?.status}
                  </Badge>
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">User Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                      Inactive
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isEditing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={isEditing || status === selectedUser?.status}
            >
              {isEditing ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default DashboardUserEditModal