// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { AuthProvider } from "./contexts/AuthContexts";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element=
          {<>
          <PrivateRoute><Dashboard /></PrivateRoute>
          <div>hello</div>
          </>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
