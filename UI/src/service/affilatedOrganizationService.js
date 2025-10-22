import { formatApiError } from "../utils/formatError";
import api from "../api/axios";

const GetAffilatedOrganizations = async () => {
  try {
    const response = await api.get("/afforg/");
    return response.data;
  } catch (error) {
    return { error: formatApiError(error.response?.data || error.message) };
  }
};

const affilatedOrganizationService = {
  GetAffilatedOrganizations,
};

export default affilatedOrganizationService;
