// src/pages/admin/Mentors.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Mentor, AvailabilityStatus } from "@/schemas/Mentor";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Star, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Page<T> {
  content: T[];
}

const fetchMentors = async (): Promise<Page<Mentor>> => {
  const response = await apiClient.get("/mentors");
  return response.data;
};

export default function Mentors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // tao user mentor
  const [newMentorUser, setNewMentorUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "MENTOR",
  });

  const queryClient = useQueryClient();

  const { data: mentorsPage, isLoading } = useQuery<Page<Mentor>, Error>({
    queryKey: ["mentors"],
    queryFn: fetchMentors,
  });

  const mentors = mentorsPage?.content || [];

  const createMentorMutation = useMutation({
    mutationFn: (data: any) => apiClient.post("/users", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentors"] });
      toast.success("Đã tạo tài khoản Mentor thành công!");
      setIsDialogOpen(false);
      setNewMentorUser({ name: "", email: "", password: "", role: "MENTOR" });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Lỗi khi tạo mentor.";
      toast.error(msg);
    },
  });

  const handleAddMentor = () => {
    if (
      !newMentorUser.name ||
      !newMentorUser.email ||
      !newMentorUser.password
    ) {
      return toast.warning("Vui lòng điền đầy đủ thông tin");
    }
    createMentorMutation.mutate(newMentorUser);
  };
  // Xóa mentor

  const deleteMentorMutation = useMutation({
    mutationFn: (mentorId: number) => apiClient.delete(`/mentors/${mentorId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentors"] });
      toast.success("Mentor đã được xóa.");
    },
    onError: () => toast.error("Không thể xóa mentor."),
  });

  const handleDeleteMentor = (mentorId: number) => {
    if (window.confirm("Bạn có chắc muốn xóa mentor này không?")) {
      deleteMentorMutation.mutate(mentorId);
    }
  };

  const filteredMentors = mentors.filter((m) =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mentors</h1>
          <p className="text-muted-foreground">
            Manage mentor profiles and status
          </p>
        </div>

        {/* form them mentor */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Mentor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Mentor Account</DialogTitle>
              <DialogDescription>
                Tạo tài khoản User mới với quyền Mentor. Hồ sơ chi tiết sẽ được
                cập nhật sau.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newMentorUser.name}
                  onChange={(e) =>
                    setNewMentorUser({ ...newMentorUser, name: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="Full Name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newMentorUser.email}
                  onChange={(e) =>
                    setNewMentorUser({
                      ...newMentorUser,
                      email: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder="mentor@example.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newMentorUser.password}
                  onChange={(e) =>
                    setNewMentorUser({
                      ...newMentorUser,
                      password: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAddMentor}
                disabled={createMentorMutation.isPending}
              >
                {createMentorMutation.isPending
                  ? "Creating..."
                  : "Create Mentor"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search mentors by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentor</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-20 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredMentors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-muted-foreground"
                >
                  No mentors found.
                </TableCell>
              </TableRow>
            ) : (
              filteredMentors.map((mentor) => (
                <TableRow key={mentor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {mentor.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "M"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{mentor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{mentor.experience_years || 0} years</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {mentor.rating || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{mentor.total_students || 0}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        mentor.availabilityStatus ===
                        AvailabilityStatus.AVAILABLE
                          ? "default"
                          : "secondary"
                      }
                      className={
                        mentor.availabilityStatus ===
                        AvailabilityStatus.AVAILABLE
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white"
                      }
                    >
                      {mentor.availabilityStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMentor(mentor.id!)}
                      disabled={deleteMentorMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
