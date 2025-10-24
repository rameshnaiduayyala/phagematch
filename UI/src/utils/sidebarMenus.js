import { ROLE_SLUGS } from "../constants/roles";

export const sidebarMenus = {
  [ROLE_SLUGS.admin]: [
    { name: "Master Dashboard", path: "/admin/dashboard" },
    { name: "All Patients", path: "/admin/patients" },
    { name: "Reports", path: "/admin/reports" },
  ],
  [ROLE_SLUGS.hospital_clinician]: [
    { name: "Dashboard", path: "/dashboard/clinician" },
    { name: "Patients", path: "/dashboard/clinician/patients" },
    { name: "Appointments", path: "/hospital/appointments" },
  ],
  [ROLE_SLUGS.ccmb_researcher]: [
    { name: "Dashboard", path: "/ccmb/dashboard" },
    { name: "Patients", path: "/ccmb/patients" },
  ],
  [ROLE_SLUGS.ncdc_icmr_official]: [
    { name: "Dashboard", path: "/national/dashboard" },
    { name: "Analytics", path: "/national/analytics" },
  ],
};
