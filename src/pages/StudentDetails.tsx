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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-xl border-black border-[1.5px] p-6">
        <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{student.name}</h1>
        <button
          onClick={() => navigate("/")}
          className=" border-black border-[1.5px] bg-gray-300 px-4 py-1 rounded hover:bg-gray-400/60"
        >
          Go to Home
        </button>
      </div>
      <img className="rounded-[30pt] mx-auto h-40 mb-5" src={"baby-website.svg"} alt="" />
      <div className="text-lg space-y-1">
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={() => navigate(`/edit/${student.id}`)}
          className=" border-black border-[1.5px] bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700/80"
        >
          Edit
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          className=" border-black border-[1.5px] bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-700/80"
        >
          Delete
        </button>

        <button
          onClick={() => navigate("/add")}
          className=" border-black border-[1.5px] bg-green-400 text-white px-4 py-2 rounded hover:bg-emerald-600/80"
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
      </div>
  );
};

export default StudentDetails;
