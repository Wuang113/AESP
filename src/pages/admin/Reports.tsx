// src/pages/admin/Reports.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Report } from "@/schemas/Report";
import { toast } from "sonner";
import { useState } from "react"; // Thêm useState
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Thêm Input
import { Label } from "@/components/ui/label"; // Thêm Label
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Thêm Dialog
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, FileText, Calendar, Plus, Trash2 } from "lucide-react";

interface Page<T> {
  content: T[];
}

const fetchReports = async (): Promise<Page<Report>> => {
  const response = await apiClient.get("/reports?page=0&size=20");
  return response.data;
};

export default function Reports() {
  const queryClient = useQueryClient();

  // 1. State quản lý việc đóng mở Form và dữ liệu nhập vào
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReportData, setNewReportData] = useState({
    reportType: "",
    dataSummary: "",
  });

  const { data: reportsPage, isLoading } = useQuery<Page<Report>, Error>({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });

  const reports = reportsPage?.content || [];

  // 2. Hàm tạo Report (đã sửa để nhận dữ liệu từ Form)
  const createReportMutation = useMutation({
    mutationFn: (data: any) => apiClient.post("/reports", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("Generated report successfully!");

      // Đóng form và reset dữ liệu sau khi thành công
      setIsDialogOpen(false);
      setNewReportData({ reportType: "", dataSummary: "" });
    },
    onError: () => toast.error("Failed to generate report."),
  });

  const handleSaveReport = () => {
    // Validate đơn giản
    if (!newReportData.reportType)
      return toast.warning("Please enter report type");

    createReportMutation.mutate({
      reportType: newReportData.reportType,
      dataSummary:
        newReportData.dataSummary || "System generated report summary.",
      fileUrl: "#", // Giả lập link file
      generatedAt: new Date().toISOString(),
    });
  };

  const deleteReportMutation = useMutation({
    mutationFn: (reportId: number) => apiClient.delete(`/reports/${reportId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("Report deleted successfully.");
    },
    onError: () => toast.error("Failed to delete report."),
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      deleteReportMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and download system reports
          </p>
        </div>

        {/* --- 3. PHẦN FORM DIALOG (POPUP) --- */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
              <DialogDescription>
                Enter the report details below. Click Generate when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  placeholder="e.g., Monthly Sales"
                  value={newReportData.reportType}
                  onChange={(e) =>
                    setNewReportData({
                      ...newReportData,
                      reportType: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="summary" className="text-right">
                  Summary
                </Label>
                <Input
                  id="summary"
                  placeholder="Brief description..."
                  value={newReportData.dataSummary}
                  onChange={(e) =>
                    setNewReportData({
                      ...newReportData,
                      dataSummary: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleSaveReport}
                disabled={createReportMutation.isPending}
              >
                {createReportMutation.isPending ? "Generating..." : "Generate"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* ----------------------------------- */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </>
        ) : reports.length === 0 ? (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="pt-6 text-center text-muted-foreground">
              No reports found.
            </CardContent>
          </Card>
        ) : (
          reports.map((report) => {
            return (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={report.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(report.id!)}
                        disabled={deleteReportMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{report.reportType}</CardTitle>
                  <CardDescription>
                    {report.dataSummary || "No summary available"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Generated:{" "}
                      {new Date(report.generatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
