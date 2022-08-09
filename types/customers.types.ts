export interface Customer {
  id: string;
  name: string;
  email?: string;
  gender?: string;
  address?: string;
  age?: number;
  mobile?: number;
}

export interface GetCustomersResponse {
  data: Customer[];
}

export interface GetCustomerResponse {
  data: Customer;
}

export interface PostCustomerPayload {
  data: Customer;
}

export interface PostCustomerResponse {
  data: Customer;
}

export interface PatchCustomerPayload {
  data: Customer;
}

export interface PatchCustomerResponse {
  data: Customer;
}

export interface DeleteCustomerPayload {
  data: string;
}
