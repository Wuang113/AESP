// src/pages/learner/LearnerPackages.tsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";
import { Package } from "@/schemas/Package";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, ShoppingCart, Loader2 } from "lucide-react";

// Interface cho gói đã mua
interface LearnerPackage {
  id: number;
  packageId: number;
  paymentStatus: string;
  expireDate: string;
}

interface Page<T> {
  content: T[];
}

const LearnerPackages: React.FC = () => {
  const queryClient = useQueryClient();

  // 1. Lấy danh sách tất cả gói (Sản phẩm)
  const { data: allPackagesPage, isLoading: isLoadingPackages } = useQuery<
    Page<Package>
  >({
    queryKey: ["packages"],
    queryFn: async () => (await apiClient.get("/packages")).data,
  });

  // 2. Lấy danh sách gói CỦA TÔI (Đã mua)
  // API này giờ đã tự động lấy theo User đang đăng nhập (nhờ phần sửa Backend ở trên)
  const { data: myPackagesPage, isLoading: isLoadingMyPackages } = useQuery<
    Page<LearnerPackage>
  >({
    queryKey: ["my-packages"],
    queryFn: async () => (await apiClient.get("/learner-packages")).data,
  });

  const allPackages = allPackagesPage?.content || [];
  const myPackages = myPackagesPage?.content || [];

  // 3. Logic Mua gói
  const buyMutation = useMutation({
    mutationFn: async (packageId: number) => {
      return await apiClient.post("/learner-packages", {
        packageId: packageId,
        transactionId: Math.floor(Math.random() * 100000), // Giả lập mã giao dịch
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-packages"] });
      toast.success("Đăng ký gói thành công!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Lỗi khi đăng ký gói.");
    },
  });

  if (isLoadingPackages || isLoadingMyPackages) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Packages</h1>
        <p className="text-muted-foreground">
          Choose a plan to upgrade your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allPackages.map((pkg) => {
          // Kiểm tra xem đã mua gói này chưa
          const ownedPackage = myPackages.find(
            (mp) => mp.packageId === pkg.id && mp.paymentStatus === "PENDING" // Hoặc 'COMPLETED' tùy logic
          );
          const isOwned = !!ownedPackage;

          return (
            <Card
              key={pkg.id}
              className={`flex flex-col relative overflow-hidden transition-all hover:shadow-lg ${
                isOwned ? "border-green-500 border-2 bg-green-50/30" : ""
              }`}
            >
              {isOwned && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
                  OWNED
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription className="min-h-[40px]">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <div>
                  <span className="text-3xl font-bold">${pkg.price}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    / {pkg.durationDays} days
                  </span>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {pkg.hasMentor
                      ? "Includes Mentor Support"
                      : "Self-study only"}
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    Unlimited AI Practice
                  </li>
                </ul>
              </CardContent>

              <CardFooter>
                {isOwned ? (
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled
                  >
                    Active until{" "}
                    {new Date(ownedPackage?.expireDate).toLocaleDateString()}
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => buyMutation.mutate(pkg.id!)}
                    disabled={buyMutation.isPending}
                  >
                    {buyMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ShoppingCart className="mr-2 h-4 w-4" />
                    )}
                    Subscribe Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LearnerPackages;
