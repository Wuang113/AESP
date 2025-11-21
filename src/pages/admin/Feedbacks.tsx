import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import {
  Search,
  Filter,
  MoreVertical,
  MessageSquare,
  Star,
  Trash2,
  User as UserIcon,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// ==== Types ====
interface Feedback {
  id: number;
  userId: number;
  userName: string;
  content: string;
  targetType: string;
  targetId: number;
  rating: number;
  createdAt?: string;
}

export default function Feedbacks() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // lay danh sach feedbacks
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const response = await apiClient.get("/feedback-comments?page=0&size=20");
      return response.data.content || [];
    },
  });

  // xoa feedback
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/feedback-comments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Đã xóa phản hồi.");
    },
    onError: () => toast.error("Lỗi khi xóa phản hồi."),
  });

  // lọc feedbacks theo search term
  const filteredFeedbacks = feedbacks.filter(
    (fb: Feedback) =>
      fb.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feedbacks</h1>
          <p className="text-muted-foreground">User reviews and comments</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-2 flex-1 bg-slate-50 p-2 rounded-md border">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search feedback content or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none bg-transparent focus-visible:ring-0"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Skeleton className="h-4 w-[250px] mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredFeedbacks.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No feedbacks found.
                </TableCell>
              </TableRow>
            ) : (
              filteredFeedbacks.map((fb: Feedback) => (
                <TableRow key={fb.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">
                        {fb.userName || `User #${fb.userId}`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="uppercase text-xs">
                      {fb.targetType || "General"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="font-medium">{fb.rating}</span>
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
                      <p
                        className="text-sm text-gray-600 truncate"
                        title={fb.content}
                      >
                        {fb.content}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            if (confirm("Xóa phản hồi này?"))
                              deleteMutation.mutate(fb.id);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Feedback
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
    </div>
  );
}
