import api from "../api/axios";

const GetAllUsers = async () => {
  try {
    const response = await api.get("/users/");
    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

const userService = {
  GetAllUsers,
};

export default userService;
