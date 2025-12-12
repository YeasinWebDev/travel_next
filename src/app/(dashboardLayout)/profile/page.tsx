// app/(dashboardLayout)/profile/page.tsx
export const dynamic = 'force-dynamic'; 

import { Card, CardContent } from "../../components/ui/card";
import { User } from "lucide-react";

import { getUser } from "../../services/auth/getme";

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