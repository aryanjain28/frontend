export type Client = { id: string; entities: string[]; name: string };

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
}

export interface ModifiedClientFields {
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
  pinCode?: string;
  primaryMob?: string;
  secondaryMob?: string;
  primaryEmail?: string;
  username?: string;
  password?: string;
}

export interface ClientFormFieldType {
  name: string;
  fieldType?: string;
  required?: boolean;
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
