import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../components/Dropdown";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Mock registration logic
    alert("Registered successfully!");
    navigate("/login");
  };

  const options = [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    {
      type: "group",
      name: "Group 1",
      items: [
        { value: "three", label: "Three" },
        { value: "four", label: "Four" },
      ],
    },
    {
      type: "group",
      name: "Group 2",
      items: [
        { value: "five", label: "Five" },
        { value: "six", label: "Six" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-gradient-to-tr from-white to-gray-100">
      {/* Left side - gradient text */}
      <div className="hidden md:flex w-1/2 max-w-[50%] items-center justify-center bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text text-center p-10">
          Create Your Account <br /> Join Us Today!
        </h1>
      </div>

      {/* Right side - registration form */}
      <div className="flex w-full md:w-1/2 max-w-[50%] items-center justify-center relative">
        {/* Floating shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 opacity-30 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-200 opacity-30 rounded-full animate-pulse animation-delay-2000"></div>
        </div>

        <form
          onSubmit={handleRegister}
          className="relative z-10 bg-white border border-gray-200 rounded-3xl shadow-lg w-96 p-10 flex flex-col space-y-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 text-center tracking-wide">
            Create Account
          </h1>
          <p className="text-center text-gray-500">
            Sign up to get started with your account
          </p>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <CustomDropdown
            options={options}
            placeholder="Select an option"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900"
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300"
          >
            Register
          </button>

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <span
              className="text-green-500 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
