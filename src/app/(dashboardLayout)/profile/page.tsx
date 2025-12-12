// app/(dashboardLayout)/profile/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { User, Mail, MapPin, Edit, Calendar, Shield, Activity, Globe, Briefcase, Heart } from "lucide-react";
import { format } from "date-fns";
import { IUser } from "@/src/app/types/trips.types";
import UpdateProfileModal from "@/src/app/components/shared/UpdateProfileModal";
import { getUser } from "../../services/auth/getme";
import { IUserRole } from "../../proxy";
import ProfileClient from "../../components/dashboard/profile/page";

export default async function ProfilePage() {
  // Fetch user data on the server
  const user = await getUser();
  
  // If you need to handle authentication redirects here:
  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">User not found</h3>
              <p className="text-muted-foreground mt-2">Please log in to view your profile.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pass the user data to a client component
  return <ProfileClient initialUser={user} />
}