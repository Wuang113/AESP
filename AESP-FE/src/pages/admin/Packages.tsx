import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Check } from "lucide-react";

const mockPackages = [
  {
    id: 1,
    name: "Basic",
    price: "$29",
    duration: "1 month",
    features: ["5 Mentor Sessions", "Basic AI Analysis", "Email Support", "Progress Tracking"],
    popular: false,
  },
  {
    id: 2,
    name: "Standard",
    price: "$59",
    duration: "3 months",
    features: [
      "15 Mentor Sessions",
      "Advanced AI Analysis",
      "Priority Support",
      "Progress Tracking",
      "Resource Library",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Premium",
    price: "$99",
    duration: "6 months",
    features: [
      "Unlimited Mentor Sessions",
      "Premium AI Analysis",
      "24/7 Support",
      "Progress Tracking",
      "Resource Library",
      "1-on-1 Consultation",
    ],
    popular: false,
  },
];

export default function Packages() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
          <p className="text-muted-foreground">Manage learning packages and pricing</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Package
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPackages.map((pkg) => (
          <Card key={pkg.id} className="relative">
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{pkg.name}</CardTitle>
              <CardDescription>{pkg.duration}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-4xl font-bold">{pkg.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="space-y-2">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
