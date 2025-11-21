import React, { createContext, useContext, useState, ReactNode } from "react";

type Policy = {
  id: number;
  title: string;
  description: string;
  status: string;
  lastUpdated: string;
};

type PolicyContextType = {
  policies: Policy[];
  addPolicy: (policy: Policy) => void;
  updatePolicy: (updatedPolicy: Policy) => void;
  deletePolicy: (id: number) => void;
};

const PolicyContext = createContext<PolicyContextType | undefined>(undefined);

export const PolicyProvider = ({ children }: { children: ReactNode }) => {
  const [policies, setPolicies] = useState<Policy[]>([
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
  ]);

  const addPolicy = (policy: Policy) => setPolicies((prev) => [...prev, policy]);

  const updatePolicy = (updatedPolicy: Policy) =>
    setPolicies((prev) =>
      prev.map((p) => (p.id === updatedPolicy.id ? updatedPolicy : p))
    );

  const deletePolicy = (id: number) =>
    setPolicies((prev) => prev.filter((p) => p.id !== id));

  return (
    <PolicyContext.Provider value={{ policies, addPolicy, updatePolicy, deletePolicy }}>
      {children}
    </PolicyContext.Provider>
  );
};

export const usePolicy = () => {
  const context = useContext(PolicyContext);
  if (!context) {
    throw new Error("usePolicy must be used within a PolicyProvider");
  }
  return context;
};      
