export type ICustomer = {
  id?: number;
  name: string;
  address: string;
};
export interface ICustomerState {
  customerList: ICustomer[];
}
