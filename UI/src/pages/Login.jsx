import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (token) return <Navigate to="/dashboard" replace />;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "ayyalarameshnaidu@gmail.com" && password === "123456") {
      localStorage.setItem("token", "mock-jwt-token");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-gradient-to-tr from-white to-gray-100">
      {/* Left side - gradient text */}
      <div className="hidden md:flex w-1/2 max-w-[50%] items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white text-center p-10">
          Welcome Back! <br /> PageMatch
        </h1>
      </div>

      {/* Right side - login form */}
      <div className="flex w-full md:w-1/2 max-w-[50%] items-center justify-center relative">
        {/* Floating shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 opacity-30 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-200 opacity-30 rounded-full animate-pulse animation-delay-2000"></div>
        </div>

        <form
          onSubmit={handleLogin}
          className="relative z-10 bg-white border border-gray-200 rounded-3xl shadow-lg w-96 p-10 flex flex-col space-y-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 text-center tracking-wide">
            login
          </h1>
          <p className="text-center text-gray-500">
            Enter your credentials to access the dashboard
          </p>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300"
          >
            Login
          </button>

          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <span
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
