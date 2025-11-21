import React, { createContext, useContext, useState, ReactNode } from "react";

// ✅ Kiểu dữ liệu Package
export interface Package {
  id: number;
  name: string;
  price: string;
  duration: string;
  features: string[];
  popular: boolean;
}

// ✅ Dữ liệu mẫu (mock)
const mockPackages: Package[] = [
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

// ✅ Interface cho Context
interface PackageContextType {
  packages: Package[];
  addPackage: (pkg: Package) => void;
  updatePackage: (id: number, updated: Partial<Package>) => void;
  deletePackage: (id: number) => void;
}

// ✅ Tạo Context
const PackageContext = createContext<PackageContextType | undefined>(undefined);

// ✅ Provider component
export const PackageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>(mockPackages);

  const addPackage = (pkg: Package) => {
    setPackages((prev) => [...prev, { ...pkg, id: prev.length + 1 }]);
  };

  const updatePackage = (id: number, updated: Partial<Package>) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deletePackage = (id: number) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PackageContext.Provider value={{ packages, addPackage, updatePackage, deletePackage }}>
      {children}
    </PackageContext.Provider>
  );
};

// ✅ Hook dùng trong component
export const usePackages = () => {
  const context = useContext(PackageContext);
  if (!context) throw new Error("usePackages must be used within a PackageProvider");
  return context;
};
