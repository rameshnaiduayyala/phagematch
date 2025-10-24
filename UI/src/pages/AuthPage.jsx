import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import CustomDropdown from "../components/Dropdown";
import authService from "../service/authService";
import roleService from "../service/roleSerice";
import affilatedOrganizationService from "../service/affilatedOrganizationService";
import { useAuthStore } from "../stores/useAuthStore";

export default function AuthPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [organization, setOrganization] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [affiliatedOrgs, setAffiliatedOrgs] = useState([]);
  const { setUser, setToken } = useAuthStore();

  if (token) return <Navigate to="/dashboard" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await authService.Login(email, password);

    if (response && !response.error) {
      toast.success("Login successful!");
      setUser(response.user);
      setToken(response.access);

      const role = response.user?.role_slug;

      switch (role) {
        case "ADMIN":
          navigate("/dashboard/admin");
          break;
        case "HOSPITAL_CLINICIAN":
          navigate("/dashboard/clinician");
          break;
        case "CCMB_RESEARCHER":
          navigate("/dashboard/researcher");
          break;
        case "NCDC_ICMR_OFFICIAL":
          navigate("/dashboard/icmr");
          break;
        default:
          navigate("/dashboard/researcher");
          break;
      }
    } else {
      toast.error(response.error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await authService.RegisterNewUser(
      name,
      email,
      mobileNumber,
      password,
      confirmPassword,
      role,
      organization
    );

    if (response && !response.error) {
      toast.success("Registration successful!");
      setIsLogin(true);
    } else {
      console.log(response.error);
      toast.error(response.error);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const roleOptions = roles
    .filter((r) => r.name.toLowerCase() !== "admin")
    .map((r) => ({ value: r.id, label: r.name }));
  const organizationOptions = [
    ...affiliatedOrgs.map((org) => ({ value: org.id, label: org.name })),
  ];

  useEffect(() => {
    document.title = isLogin ? "Login - PageMatch" : "Register - PageMatch";

    // Fetch roles on component mount
    const fetchRoles = async () => {
      const response = await roleService.GetRoles();
      if (response && !response.error) {
        setRoles(response);
      } else {
        toast.error("Failed to fetch roles");
      }
    };

    const fetchAffiliatedOrgs = async () => {
      const response =
        await affilatedOrganizationService.GetAffilatedOrganizations();
      if (response && !response.error) {
        setAffiliatedOrgs(response);
      }
    };

    if (!isLogin) {
      fetchRoles();
      fetchAffiliatedOrgs();
    } else {
      setRole(null);
    }
  }, [isLogin]);

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
                name="email"
                placeholder="Email"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                name="password"
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
              className="w-full max-w-lg space-y-3 bg-white p-4 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-semibold text-gray-900 text-center">
                Create account
              </h2>
              <p className="text-center text-gray-500">Start your journey</p>

              {/* Dropdowns Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Role Dropdown */}
                <CustomDropdown
                  options={roleOptions}
                  placeholder="Select Role"
                  value={role}
                  onChange={(val) => setRole(val.value)}
                  wrapperClass="w-full"
                  buttonClass="w-full p-3 rounded-md border border-gray-300 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                  menuClass="bg-white border border-gray-200 rounded-md shadow-sm"
                  itemClass="text-gray-800 hover:bg-gray-100 px-3 py-2 cursor-pointer"
                />

                {/* Organization Dropdown */}
                <CustomDropdown
                  options={organizationOptions}
                  placeholder="Select Organization"
                  value={organization}
                  onChange={(val) => setOrganization(val.value)}
                  wrapperClass="w-full"
                  buttonClass="w-full p-3 rounded-md border border-gray-300 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                  menuClass="bg-white border border-gray-200 rounded-md shadow-sm"
                  itemClass="text-gray-800 hover:bg-gray-100 px-3 py-2 cursor-pointer"
                />
              </div>

              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Phone"
                className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Confirm Password */}
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {/* Submit Button */}
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
