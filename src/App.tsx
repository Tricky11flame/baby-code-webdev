// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import AddStudentForm from "./components/AddStudentForm.tsx";
import { StudentProvider } from "./contexts/StudentContext.tsx";
import StudentDetails from "./pages/StudentDetails.tsx";
import SignUp from "./pages/SignUp.tsx";
import EditStudentForm from "./pages/EditStudentForm.tsx";

const App: React.FC = () => {
  return (
    <StudentProvider>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/add-student" element={<PrivateRoute><AddStudentForm /></PrivateRoute>} />
          <Route path="/students/:id" element={<PrivateRoute><StudentDetails /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute> <EditStudentForm /> </PrivateRoute>} />

          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
    </StudentProvider>
  );
};

export default App;
