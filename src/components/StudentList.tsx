// src/components/StudentList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStudents } from "../contexts/StudentContext";

const StudentList: React.FC = () => {
  const { students } = useStudents(); // from context
  const [filtered, setFiltered] = useState(students);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const lower = filter.toLowerCase();
    const result = students.filter((s) =>
      s.course.toLowerCase().includes(lower)
    );
    setFiltered(result);
  }, [filter, students]);

  if (!students.length && !filtered.length) {
    return (
      <div className="p-4 flex justify-center">
        <svg className="animate-spin h-6 w-6 text-blue-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
        </svg>
      </div>
    );
  }
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
            <Link
              to={`/students/${student.id}`}
              key={student.id}
              className="block"
            >
              <div className="p-4 border rounded shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.email}</p>
                <p className="text-sm">
                  Course:{" "}
                  <span className="font-medium">{student.course}</span>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No students found.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentList;
