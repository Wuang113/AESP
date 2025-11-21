import React, { createContext, useContext, useState, ReactNode } from "react";

// ✅ Kiểu dữ liệu Learner
export interface Learner {
  id: number;
  name: string;
  email: string;
  aiScore: number;
  package: string;
  progress: number;
}

// ✅ Dữ liệu mẫu (mock)
const mockLearners: Learner[] = [
  { id: 1, name: "Alice Cooper", email: "alice@example.com", aiScore: 87, package: "Premium", progress: 75 },
  { id: 2, name: "Bob Martin", email: "bob@example.com", aiScore: 92, package: "Standard", progress: 60 },
  { id: 3, name: "Carol White", email: "carol@example.com", aiScore: 78, package: "Premium", progress: 45 },
  { id: 4, name: "David Green", email: "david@example.com", aiScore: 85, package: "Basic", progress: 90 },
  { id: 5, name: "Eve Black", email: "eve@example.com", aiScore: 95, package: "Premium", progress: 80 },
];

// ✅ Interface cho Context
interface LearnerContextType {
  learners: Learner[];
  addLearner: (learner: Learner) => void;
  updateLearner: (id: number, updated: Partial<Learner>) => void;
  removeLearner: (id: number) => void; // 👈 thêm hàm xóa
}

// ✅ Tạo Context
const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

// ✅ Provider component
export const LearnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [learners, setLearners] = useState<Learner[]>(mockLearners);

  // ➕ Thêm học viên
  const addLearner = (learner: Learner) => {
    setLearners((prev) => [...prev, { ...learner, id: prev.length + 1 }]);
  };

  // ✏️ Cập nhật học viên
  const updateLearner = (id: number, updated: Partial<Learner>) => {
    setLearners((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updated } : l))
    );
  };

  // ❌ Xóa học viên
  const removeLearner = (id: number) => {
    setLearners((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <LearnerContext.Provider
      value={{ learners, addLearner, updateLearner, removeLearner }}
    >
      {children}
    </LearnerContext.Provider>
  );
};

// ✅ Hook dùng trong component
export const useLearners = () => {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error("useLearners must be used within a LearnerProvider");
  }
  return context;
};
