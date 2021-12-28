import baseURL from "../../../service/api/api";

export const userApi = {
  getAllUserAPI: () => {
    const url = `/api/services/app/User/GetAll?MaxResultCount=2000`;
    return baseURL.get(url);
  },
};
