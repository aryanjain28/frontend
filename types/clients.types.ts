import { Select } from "./common.types";

export type Client = {
  id: string;
  name: string;
  businessName: string;
  gstIn: string | null;
  panNumber: string | null;
  primaryMobile: string;
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
  code?: string;
  prefix?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  spouseName?: string;
  fatherName?: string;
  dob?: string;
  sex?: string;
  maritalStatus?: string;
  addressLine1?: string;
  addressLine2?: string;
  pincode?: string;
  district?: string;
  city?: string;
  state?: string;
  primaryMobile?: string;
  secondaryMobile?: string;
  primaryEmail?: string;
  panNumber?: string;
  aadharName?: string;
  aadharNumber?: string;
  passportNumber?: string;
  gstIn?: string;
  gstUsername?: string;
  gstPassword?: string;
  businessName?: string;
  businessActivity?: string;
  registrationDate?: string;
  bankMICR?: string;
  bankIFSC?: string;
  bankName?: string;
  bankBranch?: string;
  bankAddress?: string;
  bankCity?: string;
  bankCentre?: string;
  bankState?: string;
  bankContact?: string;
  additionalInfo?: string | { key: string; value: string }[];
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
  personalInfo: ClientFormFieldType[];
  contactDetails: ClientFormFieldType[];
  businessInfo: ClientFormFieldType[];
  bankDetails: ClientFormFieldType[];
}

export interface GetAllClientsResponse {
  status: number;
  data: Client[];
  message: string;
}

export interface GetClientDetailsResponse {
  status: number;
  data: ModifiedClientFields;
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

export interface GetPincodeDetailsResponse {
  status: number;
  data: {
    pincode: string;
    district: string;
    state: string;
    city: string;
  };
  message: string;
}

export interface GetIFSCDetailsResponse {
  status: number;
  data: {
    bankMICR: string; // "560226263";
    bankIFSC: string; // "HDFC0CAGSBK";
    bankName: string; // "HDFC Bank";
    bankBranch: string; // "THE AGS EMPLOYEES COOP BANK LTD";
    bankAddress: string; // "SANGMESH BIRADAR BANGALORE";
    bankCity: string; // "BANGALORE";
    bankCentre: string; // "BANGALORE URBAN";
    bankState: string; // "KARNATAKA";
    bankContact: string; // "+91802265658";
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
