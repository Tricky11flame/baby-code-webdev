// src/components/AddStudentForm.tsx

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../contexts/StudentContext";
// import { db } from "../firebase";  // For Firebase DB (commented out if mock is used)
// import { collection, addDoc}, 
import {Timestamp } from "firebase/firestore"; // Firebase import
import type { Student } from "../types/Student";  // Import the existing Student type

const AddStudentForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addStudent } = useStudents();

  const [student, setStudent] = useState<Student>({
    id: 0,  // Default id value
    name: "",
    email: "",
    course: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    course: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    const { name, email, course } = student;
    let formValid = true;
    const newErrors: any = {};

    if (!name) {
      newErrors.name = "Name is required!";
      formValid = false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Valid email is required!";
      formValid = false;
    }

    if (!course) {
      newErrors.course = "Course is required!";
      formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const newStudent = {
        ...student,
        createdAt: Timestamp.now(),
        createdBy: user?.uid,
      };

      // Mock API: Instead of Firebase DB, just adding to context here
      addStudent({
        ...student,
        id: Math.floor(Math.random() * 1000), // Simulate unique ID (replace with real ID generation logic)
      });

      // If Firebase were used, it would be like:
      // const docRef = await addDoc(collection(db, "students"), newStudent);

      navigate("/");
    } catch (err) {
      console.error("Failed to add student:", err);
      alert("Failed to add student. Please try again.");
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Please login to add a student.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-xl border-black border-[1.5px] p-6">
      <h2 className="text-2xl font-semibold text-center">Add New Student</h2>
      <img className=" rounded-[30pt] mx-auto h-40 mt-5" src={"baby-website.svg"} alt="" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={student.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={student.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1" htmlFor="course">
            Course
          </label>
          <input
            type="text"
            name="course"
            id="course"
            value={student.course}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.course && <p className="text-red-600">{errors.course}</p>}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-green-400 text-white p-2 rounded-md hover:bg-emerald-500"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddStudentForm;
