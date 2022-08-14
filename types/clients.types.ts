export type Client = { id: string; entities: string[]; name: string };

export interface GetAllClientsResponse {
  status: number;
  data: Client[];
  message: string;
}
