import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Shield } from "lucide-react";

const mockPolicies = [
  {
    id: 1,
    title: "Privacy Policy",
    description: "User data collection and usage guidelines",
    status: "Active",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    title: "Terms of Service",
    description: "Platform usage terms and conditions",
    status: "Active",
    lastUpdated: "2024-01-10",
  },
  {
    id: 3,
    title: "Refund Policy",
    description: "Payment refund rules and procedures",
    status: "Active",
    lastUpdated: "2024-01-05",
  },
  {
    id: 4,
    title: "Content Guidelines",
    description: "User-generated content moderation rules",
    status: "Draft",
    lastUpdated: "2024-01-20",
  },
  {
    id: 5,
    title: "Community Standards",
    description: "Behavioral expectations and guidelines",
    status: "Active",
    lastUpdated: "2024-01-12",
  },
];

export default function Policies() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Policies</h1>
          <p className="text-muted-foreground">Manage system policies and guidelines</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Policy
        </Button>
      </div>

      <div className="space-y-4">
        {mockPolicies.map((policy) => (
          <Card key={policy.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{policy.title}</CardTitle>
                    <CardDescription>{policy.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={policy.status === "Active" ? "default" : "secondary"}
                    className={
                      policy.status === "Active"
                        ? "bg-success text-success-foreground"
                        : ""
                    }
                  >
                    {policy.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
