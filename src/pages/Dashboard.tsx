// src/pages/Dashboard.tsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import StudentList from "../components/StudentList";

const Dashboard: React.FC = () => {
  return (
    <div className=" min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 bg-white container px-5 py-2 border-black border-[1.6px] hover:shadow-sm transition ">Dashboard</h1>
      <StudentList />
      <button
        onClick={() => signOut(auth)}
        className="border-black border-[1.6px] bg-rose-500 text-white ml-8 px-4 py-2 rounded hover:bg-rose-600 mx-4"
      >
        Logout
      </button>
      <a href="/add-student" > 
        <button
          className="border-black border-[1.6px] bg-emerald-400 text-white px-4 py-2 rounded hover:bg-emerald-600"
        >
          Add More
        </button>
      </a> 
    </div>
  );
};

export default Dashboard;
