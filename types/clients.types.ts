export type Client = { _id: string; entity: string[]; name: string };

export interface GetAllClientsResponse {
  status: number;
  data: Client[];
  message: string;
}
