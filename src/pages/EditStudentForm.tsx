// src/pages/EditStudentForm.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "../contexts/StudentContext";
import { useEffect, useState } from "react";
import type { Student } from "../types/Student";

const EditStudentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { students, updateStudent } = useStudents();

  const existingStudent = students.find((s) => s.id === parseInt(id || "", 10));

  const [student, setStudent] = useState<Student | null>(null);
  const [errors, setErrors] = useState({ name: "", email: "", course: "" });

  useEffect(() => {
    if (existingStudent) {
      setStudent(existingStudent);
    }
  }, [existingStudent]);

  if (!student) return <p className="p-4">Student not found.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const validateForm = () => {
    const { name, email, course } = student;
    const newErrors: any = {};
    let valid = true;

    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Valid email required";
      valid = false;
    }

    if (!course) {
      newErrors.course = "Course is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    updateStudent(student);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className=" max-w-lg mx-auto bg-white rounded shadow space-y-4 w-full border-black border-[1.5px] p-6">
      <h2 className="text-2xl font-bold text-center">Edit Student</h2>
      <img className=" rounded-[30pt] mx-auto h-40 mb-5" src={"baby-website.svg"} alt="" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-rose-700 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-rose-700 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1">Course</label>
          <input
            type="text"
            name="course"
            value={student.course}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.course && <p className="text-rose-700 text-sm">{errors.course}</p>}
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="border-black border-[1.5px] bg-green-400 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="border-black border-[1.5px] bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default EditStudentForm;
