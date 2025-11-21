import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";

const MentorProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const skills = ["English Communication", "Pronunciation", "Business English", "IELTS Preparation"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your mentor profile and professional information</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6 pb-6 border-b">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full flex items-center justify-center text-white text-3xl">
                  👨‍🏫
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{user?.name || "Mentor"}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <Badge className="mt-2" variant="outline">
                    Active Mentor
                  </Badge>
                </div>
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Bio</Label>
                    <p className="mt-1">Experienced English mentor with 5+ years in language education and corporate training.</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Experience</Label>
                    <p className="mt-1">5+ years teaching English to non-native speakers</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Active Learners</Label>
                    <p className="mt-1">12 learners</p>
                  </div>
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input defaultValue={user?.name || ""} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" defaultValue={user?.email || ""} disabled />
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <textarea className="w-full border rounded-lg p-2" rows={4} defaultValue="Experienced English mentor..." />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(false)}>Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription>Areas you specialize in teaching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button variant="outline">Add Skill</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Availability & Status</CardTitle>
              <CardDescription>Set your working hours and availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Status</Label>
                <div className="flex gap-2 mt-2">
                  <Badge>Online - Available</Badge>
                </div>
              </div>
              <div>
                <Label>Working Hours</Label>
                <div className="space-y-2 mt-2">
                  <p className="text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
              <Button>Edit Availability</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorProfile;
