// src/pages/Login.tsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
// import baby1 from "baby-website.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-xl border-black border-[1.5px] p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <img className=" rounded-[30pt] mx-auto h-40 mb-5" src={"baby-website.svg"} alt="" />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="border-black border-[1.6px] w-full bg-green-400 text-white py-2 rounded hover:bg-emerald-500"
        >
          Login
        </button>
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-400 underline hover:text-emerald-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
