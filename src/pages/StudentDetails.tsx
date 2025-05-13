// src/pages/StudentDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "../contexts/StudentContext";
import { useState } from "react";

const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { students, deleteStudent } = useStudents();
  const navigate = useNavigate();

  const student = students.find((s) => s.id === parseInt(id || "", 10));

  const [showConfirm, setShowConfirm] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [confirmInput, setConfirmInput] = useState("");

  if (!student) return <p className="p-4">Student not found.</p>;

  const handleDelete = () => {
    deleteStudent(student.id);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{student.name}</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
        >
          Go to Home
        </button>
      </div>

      <div className="text-lg space-y-1">
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={() => navigate(`/edit/${student.id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>

        <button
          onClick={() => navigate("/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create More
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full space-y-4">
            <h2 className="text-xl font-semibold text-red-600">Confirm Delete</h2>
            <p>Type the student name and the word <strong>delete</strong> below to confirm.</p>

            <input
              type="text"
              placeholder="Type student name"
              className="w-full p-2 border rounded"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <input
              type="text"
              placeholder='Type "delete"'
              className="w-full p-2 border rounded"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  setShowConfirm(false);
                  setNameInput("");
                  setConfirmInput("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                onClick={handleDelete}
                disabled={
                  nameInput !== student.name || confirmInput.toLowerCase() !== "delete"
                }
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
