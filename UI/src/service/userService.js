import api from "../api/axios";

const GetAllUsers = async () => {
  try {
    const response = await api.get("/users/");
    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

const ApproveUser = async (userId) => {
  try {
    const response = await api.patch(`/users/${userId}/approve/`, {
      is_approved: true,
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

const userService = {
  GetAllUsers,
  ApproveUser,
};

export default userService;
