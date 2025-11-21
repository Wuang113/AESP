import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Package } from "@/schemas/Package"; // Đảm bảo import đúng
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Check, Star } from "lucide-react";

interface Page<T> {
  content: T[];
}

const fetchPackages = async (): Promise<Page<Package>> => {
  const response = await apiClient.get("/packages?page=0&size=10");
  return response.data;
};

export default function Packages() {
  const queryClient = useQueryClient();

  // State cho Dialog (Form Thêm/Sửa)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    durationDays: 30,
    hasMentor: false,
    status: "ACTIVE",
  });

  // lay du lieu packages
  const { data: packagesPage, isLoading } = useQuery<Page<Package>, Error>({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  const packages = packagesPage?.content || [];

  // create
  const createMutation = useMutation({
    mutationFn: (newPkg: any) => apiClient.post("/packages", newPkg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast.success("Tạo gói thành công");
      handleCloseDialog();
    },
    onError: () => toast.error("Lỗi khi tạo gói"),
  });

  // update
  const updateMutation = useMutation({
    mutationFn: (pkg: any) => apiClient.put(`/packages/${pkg.id}`, pkg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast.success("Cập nhật thành công");
      handleCloseDialog();
    },
    onError: () => toast.error("Lỗi khi cập nhật"),
  });

  // delete
  const deletePackageMutation = useMutation({
    mutationFn: (packageId: number) =>
      apiClient.delete(`/packages/${packageId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast.success("Đã xóa gói dịch vụ.");
    },
    onError: () => toast.error("Không thể xóa gói này."),
  });

  // --- Handlers ---

  const handleDeletePackage = (packageId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa gói này không?")) {
      deletePackageMutation.mutate(packageId);
    }
  };

  const handleOpenAdd = () => {
    setEditingPackage(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      durationDays: 30,
      hasMentor: false,
      status: "ACTIVE",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description || "",
      price: pkg.price,
      durationDays: pkg.duration_days || 30,
      hasMentor: pkg.has_mentor || false,
      status: pkg.status || "ACTIVE",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPackage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,

      price: Number(formData.price),
      durationDays: Number(formData.durationDays),
    };

    if (editingPackage) {
      updateMutation.mutate({ ...payload, id: editingPackage.id });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
          <p className="text-muted-foreground">
            Manage learning packages and pricing
          </p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Create Package
        </Button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="relative flex flex-col">
              {pkg.price === 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Free / Default
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription>
                  {pkg.duration_days
                    ? `${pkg.duration_days} days`
                    : "Unlimited"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div>
                  <span className="text-4xl font-bold">
                    ${pkg.price.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground"> / package</span>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">
                      {pkg.description || "No description"}
                    </span>
                  </div>
                  {pkg.has_mentor && (
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">Includes Mentor Support</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleOpenEdit(pkg)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeletePackage(pkg.id!)}
                    disabled={deletePackageMutation.isPending}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog Add/Edit Package */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? "Edit Package" : "Create New Package"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Package Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Premium Plan"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Package details..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (Days)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.durationDays}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      durationDays: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label htmlFor="hasMentor">Mentor Support</Label>
                <p className="text-xs text-muted-foreground">
                  Enable access to mentors
                </p>
              </div>
              <Switch
                id="hasMentor"
                checked={formData.hasMentor}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasMentor: checked })
                }
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingPackage ? "Save Changes" : "Create Package"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
