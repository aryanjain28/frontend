import { Select } from "./common.types";

export type Client = {
  id: string;
  name: string;
  businessName: string;
  gstIn: string | null;
  panNumber: string | null;
  primaryMobile: string;
  taxpayerTypeId: string;
  taxpayerTypeName: string;
  taskParentIds: number[];
};

export interface TaxpayerType {
  id: string;
  name: string;
}

export interface ModClient {
  id: number;
  name: string;
  entity: string;
  pan: string;
  mobile: string;
  isGst: boolean;
  isTally: boolean;
  isCompany: boolean;
  isIT: boolean;
  isAudit: boolean;
  isOther: boolean;
  taskParentIds: number[];
}

export interface ModifiedClientFields {
  name?: string;
  gstIn?: string;
  registrationDate?: string;
  taxpayerType?: string;
  legalName?: string;
  businessName?: string;
  businessConstitution?: string;
  businessActivity?: string;
  panNumber?: string;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  primaryMobile?: string;
  secondaryMobile?: string;
  primaryEmail?: string;
  gstUsername?: string;
  gstPassword?: string;
}

export interface ClientFormFieldType {
  name: string;
  fieldType?: string;
  required?: boolean;
  options?: Select[] | string[];
  readOnly?: boolean;
  isLoading?: boolean;
}

export interface ClientFormFields {
  businessInfo: ClientFormFieldType[];
  contactDetails: ClientFormFieldType[];
  gstFields: ClientFormFieldType[];
}

export interface GetAllClientsResponse {
  status: number;
  data: Client[];
  message: string;
}

export interface GetClientDetailsResponse {
  status: number;
  data: Client;
  message: string;
}

export interface GetClientTasksResponse {
  status: number;
  data: {
    id: string;
    startDate: Date;
    paidAmount: number;
    totalAmount: number;
    approvedAt: Date | null;
    taskTypeChildName: string;
    taskTypeChildId: number;
  }[];
  message: string;
}

export interface GetAllTaxpayerTypesResponse {
  status: number;
  data: TaxpayerType[];
  message: string;
}

export interface GetAllPincodesResponse {
  status: number;
  data: {
    [key: string]: {
      name: string;
      pincode: number;
      district: string;
      state: string;
      id: string;
    };
  };
  message: string;
}

export interface PostClientPayload {
  data: ModifiedClientFields;
}

export interface PatchClientPayload {
  data: ModifiedClientFields;
}

export interface PostClientResponse {
  status: number;
  message: string;
  data: ModifiedClientFields;
}
