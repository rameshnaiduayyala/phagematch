import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./layout/DashboardLayout";
import AdminDashboard from "./pages/Dashboard";
import IcmrDashboard from "./pages/ncds-icmr-dashboard/IcmrDashboard";
import ResearcherDashboard from "./pages/researcherDashboard/ResearcherDashboard";
import ClinicianDashboard from "./pages/clinicianDashbaord/ClinicianDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          {/* Each role dashboard */}
          <Route
            path="Admin"
            element={<ProtectedRoute allowedRoles={[]} />}
          >
            <Route index element={<AdminDashboard />} />
          </Route>

          <Route
            path="icmr"
            element={<ProtectedRoute allowedRoles={[]} />}
          >
            <Route index element={<IcmrDashboard />} />
          </Route>

          <Route
            path="clinician"
            element={
              <ProtectedRoute allowedRoles={[]} />
            }
          >
            <Route index element={<ClinicianDashboard />} />
          </Route>

          <Route
            path="researcher"
            element={
              <ProtectedRoute allowedRoles={[]} />
            }
          >
            <Route index element={<ResearcherDashboard />} />
          </Route>

          {/* Common pages (everyone logged in can access) */}
          <Route path="profile" element={<Profile />} />
          <Route
            path="settings"
            element={<ProtectedRoute allowedRoles={["Admin"]} />}
          >
            <Route index element={<Settings />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
