import api from "../api/axios";

const GetRoles = async () => {
  try {
    const response = await api.get("/roles/");
    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

const roleService = {
  GetRoles,
};

export default roleService;
