// src/contexts/StudentContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/mock"; // Make sure axios-mock-adapter is configured

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
}

interface StudentContextType {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
  setStudents: (s: Student[]) => void;
}


const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents must be used within StudentProvider");
  }
  return context;
};

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  const updateStudent = async (updated: Student) => {
    await axios.put(`/api/students/${updated.id}`, updated);
    setStudents((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  const deleteStudent = async (id: number) => {
    await axios.delete(`/api/students/${id}`);
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("/api/students");
        setStudents(res.data.students);
      } catch (err) {
        console.error("Error loading students:", err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent, setStudents }}
    >
      {children}
    </StudentContext.Provider>
  );
};
