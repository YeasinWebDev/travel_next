"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { User, Mail, MapPin, Edit, Calendar, Shield, Activity, Globe, Briefcase, Heart } from "lucide-react";
import { format } from "date-fns";
import { IUser } from "@/src/types/trips.types";
import { IUserRole } from "@/src/proxy";
import { getUser } from "@/src/services/auth/getme";
import { Spinner } from "@/src/components/ui/spinner";
import UpdateProfileModal from "@/src/components/shared/UpdateProfileModal";


export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const getMe = await getUser();

      setUser(getMe);
      setLoading(false);
    };

    fetchUserProfile();
  }, [reload]);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center h-screen">
        <Spinner className="size-20" color="black" />
      </div>
    );
  }

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

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.profileImage || ""} alt={user.name} />
                <AvatarFallback className="text-2xl bg-primary/10">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <Badge variant={user.role === IUserRole.ADMIN ? "destructive" : "secondary"} className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {user.role.toUpperCase()}
                  </Badge>
                  <Badge variant={user.status === "active" ? "success" : "outline"} className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {user.status || "active"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Button onClick={() => setIsUpdateModalOpen(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Member since {format(new Date(), "MMM yyyy")}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="gap-3">
          <TabsTrigger value="about" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            About
          </TabsTrigger>
          <TabsTrigger value="interests" className="flex items-center gap-2 cursor-pointer">
            <Heart className="h-4 w-4" />
            Travel Interests
          </TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-base">{user.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <p className="text-base">{user.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <div>
                    <Badge variant={user.role === IUserRole.ADMIN ? "destructive" : "secondary"}>{user.role}</Badge>
                  </div>
                </div>
                {user.location && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Location</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p className="text-base">{user.location}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Account Status
                </CardTitle>
                <CardDescription>Your account details and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                  <div>
                    <Badge variant={user.status === "active" ? "success" : "outline"} className="flex items-center gap-1 w-fit">
                      <Activity className="h-3 w-3" />
                      {user.status || "active"}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Profile Completion</label>
                  <div className="space-y-2">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${calculateProfileCompletion(user)}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{calculateProfileCompletion(user)}% Complete</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Last updated: {format(new Date(), "MMM dd, yyyy")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Interests Tab */}
        <TabsContent value="interests">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Travel Interests
              </CardTitle>
              <CardDescription>Your preferred travel destinations and activities</CardDescription>
            </CardHeader>
            <CardContent>
              {user.travelInterests && user.travelInterests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.travelInterests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {interest}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No interests added</h3>
                  <p className="text-muted-foreground mt-2">Add your travel interests to get personalized recommendations.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Update Profile Modal */}
      <UpdateProfileModal open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen} user={user} setReload={setReload} reload={reload} />
    </div>
  );
}

// Helper function to calculate profile completion percentage
function calculateProfileCompletion(user: IUser): number {
  let completedFields = 0;
  const totalFields = 5; // name, email, profileImage, location, travelInterests

  if (user.name) completedFields++;
  if (user.email) completedFields++;
  if (user.profileImage) completedFields++;
  if (user.location) completedFields++;
  if (user.travelInterests && user.travelInterests.length > 0) completedFields++;

  return Math.round((completedFields / totalFields) * 100);
}
