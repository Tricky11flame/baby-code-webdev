// src/components/StudentList.tsx
import { useEffect, useState } from "react";
import axios from "../api/mock";

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("/api/students");
        setStudents(res.data.students);
        setFiltered(res.data.students);
      } catch (err) {
        console.error("Error fetching students", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const lower = filter.toLowerCase();
    const result = students.filter((s) => s.course.toLowerCase().includes(lower));
    setFiltered(result);
  }, [filter, students]);

  if (loading) return <p className="p-4">Loading students...</p>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by course"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/3"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((student) => (
            <div
              key={student.id}
              className="p-4 border rounded shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <p className="text-sm text-gray-600">{student.email}</p>
              <p className="text-sm">Course: <span className="font-medium">{student.course}</span></p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentList;
