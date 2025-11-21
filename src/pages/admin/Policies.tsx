import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { SystemPolicy } from "@/schemas/SystemPolicy";
import { toast } from "sonner";
// import { usePolicy } from "@/contexts/PolicyContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Edit, Shield, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Page<T> {
  content: T[];
}

const fetchPolicies = async (): Promise<Page<SystemPolicy>> => {
  const response = await apiClient.get("/system-policies?page=0&size=20");
  return response.data;
};

// dinh nghia kieu cho du lieu form create/update policy
type PolicyFormData = Omit<SystemPolicy, "id">;

export default function Policies() {
  const queryClient = useQueryClient();

  // quan ly state dialog create policy
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<SystemPolicy | null>(null);

  const { data: policiesPage, isLoading } = useQuery<Page<SystemPolicy>, Error>(
    {
      queryKey: ["policies"],
      queryFn: fetchPolicies,
    }
  );

  const policies = policiesPage?.content || [];
  // create policy
  const createPolicyMutation = useMutation({
    mutationFn: (newData: PolicyFormData) =>
      apiClient.post("/system-policies", newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      toast.success("Policy created successfully.");
      setIsCreateDialogOpen(false);
    },
    onError: () => toast.error("Failed to create policy."),
  });

  // update policy
  const updatePolicyMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PolicyFormData }) =>
      apiClient.put(`/system-policies/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      toast.success("Policy updated successfully.");
      setEditingPolicy(null);
    },
    onError: () => toast.error("Failed to update policy."),
  });

  // delete policy
  const deletePolicyMutation = useMutation({
    mutationFn: (policyId: number) =>
      apiClient.delete(`/system-policies/${policyId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      toast.success("Policy deleted successfully.");
    },
    onError: () => toast.error("Failed to delete policy."),
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      deletePolicyMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Policies</h1>
          <p className="text-muted-foreground">
            Manage system policies and guidelines
          </p>
        </div>
        {/* nut Add/Create mở Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Policy
            </Button>
          </DialogTrigger>
          <PolicyFormDialog
            title="Create New Policy"
            onSave={createPolicyMutation.mutate}
            isPending={createPolicyMutation.isPending}
            onClose={() => setIsCreateDialogOpen(false)}
          />
        </Dialog>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : policies.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No policies found.
            </CardContent>
          </Card>
        ) : (
          policies.map((policy) => (
            <Card key={policy.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{policy.title}</CardTitle>
                      <CardDescription>
                        {policy.content
                          ? policy.content.substring(0, 100) + "..."
                          : "No content"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingPolicy(policy)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(policy.id!)}
                      disabled={deletePolicyMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          ))
        )}
      </div>

      {editingPolicy && (
        <PolicyFormDialog
          key={editingPolicy.id}
          title="Edit Policy"
          policy={editingPolicy}
          onSave={(data) =>
            updatePolicyMutation.mutate({ id: editingPolicy.id!, data })
          }
          isPending={updatePolicyMutation.isPending}
          onClose={() => setEditingPolicy(null)}
        />
      )}
    </div>
  );
}

// component dialog form create/update policy
function PolicyFormDialog({
  title,
  policy,
  onSave,
  isPending,
  onClose,
}: {
  title: string;
  policy?: SystemPolicy;
  onSave: (data: PolicyFormData) => void;
  isPending: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: policy?.title || "",
    content: policy?.content || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <DialogContent className="sm:max-w-[425px]" onInteractOutside={onClose}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="content" className="text-right mt-2">
            Content
          </Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="col-span-3 min-h-[100px]"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogClose>
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Saving..." : "Save Policy"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
