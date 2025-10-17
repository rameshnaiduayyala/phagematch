import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import CustomDropdown from "../components/Dropdown";

export default function AuthPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (token) return <Navigate to="/dashboard" replace />;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "techrammy@gmail.com" && password === "123456") {
      localStorage.setItem("token", "mock-jwt-token");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Registered ${name} with email ${email}`);
    setIsLogin(true);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const options = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <div className="flex min-h-screen bg-white text-gray-900 font-sans">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center border-r border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-12"
        >
          <h1 className="text-6xl font-bold tracking-tight mb-4">PageMatch</h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-md mx-auto">
            A clean, minimal interface for managing your digital workspace.
          </p>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 md:p-16 bg-white">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="login"
              onSubmit={handleLogin}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm space-y-6"
            >
              <h2 className="text-3xl font-semibold text-gray-900 text-center">
                Sign in
              </h2>
              <p className="text-center text-gray-500">Welcome back</p>

              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition-colors"
              >
                Continue
              </button>

              <p className="text-center text-gray-500">
                Don’t have an account?{" "}
                <span
                  className="text-black underline cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Create one
                </span>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              onSubmit={handleRegister}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm space-y-6"
            >
              <h2 className="text-3xl font-semibold text-gray-900 text-center">
                Create account
              </h2>
              <p className="text-center text-gray-500">Start your journey</p>

              <CustomDropdown
                options={options}
                placeholder="Select Role"
                wrapperClass="w-full"
                buttonClass="w-full p-3 rounded-md border border-gray-300 text-gray-900 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black"
                menuClass="bg-white border border-gray-200 rounded-md shadow-sm"
                itemClass="text-gray-800"
              />

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition-colors"
              >
                Register
              </button>

              <p className="text-center text-gray-500">
                Already have an account?{" "}
                <span
                  className="text-black underline cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Sign in
                </span>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
