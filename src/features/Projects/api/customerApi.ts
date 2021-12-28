import baseURL from "src/service/api/api";
import { ICustomer } from "../redux/customer/customerType";

export const customerApi = {
  getAllCustomerAPI: () => {
    const url = "/api/services/app/Customer/GetAll";
    return baseURL.get(url);
  },
  postNewCustomerAPI: (customer: ICustomer) => {
    const url = "/api/services/app/Customer/Save";
    return baseURL.post(url, customer);
  },
};
