export type Client = { id: string; entities: string[]; name: string };

export interface ModClient {
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

export interface GetAllClientsResponse {
  status: number;
  data: Client[];
  message: string;
}
