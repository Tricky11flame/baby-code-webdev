// src/pages/Dashboard.tsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import StudentList from "../components/StudentList";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard (Protected)</h1>
      <StudentList />
      <button
        onClick={() => signOut(auth)}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
