import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Save } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LearnerProfile {
  id: number;
  userId: number;
  name: string;
  englishLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  aiScore: number;
  pronunciationScore: number;
  totalPracticeMinutes: number;
  goals?: string;
  preferences?: string;
}

interface Page<T> {
  content: T[];
}

const fetchLearners = async (): Promise<Page<LearnerProfile>> => {
  const response = await apiClient.get("/learners/profile?page=0&size=20");
  return response.data;
};

export default function Learners() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // State cho Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLearner, setEditingLearner] = useState<LearnerProfile | null>(
    null
  );
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    englishLevel: "BEGINNER",
    aiScore: 0,
    pronunciationScore: 0,
    totalPracticeMinutes: 0,
  });

  // lay du lieu learners
  const { data: learnersPage, isLoading } = useQuery<
    Page<LearnerProfile>,
    Error
  >({
    queryKey: ["learners"],
    queryFn: fetchLearners,
  });

  const learners = learnersPage?.content || [];

  // create learner profile
  const createMutation = useMutation({
    mutationFn: (data: any) => apiClient.post("/learners/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learners"] });
      toast.success("Tạo hồ sơ học viên thành công");
      handleCloseDialog();
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Lỗi khi tạo hồ sơ (Kiểm tra User ID)"
      );
    },
  });

  // update learner profile
  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      apiClient.put(`/learners/profile/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learners"] });
      toast.success("Cập nhật thành công");
      handleCloseDialog();
    },
    onError: () => toast.error("Lỗi khi cập nhật hồ sơ"),
  });

  // delete learner profile
  const deleteLearnerMutation = useMutation({
    mutationFn: (learnerId: number) =>
      apiClient.delete(`/learners/profile/${learnerId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learners"] });
      toast.success("Đã xóa hồ sơ học viên.");
    },
    onError: () => toast.error("Không thể xóa hồ sơ này."),
  });

  // --- Handlers ---

  const handleOpenAdd = () => {
    setEditingLearner(null);
    setFormData({
      userId: "",
      name: "",
      englishLevel: "BEGINNER",
      aiScore: 0,
      pronunciationScore: 0,
      totalPracticeMinutes: 0,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (learner: LearnerProfile) => {
    setEditingLearner(learner);
    setFormData({
      userId: learner.userId.toString(),
      name: learner.name || "",
      englishLevel: learner.englishLevel || "BEGINNER",
      aiScore: learner.aiScore || 0,
      pronunciationScore: learner.pronunciationScore || 0,
      totalPracticeMinutes: learner.totalPracticeMinutes || 0,
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingLearner(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      userId: Number(formData.userId),
      aiScore: Number(formData.aiScore),
      pronunciationScore: Number(formData.pronunciationScore),
      totalPracticeMinutes: Number(formData.totalPracticeMinutes),
    };

    if (editingLearner) {
      const { userId, ...updatePayload } = payload;
      updateMutation.mutate({ id: editingLearner.id, ...updatePayload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDeleteLearner = (learnerId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hồ sơ này không?")) {
      deleteLearnerMutation.mutate(learnerId);
    }
  };

  const filtered = learners.filter((l) =>
    l.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learners</h1>
          <p className="text-muted-foreground">
            Manage learners and track their progress
          </p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Learner Profile
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search learners by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Learner</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>AI Score</TableHead>
              <TableHead>Pron. Score</TableHead>
              <TableHead>Practice (mins)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-muted-foreground"
                >
                  No learners found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((learner) => (
                <TableRow key={learner.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {learner.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{learner.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ID: {learner.userId}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        learner.englishLevel === "ADVANCED"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {learner.englishLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-bold ${
                        learner.aiScore >= 80 ? "text-green-600" : ""
                      }`}
                    >
                      {learner.aiScore}
                    </span>
                  </TableCell>
                  <TableCell>{learner.pronunciationScore}</TableCell>
                  <TableCell>{learner.totalPracticeMinutes} mins</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(learner)}
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteLearner(learner.id)}
                        disabled={deleteLearnerMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingLearner ? "Edit Learner Profile" : "Add Learner Profile"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {!editingLearner && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="userId" className="text-right">
                  User ID
                </Label>
                <Input
                  id="userId"
                  type="number"
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                  className="col-span-3"
                  required
                  placeholder="Linked User ID"
                />
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Level
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.englishLevel}
                  onValueChange={(val) =>
                    setFormData({ ...formData, englishLevel: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="aiScore" className="text-right">
                AI Score
              </Label>
              <Input
                id="aiScore"
                type="number"
                step="0.1"
                max="100"
                value={formData.aiScore}
                onChange={(e) =>
                  setFormData({ ...formData, ai_score: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pronScore" className="text-right">
                Pron. Score
              </Label>
              <Input
                id="pronScore"
                type="number"
                step="0.1"
                max="100"
                value={formData.pronunciationScore}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pronunciationScore: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
