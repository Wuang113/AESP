// src/pages/learner/LearnerProfile.tsx
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";
import {
  LearnerProfile as ILearnerProfile,
  EnglishLevel,
} from "@/schemas/LearnerProfile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

const fetchMyProfile = async (): Promise<ILearnerProfile> => {
  const response = await apiClient.get("/learners/profile/me");
  return response.data;
};

const LearnerProfile: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // State form
  const [formData, setFormData] = useState({
    name: "",
    englishLevel: EnglishLevel.BEGINNER,
    goals: "",
    preferences: "",
  });

  const { data: profile, isLoading } = useQuery<ILearnerProfile>({
    queryKey: ["my-profile"],
    queryFn: fetchMyProfile,
  });

  // dong bo profile vao form khi load xong
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        englishLevel: profile.englishLevel || EnglishLevel.BEGINNER,
        goals: profile.goals || "",
        preferences: profile.preferences || "",
      });
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      apiClient.put(`/learners/profile/${profile?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    },
    onError: () => toast.error("Failed to update profile."),
  });

  const handleSave = () => {
    if (!profile?.id) return;
    updateMutation.mutate(formData);
  };

  if (isLoading) return <Skeleton className="h-96 w-full" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your profile and learning preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="goals">Learning Goals</TabsTrigger>
        </TabsList>

        {/* --- TAB PROFILE INFO --- */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6 pb-6 border-b">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-indigo-400 rounded-full flex items-center justify-center text-white text-3xl">
                  👨‍🎓
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {profile?.name || user?.name}
                  </h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">Active Learner</Badge>
                    <Badge>{profile?.englishLevel}</Badge>
                  </div>
                </div>
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Full Name</Label>
                      <p className="font-medium">{profile?.name || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        English Level
                      </Label>
                      <p className="font-medium">{profile?.englishLevel}</p>
                    </div>
                  </div>
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>English Level</Label>
                    <Select
                      value={formData.englishLevel}
                      onValueChange={(val) =>
                        setFormData({
                          ...formData,
                          englishLevel: val as EnglishLevel,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BEGINNER">Beginner</SelectItem>
                        <SelectItem value="INTERMEDIATE">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="ADVANCED">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- TAB GOALS --- */}
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Goals & Preferences</CardTitle>
              <CardDescription>
                Set your learning objectives and what you want to focus on.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>My Goals</Label>
                <Textarea
                  placeholder="e.g., Achieve IELTS Band 8, Improve speaking confidence..."
                  value={formData.goals}
                  onChange={(e) =>
                    setFormData({ ...formData, goals: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>Preferences / Interests</Label>
                <Textarea
                  placeholder="e.g., Business English, Technology, Travel..."
                  value={formData.preferences}
                  onChange={(e) =>
                    setFormData({ ...formData, preferences: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Update Goals
                </Button>
              )}
              {isEditing && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                  >
                    Save Goals
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnerProfile;
